-- Run this in Supabase SQL Editor.
-- It creates a profiles table with unique username support.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (username ~ '^[a-z0-9_]{3,20}$')
);

alter table public.profiles enable row level security;

drop policy if exists "Public can read profiles" on public.profiles;
create policy "Public can read profiles"
  on public.profiles
  for select
  using (true);

drop policy if exists "User can insert own profile" on public.profiles;
create policy "User can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists "User can update own profile" on public.profiles;
create policy "User can update own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

