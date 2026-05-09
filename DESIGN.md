# NEXARENA — Design System & Specification

> This document is the single source of truth for all visual and UX decisions in NEXARENA. It bridges the Figma design file and the Next.js implementation.

**Figma File:** [NEXARENA — Esports Tournament Platform](https://www.figma.com/design/gZdsyrQDhIf0FxMjj41mLf/NEXARENA-%E2%80%94-Esports-Tournament-Platform)

---

## Table of Contents

- [Design Philosophy](#design-philosophy)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Component Library](#component-library)
- [Page Layouts](#page-layouts)
- [Motion & Animation](#motion--animation)
- [Iconography](#iconography)
- [Responsive Breakpoints](#responsive-breakpoints)
- [Tailwind Configuration](#tailwind-configuration)

---

## Design Philosophy

NEXARENA is built around three core aesthetic principles:

**1. Dark-First, High Contrast**
The platform targets competitive gamers on high-refresh-rate monitors. Every surface defaults to near-black with deliberate use of accent color to draw attention to actions and live states.

**2. Data Density with Clarity**
Leaderboards, brackets, and match cards surface a lot of information. The design avoids decoration in favor of clear typographic hierarchy and structured grid layouts.

**3. Energy without Chaos**
Neon accent colors and glows convey competitive energy, but are applied sparingly — only on CTAs, live indicators, and highlighted rankings — so the interface never feels fatiguing.

---

## Color Palette

### Tailwind CSS Variables (`tailwind.config.ts`)

```ts
colors: {
  background: {
    DEFAULT: '#0A0A0F',   // Page background — near black with a blue undertone
    surface: '#12121A',   // Card / panel background
    elevated: '#1A1A26',  // Modals, dropdowns, hover states
  },
  border: {
    DEFAULT: '#2A2A3D',   // Default border — subtle purple-gray
    accent: '#4A4A6A',    // Focused / active borders
  },
  primary: {
    DEFAULT: '#7C3AED',   // Violet — primary brand / CTA
    hover: '#6D28D9',
    light: '#A78BFA',     // Text links, secondary accents
    glow: 'rgba(124, 58, 237, 0.3)',
  },
  accent: {
    cyan: '#06B6D4',      // Live indicators, highlights
    cyan_glow: 'rgba(6, 182, 212, 0.25)',
    gold: '#F59E0B',      // 1st place, champion badges
    silver: '#9CA3AF',    // 2nd place
    bronze: '#B45309',    // 3rd place
  },
  text: {
    primary: '#F1F0FF',   // Headings, primary content
    secondary: '#9B99B8', // Subtext, labels, meta
    muted: '#5C5A78',     // Placeholder, disabled
    inverse: '#0A0A0F',   // Text on light backgrounds
  },
  status: {
    live: '#10B981',      // Green — active/live match
    upcoming: '#06B6D4',  // Cyan — scheduled
    completed: '#5C5A78', // Muted — finished
    cancelled: '#EF4444', // Red — cancelled/error
  },
}
```

### Usage Rules

- `background.DEFAULT` — `<body>`, page wrappers
- `background.surface` — all cards, panels, sidebars
- `background.elevated` — modals, tooltips, command palettes
- `primary.DEFAULT` — primary buttons, active nav items, selected states
- `accent.cyan` — live badges, real-time indicators, bracket progress lines
- `accent.gold/silver/bronze` — ranking positions 1/2/3 only
- Never use white (`#FFFFFF`) — use `text.primary` instead

---

## Typography

### Font Families

```ts
fontFamily: {
  display: ['Rajdhani', 'sans-serif'],   // All headings, tournament names, scores
  body: ['Inter', 'sans-serif'],          // Body text, labels, paragraphs
  mono: ['JetBrains Mono', 'monospace'], // Scores, timers, IDs
}
```

Load via `next/font/google` in `app/layout.tsx`:

```tsx
import { Rajdhani, Inter, JetBrains_Mono } from 'next/font/google'

const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['400', '600', '700'] })
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600'] })
```

### Type Scale

| Token | Size | Weight | Font | Usage |
|---|---|---|---|---|
| `text-hero` | 56px / 3.5rem | 700 | Rajdhani | Hero headings |
| `text-h1` | 40px / 2.5rem | 700 | Rajdhani | Page titles |
| `text-h2` | 28px / 1.75rem | 600 | Rajdhani | Section headings |
| `text-h3` | 20px / 1.25rem | 600 | Rajdhani | Card titles, panel headers |
| `text-body-lg` | 16px / 1rem | 400 | Inter | Primary body text |
| `text-body` | 14px / 0.875rem | 400 | Inter | Default body, labels |
| `text-caption` | 12px / 0.75rem | 400 | Inter | Meta, timestamps, helper text |
| `text-score` | 24px / 1.5rem | 600 | JetBrains Mono | Match scores |
| `text-timer` | 18px / 1.125rem | 400 | JetBrains Mono | Countdown timers |

### Letter Spacing

- Display/heading text: `tracking-wide` (0.025em) to `tracking-wider` (0.05em)
- Body text: default (0)
- All-caps labels: `tracking-widest` (0.1em)

---

## Spacing & Layout

### Base Unit

Spacing follows an 8px base grid. All spacing values are multiples of 4px (half-unit) or 8px.

### Page Layout

```
Max content width: 1280px (7xl)
Horizontal page padding: px-6 (mobile) → px-10 (tablet) → px-16 (desktop)
Section vertical spacing: py-16 (desktop) → py-10 (mobile)
```

### Grid Systems

**Tournament Cards Grid**
```css
grid-cols-1 (mobile) → grid-cols-2 (md) → grid-cols-3 (lg) → grid-cols-4 (xl)
gap-6
```

**Dashboard Layout**
```
Sidebar: 240px fixed width (hidden on mobile)
Content: flex-1 with min-w-0
Sidebar + content gap: gap-8
```

**Bracket Layout**
```
Horizontal scroll container
Round column width: 220px
Vertical spacing between matches: dynamic based on round depth
Connector lines: 1px, border.accent color
```

---

## Component Library

### Button

```tsx
// Variants
<Button variant="primary">Join Tournament</Button>   // Violet fill, white text
<Button variant="secondary">View Details</Button>    // Surface bg, border, primary text
<Button variant="ghost">Cancel</Button>              // No border, text only
<Button variant="danger">Disband Team</Button>       // Red fill

// Sizes
<Button size="sm" />   // h-8, px-3, text-sm
<Button size="md" />   // h-10, px-4, text-sm  (default)
<Button size="lg" />   // h-12, px-6, text-base
```

**Primary Button Styles:**
```css
bg-primary hover:bg-primary-hover
text-white font-semibold
rounded-md
transition-all duration-150
shadow-[0_0_12px_rgba(124,58,237,0.4)] hover:shadow-[0_0_20px_rgba(124,58,237,0.6)]
```

### Badge / Status Pill

```tsx
<Badge variant="live">LIVE</Badge>       // Green bg, pulsing dot
<Badge variant="upcoming">Soon</Badge>   // Cyan border, cyan text
<Badge variant="completed">Done</Badge> // Muted
<Badge variant="gold">Champion</Badge>  // Gold
```

Live badge includes a CSS pulse animation on the indicator dot.

### Card

Base card used for tournaments, teams, matches:

```css
bg-background-surface
border border-border
rounded-xl
p-5
transition-all duration-200
hover:border-border-accent hover:shadow-[0_0_16px_rgba(124,58,237,0.15)]
```

### Tournament Card

Contains:
- Game banner image (aspect-video, object-cover, with dark gradient overlay)
- Status badge (top-right, absolute positioned)
- Tournament name (Rajdhani, h3)
- Game title + format (body-sm, text-secondary)
- Prize pool (accent gold, mono font)
- Slot progress bar (teams registered / max)
- Entry fee chip
- CTA button

### Match Card (Bracket)

```
┌─────────────────────────────┐
│  [TEAM A LOGO] Team Alpha   │  ← highlighted if winner
│  [TEAM B LOGO] Team Beta    │
│              Score: 2 - 1   │  ← mono font
└─────────────────────────────┘
```

- Winner row: `bg-background-elevated`, `text-text-primary`, thin left border in primary color
- Loser row: `text-text-muted`
- Score: `font-mono text-score`

### Leaderboard Row

```
Rank  Avatar  Name          Team        W   L   Win%   Points
 1     [img]  PlayerName    TeamName   42   8   84%    4,200  ← Gold rank
 2     [img]  PlayerName    TeamName   38  12   76%    3,800  ← Silver
```

- Rank 1-3 use `accent.gold`, `accent.silver`, `accent.bronze` with trophy icon
- Rank 4+ use `text-text-secondary` with plain number
- Row hover: `bg-background-elevated`
- Points in `font-mono`

### Navbar

```
[NEXARENA logo] | Tournaments | Leaderboard | Teams        [Notifications] [Avatar ▾]
```

- `bg-background/80` with `backdrop-blur-md`
- `border-b border-border`
- `sticky top-0 z-50`
- Active nav link: `text-primary` with `border-b-2 border-primary`

### Avatar

- Rounded full
- Sizes: `size-6` (xs), `size-8` (sm), `size-10` (md), `size-14` (lg)
- Default fallback: user initial on `bg-primary/20` background
- Online indicator: 10px green dot, `border-2 border-background`

### Input / Form Fields

```css
bg-background-elevated
border border-border focus:border-primary
rounded-md
text-text-primary placeholder:text-text-muted
h-10 px-3
outline-none ring-0
focus:shadow-[0_0_0_2px_rgba(124,58,237,0.3)]
transition-shadow duration-150
```

### Progress Bar (Slot Fill)

```css
/* Track */
bg-border rounded-full h-1.5

/* Fill */
bg-primary rounded-full
transition-all duration-500
```

---

## Page Layouts

### Landing Page (`/`)

1. **Hero** — Full-width, dark background with subtle grid pattern. Large `text-hero` headline, subtext, two CTAs (primary: "Browse Tournaments", secondary: "Create Tournament"). Background includes abstract neon glow element (violet + cyan radial gradients).
2. **Featured Tournaments** — Horizontal scroll row or 4-col grid, tournament cards.
3. **How It Works** — 3-step horizontal layout with icon, number, and description.
4. **Stats Bar** — Full-width dark strip: total tournaments, active players, prize pools distributed.
5. **Game Titles** — Icon grid of supported games (Valorant, CS2, LoL, etc.)
6. **CTA Banner** — Dark violet gradient, call to action for organizers.
7. **Footer**

### Tournaments Listing (`/tournaments`)

- Filter bar: game title, format, status (live/upcoming/completed), prize range
- Grid of `TournamentCard` components
- Sticky filter sidebar on desktop

### Tournament Detail (`/tournaments/[id]`)

- Cover banner (full-width, game art)
- Tournament info header: name, status badge, dates, organizer
- Tabs: **Overview** | **Bracket** | **Participants** | **Rules**
- Overview: prize pool breakdown, registration details, schedule
- Bracket: `BracketViewer` component with round-by-round columns
- Participants: team roster list with seed numbers
- Rules: formatted markdown content

### Profile (`/profile`)

- Top: avatar, username, rank, total earnings, win rate
- Stats cards: Matches Played, Wins, Tournaments, Best Placement
- Match History table
- Active Teams section
- Achievement badges row

### Leaderboard (`/leaderboard`)

- Game filter tabs (Global / per game)
- Top 3 podium visual (large cards, gold/silver/bronze treatment)
- Full `LeaderboardTable` below
- Pagination or infinite scroll

---

## Motion & Animation

### Principles

- All transitions: `duration-150` to `duration-200` for interactive elements
- Page transitions: fade + slight upward slide (`opacity-0 translate-y-2` → `opacity-100 translate-y-0`)
- Heavy animation only for the live bracket (match result reveal)

### Keyframe Definitions

```css
@keyframes pulse-live {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@keyframes glow-in {
  from { box-shadow: 0 0 0px rgba(124, 58, 237, 0); }
  to   { box-shadow: 0 0 20px rgba(124, 58, 237, 0.5); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Live Indicator

```tsx
<span className="relative flex h-2.5 w-2.5">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-live opacity-75" />
  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-status-live" />
</span>
```

---

## Iconography

Use [Lucide React](https://lucide.dev) as the primary icon library:

```bash
npm install lucide-react
```

Standard sizes: `size={16}` (inline), `size={20}` (buttons/nav), `size={24}` (feature icons)

All icons use `currentColor` and inherit text color from parent.

Common icons used:
- `Trophy` — tournaments, achievements
- `Users` — teams, participants
- `Swords` — matches (custom or from lucide)
- `ChevronRight` — bracket connectors, navigation
- `Clock` — countdowns, scheduling
- `Shield` — team protection, verified organizer
- `Star` — featured, favorites
- `Zap` — live, fast actions

---

## Responsive Breakpoints

Following Tailwind's default breakpoints:

| Breakpoint | Width | Layout changes |
|---|---|---|
| `sm` | 640px | 2-col grid for cards |
| `md` | 768px | Sidebar appears, filter row |
| `lg` | 1024px | 3-col tournament grid, full bracket |
| `xl` | 1280px | 4-col grid, expanded stats |

Mobile-first approach: all base styles target mobile, breakpoints add desktop enhancements.

The bracket viewer uses horizontal scroll on mobile — do not collapse rounds vertically.

---

## Tailwind Configuration

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0F',
          surface: '#12121A',
          elevated: '#1A1A26',
        },
        border: {
          DEFAULT: '#2A2A3D',
          accent: '#4A4A6A',
        },
        primary: {
          DEFAULT: '#7C3AED',
          hover: '#6D28D9',
          light: '#A78BFA',
        },
        accent: {
          cyan: '#06B6D4',
          gold: '#F59E0B',
          silver: '#9CA3AF',
          bronze: '#B45309',
        },
        text: {
          primary: '#F1F0FF',
          secondary: '#9B99B8',
          muted: '#5C5A78',
        },
        status: {
          live: '#10B981',
          upcoming: '#06B6D4',
          completed: '#5C5A78',
          cancelled: '#EF4444',
        },
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(124, 58, 237, 0.4)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-gold': '0 0 16px rgba(245, 158, 11, 0.3)',
      },
      animation: {
        'pulse-live': 'pulse-live 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.2s ease-out',
        'glow-in': 'glow-in 0.3s ease-out forwards',
      },
      keyframes: {
        'pulse-live': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-in': {
          from: { boxShadow: '0 0 0px rgba(124, 58, 237, 0)' },
          to: { boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

---

## Figma References

| Page / Frame | Description |
|---|---|
| `Landing` | Hero, features, CTA sections |
| `Tournaments` | Listing page, filter sidebar, card variants |
| `Tournament Detail` | Detail header, tabs, bracket viewer |
| `Leaderboard` | Podium, full table, game filters |
| `Profile` | Player profile, stats, history |
| `Create Tournament` | Multi-step form flow |
| `Components` | All reusable components with variants |
| `Design Tokens` | Colors, typography, spacing reference |

> **Note:** When in doubt, defer to Figma as the source of truth for pixel values. This document captures intent and system rules; exact measurements live in the design file.
