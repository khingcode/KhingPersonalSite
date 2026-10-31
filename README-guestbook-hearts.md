# Guestbook hearts: run once in the Supabase SQL editor

create table guestbook_hearts (
  note_id bigint not null references guestbook(id) on delete cascade,
  voter text not null check (char_length(voter) between 8 and 64),
  created_at timestamptz not null default now(),
  primary key (note_id, voter)
);

alter table guestbook_hearts enable row level security;

create policy "anyone can read hearts" on guestbook_hearts for select to anon using (true);
create policy "anyone can add a heart" on guestbook_hearts for insert to anon with check (true);

grant select, insert on guestbook_hearts to anon;

-- one heart per browser per note (the primary key blocks repeats). hearts can't be removed from the site.
