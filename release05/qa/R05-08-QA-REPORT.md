# Release 05 — R05-08 QA and Publication Gate
Date: 2026-11-21
Status: **QA TECHNICAL PASS, RELEASE NOT APPROVED TO MERGE/PRODUCTION**.
Branch: `release/05-intelligence-universe-loop` · PR: https://github.com/Pablitobjj/repo-ecosistema-landings/pull/30
Tested source SHA: `da43c068bf8bf69b39ddf28ac7962180ee001cd5`.
Production baseline: `c8ecb9d85fd976858636249b4ed5125c86679f90` (Release 04), unchanged.

## Evidence (exact source SHA)
1. GitHub static checks of **14/14 routes**: 1 H1, exact canonical, balanced HTML containers, valid JSON-LD where present, no missing local assets or broken page anchors, EN/ES markup, expected route mapping. All 14 PASS.
2. Vercel GitHub statuses: Cultural Brain and Hispaño success, both preview deployments READY: CB `dpl_Fj9oxZ2oLQZgPj5DAH9beWjwck7r`, Hispaño `dpl_2qDFWRuybNNtknwVQX9zAykApJWq`, matching SHA above.
3. Isolated temporary Vercel Sandbox `cb-release05-qa-20261121` cloned **exact SHA above**, without modifying/deprotecting Vercel previews. Tests executed inside sandbox under `/vercel/repo-ecosistema-landings`:
   - `node release05/intelligence-universe/validate.cjs`: PASS, counts 19/54/11/20/5/10, 14 pages, 5 assets.
   - `node release05/intelligence-universe/validate-widget.cjs`: PASS, browser data parity, required controls and accessible fallback checks.
   - Chromium/Playwright browser tests on local static HTTP servers: **14/14 desktop routes**, HTTP 200, H1 unique, no uncaught JS errors. Two non-loaded `loading=lazy` images outside the viewport were inspected; no failed HTTP image requests. Do not mark these as actual 404s.
   - Intelligence Universe functional test: **19 clickable SVG family nodes, 6 modes, search "ROAS" → 1 result, decision panel populated, zoom `scale(1.15)`, 19-choice native mobile family selector**. PASS.
   - Ouroboros pause control: visible and `aria-pressed` changed to `true` on click. PASS.
   - Mobile CB /platform, Home and /learning-loop: locale button changes document.lang to `es`, translated H1; no horizontal overflow; no JS page errors.
   - Responsive sweep **14 routes × (390px, 768px) = 28/28**, zero overflow, zero JS page errors, zero broken same-page anchors.
4. Preview URLs remain SSO protected; **browser tests used an isolated clone, not the protected Vercel deployment**. HTML structural and functional tests PASS, but actual post-deployment visual screenshot and manual review still **NOT VERIFIED**. Captured sandbox screenshots are ephemeral QA artifacts, not product screenshots.

## Blocking gates (not false PASS)
- **Product-authentic screenshots: 0/6**. The deliverable is specified in `release05/product-evidence/screenshots-manifest.json` and `BRIEF_FOR_CODEX_PMM.md`. None can be claimed completed. Do not substitute a synthetic UI picture.
- **Source-code-level semantic catalog**: authoritative current application `services/conocimiento/catalogo.json` and CEREBRO contracts not available in connected GitHub. The 54 keys are **report-derived display labels**, not canonical backend field identifiers. Their canonical IDs are intentionally null. Do not pretend code-level catalog verified.
- **Manual visual review of protected preview production builds**: SSO protection prevented independent direct browser access. Local Chromium testing is evidence of code behavior, not complete production visual acceptance. End-to-end journey with authenticated product data unavailable.
- Full keyboard/screen-reader/a11y audit, image-by-image visual approval and production smoke checks remain NOT VERIFIED.
- No independent evidence for any quantitative commercial performance claim.

## Release decision
**NO GO for main merge and production deployment at this checkpoint.** Keep PR #30 DRAFT and production Release 04 stable. Do not bypass protection by publishing a public preview URL.
Technical branch work for runs R05-01…07 has been completed or prototyped; R05-08 is **IN QA / BLOCKED BY PRODUCT EVIDENCE AND FINAL VISUAL SIGNOFF**, not published.

## Completion path (avoid repeating completed work)
1. Codex PMM captures and verifies up to six real product screens with permissions and demo data; record exact image paths and provenance in manifest.
2. Retrieve authoritative current app catalog to replace unverified IDs, or explicitly approve display-only editorial catalog with a non-backend visualization before release.
3. Product screenshots are inserted where manifest specifies (max six); maintain their alt EN/ES and mobile crops; no made-up data.
4. Repeat targeted browser testing on CB Home/Platform/learning-loop and HI Home/Platform after screenshot integration. Conduct manual visual comparison and keyboard/screen reader check.
5. Review every claim/SEO metadata against approved copy; then greenlight PR for main merge, validate BOTH production deployments by live URL and record rollback links.
6. Update Google Doc, tracking sheet (gid 1017), handoffs (gid 1018) with evidence. Do not mark publication before confirmed.

## Rollback
Backup Git branch `backup/pre-release05-20261121` at `c8ecb9d85fd976858636249b4ed5125c86679f90`.
Vercel Release 04 production baselines: CB `dpl_AeFrqysiwTjBeCEDqKviWMJ2RpyY`, HI `dpl_Eowv9vwha7NwmjefeR3d7TyiAqpp`. Both checked READY before closing this QA.
