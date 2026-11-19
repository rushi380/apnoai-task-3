# Brew & Bean — Artisan Café Website

A premium, fully responsive one-page business website for **Brew & Bean**, an artisan café concept in Pune, Maharashtra. Built with semantic HTML5, modern CSS (Flexbox + Grid) and dependency-free vanilla JavaScript — ready to deploy to Vercel as a static site.

> **Live demo:** `https://your-project-name.vercel.app` <!-- replace after deploying -->
>
> **Repository:** `https://github.com/your-username/apnoai-final-rushikesh` <!-- replace after pushing -->

---

## 1. Business overview

| | |
|---|---|
| **Business name** | Brew & Bean |
| **Business type** | Artisan café |
| **Location** | Pune, Maharashtra, India |
| **Tagline** | Good Coffee. Fresh Bites. Beautiful Moments. |
| **Purpose** | A modern café concept focused on freshly brewed coffee, delicious bakery items, a comfortable atmosphere and memorable customer experiences. |

Brew & Bean is presented as a **sample business concept**. All contact details, opening hours, prices and reviews are clearly marked placeholders or demo content — no real address, phone number, testimonial or business history has been invented, and nothing is presented as a verified fact.

### Services

1. **Specialty Coffee** — freshly brewed coffee and handcrafted beverages.
2. **Fresh Bakery** — pastries, cakes and freshly baked treats.
3. **Café Experience** — a comfortable space for friends, work and relaxation.

---

## 2. Website features

- **Sticky, blurred navigation bar** with logo, five section links and a “Visit Us” call-to-action.
- **Hero section** with a full-bleed café photograph, dark gradient overlay for readability, split-colour headline and two calls-to-action.
- **About section** — “More Than Just Coffee” with layered imagery and three highlights (Fresh Ingredients, Quality Coffee, Cozy Atmosphere).
- **Menu section** — three product cards (Specialty Coffee, Fresh Bakery, Signature Desserts) with photography, descriptions, clearly marked illustrative prices and hover elevation/zoom effects.
- **Gallery** — six-image responsive mosaic on a dark espresso background, with a keyboard-accessible lightbox.
- **Sample reviews** — two testimonial cards labelled “Sample review” so demo content is never mistaken for real customer feedback.
- **Contact section** — editable address, phone, email and opening hours, clickable `tel:`/`mailto:` links, a Google Maps lookup button and a WhatsApp button.
- **Contact form** with accessible inline validation, plus an honest demo-mode notice.
- **Footer** with brand, navigation, contact details, social placeholders and a current-year copyright line.

---

## 3. Technologies used

| Layer | Choice |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3 — custom properties, Flexbox, CSS Grid, `clamp()` fluid type, media queries |
| Behaviour | Vanilla JavaScript (ES2015+), no frameworks or build step |
| Fonts | Google Fonts — *Fraunces* (display) and *Inter* (body) |
| Imagery | Unsplash CDN photographs, loaded with `loading="lazy"` and `srcset` sizing |
| Hosting | Vercel — static site, no build command |

No React, no package manager, no backend and no database are required.

---

## 4. Project structure

```
apnoai-final-rushikesh/
├── index.html              # Complete one-page website
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles (tokens → components → media queries)
│   └── js/
│       └── main.js         # Navigation, scrolling, lightbox, validation
├── README.md
└── .gitignore
```

---

## 5. Responsive design

Built **mobile-first**: base styles target small screens, then layout expands at breakpoints.

| Breakpoint | Layout behaviour |
|---|---|
| **320px** | Single column, stacked menu cards, 2-column gallery, full-width menu panel, fluid type from `clamp()`. |
| **375px / 425px** | Same single-column stack with larger touch targets (≥48px buttons, ≥46px menu toggle). |
| **560px+** | Hero buttons gain a minimum width; footer bottom bar becomes a row. |
| **640px+** | Three-column highlights, two-column form fields, side-by-side contact buttons. |
| **768px+** | Two-column menu grid, gallery becomes a 3-column mosaic with a 2×2 feature tile, two-column reviews. |
| **900px+** | Desktop navigation replaces the hamburger, about/contact become two columns, menu becomes three columns. |
| **1024px / 1440px** | Wider gallery rows, four-column footer, content capped at 1180px and centred. |

