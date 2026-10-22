# Built by Akshat Gupta · About the Builder

A lightweight, single-page **"About the Builder"** website for **Akshat Gupta**.

This site is linked from the footer, settings, or about modal of software engineered by Akshat (`"Built by Akshat Gupta ↗"`). Its visitors are end-users, clients, collaborators, and curious engineers—**not recruiters**.

It establishes credibility in ~30 seconds:
- **Who built this**: Full-stack developer & CS undergrad at BMS College of Engineering, Bengaluru.
- **Where they have worked**: Full-stack developer intern at **Orange Taxi** (real-time dispatch engine on Supabase Realtime, UPI dynamic QR payments, PWA).
- **What else they have engineered**: Autonomous Search and Rescue Robot, Animal Detection on Locomotive Tracks.
- **Where to reach out**: Direct email, GitHub, and LinkedIn.

Styled in a calm, confident indie-zine aesthetic: cream (`#FFF6E5`) and ink (`#1A1A1A`) palette, 2px borders, hard offset shadows, custom doodle illustrations (Taxi, Robot, Train, Wheelchair), and zero job-hunting clutter (no "hire me", no resume download, no buzzwords).

---

## 🚀 Quickstart

### 1. Prerequisites
- Node.js 18.17+ or 20+
- npm (or pnpm / yarn)

### 2. Installation
```bash
cd Built-by-Akshat
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configured variables:
| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production URL for SEO, OG images, and sitemap | `https://builtby.akshatgupta.dev` |
| `NEXT_PUBLIC_PORTFOLIO_URL` | URL to your primary portfolio case studies | `https://akshatgupta.dev` |

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Linting
```bash
npm run lint
npm run build
```

---

## ✏️ Updating Profile Content

All content is centralized in a single typed file: [`data/profile.ts`](file:///Users/akshatgupta/Desktop/Akshat/Built-by-Akshat/data/profile.ts).

You can edit your:
- Tagline & intro statement
- Experience timeline entry & tech stack
- Things I've Built cards & links
- Skills matrix (grouped text list)
- Education & Recognition honors
- Contact email & social URLs

---

## 📋 Copy-Paste Footer Snippets for Your Other Software

Place either of these snippets into the footer or about dialog of software you ship:

### Option A: HTML / Inline CSS (Framework Agnostic)
Found in [`snippets/BuiltByBadge.html`](file:///Users/akshatgupta/Desktop/Akshat/Built-by-Akshat/snippets/BuiltByBadge.html):
```html
<a
  href="https://builtby.akshatgupta.dev"
  target="_blank"
  rel="noopener"
  style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;font-family:ui-monospace,monospace;font-size:12px;font-weight:600;color:#1a1a1a;background-color:#fff6e5;border:2px solid #1a1a1a;border-radius:9999px;box-shadow:2px 2px 0px #1a1a1a;text-decoration:none;"
>
  <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background-color:#ff4336;"></span>
  <span>Built by Akshat Gupta</span>
  <span aria-hidden="true" style="font-size:11px;">↗</span>
</a>
```

### Option B: React + Tailwind CSS
Found in [`snippets/BuiltByBadge.tsx`](file:///Users/akshatgupta/Desktop/Akshat/Built-by-Akshat/snippets/BuiltByBadge.tsx):
```tsx
import { BuiltByBadge } from "@/components/BuiltByBadge";

export function Footer() {
  return (
    <footer>
      <BuiltByBadge />
    </footer>
  );
}
```

---

## 📝 List of Placeholders to Fill In

Search for `[PLACEHOLDER]` or review these items in [`data/profile.ts`](file:///Users/akshatgupta/Desktop/Akshat/Built-by-Akshat/data/profile.ts) when ready:

1. **`experience[0].period`**:
   - Current: `"Sep 2026 - [Dec 2026 / Present]"`
   - Action: Update `[Dec 2026 / Present]` with your actual end date or `"Present"`.
2. **`builtProjects[1].link`** (Autonomous Search and Rescue Robot):
   - Current: `"[RESCUE_ROBOT_REPO_URL]"`
   - Action: Replace with your GitHub repository link or project demo link.
3. **`builtProjects[2].link`** (Animal Detection in Locomotive Tracks):
   - Current: `"[ANIMAL_DETECTION_REPO_URL]"`
   - Action: Replace with your GitHub repository link or paper/demo link.
4. **`portfolioUrl`**:
   - Current: `"[PORTFOLIO_URL]"` (or set `NEXT_PUBLIC_PORTFOLIO_URL` in `.env.local`)
   - Action: Replace with your live portfolio URL (e.g., `https://akshatgupta.dev`).

---

## 🚢 Deploying to Vercel

1. Push this folder to a GitHub repository (e.g. `github.com/akshat0709/built-by-akshat`).
2. Import the project in your [Vercel Dashboard](https://vercel.com).
3. Framework Preset: **Next.js**.
4. Configure Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`: `https://builtby.yourdomain.com`
   - `NEXT_PUBLIC_PORTFOLIO_URL`: `https://yourdomain.com`
5. Click **Deploy**.
