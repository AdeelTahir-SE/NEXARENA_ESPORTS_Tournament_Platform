# NEXARENA — Esports Tournament Platform

> A full-stack esports tournament management platform built with Next.js and Supabase. Create, manage, and compete in tournaments across multiple game titles with real-time bracket updates, team management, and live leaderboards.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Design System](#design-system)
- [Contributing](#contributing)

---

## Overview

NEXARENA is a competitive esports platform where players and organizers can:

- **Organizers** — create and manage tournaments with custom bracket formats, entry fees, prize pools, and scheduling.
- **Players / Teams** — register for tournaments, track standings, and view match history.
- **Spectators** — follow live bracket progression and leaderboards in real time.

The platform is built with a dark, high-contrast visual identity optimized for desktop-first esports audiences, with full responsiveness for mobile viewers.

---

## Features

### Core
- **Tournament Creation** — Single elimination, double elimination, and round-robin formats
- **Team & Player Registration** — Invite-based and open registration with slot limits
- **Live Bracket Viewer** — Real-time bracket updates via Supabase Realtime subscriptions
- **Leaderboard** — Global and per-tournament rankings with ELO-style scoring
- **Match Management** — Score submission, dispute resolution, and admin override
- **User Profiles** — Game stats, match history, team affiliations, and achievements

### Auth & Access
- Email/password and OAuth (Discord, Google) via Supabase Auth
- Role-based access: `player`, `organizer`, `admin`
- Protected routes with middleware-based session checks

### Real-Time
- Live match score updates
- Bracket progression without page refresh
- Notifications for match start, result confirmation, and bracket advancement

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Real-Time | Supabase Realtime |
| Storage | Supabase Storage (avatars, team logos) |
| Deployment | Vercel |
| State | Zustand / React Query (TanStack) |
| Forms | React Hook Form + Zod |

---

## Project Structure

```
nexarena/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   ├── profile/
│   │   ├── teams/
│   │   └── settings/
│   ├── tournaments/
│   │   ├── page.tsx               # Tournament listing
│   │   ├── [id]/
│   │   │   ├── page.tsx           # Tournament detail
│   │   │   ├── bracket/page.tsx   # Live bracket view
│   │   │   └── register/page.tsx  # Registration flow
│   │   └── create/page.tsx        # Organizer: create tournament
│   ├── leaderboard/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx                   # Landing / home
├── components/
│   ├── ui/                        # Primitive components (Button, Badge, Card…)
│   ├── tournament/
│   │   ├── BracketViewer.tsx
│   │   ├── TournamentCard.tsx
│   │   ├── MatchCard.tsx
│   │   └── RegistrationForm.tsx
│   ├── leaderboard/
│   │   └── LeaderboardTable.tsx
│   ├── team/
│   │   ├── TeamCard.tsx
│   │   └── TeamRoster.tsx
│   └── shared/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── Avatar.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser client
│   │   ├── server.ts              # Server component client
│   │   └── middleware.ts          # Auth middleware helpers
│   ├── utils.ts
│   └── validators/                # Zod schemas
├── hooks/
│   ├── useTournament.ts
│   ├── useRealTimeBracket.ts
│   └── useAuth.ts
├── types/
│   └── index.ts                   # Shared TypeScript types
├── public/
│   └── assets/
├── supabase/
│   ├── migrations/                # SQL migration files
│   └── seed.sql
├── middleware.ts                  # Next.js edge middleware
├── tailwind.config.ts
└── next.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Vercel](https://vercel.com) account (for deployment)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/your-username/nexarena.git
cd nexarena

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Fill in your Supabase credentials (see Environment Variables)

# 5. Push database schema
npx supabase db push

# 6. Seed sample data (optional)
npx supabase db reset --db-url <your-db-url>

# 7. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env.local` file at the root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OAuth (optional)
SUPABASE_AUTH_DISCORD_CLIENT_ID=
SUPABASE_AUTH_DISCORD_SECRET=
SUPABASE_AUTH_GOOGLE_CLIENT_ID=
SUPABASE_AUTH_GOOGLE_SECRET=
```

> Never commit `.env.local`. The `SUPABASE_SERVICE_ROLE_KEY` must only be used in server-side contexts.

---

## Database Setup

All schema is managed through Supabase migrations in `/supabase/migrations/`.

### Core Tables

| Table | Description |
|---|---|
| `profiles` | Extended user data linked to `auth.users` |
| `teams` | Team records with logo, tag, and owner |
| `team_members` | Player ↔ team membership with roles |
| `tournaments` | Tournament metadata, format, dates, prize pool |
| `tournament_participants` | Team/player registrations per tournament |
| `matches` | Individual match records within a bracket |
| `match_results` | Score submissions and confirmation status |
| `leaderboard_entries` | Aggregated stats per user per game |

### Row Level Security

RLS is enabled on all tables. Key policies:

- `profiles` — users can only update their own row
- `tournaments` — anyone can read; only organizers can insert/update
- `matches` — only participants and admins can submit results
- `team_members` — only team owners can manage membership

To apply migrations:

```bash
npx supabase db push
# or for production:
npx supabase db push --db-url $DATABASE_URL
```

---

## Authentication

Auth is handled entirely by Supabase Auth with Next.js middleware protecting routes.

```
middleware.ts → checks session → redirects unauthenticated users to /login
```

### OAuth Setup (Discord)

1. Create a Discord application at [discord.com/developers](https://discord.com/developers)
2. Add redirect URI: `https://your-project.supabase.co/auth/v1/callback`
3. Enable Discord provider in Supabase Dashboard → Auth → Providers

---

## Deployment

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set all environment variables in the Vercel dashboard under **Project → Settings → Environment Variables**.

### Supabase Edge Functions (optional)

If using Edge Functions for match result processing or notifications:

```bash
npx supabase functions deploy match-result-handler
```

---

## Design System

See [`DESIGN.md`](./DESIGN.md) for the full design specification including color palette, typography, component patterns, spacing system, and Figma references.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit with conventional commits: `git commit -m "feat: add bracket seeding logic"`
4. Push and open a Pull Request

Please follow the existing code style. Run `npm run lint` before submitting.

---

## License

MIT © NEXARENA
