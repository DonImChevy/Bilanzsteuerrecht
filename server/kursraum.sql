-- Finanzwirt-Trainer: Kursraum für Dozierende.
-- Einmal im Supabase-SQL-Editor ausführen (kann gefahrlos erneut ausgeführt werden).
-- Danach EINMAL das Passwort für Dozierende setzen (Zeile ganz unten, Passwort selbst wählen,
-- NICHT ins Repository schreiben):
--
--   select public.kurs_passwort_setzen('HIER-EUER-PASSWORT');
--
-- Sicherheit:
-- • Lesen dürfen alle (anon): nur aktive Einträge, Dateien einzeln.
-- • Schreiben/Löschen/Statistik nur mit dem Dozierenden-Passwort; geprüft wird in der Datenbank
--   gegen einen bcrypt-Hash (pgcrypto). Falsche Versuche werden gebremst (1 s) und gezählt.
-- • Ergebnisse zu Aufgabenblättern kommen anonym als Zähler (richtig/falsch je Aufgabe), ohne Namen.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.kurs_zugang (
  id integer primary key default 1 check (id = 1),
  hash text not null,
  fehlversuche integer not null default 0,
  gesperrt_bis timestamptz
);

create table if not exists public.kurs_eintrag (
  id        uuid primary key default gen_random_uuid(),
  fach      text not null check (fach ~ '^[a-z]{2,4}$'),
  art       text not null check (art in ('hinweis', 'link', 'datei', 'blatt')),
  titel     text not null check (length(titel) between 1 and 120),
  text      text check (length(text) <= 4000),
  link      text check (link is null or link ~ '^https://'),
  aufgaben  jsonb,                       -- Aufgabenblatt: ["vorlagen-id", …]
  datei     text,                        -- Datei als data:-URL (PDF/Bild), höchstens ca. 4 MB
  datei_name text,
  autor     text check (length(autor) <= 60),
  bis       date,
  erstellt  timestamptz not null default now()
);
create index if not exists kurs_eintrag_fach on public.kurs_eintrag (fach, erstellt desc);

create table if not exists public.kurs_ergebnis (
  eintrag uuid not null references public.kurs_eintrag (id) on delete cascade,
  aufgabe text not null,
  richtig integer not null default 0,
  falsch  integer not null default 0,
  primary key (eintrag, aufgabe)
);

alter table public.kurs_zugang enable row level security;
alter table public.kurs_eintrag enable row level security;
alter table public.kurs_ergebnis enable row level security;
revoke all on public.kurs_zugang, public.kurs_eintrag, public.kurs_ergebnis from anon, authenticated;

-- Passwort setzen/ändern (nur im SQL-Editor ausführen – für die App nicht freigegeben)
create or replace function public.kurs_passwort_setzen(p_passwort text)
returns void language sql security definer set search_path = public, extensions as $$
  insert into public.kurs_zugang (id, hash) values (1, crypt(p_passwort, gen_salt('bf', 10)))
  on conflict (id) do update set hash = excluded.hash, fehlversuche = 0, gesperrt_bis = null;
$$;
revoke all on function public.kurs_passwort_setzen(text) from public, anon, authenticated;

-- Passwort prüfen (intern). Nach 10 Fehlversuchen 15 Minuten Sperre; jeder Fehlversuch dauert 1 s.
create or replace function public.kurs_ok(p_passwort text)
returns boolean language plpgsql security definer set search_path = public, extensions as $$
declare z public.kurs_zugang;
begin
  select * into z from public.kurs_zugang where id = 1;
  if z is null then return false; end if;
  if z.gesperrt_bis is not null and z.gesperrt_bis > now() then perform pg_sleep(1); return false; end if;
  if crypt(coalesce(p_passwort, ''), z.hash) = z.hash then
    update public.kurs_zugang set fehlversuche = 0, gesperrt_bis = null where id = 1;
    return true;
  end if;
  update public.kurs_zugang set fehlversuche = fehlversuche + 1,
    gesperrt_bis = case when fehlversuche + 1 >= 10 then now() + interval '15 minutes' else null end where id = 1;
  perform pg_sleep(1);
  return false;
end; $$;
revoke all on function public.kurs_ok(text) from public, anon, authenticated;

-- Für die App: Passwort prüfen (Anmeldung im Dozierenden-Bereich)
create or replace function public.kurs_pruefen(p_passwort text)
returns boolean language sql security definer set search_path = public as $$ select public.kurs_ok(p_passwort); $$;

