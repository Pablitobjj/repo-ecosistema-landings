# Cultural Brain — Unified Site Shell
This folder is the single source of truth for navigation and footer markup on **all 13** static pages of culturalbrain.net.

- `header.html`: identical header on every page, 6 top-level destinations (Platform, Research, How it works, Solutions, Resources, Plans), shared locale switch and Demo CTA. `Solutions` points to `/platform#solutions`.
- `footer.html`: consistent site footer, Hispaño relationship and login.
- `public/assets/cb-site-shell.css`: isolated header/footer styling; subtle light-theme harmonization for SaaS product heroes while retaining page contents and modules.
- `public/assets/cb-site-shell.js`: route-sensitive active nav, mobile drawer, EN/ES persistence, price-form placeholder adaptation and title/description switching.
- `scripts/sync-site-shell.py`: reapply templates to 13 HTML pages. Run `python3 culturalbrain/scripts/sync-site-shell.py --check` in CI before deploy. Do **not** edit generated header/footer blocks on individual pages.

No framework or SPA migration is needed: route changes are normal static HTML navigations, while their layout/header remain identical.

## Contextual Explore strip (5 pages)

`explore.html` is the **single source of truth** for the narrow secondary capability strip labeled Explore / Explorá. It appears immediately under the main header on exactly five pages: Home (`/`), Research Center (`/research-center`), CEREBRO (`/cerebro`), Sofía (`/sofia`), and Pulse (`/pulse`). Other pages keep only the main header.

The four destinations are unchanged across those five pages. `cb-site-shell.js` sets the active `aria-current="page"` according to the URL; Home displays none selected. Responsive CSS makes this a compact, horizontally scrollable contextual strip rather than a second global navbar.

**QA / maintenance:** Run `python3 culturalbrain/scripts/sync-site-shell.py --check` to verify byte-identical shared templates and the exact five-page Explore coverage. Use the non-`--check` invocation to sync changes from these templates. Do not edit the generated Explore fragment in individual HTML files.
