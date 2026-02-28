# New Blocks Roadmap

Blocks that elevate the UI/UX to award-winning quality while adding genuine content value to the veterinary practice CMS. Each block is designed to integrate with the existing motion vocabulary (scroll-linked opacity/blur, spring-based hover, staggered entrances) and follow established CMS patterns (German labels, sensible defaults, `eyebrow`/`headline`/`description` header pattern).

## Existing Block Inventory

| Block | Slug | Animation | Page |
|---|---|---|---|
| Hero | `hero` | Static | StartPage |
| Services | `services` | Border hover transition | StartPage |
| Quote | `quote` | Scroll word-by-word opacity | StartPage |
| Testimonials | `testimonials` | Floating cards, random timing | StartPage |
| Gallery | `gallery` | Infinite ticker + parallax | StartPage |
| Team | `team` | Cursor-distance stacked photos | StartPage |
| Hours | `hours` | Rolling text on hover | StartPage |
| Contact | `contact` | Static | StartPage |
| ContactForm | `contactForm` | Static | StartPage |
| Accordion | `accordion` | Height + icon rotation | StartPage |
| MemberHero | `memberHero` | 3 variants, staggered entrance | TeamMember |
| MemberCv | `memberCv` | Staggered entry cascade | TeamMember |
| MemberSentenceList | `memberSentenceList` | Sticky scroll blur/opacity | TeamMember |

---

## New Blocks

### 1. Metric Counter — `metrics`

**Content purpose:** Trust indicators — years of experience, patients treated, Google rating, team size. Hard numbers build trust instantly.

**CMS fields:**
- `eyebrow` (text, optional) — Section label
- `headline` (text, optional) — Section title
- `description` (textarea, optional) — Supporting text
- `items[]` (array, 2-4 rows):
  - `value` (number, required) — Target number
  - `suffix` (text, optional) — Appended text ("+", "%", etc.)
  - `label` (text, required) — What the number represents
- `variant` (select): `'light'` | `'dark'` — background treatment

**Animation:** Numbers spring from 0 to target using `useSpring` + `useInView`. Tabular-nums prevents layout shift. Each metric staggers by 0.15s. A thin top border on each column draws left-to-right on entrance.

**Default content:**
```
15+ Jahre Erfahrung
12.000+ behandelte Tiere
4.9 Google-Bewertung
```

---

### 2. Marquee Text — `marqueeText`

**Content purpose:** Full-width brand statement divider between sections. Continuous scrolling text reinforces practice identity. Borrowed from luxury/fashion branding to signal premium quality.

**CMS fields:**
- `text` (text, required) — The phrase to repeat
- `separator` (select): `'dot'` | `'diamond'` | `'paw'` | `'none'`
- `style` (select): `'filled'` | `'outlined'` | `'alternating'`
- `speed` (select): `'slow'` | `'normal'` | `'fast'`
- `direction` (select): `'left'` | `'right'`

**Animation:** Reuses GalleryTicker velocity/spring pattern for text. Asymmetric pause on hover (slow deceleration via spring, fast acceleration on resume). Large typography (5xl-7xl). Edge-to-edge, no container.

**Default content:**
```
Ihre Tiere in besten Händen
separator: dot
style: filled
speed: normal
direction: left
```

---

### 3. Stacking Cards — `stackingCards`

**Content purpose:** Step-by-step process explanation (visit experience, treatment flow, onboarding). Transforms a static list into a tactile, narrative scroll experience. Reduces patient anxiety by setting clear expectations.

**CMS fields:**
- `eyebrow` (text) — Section label
- `headline` (text) — Section title
- `description` (textarea, optional)
- `steps[]` (array, minRows 2):
  - `title` (text, required) — Step heading
  - `description` (textarea, required) — Step explanation
  - `icon` (upload, optional) — Step icon/illustration

**Animation:** Sticky-scroll section (`100vh + steps * scrollStep`). Cards pin at viewport center. Previous cards scale to 0.95, shift up 20px, dim to 0.7 opacity. Uses `useScroll` + `useTransform` (same pattern as MemberSentenceList).

**Default content:**
```
Eyebrow: Ihr Besuch
Headline: Schritt für Schritt bestens betreut
Steps:
  1. Terminvereinbarung — Rufen Sie uns an oder nutzen Sie unser Kontaktformular
  2. Erstgespräch — Wir nehmen uns Zeit für Sie und Ihr Tier
  3. Untersuchung — Gründliche Diagnostik mit modernster Ausstattung
  4. Behandlungsplan — Transparente Besprechung aller Optionen
```

---

### 4. Split-Screen Pinned Reveal — `splitReveal`

**Content purpose:** Values, philosophy, or detailed service pillars. Left column pins an image; right column scrolls text items. As each item reaches viewport center, the left image cross-fades. Elevates abstract concepts with visual anchoring.

**CMS fields:**
- `eyebrow` (text)
- `headline` (text)
- `items[]` (array, minRows 2):
  - `title` (text, required) — Value/pillar heading
  - `description` (textarea, required) — Explanation
  - `image` (upload, required) — Paired image

