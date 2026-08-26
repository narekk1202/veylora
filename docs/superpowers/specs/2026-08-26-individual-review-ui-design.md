# Individual Review UI Design

**Date:** 2026-08-26  
**Status:** Approved for planning  
**Scope:** UI only — no server actions, schema changes, or persistence

## Goal

Ship a scrollable individual review page that matches the provided reflection mockups, so a user can open a pending review from the reviews list and fill out the reflection form with local client state.

## Route

- Path: `/reviews/[id]`
- File: `app/(protected)/reviews/[id]/page.tsx`
- Resolves the review from mock data by `id`; unknown ids use `notFound()`
- Wire `ReviewCard` links from `/decisions/[id]` to `/reviews/[id]`

## Data (mock only)

Extend reviews mock types/data so a pending review includes everything the summary card needs:

- Existing: `id`, `question`, `category`, `lockedAt`, `reviewDate`, `confidence`, `urgency`
- Add: `predictions` (original prediction text)

No Prisma queries or mutations in this pass.

## Layout & components

Feature folder: `features/reviews/ui/individual/` (or flat siblings under `features/reviews/ui/` if that matches existing style better — prefer small focused files).

### Structure (approach 1)

1. **`IndividualReviewView`** (client) — owns form local state; composes children
2. **`IndividualReviewHeader`** — serif title “Time to revisit this decision.” + muted supporting copy
3. **`OriginalDecisionSummary`** — card with:
   - Category badge + “Locked {date}”
   - Question
   - “ORIGINAL PREDICTION” label + italic blockquote
   - Right rail: large confidence %, “ORIGINAL CONFIDENCE”, progress bar
4. **`ReviewFormSection`** — numbered circle (`01`–`05`) + heading + children
5. **`AccuracyPicker`** — four equal tiles (single-select)
6. **`IndividualReviewFooter`** — disclaimer + “Complete review” button (no-op)

Reuse existing shared UI where it fits (`Textarea`, `Button`, `Card`, category colors from `CATEGORY_CONFIG`). Match typography patterns already in the app (`font-serif` for titles, muted uppercase micro-labels).

### Form fields (local state)

| # | Prompt | Control | Placeholder |
|---|--------|---------|-------------|
| 01 | What actually happened? | textarea | Describe the outcome as objectively as possible... |
| 02 | How accurate was your prediction? | 4 tiles | Completely wrong / Partially accurate / Mostly accurate / Completely accurate |
| 03 | What surprised you? | textarea | Details you didn't anticipate, both positive and negative... |
| 04 | What did you learn? | textarea | Knowledge gained about the world, others, or yourself... |
| 05 | What would you do differently? | textarea | If you were in the same situation again, how would your process change? |

Accuracy UI uses four labels from the mockup. Keep them as a local UI union for now; map to `PredictionAccuracy` later when persistence lands. Do not change the Prisma enum in this pass.

Complete button: present and clickable; no submit, toast, or navigation required.

## Visual direction

Follow the mockups within the existing dark theme tokens:

- Page uses `page_view` / existing protected layout
- Summary card and inputs: elevated surface vs page background, soft radius
- Prediction quote: left accent border + italic
- Number badges: circular outline with zero-padded step index
- Primary CTA: light/lavender-tinted button with dark text (use nearest existing primary/secondary tokens rather than inventing a one-off palette unless tokens already support it)
- Responsive: confidence rail stacks under prediction content on small screens; accuracy tiles wrap or stack as needed

## Out of scope

- Server actions / API / Prisma writes
- Schema changes for surprise/learn/differently fields
- Validation beyond optional empty-state styling
- Completed-review read-only view
- Notifications / insights side effects

## Success criteria

- Visiting `/reviews/rev-due-1` (or mock id) shows the full mockup structure
- List “Start review” / card click opens that route
- User can type in textareas and select one accuracy tile
- Complete button does not persist or error
- Unknown id → 404
