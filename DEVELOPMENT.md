# Development Guide — Souris Ray Portfolio

This file is for your personal reference and won't be published to the website.

---

## 🖥️ Running the Site Locally (Docker)

**Prerequisites:** Docker Desktop installed and running.

```bash
# Start the dev server (first run takes ~1 min to install packages)
docker-compose up --build

# Subsequent starts (faster — image already built)
docker-compose up

# Start in background
docker-compose up -d

# Stop
docker-compose down

# View logs (if running in background)
docker-compose logs -f
```

**Open your site:** `http://localhost:4321`

> **Hot reload is on** — any file you save inside the project instantly refreshes in the browser. You don't need to restart Docker for most changes.

---

## ✍️ Adding a New Script

### Step 1: Create the content file

**Location:** `src/content/scripts/your-script-name.md`

- Filename: lowercase, hyphens only (e.g., `rainy-night-study.md`)
- This is the **only** file you need to create for a new script

### Step 2: Fill in the front matter

```yaml
---
title: "Your Script Title"
description: "Brief engaging description (100-120 chars) shown on the script card"
total_word_count: 1500
spoken_word_count: 900
date: 2026-03-02
tags: [Comfort, Sleep, Rain, English, M4A]
type: soft
pdf: /assets/pdfs/SCRIPT_your-script-name.pdf
---

## Preview

Your script preview content here...

## Background

Scene description...
```

**Front matter fields:**

| Field | Required | Description | Example |
|---|---|---|---|
| `title` | ✅ | Script name | `"Rainy Night Study"` |
| `description` | ✅ | Card summary (≤120 chars) | `"A gentle late-night..."` |
| `total_word_count` | ✅ | All words including stage directions | `1500` |
| `spoken_word_count` | ✅ | Spoken dialogue only | `900` |
| `date` | ✅ | Publish date (YYYY-MM-DD) | `2026-03-02` |
| `tags` | ✅ | Array of filter keywords | `[Comfort, Rain, English]` |
| `type` | ✅ | Category for filtering | `soft` |
| `pdf` | ⚠️ Optional | Path to downloadable PDF | `/assets/pdfs/SCRIPT_name.pdf` |

**Common types:** `soft`, `comforting`, `ambience`, `roleplay`

### Step 3: Add the PDF (if you have one)

Save your PDF to: **`public/assets/pdfs/SCRIPT_your-script-name.pdf`**

Match the filename exactly to what you put in the `pdf:` field.

### Step 4: Preview locally

```bash
docker-compose up
```

Visit `http://localhost:4321/scripts` — your new card should appear automatically. Click it to view the full script page. Test any filters or the PDF download.

### Step 5: Commit & push

```bash
git add src/content/scripts/your-script-name.md
git add public/assets/pdfs/SCRIPT_your-script-name.pdf   # if you have a PDF
git commit -m "Add new script: Your Script Title"
git push origin main
```

GitHub Actions will automatically build and deploy the site. Wait ~1-2 minutes, then check `https://sourisray.github.io`.

---

## 📋 New Script Checklist

- [ ] File is in `src/content/scripts/`
- [ ] Filename is lowercase with hyphens
- [ ] All required front matter fields are filled in
- [ ] Date is `YYYY-MM-DD` format
- [ ] Tags are an array: `[Tag One, Tag Two]`
- [ ] PDF is in `public/assets/pdfs/` (if specified)
- [ ] PDF filename matches front matter path exactly
- [ ] Tested locally — script card appears on `/scripts`
- [ ] Tested locally — script detail page loads correctly
- [ ] PDF download works (if applicable)

---

## 🚫 What You DON'T Need to Touch

When adding a new script:

| File | Why |
|---|---|
| `src/pages/scripts/index.astro` | Auto-loads all files from content collection |
| `src/pages/scripts/[slug].astro` | Auto-generates a page for every script |
| `src/components/ScriptCard.astro` | Reusable — works for all scripts |
| `src/components/FilterBar.astro` | JS auto-detects new tags/types |
| `public/assets/js/filter.js` | Reads from DOM, needs no changes |
| Navigation / footer | Auto-generated from `BaseLayout.astro` |

---

## 📂 File Structure Reference