-- Aktive Einträge eines Moduls (ohne Dateiinhalt)
create or replace function public.kurs_liste(p_fach text)
returns table (id uuid, fach text, art text, titel text, text text, link text, aufgaben jsonb, datei_name text, datei_groesse integer, autor text, bis date, erstellt timestamptz)
language sql security definer set search_path = public as $$
  select e.id, e.fach, e.art, e.titel, e.text, e.link, e.aufgaben, e.datei_name, coalesce(length(e.datei), 0), e.autor, e.bis, e.erstellt
  from public.kurs_eintrag e
  where (p_fach is null or e.fach = p_fach) and (e.bis is null or e.bis >= current_date)
  order by e.erstellt desc limit 50;
$$;

-- Datei eines Eintrags
create or replace function public.kurs_datei(p_id uuid)
returns text language sql security definer set search_path = public as $$
  select e.datei from public.kurs_eintrag e where e.id = p_id and (e.bis is null or e.bis >= current_date);
$$;

-- Eintrag anlegen (nur mit Passwort)
create or replace function public.kurs_speichern(p_passwort text, p_eintrag jsonb)
returns uuid language plpgsql security definer set search_path = public as $$
declare neu uuid;
begin
  if not public.kurs_ok(p_passwort) then raise exception 'Passwort falsch'; end if;
  if (select count(*) from public.kurs_eintrag) >= 500 then raise exception 'Zu viele Einträge'; end if;
  if length(coalesce(p_eintrag->>'datei', '')) > 5600000 then raise exception 'Datei zu groß'; end if;
  insert into public.kurs_eintrag (fach, art, titel, text, link, aufgaben, datei, datei_name, autor, bis)
  values (p_eintrag->>'fach', p_eintrag->>'art', p_eintrag->>'titel', nullif(p_eintrag->>'text', ''), nullif(p_eintrag->>'link', ''),
          case when jsonb_typeof(p_eintrag->'aufgaben') = 'array' then p_eintrag->'aufgaben' end,
          nullif(p_eintrag->>'datei', ''), nullif(p_eintrag->>'datei_name', ''), nullif(p_eintrag->>'autor', ''), nullif(p_eintrag->>'bis', '')::date)
  returning id into neu;
  return neu;
end; $$;

-- Eintrag löschen (nur mit Passwort)
create or replace function public.kurs_loeschen(p_passwort text, p_id uuid)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.kurs_ok(p_passwort) then raise exception 'Passwort falsch'; end if;
  delete from public.kurs_eintrag where id = p_id;
end; $$;

-- Ergebnis einer Aufgabe aus einem Aufgabenblatt melden (anonym, nur Zähler)
create or replace function public.kurs_melden(p_id uuid, p_aufgabe text, p_richtig boolean)
returns void language sql security definer set search_path = public as $$
  insert into public.kurs_ergebnis (eintrag, aufgabe, richtig, falsch)
  select p_id, left(p_aufgabe, 80), case when p_richtig then 1 else 0 end, case when p_richtig then 0 else 1 end
  where exists (select 1 from public.kurs_eintrag e where e.id = p_id and e.art = 'blatt' and e.aufgaben ? p_aufgabe)
  on conflict (eintrag, aufgabe) do update set richtig = kurs_ergebnis.richtig + excluded.richtig, falsch = kurs_ergebnis.falsch + excluded.falsch;
$$;

-- Klassenstatistik eines Aufgabenblatts (nur mit Passwort)
create or replace function public.kurs_statistik(p_passwort text, p_id uuid)
returns table (aufgabe text, richtig integer, falsch integer)
language plpgsql security definer set search_path = public as $$
begin
  if not public.kurs_ok(p_passwort) then raise exception 'Passwort falsch'; end if;
  return query select r.aufgabe, r.richtig, r.falsch from public.kurs_ergebnis r where r.eintrag = p_id order by r.falsch desc;
end; $$;

revoke all on function public.kurs_pruefen(text), public.kurs_liste(text), public.kurs_datei(uuid), public.kurs_speichern(text, jsonb),
  public.kurs_loeschen(text, uuid), public.kurs_melden(uuid, text, boolean), public.kurs_statistik(text, uuid) from public;
grant execute on function public.kurs_pruefen(text), public.kurs_liste(text), public.kurs_datei(uuid), public.kurs_speichern(text, jsonb),
  public.kurs_loeschen(text, uuid), public.kurs_melden(uuid, text, boolean), public.kurs_statistik(text, uuid) to anon;

-- Passwort für Dozierende setzen (eigenes Passwort einsetzen und diese Zeile einzeln ausführen):
-- select public.kurs_passwort_setzen('HIER-EUER-PASSWORT');
