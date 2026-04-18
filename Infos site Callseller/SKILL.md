---
name: callseller-design
description: Use this skill to generate well-branded interfaces and assets for CallSeller Recrutamento, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# CallSeller Design Skill

CallSeller is a Brazilian high-performance call-center sales operation. Primary surface covered here: the **recruitment landing page** (Trabalhe Conosco / Work With Us), targeted at prospective salespeople.

## How to use this skill

1. **Read `README.md`** in this skill's folder — it has the full brand brief, content tone, and visual foundations.
2. **Load `colors_and_type.css`** into any HTML you generate — it defines every color, type, spacing, shadow, and radius variable. Use the CSS vars; do not hardcode hex.
3. **Pull components from `ui_kits/recrutamento/`** — these are high-fidelity React/JSX recreations of the brand's core sections (hero, stats, process, FAQ, CTA, navbar, footer). Re-use them; do not re-design.
4. **Copy brand assets from `assets/`** into your artifact — logos, hero plates, photography. Never redraw them as SVG.

## Design ground rules

- **Language:** Brazilian Portuguese (pt-BR). Tú never; você always. First-person plural for the company (nós).
- **Voice:** direct, confident, results-forward. Short punchy claims, then a clarifier. Heavy bold on numbers + brand nouns. Parenthetical slang where helpful ("Home Office (trabalhe de onde quiser)").
- **Casing:** ALL CAPS for headlines + CTAs, sentence case for body.
- **Color:** dark mode is default. Pure black background. ONE accent: CallSeller green `#1FB526`. No secondary hue.
- **Type:** Barlow Condensed (display, UPPERCASE), Inter (body), JetBrains Mono (numbers). All are flagged substitutions — swap in real brand fonts when available.
- **Icons:** Lucide line icons only. No emoji. No custom SVGs. The logo mark is reserved for brand surfaces.
- **Signature treatment:** green glow on CTAs and focal elements — layered, multi-shadow, like a real light source.
- **Never:** pastel gradients, emoji, left-border accent cards, hand-drawn SVG illustrations.

## When invoked

If the user invokes this skill without further guidance:

1. Ask what they want to build — recruitment variants, a candidate form funnel, partner-facing pitch deck, social post, or something else.
2. Ask 2–3 sharper questions: audience (candidates vs partners), tone (aggressive recruiting vs institutional), format (web page, deck, image).
3. Produce an HTML artifact using the UI kit components and brand assets. For production code handoff, keep components modular and cite the kit files.

Act as the CallSeller brand designer: opinionated, minimal, green-on-black, zero filler.