```
sourisray.github.io/
│
├── src/
│   ├── content/
│   │   └── scripts/              ← ADD NEW SCRIPTS HERE (.md files)
│   │
│   ├── pages/
│   │   ├── index.astro           ← Home page / hero
│   │   ├── about.astro           ← Edit your bio here
│   │   ├── bilibili-tools.astro  ← Edit tools page here
│   │   ├── guidelines.astro      ← Edit usage terms here
│   │   └── scripts/
│   │       ├── index.astro       ← Scripts listing (don't edit)
│   │       └── [slug].astro      ← Script detail (don't edit)
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro      ← Header, footer, <head> — edit rarely
│   │   └── ScriptLayout.astro    ← Script page sidebar — edit rarely
│   │
│   ├── components/
│   │   ├── ScriptCard.astro      ← Card design — edit rarely
│   │   └── FilterBar.astro       ← Filter UI — edit rarely
│   │
│   └── styles/
│       └── global.css            ← All colors, fonts, component styles
│
├── public/
│   └── assets/
│       ├── images/               ← profile.jpg, favicon, etc.
│       ├── pdfs/                 ← ADD PDFs HERE
│       └── js/
│           ├── filter.js         ← Filtering logic (don't edit)
│           └── motion.js         ← Scroll animations (don't edit)
│
├── Dockerfile                    ← Docker build config
├── docker-compose.yml            ← Dev server config (port 4321)
├── astro.config.mjs              ← Astro settings
├── tailwind.config.cjs           ← Design tokens as Tailwind theme
└── .github/workflows/deploy.yml  ← Auto-deploy to GitHub Pages
```

---

## 🎨 Customization Reference

### Change site title, tagline, or Discord URL

**Edit `src/layouts/BaseLayout.astro`** (top of the file, in the `---` frontmatter block):

```js
const siteTitle = 'Souris Ray';
const tagline   = 'The words are written...';
const discordUrl = 'https://discord.gg/your-server-here';
```

### Change colors or fonts

**Edit `src/styles/global.css`** (the `:root { ... }` block at the top):

```css
:root {
  --color-bg-primary: #1a2328;      /* Main background */
  --color-gold-antique: #3a5e52;    /* Primary accent (green) */
  --color-burgundy: #9f3632;        /* Secondary accent (red) */
  --color-text-primary: #f0ebe1;    /* Main text color */
  /* ... */
}
```

### Update the About page

**Edit `src/pages/about.astro`** — directly edit the HTML content inside the file. No special syntax needed.

### Update the Guidelines page

**Edit `src/pages/guidelines.astro`** — FAQ items are `<div class="faq-item">` blocks. Add or remove them as needed.

### Update the Bilibili Tools page

**Edit `src/pages/bilibili-tools.astro`**

---

## 🐛 Common Issues & Solutions

| Problem | Fix |
|---|---|
| Site not loading at `localhost:4321` | Is Docker Desktop running? |
| Changes not refreshing | Hard refresh: `Ctrl+Shift+R`. If still stuck: `docker-compose restart` |
| New script card not appearing | Check: file is in `src/content/scripts/`? Has correct front matter with `---`? |
| PDF link not working | Check: file is in `public/assets/pdfs/`? Filename matches front matter exactly? |
| Port 4321 already in use | Change `"4321:4321"` to `"4322:4321"` in `docker-compose.yml`, then visit `localhost:4322` |
| Deploy not updating live site | Go to **GitHub → Settings → Pages** and make sure source is set to **"GitHub Actions"** |

---

## 💡 Pro Tips

### Test on your phone

When Docker is running, find your computer's IP (`ipconfig` on Windows) and visit `http://YOUR-IP:4321` on any device on the same WiFi.

### Batch add multiple scripts

```bash
git add src/content/scripts/*.md
git add public/assets/pdfs/*.pdf
git commit -m "Add 3 new scripts: Title A, Title B, Title C"
git push origin main
```

### Script template to copy

Keep a file `src/content/scripts/_TEMPLATE.md` (the `_` prefix makes Astro ignore it as a content entry):

```yaml
---
title: ""
description: ""
total_word_count:
spoken_word_count:
date: 2026-03-02
tags: []
type:
pdf: /assets/pdfs/SCRIPT_.pdf
---

## Preview

## Background

## The Speaker

## The Listener
```

---

## 🚀 Deployment

Deployment is **fully automatic** when you push to `main`. The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles everything:

1. Installs Node + dependencies
2. Runs `astro build` → outputs to `dist/`
3. Deploys `dist/` to GitHub Pages

**One-time GitHub setup required:** Go to **Settings → Pages → Source → GitHub Actions**.

---

**Last Updated:** 2026-03-02  
**Your Site:** https://sourisray.github.io  
**Framework:** Astro v4 + Tailwind CSS v3  
**Dev Server:** `http://localhost:4321`
