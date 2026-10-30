# Guestbook replies: run once in the Supabase SQL editor

alter table guestbook add column reply_to bigint references guestbook(id) on delete cascade;
