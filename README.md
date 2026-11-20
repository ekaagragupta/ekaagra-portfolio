# Ekaagra Gupta — Hyper-Modern Obsidian Developer Portfolio

An ultra-minimalist, obsidian-black, high-performance portfolio for **Ekaagra Gupta** (goes by Edu), an AI/ML researcher and engineer specializing in runtime safety governors for tool-using LLMs, Evidential Deep Learning (EDL), and uncertainty-calibrated hybrid RAG systems.

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [GSAP](https://gsap.com/) + ScrollTrigger + `@gsap/react`
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) synchronized with GSAP's ticker (`lagSmoothing(0)`)
- **Typography**: [Geist & Geist Mono](https://vercel.com/font) via `next/font`
- **Media**: `next/image` with lazy loading, obsidian inner shadows, and parallax
- **Accessibility & Motion**: Full `prefers-reduced-motion` compliance

---

## 🎨 Design System

- **Background**: `#0a0a0a` (Obsidian Black)
- **Surfaces**: `#121212` (Card surface) / `#161616` (Elevated)
- **Hairline Borders**: `rgba(255, 255, 255, 0.08)`
- **Accent**: Electric Neon Cyan (`#22d3ee`) used sparingly for active states, timeline nodes, and subtle ambient glows
- **Grid & Grain**: Subtle radial ambient light gradients and hairline grid overlay

---

## 📂 Project Structure

```
ekaagra-portfolio/
├── public/
│   ├── favicon.svg
│   └── media/                   # Media repository for all photos, GIFs, and PDFs
│       ├── README.md            # Registry of all expected media filenames
│       ├── profile-hero.jpg     # Dedicated Hero profile photo slot
│       ├── profile-about.jpg    # Dedicated About profile photo slot
│       ├── exp-mnit-1.jpg       # MNIT Jaipur internship certificate / benchmark
│       ├── exp-coregen-1.jpg    # CoreGen satellite super-resolution artifact
│       ├── proj-care-rag.gif    # CARE RAG Evaluator Platt scaling demonstration
│       ├── proj-conformal.gif   # Evidential Conformal Anticipation video run
│       ├── proj-iris-agent.gif  # IRIS Agent safety governor tool inverse registry
│       └── resume.pdf           # Curriculum Vitae
├── src/
│   ├── app/
│   │   ├── globals.css          # Design system variables & custom scrollbars
│   │   ├── layout.tsx           # Geist typography, SmoothScroll & CustomCursor
│   │   └── page.tsx             # Root assembly of portfolio sections
│   ├── components/
│   │   ├── Nav.tsx              # Smart auto-hiding navbar with active section indicators
│   │   ├── Hero.tsx             # SplitText reveal, magnetic links, profile slot
│   │   ├── About.tsx            # Word-by-word scrubbed narrative, animated stats
│   │   ├── Experience.tsx       # Sticky timeline with progress line & media gallery
│   │   ├── Projects.tsx         # Pinned horizontal gallery on desktop, stacked on mobile
│   │   ├── Research.tsx         # Patents, peer review, leadership & certifications
│   │   ├── Contact.tsx          # "Let's build something." headline & click-to-copy email
│   │   ├── MediaSlot.tsx        # Reusable media frame with elegant placeholder fallback
│   │   ├── MagneticButton.tsx   # QuickTo spring-back magnetic interaction
│   │   ├── SplitText.tsx        # Staggered overflow-masked word reveal
│   │   ├── SmoothScroll.tsx     # Lenis smooth scroll synced with ScrollTrigger
│   │   ├── Cursor.tsx           # Obsidian precision cursor & follower ring
│   │   ├── Preloader.tsx        # Name counter 000-100% intro transition
│   │   └── Icons.tsx            # Clean SVG icons
│   ├── data/
│   │   └── content.ts           # Centralized single source of truth for all content
│   ├── hooks/
│   │   └── useGSAPRegister.ts   # Client-only GSAP & ScrollTrigger registration
│   └── lib/
│       └── utils.ts             # Tailwind class merge helper
└── README.md
```

---

## 🛠️ How to Edit Content

ALL content (biography, numbers, links, experiences, projects, patents, leadership) is strictly organized in:
👉 [`src/data/content.ts`](file:///Users/apple/.gemini/antigravity/scratch/ekaagra-portfolio/src/data/content.ts)

Components **only** render from this file. To update your info:
1. Open `src/data/content.ts`.
2. Update the `PERSONAL_INFO` object (e.g. `links.github`, `links.linkedin`, `links.resume`).
3. Add or edit experiences in `EXPERIENCES`.
4. Add or edit projects in `PROJECTS`.

---

## 🖼️ How to Add or Change Images

The `<MediaSlot />` component handles image loading gracefully:
- If an image file is missing, it displays an elegant obsidian placeholder with a dashed hairline border and a drop prompt: `Drop image here: /public/media/<filename>`.
- When provided, it renders with lazy loading, rounded frames, inner shadows, hover zoom, and optional ScrollTrigger parallax.

To add new photos:
1. Place your `.jpg`, `.png`, `.gif`, or `.webp` file inside `/public/media/`.
2. Reference the path in `src/data/content.ts` (e.g., `/media/exp-iit-dhanbad-1.jpg`).
3. Check `/public/media/README.md` for recommended aspect ratios and asset names.

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial obsidian portfolio release"
   git remote add origin https://github.com/ekaagragupta/<repo-name>.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New Project** and import the repository.
4. Next.js App Router defaults will be automatically detected. Click **Deploy**.
