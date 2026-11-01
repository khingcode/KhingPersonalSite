# Domain vote: run once in the Supabase SQL editor
# (copy everything below the line, all of it, and press Run)

create table if not exists domain_votes (
  voter text primary key check (char_length(voter) between 8 and 64),
  choice text not null check (choice ~ '^[a-z0-9][a-z0-9-]{0,40}\.[a-z]{2,12}$'),
  created_at timestamptz not null default now()
);

alter table domain_votes enable row level security;

create policy "anyone can read votes" on domain_votes for select to anon using (true);
create policy "anyone can vote" on domain_votes for insert to anon with check (true);

grant select, insert on domain_votes to anon;

-- make the data API notice the new table right away
notify pgrst, 'reload schema';

-- one vote per browser (the primary key blocks a second one).
-- suggestions are free text, so look at them now and then; to remove one:
--   delete from domain_votes where choice = 'whatever.com';
