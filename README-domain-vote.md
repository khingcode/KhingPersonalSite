# Domain vote: run once in the Supabase SQL editor

create table domain_votes (
  voter text primary key check (char_length(voter) between 8 and 64),
  choice text not null check (choice ~ '^[a-z0-9][a-z0-9-]{0,40}\.[a-z]{2,12}$'),
  created_at timestamptz not null default now()
);

alter table domain_votes enable row level security;
create policy "anyone can vote" on domain_votes for insert to anon with check (true);
grant insert on domain_votes to anon;

-- visitors can only see the totals (not who voted for what)
create view domain_vote_counts as
  select choice, count(*)::int as votes from domain_votes group by choice;
grant select on domain_vote_counts to anon;

-- one vote per browser (the primary key blocks a second one).
-- suggestions are free text, so look at them now and then; to remove one:
--   delete from domain_votes where choice = 'whatever.com';

-- if the site still says voting isn't open after running the above, run this once so the API notices the new table and view:
notify pgrst, 'reload schema';
