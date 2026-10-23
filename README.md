# Built by Akshat Gupta · About the Builder

A lightweight, single-page **"About the Builder"** website for **Akshat Gupta**, linked directly from the footers or about dialogs of software built by Akshat via `?ref=<slug>`.

Visitors are users, clients, collaborators, and curious engineers—**not recruiters**.

It establishes credibility in ~30 seconds:
- **Who built this**: Full-stack developer & CS undergrad (IoT, Cybersecurity & Blockchain) at BMS College of Engineering, Bengaluru.
- **Where they have worked**: Full-stack developer intern at **Orange Taxi** (real-time dispatch engine on Supabase Realtime, UPI dynamic QR payments, PWA).
- **What else they have engineered**: Autonomous Search and Rescue Robot, Animal Detection on Locomotive Tracks.
- **Where to reach out**: Direct email, GitHub, LinkedIn, and prefilled issue feedback.

Styled in a calm, confident indie-zine aesthetic: cream (`#FFF6E5`) and ink (`#1A1A1A`) palette, 2px borders, hard offset shadows, custom doodle illustrations (Taxi, Robot, Train, Wheelchair), and zero job-hunting clutter (no "hire me", no resume download, no buzzwords).

---

## 🚀 Quickstart

### 1. Prerequisites
- Node.js 18.17+ or 20+
- npm (or pnpm / yarn)

### 2. Installation
```bash
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

Test with product refs:
- [http://localhost:3000/?ref=orange-taxi](http://localhost:3000/?ref=orange-taxi)
- [http://localhost:3000/?ref=autonomous-rescue-robot](http://localhost:3000/?ref=autonomous-rescue-robot)
- [http://localhost:3000/?ref=animal-detection](http://localhost:3000/?ref=animal-detection)

### 5. Production Build & Linting
```bash
npm run lint
npm run build
```

---

## 📦 How to Add a Product to the Registry

All software and hardware systems are defined in [`data/products.ts`](file:///Users/akshatgupta/Desktop/Akshat/Built-by-Akshat/data/products.ts).

To register a new product:
1. Open [`data/products.ts`](file:///Users/akshatgupta/Desktop/Akshat/Built-by-Akshat/data/products.ts).
2. Add an entry conforming to the `Product` type:

```typescript
"my-app": {
  slug: "my-app",
  name: "My App Name",
  oneLiner: "One-line punchy description of what it does.",
  status: "live", // "live" | "pre-launch" | "prototype"
  role: "Full-Stack Developer",
  stack: ["TypeScript", "Next.js", "PostgreSQL"],
  builtWith: [
    {
      tech: "Next.js & React",
      plainEnglish: "User-facing dashboard and responsive UI",
    },
    {
      tech: "PostgreSQL",
      plainEnglish: "Relational persistence and real-time triggers",
    },
  ],
  builderNote: "[PLACEHOLDER]", // Replace with a 1-sentence real engineering decision
  productUrl: "https://myapp.com", // Optional
  repoUrl: "https://github.com/akshat0709/myapp", // Optional
  feedbackSubject: "[My App Name] Feedback",
  ogTagline: "Clean, reliable software engineered by Akshat Gupta.",
},
```

When visitors land on `/?ref=my-app`:
- An **"About this product"** card appears under the hero with the status chip, plain-English tech breakdown, and direct link.
- Social sharing displays `"<Product> was built by Akshat Gupta."` with dynamic OG image and title.
- The footer CTA offers `"Found an issue in <Product>? Tell me"`.
- If the visitor hits an invalid route, the 404 page provides a `"Return to <Product>"` button.

---

## 🔗 How to Link From Your Apps

Add a footer link or "About" button in your software pointing to:
```
<SITE_URL>/?ref=<slug>
```
Example: `https://builtby.akshatgupta.dev/?ref=orange-taxi`

If no `?ref` is passed, the site displays the clean base builder profile. Unknown refs and invalid query characters are strictly sanitized and never rendered.

---

## 📱 How to Generate QR Codes

To generate offline / print QR codes pointing to `/?ref=qr-<slug>`:

```bash
npm run qr
```

This runs `scripts/qr.mjs` and creates high-contrast PNGs in `public/qr/<slug>.png`:
- `public/qr/orange-taxi.png`
- `public/qr/autonomous-rescue-robot.png`
- `public/qr/animal-detection.png`

