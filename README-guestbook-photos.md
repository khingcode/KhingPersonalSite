# Guestbook photos: run once in the Supabase SQL editor

alter table guestbook add column image_path text
  check (image_path is null or image_path ~ '^[A-Za-z0-9_-]+\.(webp|jpg)$');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('guestbook', 'guestbook', true, 1048576, array['image/webp','image/jpeg'])
on conflict (id) do nothing;

create policy "guestbook photo upload" on storage.objects
  for insert to anon with check (bucket_id = 'guestbook');
