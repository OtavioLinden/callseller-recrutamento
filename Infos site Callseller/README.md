# CallSeller Design System

> Design foundations, brand assets, and UI kit for **CallSeller Recrutamento** — the recruitment landing page for CallSeller's call-center sales team.

---

## What is CallSeller?

CallSeller is a high-performance B2B sales operation ("operação de vendas de alta performance") based in Brazil. They run call-center campaigns **on behalf of digital producers**: contacting leads, recovering abandoned carts, running upsell and cross-sell, and generally driving revenue that the producer would have left on the table. They operate their own payments platform, **PagaH**, and the call operation is integrated directly with it.

- **Since:** 2017
- **Model:** 100% home-office sales team, distributed across Brazil
- **Ecosystem:** R$ 1B+ per year in the digital-products market they operate in
- **Scale (self-reported):** +R$ 7.000.000/mo recovered, 50+ partners, 100+ active sellers

### Primary product in this design system

**CallSeller Recrutamento** — a recruitment landing page ("Trabalhe Conosco") targeted at prospective salespeople. It explains who the company is, the work model, the selection process, the training methodology, the stats, an FAQ, and ends with a "Quero me candidatar" CTA. **This is the ONE product this design system currently supports.** There is no dashboard, app, or operator-facing product included in the source materials.

---

## Source materials provided

| Source | Path | Notes |
|---|---|---|
| Copy deck (PT-BR) | `uploads/Copy Recrutamento Callsesller.md` (from attached `Callseller/` folder) | Full landing-page copy, section by section |
| Logos (horizontal + mark, light + dark) | `uploads/LOGO1.png` .. `LOGO4.png` → `assets/logo-*.png` | `LOGO1` is white-on-transparent (horizontal), `LOGO2` is black-on-transparent horizontal, `LOGO3` mark white, `LOGO4` mark black |
| Recrutamento hero plates | `uploads/1.png` .. `4.png` → `assets/recrutamento-*.png` | 4 variations of the green-on-black "RECRUTAMENTO" treatment — radial glow, flat, 3D, vignette |
| Office photograph | `Callseller/Imagem basica.jpeg` → `assets/office-photo.jpeg` | Founder / team shot on the call floor, with green CallSeller sign on the back wall |
| Institutional videos | `Callseller/apresentação1.mp4`, `apresentação2.mp4`, `depoimento1.mp4`, `depoimento2.mp4` | Referenced but not extracted — heavy, not embedded here |

> **No codebase or Figma was provided.** This design system is built from brand assets + copy. If you have a Figma or codebase, import it and we'll tighten the UI kit against it.

---

## Root manifest

```
CallSeller Design System/
├─ README.md                 ← you are here
├─ SKILL.md                  ← agent-skill entry point
├─ colors_and_type.css       ← all CSS vars (color, type, spacing, shadow, radii)
├─ assets/                   ← logos, hero plates, photography
├─ preview/                  ← small HTML cards that populate the Design System tab
├─ ui_kits/
│  └─ recrutamento/          ← the recruitment landing page UI kit
│     ├─ index.html          ← full hero + sections demo
│     └─ *.jsx               ← section components
└─ uploads/                  ← original files as uploaded (do not edit)
```

---

## CONTENT FUNDAMENTALS

**Language.** Brazilian Portuguese (pt-BR). No English mixing in headlines. Keep acronyms (FAQ, CEO, B2B) as-is.

**Person.** Speak directly to the reader using **você** ("Você trabalha de onde quiser"). First-person plural **nós / nosso** for the company ("Nossa seleção", "Nosso processo seletivo"). Never "a gente" — too casual for this context.

**Register.** Direct, confident, results-forward. Blue-collar-friendly but professional — the audience is anyone with energy and willingness to sell, not PhDs. Avoids corporate jargon. No hedging ("talvez", "possivelmente") — always declarative.

**Casing.**
- **Section headers / CTAs / headline plates: ALL CAPS.** This is the strongest brand voice — "TRABALHE CONOSCO", "NENHUMA AULA VENCE A PRÁTICA.", "QUERO ME CANDIDATAR".
- **Body copy: sentence case**, standard Portuguese capitalization.
- **Proper nouns in bold** when they anchor a claim: **CallSeller**, **PagaH**, **R$ 1 Bilhão por ano**.

**Emphasis.** Heavy use of **bold** to chunk dense paragraphs into scannable anchors. Numbers and currency are always bolded ("**+R$ 7.000.000,00**", "**+7 Anos**"). Italics: rare.

**Punctuation quirks.**
- Uses em-dash / horizontal-rule section breaks (`---`) aggressively to segment copy.
- Parenthetical clarifications for slang ("**100% Hands-on (mão na massa)**", "**Home Office (trabalhe de onde quiser)**") — makes the message accessible across audience segments.
- Currency formatted with Brazilian conventions: "R$ 7.000.000,00".

