# Guestbook note colors and stickers: run once in the Supabase SQL editor

alter table guestbook
  add column color text check (color is null or color in ('pink','peach','butter','mint','sky','lilac')),
  add column sticker text check (sticker is null or sticker in ('heart','star','flower','frog','coffee','film','moon','sparkle'));

-- until this is run, notes still save fine; the color and sticker just aren't kept.