**Animation:** Left column `position: sticky; top: 50%`. Image cross-fades via clip-path wipe (`inset(bottom→top)`). Active text transitions from muted to primary; inactive items stay faded. Section height scales with item count.

**Default content:**
```
Eyebrow: Unsere Werte
Headline: Was uns antreibt
Items:
  1. Sanftmut — Wir behandeln jedes Tier mit Einfühlungsvermögen und Geduld
  2. Transparenz — Offene Kommunikation über Diagnose, Behandlung und Kosten
  3. Expertise — Modernste Methoden und kontinuierliche Weiterbildung
```

---

### 5. Parallax Image — `parallaxImage`

**Content purpose:** Atmospheric visual break between text-heavy sections. Shows the practice environment (waiting room, treatment room, team at work) without requiring a full content section. Cinematic pause.

**CMS fields:**
- `image` (upload, required) — Full-bleed image
- `headline` (text, optional) — Overlay text
- `subtext` (textarea, optional) — Supporting overlay text
- `overlayOpacity` (number, min 0, max 100, default 40) — Gradient scrim darkness
- `height` (select): `'medium'` (60vh) | `'tall'` (80vh) | `'fullscreen'` (100vh)

**Animation:** Image container `overflow: hidden`, image 120% tall. `useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])`. Text overlay fades in with `whileInView`. Gradient scrim (bottom→top) ensures legibility.

**Default content:**
```
height: tall
overlayOpacity: 40
```

---

### 6. Editorial Text Reveal — `editorialReveal`

**Content purpose:** Founder's personal message, mission statement, or long-form philosophy. Line-by-line scroll reveal forces engagement with each line. For emotionally important content that shouldn't be skimmed.

**CMS fields:**
- `text` (textarea, required) — The message (split into lines for animation)
- `authorName` (text, optional) — Attribution name
- `authorRole` (text, optional) — Attribution role
- `authorPhoto` (upload, optional) — Small author portrait
- `alignment` (select): `'left'` | `'center'`
- `showDivider` (checkbox, default true) — Animated horizontal rule

**Animation:** Section height scales with line count. Each line: `opacity: 0 → 1`, `y: 30 → 0`, `blur: 4px → 0`. Horizontal rule animates width from 0% to 100% synchronized with scroll progress. Author portrait fades in at end.

**Default content:**
```
alignment: center
showDivider: true
```

---

### 7. Before/After Comparison — `beforeAfter`

**Content purpose:** Treatment results — dental cleanings, wound healing, surgical recoveries. Draggable slider reveals before/after states. User-controlled discovery is more engaging than side-by-side.

**CMS fields:**
- `eyebrow` (text, optional)
- `headline` (text, optional)
- `description` (textarea, optional)
- `pairs[]` (array, minRows 1):
  - `beforeImage` (upload, required)
  - `afterImage` (upload, required)
  - `beforeLabel` (text, default "Vorher")
  - `afterLabel` (text, default "Nachher")
  - `caption` (text, optional)

**Animation:** `clip-path: inset()` driven by `useMotionValue`. Handle with initial pulse hint (scale keyframes `[1, 1.15, 1]` once). Reduced motion: falls back to side-by-side static images.

---

### 8. Timeline — `timeline`

**Content purpose:** Practice history and milestones. "Founded 2008," "New clinic 2015," "Specialist joined 2020." Builds credibility and emotional connection.

**CMS fields:**
- `eyebrow` (text)
- `headline` (text)
- `events[]` (array, minRows 2):
  - `year` (text, required) — Year or period
  - `title` (text, required) — Milestone heading
  - `description` (textarea, optional) — Details
  - `image` (upload, optional) — Event photo

**Animation:** Vertical center line draws via `scaleY` driven by `scrollYProgress`. Events alternate left/right. Each card slides in from its side (`x: ±30 → 0`) with `whileInView`. Circle markers fill with accent color when active. Mobile: single column, line on left.

---

## Implementation Order

| # | Block | Rationale |
|---|---|---|
| 1 | `metrics` | Simplest to implement, highest trust-building ROI |
| 2 | `marqueeText` | Reuses existing ticker pattern, high visual impact |
| 3 | `stackingCards` | Fills critical content gap (visit experience) |
| 4 | `splitReveal` | Elevates values/philosophy to award-level |
| 5 | `parallaxImage` | Simple atmospheric break, high design value |
| 6 | `editorialReveal` | Extends Quote vocabulary to long-form |
| 7 | `beforeAfter` | Conditional on having treatment photography |
| 8 | `timeline` | Conditional on having meaningful practice history |

## Integration Checklist (per block)

1. Create `src/blocks/startPage/<BlockName>Block.ts` — Payload block config
2. Export from `src/blocks/startPage/index.ts` — Register in layout blocks
3. Create `src/app/(frontend)/sections/<BlockName>.tsx` — React section component
4. Add case to `src/app/(frontend)/sections/RenderLayoutBlock.tsx` — Wire up rendering
5. Run `pnpm db:generate` — Regenerate types
6. Run `pnpm ci:fast` — Verify lint + typecheck + build
