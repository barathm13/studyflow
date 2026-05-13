# StudyFlow

StudyFlow is a modern Pomodoro focus web app inspired by Pomofocus. It combines a polished glassmorphism interface, animated ambience themes, keyboard-friendly focus mode, Supabase authentication, and lightweight productivity analytics.

## Features

- **Supabase Auth**: login, signup, persistent sessions, and a guest mode fallback.
- **Pomodoro timer**: 25 minute focus, 5 minute short break, 15 minute long break, start/pause/reset, auto-switching, and fullscreen focus mode.
- **Notifications and sound**: browser notifications plus a tiny generated Web Audio chime. No local MP3 or binary audio files are included.
- **Ambience themes**: Lofi, Rain, Café, and Minimal themes with animated gradients, glow colors, and visual atmosphere changes.
- **Analytics dashboard**: daily focus time, completed sessions, current streak, and a weekly productivity chart.
- **Custom settings**: durations, auto-start behavior, theme selection, and notification preference.
- **Deploy-ready**: Vite + React + Tailwind CSS + Framer Motion, ready for Vercel.

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Supabase Auth + Database
- Vercel-ready static deployment

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

Copy the example environment file and add your Supabase project values:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

The app still works in guest mode if these variables are omitted, but login/signup and cloud analytics require Supabase.

### 3. Create the database table

Run the SQL in [`src/supabase/schema.sql`](src/supabase/schema.sql) in the Supabase SQL editor. It creates the `focus_sessions` table, row-level security, and per-user policies.

### 4. Start locally

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

## Vercel Deployment

1. Import this repository into Vercel.
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Project Settings → Environment Variables.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

## Project Structure

```text
src/
 ├── components/
 │    ├── Timer/
 │    ├── Layout/
 │    ├── Analytics/
 │    └── UI/
 ├── pages/
 ├── hooks/
 ├── context/
 ├── supabase/
 ├── utils/
 └── styles/
```

## Notes

- StudyFlow intentionally does **not** store local audio files. Completion sounds are generated in the browser with the Web Audio API.
- Guest analytics are stored in `localStorage`; authenticated analytics are stored in Supabase.