**Emoji.** Never. The brand uses **Lucide-style line icons** exclusively (see Iconography). The copy document explicitly names Lucide icons by name (`shield-check`, `award`, `cpu`, `globe`, `trending-up`, `trophy`, `zap`, `settings`, `headphones`, `clipboard-check`, `message-circle-check`, `eye`, `arrow-up-right`). Respect that system.

**Tone examples (verbatim from the copy).**

> "Esqueça teorias intermináveis. Nós acreditamos no 'fazer'."
> "NENHUMA AULA VENCE A PRÁTICA."
> "Estamos sempre em busca de pessoas otimistas e confiantes que buscam evolução profissional e financeira."
> "Para trabalhar conosco, você não precisa de um currículo recheado ou experiência prévia; buscamos pessoas com iniciativa e que entendam o DNA da nossa operação."

Note the rhythm: a short, punchy assertion followed by a longer clarifier. Use this pattern. Avoid walls of text — break long paragraphs at the first natural pause.

**Calls to action.** Imperative, first-person, ALL CAPS. The canonical CTA is **"QUERO ME CANDIDATAR"**. Secondary CTA pattern: **"[ASSISTIR AO VÍDEO INSTITUCIONAL]"**.

---

## VISUAL FOUNDATIONS

### Color vibe

**Dark mode is the default and the brand identity.** Pure black (`#000`) backplates, a single electric green accent (`#1FB526`), warm-white text. Feels like a trading terminal, a stadium scoreboard, or a high-stakes sales floor at 10pm — not a wellness app. The green glows — it acts like a light source on top of matte black, not a flat fill.

Light mode exists as a secondary, utilitarian theme (for dense body copy or candidate forms where max contrast helps readability).

### Color

- **Primary:** CallSeller Green `#1FB526` — the ONLY accent. Use sparingly; one per viewport is ideal.
- **Green scale:** `--cs-green-50` through `--cs-green-950`, centered on 500.
- **Neutral ink:** `#000` → `#FFF` 11-step ramp, slightly cool-warm gray (not pure gray) to feel less clinical.
- **Semantic:** success = green-500 (same as brand), warn `#F2B705`, danger `#E5484D`, info `#5B9BD5`. Warn/danger/info are rarely used — the brand avoids multi-color UIs.
- **No secondary hue.** If a second accent feels needed, use a tone of green (lighter `--cs-green-300` or darker `--cs-green-700`) — never a complementary color.

### Typography

