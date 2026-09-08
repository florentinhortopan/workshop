# IDA Product Strategy Workshop

A password-gated, Vercel-ready workspace for running the 60-minute IDA product
strategy session. Built from the workshop kit (detailed agenda, Google Docs
decision template, and setup guide), with dates rebased from 8 Sep 2026.

## Views

- **Board** — the interactive tracker: an editable participant roster
  (add/remove people with role + name), all six segments stacked vertically
  with editable fields mirroring the decision document (stickies + themes,
  AI map by role, MVP tiers with agreement checkmarks, month-by-month
  timeline with blockers, agreements + owner sign-offs, 30-day sprint +
  success metrics — the owner, sign-off, and sprint tables all support
  adding and removing rows), a "Mark complete" toggle per segment feeding the
  progress bar, a per-segment timer with the 3-minute soft alert, workshop
  outcomes, parking lot, and the post-workshop checklist.
- **Guide** — facilitator script per segment, session roles, who-fills-in
  table, facilitation tips (keep time, manage conversation, get decisions,
  handle disagreement, surface blockers), prep checklists, what to bring,
  works/kills lists, and the after-workshop cadence (weekly standups,
  30-day review, escalation rule).
- **Export** — the 24-hour summary email assembled live from the board
  (copy / download), plus the board record: download the full board as a
  `.json` file, restore from a file, and browse automatic snapshots.

Everything autosaves to `localStorage` on every keystroke (see the "Saved"
indicator in the header). Snapshots are taken about once a minute while
editing and always before a reset or restore, so the record is recoverable.
Notes are per browser — put one machine on the projector as the canonical
board, and download the board file after the session to keep the record
outside the browser.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. In development the password defaults to `ida`
unless `WORKSHOP_PASSWORD` is set.

## Deploy (Vercel)

1. Import this repo into Vercel.
2. Set `WORKSHOP_PASSWORD` in Project Settings → Environment Variables.
3. Deploy. The app is `noindex` and robots-disallowed — share the URL and
   password with the team only.
