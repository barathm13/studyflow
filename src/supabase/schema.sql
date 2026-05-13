create table if not exists public.focus_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null check (mode in ('work', 'short', 'long')),
  duration_minutes integer not null,
  completed_at timestamptz not null default now()
);

alter table public.focus_sessions enable row level security;

create policy "Users can read own focus sessions"
  on public.focus_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert own focus sessions"
  on public.focus_sessions for insert
  with check (auth.uid() = user_id);

create index if not exists focus_sessions_user_completed_idx
  on public.focus_sessions (user_id, completed_at desc);