- **Display:** Barlow Condensed 700/800, UPPERCASE, tight letterspacing. Used for hero plates, section starters, stat counters. **(⚠ Substitution — the actual brand typeface wasn't provided; Barlow Condensed is the closest widely-available Google Fonts match to the "RECRUTAMENTO" treatment. Please provide the real font file if you have one.)**
- **Body / UI:** Inter 400–700. **(⚠ Also a substitution — commonly used for this type of sans-serif brand voice.)**
- **Mono:** JetBrains Mono for numerical displays (counters, phone numbers, metrics).
- **Scale:** see `colors_and_type.css` — fluid display sizes from 36 to 128px; body 15/17px.

### Backgrounds

- **Default:** solid `#000`, often with a subtle green radial glow behind a focal element (see `recrutamento-radial.png`).
- **Textured black:** faint noise / mesh texture on hero plates (visible in `recrutamento-3d-dark.png`). Adds depth without pattern.
- **Full-bleed photography:** used only for "proof" sections (team on the call floor). Photos are colour-graded cool/neutral, not warm. Always pair with a dark overlay for text legibility.
- **Never:** pastel gradients, watercolour washes, abstract blobs, AI-slop 3D renders. The brand is flat + glow, not whimsical.

### Animation

- **Easing:** `cubic-bezier(0.2, 0.8, 0.2, 1)` — quick out, smooth settle. No bouncy springs.
- **Duration:** 120ms (micro), 220ms (state), 400ms (layout), 700ms (hero reveals).
- **Motifs:** fade-up on scroll, glow pulse on CTAs (slow, ±10% opacity, 2.4s cycle), number counters for the stats block.
- **Avoid:** parallax, flips, 3D rotations, confetti, typewriter effects.

### Hover / press states

- **Buttons (primary green):** hover darkens to `--cs-green-600` **and** glow intensifies (`--glow-green-md` → `--glow-green-lg`). Press shrinks 1% and darkens to `--cs-green-700`.
- **Links:** brightness shift to `--cs-green-300`, underline thickens.
- **Cards:** hover lifts border to `--border-strong` and adds a faint green outer glow. No vertical "lift" / translate.
- **Icons:** hover = white → green, 120ms.

### Borders

Thin (1px), low contrast (`rgba(255,255,255,0.08–0.24)`), used for structural separation. On green surfaces, use a 2px solid `--cs-green-500` border to create "highlighted" variants. **No double borders, no left-border-only accent cards** (AI-slop trope).

### Shadows

Two systems, non-overlapping:

1. **Standard shadows** — dark drop shadows for cards over gradients/photos. Rarely needed since most cards live on black.
2. **Green glows** (`--glow-green-sm/md/lg`) — the signature treatment for CTAs, focus rings, active logo marks, selected tabs. Always a real-light-source multi-layer glow, never a single-layer drop shadow with color.

### Corner radii

- Small UI (inputs, chips, code): `6–10px`.
- Cards: `16px`.
- Hero plates / featured blocks: `24–32px`.
- Full pills / avatar rings: `999px`.

**Never:** sharp 0px corners (too brutal for the brand) or fully-rounded huge radii (> 32px, reserved for pills).

### Cards

- Background `--bg-surface` (near-black).
- Border `1px --border-hairline`.
- Radius `16–24px`.
- Padding `24–32px`.
- Optional inner highlight top-edge: `box-shadow: inset 0 1px 0 rgba(255,255,255,0.04)`.
- Stat cards MAY use green background or green border to promote the metric.

### Layout rules

- Max content width: `1200px` for marketing pages, `1440px` for dense grids.
- Hero sections are full-bleed black, content centered, 80–120px top padding.
- Section rhythm: 96–128px vertical gutter between marketing sections.
- Mobile: 16px side gutters, 48px between sections.
- **Sticky top nav** is dark, 64px tall, with the CallSeller mark + primary CTA on the right.

### Transparency / blur

- **Frosted panels:** `backdrop-filter: blur(20px)` on sticky nav and on overlays over photography. Always paired with `background: rgba(10,12,10, 0.65)`.
- **Protection gradients** are preferred over solid panels when content sits over a photo: 0% → 80% black linear gradient from top (or bottom).

### Imagery colour grade

- Warm highlights, cool shadows, low saturation, moderate grain.
- Photography tends toward **neutral office lighting** — fluorescent-warm, not cinematic teal-and-orange.
- When overlaying green brand graphics on a photo, the photo must be desaturated 20–40% to prevent the green from fighting the scene.

---

## ICONOGRAPHY

**System: [Lucide](https://lucide.dev/) line icons, 1.75px stroke, rounded caps.**

The copy document explicitly names Lucide icons for every bullet (`shield-check`, `award`, `cpu`, `globe`, `trending-up`, `trophy`, `arrow-up-right`, `clipboard-check`, `message-circle-check`, `eye`, `zap`, `settings`, `headphones`). This is a strong, intentional signal — the designer chose Lucide. Respect it.

- **Source:** linked from CDN (`https://unpkg.com/lucide-static@latest`) for web builds, or `lucide-react` in React projects. We do not ship our own icon set.
- **Default size:** 20–24px inline, 32–40px in hero bullet lists.
- **Default color:** `--cs-green-500`; on hover the surrounding text turns green too.
- **Stroke:** never fill Lucide icons — keep them line-only.
- **Emoji:** never.
- **Unicode chars as icons:** no.
- **The CallSeller logo mark** (headphones + bar chart + dollar arrow) is a **brand icon**, not part of the icon system. Use it only for brand surfaces (nav, footer, loading, OG image).

### Icon inventory

| File | Use |
|---|---|
| `assets/logo-horizontal-white.png` | Full logo, on dark backgrounds |
| `assets/logo-horizontal-black.png` | Full logo, on light backgrounds |
| `assets/logo-mark-white.png` | Icon-only, dark bg (nav, favicon) |
| `assets/logo-mark-black.png` | Icon-only, light bg |
| `assets/recrutamento-radial.png` | Hero — most versatile (radial glow, bold) |
| `assets/recrutamento-flat.png` | Hero — flat green on black |
| `assets/recrutamento-3d-dark.png` | Hero — 3D, dark chrome |
| `assets/recrutamento-3d-vignette.png` | Hero — 3D with subtle side vignette |
| `assets/office-photo.jpeg` | Proof photo — team on the floor |

---

## Index

- [colors_and_type.css](./colors_and_type.css) — all foundational CSS vars
- [SKILL.md](./SKILL.md) — agent-skill entry point
- [preview/](./preview/) — the Design System tab cards
- [ui_kits/recrutamento/](./ui_kits/recrutamento/) — the recruitment landing-page kit
- [assets/](./assets/) — logos, hero plates, photography

---

## Caveats & known substitutions

- **Fonts are substituted.** Barlow Condensed (display) and Inter (body) stand in for the actual brand fonts, which weren't provided. If you have the real TTFs, drop them in `fonts/` and replace the `@import` in `colors_and_type.css`.
- **No codebase, no Figma.** The UI kit is built from copy + brand assets. Bringing in the real production code will sharpen component fidelity.
- **One product only.** Only the recruitment landing page is covered. A candidate form funnel, applicant dashboard, or operator app would need additional discovery.
