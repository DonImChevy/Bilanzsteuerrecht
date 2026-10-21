-- Finanzwirt-Trainer: Geräte-Synchronisierung per Sync-Code (ohne Konto, ohne E-Mail).
-- Einmal im Supabase-SQL-Editor ausführen. Kann gefahrlos erneut ausgeführt werden.
--
-- Sicherheit: Die Tabelle ist für die App nicht direkt lesbar (kein Auflisten fremder Codes).
-- Zugriff nur über die drei Funktionen, jeweils mit genau einem Code. Codes sind 16 Zeichen aus
-- 32 Zeichen (80 Bit Zufall) und damit nicht erratbar.

create table if not exists public.lernstand (
  code      text primary key check (code ~ '^[A-Z2-9]{16}$'),
  daten     jsonb not null,
  version   integer not null default 1,
  geaendert timestamptz not null default now()
);

alter table public.lernstand enable row level security;
revoke all on public.lernstand from anon, authenticated;

-- Lernstand zu einem Code holen (leer, wenn es den Code noch nicht gibt)
create or replace function public.sync_holen(p_code text)
returns table (daten jsonb, version integer)
language sql security definer set search_path = public
as $$
  select l.daten, l.version from public.lernstand l where l.code = p_code;
$$;

-- Lernstand speichern. p_version = 0 legt den Code neu an, sonst die zuletzt geholte Version.
-- Rückgabe: neue Version, oder NULL bei Konflikt (ein anderes Gerät war schneller):
-- dann neu holen, zusammenführen und erneut speichern.
create or replace function public.sync_speichern(p_code text, p_daten jsonb, p_version integer)
returns integer
language plpgsql security definer set search_path = public
as $$
declare
  neu integer;
begin
  if p_code !~ '^[A-Z2-9]{16}$' then raise exception 'Ungültiger Sync-Code'; end if;
  if pg_column_size(p_daten) > 1000000 then raise exception 'Lernstand zu groß'; end if;
  if p_version = 0 then
    insert into public.lernstand (code, daten) values (p_code, p_daten)
      on conflict (code) do nothing
      returning lernstand.version into neu;
  else
    update public.lernstand l set daten = p_daten, version = l.version + 1, geaendert = now()
      where l.code = p_code and l.version = p_version
      returning l.version into neu;
  end if;
  return neu;
end;
$$;

-- Synchronisierung beenden: gespeicherten Lernstand zu einem Code löschen
create or replace function public.sync_loeschen(p_code text)
returns void
language sql security definer set search_path = public
as $$
  delete from public.lernstand where code = p_code;
$$;

revoke all on function public.sync_holen(text) from public;
revoke all on function public.sync_speichern(text, jsonb, integer) from public;
revoke all on function public.sync_loeschen(text) from public;
grant execute on function public.sync_holen(text) to anon;
grant execute on function public.sync_speichern(text, jsonb, integer) to anon;
grant execute on function public.sync_loeschen(text) to anon;
