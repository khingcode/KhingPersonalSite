# Guestbook setup (Supabase, free)
1. Create a project at https://supabase.com
2. SQL editor, run:

create table guestbook (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 30),
  message text not null check (char_length(message) between 1 and 200),
  created_at timestamptz not null default now()
);
alter table guestbook enable row level security;
create policy "read" on guestbook for select to anon using (true);
create policy "write" on guestbook for insert to anon with check (true);

3. Settings > API: copy the Project URL and the anon public key into GB_URL and GB_KEY in index.html.