Mobile specifics:

- Functional hamburger with `aria-expanded`, animated bars and Escape-key closing.
- No horizontal scrolling (`overflow-x: hidden`, `max-width: 100%` media, fluid spacing).
- Images scale with `object-fit: cover` and fixed aspect ratios, so no layout shift.
- Lightbox matches viewport height with `max-height: 76svh`.
- `prefers-reduced-motion` disables transitions and smooth scrolling.

---

## 6. JavaScript functionality

All in `assets/js/main.js`, wrapped in one IIFE with no global leaks.

1. **Mobile hamburger navigation** — toggles the panel, closes on link click, outside click, Escape or desktop breakpoint, and keeps `aria-expanded` in sync.
2. **Smooth scrolling** — every in-page anchor scrolls smoothly to its section, compensates for the sticky header via `scroll-margin-top`, and updates the URL hash without a jump.
3. **Active-section highlighting** — the current section is underlined in the navigation while scrolling (rAF-throttled).
4. **Contact form validation** — validates name, email, optional phone and message; shows inline, screen-reader-announced errors; focuses and scrolls to the first invalid field; clears errors on correction.
5. **WhatsApp button** — the button is wired to the number in `CONFIG.whatsappNumber`, with a prefilled message, opened safely in a new tab.
6. **Gallery lightbox** — click or keyboard activation opens an enlarged image with caption; arrow keys and buttons cycle through all images; Escape or backdrop click closes it; focus is trapped and restored.
7. **Scroll reveal** — sections fade in via `IntersectionObserver`, with a no-motion and no-JS fallback.
8. **Footer year** — automatically shows the current year.

### Demo form behaviour (important)

The form does **not** pretend to send messages. Because no backend is configured, submitting valid details shows:

> “Thank you, …! Your details look good — but this is a demo form, so nothing was sent or stored.”

To receive real enquiries, connect a form endpoint (for example Formspree):

