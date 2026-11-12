# Cultural Brain — Unified Site Shell
This folder is the single source of truth for navigation and footer markup on **all 13** static pages of culturalbrain.net.

- `header.html`: identical header on every page, 6 top-level destinations (Platform, Research, How it works, Solutions, Resources, Plans), shared locale switch and Demo CTA. `Solutions` points to `/platform#solutions`.
- `footer.html`: consistent site footer, Hispaño relationship and login.
- `public/assets/cb-site-shell.css`: isolated header/footer styling; subtle light-theme harmonization for SaaS product heroes while retaining page contents and modules.
- `public/assets/cb-site-shell.js`: route-sensitive active nav, mobile drawer, EN/ES persistence, price-form placeholder adaptation and title/description switching.
- `scripts/sync-site-shell.py`: reapply templates to 13 HTML pages. Run `python3 culturalbrain/scripts/sync-site-shell.py --check` in CI before deploy. Do **not** edit generated header/footer blocks on individual pages.

No framework or SPA migration is needed: route changes are normal static HTML navigations, while their layout/header remain identical.
