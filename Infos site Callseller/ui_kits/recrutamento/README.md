# CallSeller Recrutamento — UI kit

High-fidelity recreation of the CallSeller recruitment landing page ("Trabalhe Conosco"). Single-page, dark, green accent. All copy is from the brand's own copy document (`uploads/Copy Recrutamento Callsesller.md`).

## Files

- `index.html` — assembled landing page (loads CSS + all JSX components)
- `kit.css` — kit-specific composition styles (uses CSS vars from `colors_and_type.css`)
- `Navbar.jsx` — sticky nav, frosted dark, logo left + CTA right
- `Hero.jsx` — "TRABALHE CONOSCO" plate, radial green glow, dual CTA
- `WhoWeAre.jsx` — 3-pillar institutional block (Solidez / Autoridade / Tecnologia)
- `Benefits.jsx` — 4-up Lucide-iconed benefit cards
- `Process.jsx` — 3-step selection stepper
- `Training.jsx` — training methodology + "NENHUMA AULA VENCE A PRÁTICA" big-claim plate
- `Stats.jsx` — 4 stat cards, one accented green
- `FAQ.jsx` — accordion
- `ApplyForm.jsx` — two-panel candidate form with success state
- `Footer.jsx` — minimal logo / nav / socials / legal

## Design width

`1280px` (desktop target). Responsive down to `560px`.

## Notes

- All section copy is from the brand's copy document; do not rewrite without reason.
- Icons: Lucide via CDN. The brand's copy document explicitly names each Lucide icon — preserve those mappings.
- The form is decorative — it does not submit anywhere. Wire it up to your backend before shipping.