1. Create a form at [formspree.io](https://formspree.io) and copy its endpoint.
2. Add the endpoint to the `<form>` tag in `index.html`:

   ```html
   <form id="contactForm" data-endpoint="https://formspree.io/f/your-form-id" novalidate>
   ```

3. That's it — `main.js` automatically posts the `FormData` with `fetch`, shows a success message on `2xx`, an error message otherwise, and disables the button while sending.

---

## 7. Instructions to run locally

No installation or build step is required.

**Option A — double-click**

Open `index.html` in Chrome, Edge, Firefox or Safari.

**Option B — local server (recommended, matches production)**

```bash
# from the project folder
python -m http.server 5500
# then open http://localhost:5500
```

or, with Node.js:

```bash
npx serve .
```

**What to test**

1. Resize from 320px to 1440px — no horizontal scrollbar, navigation switches to a hamburger below 900px.
2. Click every navigation link and both hero buttons — smooth scroll to the right section.
3. Open each menu card image and confirm hover lift/zoom.
4. Click a gallery image → lightbox opens; try ← → and Esc.
5. Submit the form empty → inline errors; fill it correctly → demo notice appears and fields reset.
6. Click the WhatsApp button → `wa.me` opens with the prefilled message.
7. Check the browser console — it should be empty.

---

## 8. Customising for the real business

| What | Where |
|---|---|
| Address, phone, email, opening hours | `index.html` → Contact section and footer (search for `placeholder` / `Tel:` labels) |
| WhatsApp number | `assets/js/main.js` → `CONFIG.whatsappNumber` (digits only, with country code) |
| WhatsApp prefilled message | `assets/js/main.js` → `CONFIG.whatsappMessage` |
| Google Maps link | `index.html` → “Open in Google Maps” button (`google.com/maps/search/?api=1&query=…`) |
| Prices | `index.html` → `.menu-price` blocks |
| Colours, radii, shadows | `assets/css/styles.css` → `:root` design tokens |
| Photos | `index.html` → `src` / `srcset` attributes (keep `alt` text accurate) |
| Social profiles | `index.html` → footer `.social-link` anchors; add the real URL and remove `data-placeholder` |

The phone and email are real `tel:` and `mailto:` links, so they must be updated together with the visible text.

---

## 9. Upload to GitHub

```bash
# 1. Create an empty repository named apnoai-final-rushikesh on github.com
# 2. Initialise git inside the project folder
git init
git add .
git commit -m "feat: build responsive Brew & Bean business website"

# 3. Point at your repository and push
git branch -M main
git remote add origin https://github.com/your-username/apnoai-final-rushikesh.git
git push -u origin main
```

Replace `your-username` with your GitHub username.

---

## 10. Deploy to Vercel

1. Push the project to GitHub (above).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Configure the project:
   - **Framework Preset:** `Other`
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (or `.`)
   - **Install Command:** leave empty
4. Click **Deploy**. Vercel serves `index.html` from the project root as a static site.
5. Copy the deployment URL into the “Live demo” line at the top of this README.

No `vercel.json`, environment variables or build tooling are needed. If you prefer the CLI:

```bash
npx vercel --prod
```

---

## 11. Accessibility & performance notes

- Skip-to-content link, visible focus rings and a logical heading order (single `h1`).
- All navigation, gallery and lightbox controls are real buttons or links with accessible names.
- Gallery images are buttons that open the lightbox, so they work with Enter/Space.
- Every image has descriptive `alt` text; the hero image is marked `fetchpriority="high"`, all others are lazy-loaded.
- Decorative SVGs use `aria-hidden="true"`; the lightbox is `role="dialog"` with `aria-modal`.
- Form errors are linked with `aria-describedby` and `aria-invalid`, and announced through an `aria-live` status region.
- Remote images use `auto=format` so the CDN serves modern, compressed formats at the requested width.

---

## 12. ApnoAI Task 3 — requirement checklist

| Requirement | Status |
|---|---|
| Navigation bar with logo, name, 5 links, “Visit Us” CTA | ✅ |
| Sticky navigation | ✅ |
| Responsive hamburger menu | ✅ |
| Hero with heading, supporting text, two buttons, café photo, dark overlay | ✅ |
| About section “More Than Just Coffee” with image, copy, 3 highlights | ✅ |
| Menu section “Discover Our Menu” with 3 image cards, prices marked illustrative, hover effects | ✅ |
| Gallery “A Taste of Brew & Bean” with 6 real café photographs | ✅ |
| Reviews “What People Say” — two cards clearly labelled as samples | ✅ |
| Contact “Come Visit Us” — address, phone, email, hours, maps link, WhatsApp | ✅ |
| Footer with logo, description, links, contact, socials, copyright | ✅ |
| Warm cream / coffee-brown palette, elegant type, soft shadows, rounded buttons | ✅ |
| Mobile-first responsive at 320 / 375 / 425 / 768 / 1024 / 1440px | ✅ |
| No horizontal scrolling | ✅ |
| Minor: smooth scrolling, form validation, WhatsApp link, gallery lightbox | ✅ Bonus JavaScript |
| Semantic HTML, SEO title + meta description, alt text, accessible labels | ✅ |
| HTML5 + CSS3 + vanilla JS only (no React, no backend) | ✅ |
| `index.html` in root, Vercel-ready with no build step | ✅ |
| Professional README with run/deploy instructions | ✅ |
| No invented address, phone, reviews, history or hours | ✅ Placeholders used |

---

## 13. Credits

- Photography: [Unsplash](https://unsplash.com) contributors, hot-linked through the Unsplash CDN.
- Typefaces: [Fraunces](https://fonts.google.com/specimen/Fraunces) and [Inter](https://fonts.google.com/specimen/Inter), served by Google Fonts.

Brew & Bean is a fictional sample brand created for the ApnoAI Web Development Internship, Task 3.
