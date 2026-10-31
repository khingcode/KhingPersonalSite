# Guestbook songs: run once in the Supabase SQL editor

alter table guestbook add column song text
  check (song is null or song ~ '^(sp:[A-Za-z0-9]{22}|yt:[A-Za-z0-9_-]{11})$');

-- the site stores only a short id like sp:xxxxxxxxxxxxxxxxxxxxxx or yt:xxxxxxxxxxx,
-- and the check above stops anything else from being saved.
