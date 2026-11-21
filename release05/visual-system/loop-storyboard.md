# R05-02 · Living Intelligence Loop — Visual System

## Purpose and narrative
Cultural Brain is not a catalog of separate AI modules. The visual should show an ongoing intelligence cycle: Know → Recommend → Decide → Execute → Measure → Learn → return to Know. The surrounding intelligence universe becomes richer when a measured outcome is validated, and context can inform the next recommendation.

## Files
- `culturalbrain/public/assets/cb-intelligence-loop.svg`: 1200×780 master SVG, accessible title/description, six nodes, orbital particle and reduced-motion media query.
- `culturalbrain/public/assets/cb-intelligence-loop-mobile.svg`: 720×760 mobile proportion with same sequence, reduced ornamentation.
- `release05/visual-system/loop-prototype.html`: isolated visual showcase; NOT mounted as a route in Vercel, so it does not publish a new page.
- This document: storyboard, colors, motion and integration rules.

## Visual language
Brand-derived colors: #1E3A8A (blue), #6D1B8F (purple), #2DD4BF (teal), #F27044 (warm coral), #0D1934 (dark canvas). Fonts: Raleway + Space Grotesk already used on the marketing site. Solid orb + concentric paths, curves and six nodes; **no literal snake or anatomical brain**.

## Motion and accessibility
Orbital particle: 30s continuous linear clockwise motion, no sound. Main dashed ring: slow dash evolution. Core glow and station halos gently breathe. `prefers-reduced-motion:reduce` removes animations. Every SVG contains `title` and `desc`; content and all six stage labels must also appear as semantic HTML when integrated. On dark sections use the SVG directly; on white sections consider a dark framed inset.

There are four renderable variants: EN/ES × desktop/mobile. Each embeds localized SVG title, description, stage labels and alt semantics. The SVG root supports `.is-paused` class to pause animations. Product integration should expose a keyboard-operable Pause/Play control that toggles this class on the inline SVG (or contentDocument of same-origin object); when the SVG is used as a pure image, the class cannot be toggled by parent CSS, so render a static alternative if pause control is a requirement. Prototype demonstrates the intended control.

Localization: standalone EN and ES variants exist for desktop and mobile. The prototype can switch via the `data-en` and `data-es` attributes; public integration must serve the correct language according to page locale. Do **not** ship EN SVG as sole content in ES locale. The prototype includes EN/ES explanatory text; production must fully localize.

## 35-second motion-film storyboard — OPTIONAL R05-09
00–05: cultural research, briefs, evidence, media and results form an initial field of knowledge. Overlay 'Knowledge, connected.'
05–10: the units arrange in interrelated orbits, preserving scope and provenance. 'Context. Provenance. Meaning.'
10–15: knowledge paths converge on CEREBRO, revealing an evidence-backed recommendation. 'Evidence into decisions.'
15–20: a person accepts a recommendation; a specific plan version travels to execution. 'Human decisions. Traceable actions.'
20–27: measurements arrive; a hypothesis is evaluated and a verified outcome is stored. 'Measure. Validate. Learn.'
27–35: the learning re-enters the knowledge sphere, a previously dark path brightens and the next cycle begins. 'Campaign after campaign.'
No music autoplay, no artificial product mockups, and no claims of guaranteed outcome.

## Integration into pages (R05-04 and R05-07)
- CB Home Hero: desktop master centered below short claim; retain CTA, navbar, metadata and H1. Mobile compact aspect.
- /how-it-works: expanded visual, hover/click on each stage scrolls to its corresponding section; preserve text-based navigation.
- Hispaño #cultural-brain: compact noninteractive visual + link to CB Universe.
- The future interactive Universe (R05-03) shares orbit hues, node language and typography. **Do not implement two unrelated visual systems.**

## QA checklist / acceptance
[ ] Master SVG renders desktop (no clipping, 6 labels)
[ ] Compact SVG renders at 320px with legible stage order
[ ] Core text does not overlap stage labels
[ ] Screen reader title+description, labels repeated in HTML
[ ] Reduced motion stops animation
[ ] Pause/Play works on same-origin inline/object integration
[ ] Both EN and ES production labels
[ ] Reference visual QA screenshot attached / linked
[ ] GitHub PR/commit tracked
[ ] No public page HTML changed before R05-04

## Guardrails
Do: use orbit/continuous cycle, six stages, return from learning to knowledge, preserve owners, brand palette.
Don't: snake icon, AI-neural stock image, controls inside inert GIF, autoplay sound, text as video only, 1000 boxes, JS-only SEO content, new page beyond scope.
