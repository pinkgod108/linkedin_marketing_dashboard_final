# LinkedIn Marketing Dashboard

Version 1 of a simple dashboard for tracking my own LinkedIn post performance,
built as part of my "Summer of AI GTM" learning project.

It reads a CSV of LinkedIn post data, calculates engagement rate for each
post, and shows summary metrics, charts, a post-by-post breakdown, and
recommendations for what to post next.

## How it works, in plain English

- **The CSV file is the source of truth.** All post data lives in
  [`public/linkedin-posts.csv`](public/linkedin-posts.csv) in this GitHub
  repository.
- **The dashboard reads that file when it loads.** No database, no login,
  no LinkedIn API — just a spreadsheet the dashboard turns into charts and
  cards.
- **Engagement rate is calculated automatically** for each post using:
  `Engagement Rate = (Reactions + Comments + Shares) / Impressions × 100`
- **Topic is inferred from the post title**, since the CSV doesn't include a
  Topic column. Simple keyword matching (e.g. "GTM"/"Framework" → *AI GTM
  Strategy*, "Summer" → *Seasonal*) groups posts so the Topic Performance
  section has something meaningful to compare. Anything that doesn't match a
  known keyword is grouped as *General*.

## Updating your data weekly

1. Open `public/linkedin-posts.csv` in GitHub (or edit it locally).
2. Add, edit, or remove rows for your latest LinkedIn posts. Keep the same
   column headers: `Date, Time, Title, Impressions, Members Reached,
   Reactions, Comments, Shares, URL` (a few close variations in header
   naming are tolerated).
3. Commit the change to the branch this project deploys from.
4. Vercel automatically detects the change and redeploys.
5. Refresh the live dashboard URL — it now shows your updated data.

In plain English: **Update CSV in GitHub → Commit → Vercel redeploys →
Dashboard shows updated data.**

## The "Upload New CSV" button

The dashboard also has an **Upload New CSV** button near the top for trying
out a different set of posts.

- Clicking it and choosing a `.csv` file shows a confirmation message:
  *"This will delete and replace the current CSV data. Do you want to
  continue?"*
- Choosing **OK** swaps the dashboard's data for the uploaded file.
- Choosing **Cancel** leaves the current data untouched.

**Important limitation for Version 1:** this upload only replaces the data
for your current browser session. It does not change the CSV file stored in
GitHub. Refreshing the page, or opening the dashboard on another device,
goes back to the default `public/linkedin-posts.csv` from GitHub. Use
"Reset to default CSV" in the upload box to go back to it manually at any
time.

## Future Version: Replace GitHub CSV from Dashboard

Right now, uploading a CSV only updates what you see in your browser. A
future version could let the **Upload New CSV** button permanently replace
the file in GitHub instead. That would require:

- A GitHub **personal access token or app** with write access to this repo,
  used from a secure server-side API route (never exposed in the browser).
- An API route (e.g. `app/api/update-csv/route.ts`) that receives the
  uploaded file and commits it to `public/linkedin-posts.csv` using the
  GitHub API.
- Handling for commit conflicts, file validation, and who is allowed to
  trigger an update, since this would be a real write action against the
  repository rather than a session-only preview.

This is intentionally out of scope for Version 1 to keep things simple —
no login, no database, no write access required.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling, with a custom
  maroon / sienna / cream / mustard "summer" color palette
- [Recharts](https://recharts.org/) for the charts
- [PapaParse](https://www.papaparse.com/) for CSV parsing

Everything runs client-side in the browser — there is no backend server or
database.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploying to Vercel

1. Push this repository to GitHub (already done if you're reading this on
   GitHub).
2. In [Vercel](https://vercel.com/), choose **Add New Project** and import
   this repository.
3. Vercel auto-detects Next.js — no build configuration is needed.
4. Deploy. Every future push to the connected branch triggers a new
   deployment automatically.