The scanner URL is automatically mapped so `?ref=qr-orange-taxi` resolves to `orange-taxi`.

---

## 📋 Copy-Paste Footer Snippets for Your Other Software

### Option A: HTML / Inline CSS (Universal / Vanilla)
Found in [`snippets/BuiltByBadge.html`](file:///Users/akshatgupta/Desktop/Akshat/Built-by-Akshat/snippets/BuiltByBadge.html):
```html
<a
  href="https://builtby.akshatgupta.dev/?ref=orange-taxi"
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
      <BuiltByBadge refSlug="orange-taxi" />
    </footer>
  );
}
```

---

## 📝 List of Placeholders to Fill In

Search for `[PLACEHOLDER]` or review these items in [`data/products.ts`](file:///Users/akshatgupta/Desktop/Akshat/Built-by-Akshat/data/products.ts) and [`data/profile.ts`](file:///Users/akshatgupta/Desktop/Akshat/Built-by-Akshat/data/profile.ts):

1. **`orange-taxi` Builder Note** (`data/products.ts`):
   - Current: `"[PLACEHOLDER]"`
   - Action: Add a short first-person sentence about a real engineering decision (e.g., why Supabase Realtime was selected for the dispatch engine over custom WebSockets).
2. **`autonomous-rescue-robot` Builder Note** (`data/products.ts`):
   - Current: `"[PLACEHOLDER]"`
   - Action: Add a short first-person sentence about an engineering decision (e.g., choosing low-latency microcontrollers over a single board computer for sensor acquisition).
3. **`animal-detection` Builder Note** (`data/products.ts`):
   - Current: `"[PLACEHOLDER]"`
   - Action: Add a short first-person sentence about an engineering decision (e.g., optimizing edge YOLO inference latency for railway cameras).
4. **`experience[0].period`** (`data/profile.ts`):
   - Current: `"Sep 2026 - [Dec 2026 / Present]"`
   - Action: Replace `[Dec 2026 / Present]` with your exact date or `"Present"`.
5. **Portfolio Case Study URL** (`data/profile.ts`):
   - Current: `"[PORTFOLIO_URL]"`
   - Action: Set `NEXT_PUBLIC_PORTFOLIO_URL` in `.env.local` or update `portfolioUrl`.

---

## 🏷️ Embeddable "Built by" Badges

Dynamic SVG badges are generated on the fly via `/badge/<slug>` in the workshop style (ink border, cream fill, hard offset shadow, product status chip, and doodle icon):
- **Endpoint**: `/badge/<slug>?theme=light|dark&size=sm|md`
- **Cache**: Cached at the edge with `s-maxage=86400` (1 day).
- **Interactive Helper**: Visit `/embed` to configure badges and copy snippets.

### Markdown (for GitHub READMEs):
```markdown
[![Built by Akshat Gupta](https://builtby.akshatgupta.dev/badge/orange-taxi?theme=light&size=md)](https://builtby.akshatgupta.dev/built/orange-taxi?utm_source=orange-taxi)
```

### HTML (for App Footers & Landing Pages):
```html
<a href="https://builtby.akshatgupta.dev/built/orange-taxi?utm_source=orange-taxi" target="_blank" rel="noopener">
  <img src="https://builtby.akshatgupta.dev/badge/orange-taxi?theme=light&size=md" alt="Built by Akshat Gupta" />
</a>
```

### React / Tailwind:
```tsx
<a
  href="https://builtby.akshatgupta.dev/built/orange-taxi?utm_source=orange-taxi"
  target="_blank"
  rel="noopener"
  className="inline-block transition-transform hover:-translate-y-0.5"
>
  <img
    src="https://builtby.akshatgupta.dev/badge/orange-taxi?theme=light&size=md"
    alt="Built by Akshat Gupta"
  />
</a>
```

---

## 🚢 Deploying to Vercel

1. Push to GitHub: `https://github.com/akshat0709/builtbyakshat.git`.
2. Connect repo on [Vercel](https://vercel.com).
3. Configure Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`: `https://builtby.akshatgupta.dev` (or custom domain)
   - `NEXT_PUBLIC_PORTFOLIO_URL`: `https://akshatgupta.dev`
4. Deploy.
