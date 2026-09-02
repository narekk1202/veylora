# Veylora

A private decision journal. Capture your reasoning, lock it before the outcome, then review with honesty.

Live at [veylora.space](https://veylora.space).

Most journals let you rewrite the past. Veylora does the opposite: once a decision is locked, the original thinking cannot be edited. When the review date arrives, you compare prediction to reality — and over time, patterns in how you decide become visible.

## How it works

1. **Capture before you decide.** Record the question, options, reasoning, assumptions, and what you expect to happen.
2. **Lock your record.** The original thinking is frozen so hindsight cannot rewrite it.
3. **Review with honesty.** On the review date, score the prediction, note surprises, and extract lessons.

Insights unlock after your first completed review: prediction accuracy, confidence calibration, category patterns, and whether your timelines tend to run early or late.

## The product

- **Guided capture** — a six-step flow: situation, options, reasoning, prediction, summary, then lock
- **Immutable decisions** — locked records stay as written; later thoughts go in post-hoc notes
- **Scheduled reviews** — due, upcoming, and completed queues with email reminders
- **Insights** — accuracy vs. confidence, category breakdowns, and timeline calibration
- **Overview** — recent decisions, upcoming reviews, and a running accuracy trend
- **Categories** — Career, Personal, Finance, Relationships
- **Accounts** — email and password, with verification and password reset

Decisions, reviews, and insights live behind auth. The landing page and sign-in routes are public.

## Stack

| Layer | Choice |
| --- | --- |
| App | [Next.js](https://nextjs.org) 16 (App Router) and React 19 |
| Language | TypeScript |
| Database | PostgreSQL via [Prisma](https://www.prisma.io) 7 |
| Auth | [Better Auth](https://www.better-auth.com) |
| Email | SuperSendTx |
| UI | Tailwind CSS 4, [shadcn/ui](https://ui.shadcn.com), Recharts |
| Validation | Zod and React Hook Form |

Package manager is **pnpm**.

## Project layout

```
app/                 Routes, layouts, metadata, and API handlers
features/            Domain modules (auth, decisions, reviews, insights, overview)
shared/              UI, auth, Prisma, env, and helpers
proxy.ts             Session and onboarding gate
```

Each feature owns its queries, actions, schemas, and UI. `app/` stays thin: pages compose feature views.

## Setup

You need **Node.js 20+**, **pnpm**, and a **PostgreSQL** database.

```bash
git clone https://github.com/narekk1202/veylora.git
cd veylora
pnpm install
cp example.env .env
```

Fill in `.env`, then:

```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose |
| --- | --- |
| `BETTER_AUTH_SECRET` | Auth signing secret |
| `BETTER_AUTH_URL` | Public app URL (e.g. `http://localhost:3000`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `SUPERSENDTX_API_KEY` | Transactional email |
| `FROM_EMAIL` | Sender address |
| `CRON_SECRET` | Bearer token for the review-reminder job (min 16 characters) |

Env is validated at boot with `@t3-oss/env-nextjs`. Missing or invalid values fail fast.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm prisma:generate` | Generate the Prisma client |
| `pnpm prisma:migrate` | Run migrations (`prisma migrate dev`) |

## Review reminders

`GET` or `POST` `/api/cron/review-reminders` with:

```
Authorization: Bearer <CRON_SECRET>
```

The job finds reviews whose decision date has arrived, sends a due-review email once, and records `dueNotifiedAt`. Point a scheduler (cron, GitHub Actions, or your host's cron) at that route on a daily cadence.
