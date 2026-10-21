// Server für die Geräte-Synchronisierung (Supabase, Einrichtung: server/supabase.sql).
// URL und Publishable/anon key sind öffentlich gedacht – geschützt wird über die SQL-Funktionen.
// Leer = Synchronisierung ausgeblendet.
export const SYNC_SERVER = { url: "", key: "" };
