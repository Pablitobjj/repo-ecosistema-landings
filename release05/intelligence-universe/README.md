# Release 05 · Intelligence Universe · Source of Truth (R05-01)

This directory contains the **source-grounded editorial dataset** and visual architecture of Cultural Brain Release 05. R05.1 (2026-11-24) updates the existing public Intelligence Universe data bindings and validators only; it does not change application behavior, routes, main visual design, or the meanings of the source registers.

## Provenance and verification

Labels, family groupings and EN copy come from the five Markdown reports audited as of 2026-11-20 (sources below). `model.v1.json` lists **19 families, 54 typed keys, 11 knowledge types, 20 selection profile IDs, five decision domains and ten recommendation types**. These numbers count entries in the unified knowledge catalog and the CEREBRO contracts, **not all fields available throughout Cultural Brain**.

**Canonical binding (model 0.2.0-canonical-bound-local, 2026-11-23).** Every technical identifier was reconciled against the local Cultural Brain app source:

| Model field | App source registry |
|---|---|
| `families[].keys[].canonical_key_id` (54) | `services/conocimiento/catalogo.json` → `claves` (per-key line in `source_evidence`) |
| `selection_profiles[].id` (20) | `services/conocimiento/catalogo.json` → `decisiones` |
| `knowledge_types[].canonical_id` (11) | `services/conocimiento/unidad.py` → `TIPOS` |
| `cerebro_decision_domains[].canonical_domain_id` (5) | `services/cerebro/contracts.py` → `DECISION_KINDS` |
| `recommendation_types[].canonical_type_id` (10) | `services/cerebro/contracts.py` → `REC_KINDS` |

The sha256 of each file is recorded in `verification.code_registries`.

**What this is not.** `verification.status` is `local_source_registry_reconciled_not_deployment_certified`. The counts are backed by local code. They are **not** a certification of the PythonAnywhere deployment, not a commit-pinned release, and not a count of complete end-to-end processes. Do not present them that way on any page.

**Editorial vs technical identifiers.** They stay in separate fields and are never interchangeable:

- Editorial locators: family `Fxx`, key `display_id` `Fxx/NN`, `presentation_id` and `ordinal`. These are for the site only and must never be sent to the backend as IDs.
- Technical IDs live only in `canonical_*` fields.
- The one place the two differ by name is the recommendation type `presentation_id: "defer"`, which maps to the canonical `"postpone"`.

The five knowledge domains are editorial groupings; they do not introduce new canonical families. Zero typed keys ≠ zero structured audience, cultural or media information: these families also permit qualitative findings and use specialized domain contracts.

Source reports: CB_MAPA_PRODUCTO_CONOCIMIENTO_CEREBRO_LEARNING_20261120.md lines 35–76 and 78–126; CB_CIERRE_GAP_ANALYSIS_20261120.md lines 40–65; CB_CIERRE_ROADMAP_20261120.md; CB_CIERRE_QA_E2E_20261120.md; CB_HANDOFF_LANDING_CULTURALBRAIN_NET_PROMESA_DIFERENCIAL_20261120.md.

## Files

- `model.v1.json`: knowledge domains, 19 family records, 54 keys with editorial locator + canonical ID, 11 types, 20 selector profiles, 5 CEREBRO domains, 10 recommendation types.
- `architecture.v1.json`: Loop/Universe presentation, operation ownership, source-grounded vs target-state graph edges, 14 page/asset map, guardrails.
- `sync-assets.cjs`: copies both manifests to `culturalbrain/public/assets/data/` (the browser-served copies). Run it after any change to either manifest.
- `validate.cjs`: dependency-free Node contract tests. They cover counts, uniqueness, exact canonical registries, the defer→postpone mapping, editorial/technical separation, catalog evidence, a frozen binding digest, and the "not deployment certified" wording.
- `validate-widget.cjs`: checks that the browser JSON is identical to the source, the bindings are present, and the widget never renders canonical IDs as labels.

```
node release05/intelligence-universe/sync-assets.cjs
node release05/intelligence-universe/validate.cjs
node release05/intelligence-universe/validate-widget.cjs
```

## Changing a binding

1. Re-read the registry in the app source (table above) and confirm the new ID exists there.
2. Update `canonical_*`, `source_evidence` and `verification.code_registries`. Never fill a canonical field with an editorial locator.
3. Update the frozen binding digest in `validate.cjs` deliberately. A digest failure means a binding changed without review.
4. Run sync + both validators.

Promoting `verification.status` beyond local requires two things: a comparison against the deployed app, and a separate decision.

## Visual evidence: Release 05 public; R05.1 scoped update

The binding, structure and QA above do not depend on these images.

| Image | State |
|---|---|
| `cerebro-decision-demo.webp`, `media-catalog-scale.webp`, `media-cultural-scores.webp`, `research-category-demo.webp` | Published since R05-09 (`culturalbrain/public/assets/screenshots/`); R05.1 updates **only** the Research image `research-category-demo.webp` from the Codex ZIP (new 1320×822 faithful crop) |
| `sofia-demo-final.webp` (Sofía) | **BLOCKED / PENDING.** Not in this repo. The existing Sofía demo conversation is under quality review and is not approved evidence. |
| `cerebro-strategy-final.webp` (CEREBRO with saved strategy) | **BLOCKED / PENDING.** Not in this repo. The demo brand has no saved strategy yet. |
| `learning-loop-final.webp` (Learning Loop) | **BLOCKED / PENDING.** Not in this repo. |

No page references the three pending files. R05.1 deliberately adds no new screenshots for Sofía, Learning Loop, Pulse, Audience, or alternative CEREBRO. Their status is unchanged. Do not add a screenshot until its product evidence is verified.

## Scope / ownership

Brand Research produces research; TAR/Audience produces audience proposals; Strategy V2 owns strategy; Planner calculates and versions plans; CEREBRO composes context-aware recommendations; Sofía coordinates; Closure evaluates and seals hypotheses; Pulse monitors source validity. Avoid depicting all operations as being owned by CEREBRO.

Marketing site: `repo-ecosistema-landings`, both Vercel projects; app source is outside this repo. R05 was published from `main` (PR #30, 2026-11-23). The approved R05.1 is developed on a separate release branch and merged only after passing local validators, browser QA and preview gates. App source is separate. The local-source-registry audit is **not** a verification of the deployed app code.

Tracked in: [R05 Runbook](https://docs.google.com/document/d/1hAaK77fhgfpmlGjekzLcg4hU9ElHAI9AgQDbo4etV4k/edit), [Tracker R05](https://docs.google.com/spreadsheets/d/163uj_m-z5LC35G5ZLQtzNDqp5CJsz7qIq8XmyaIr9WA/edit#gid=1017), [Session log](https://docs.google.com/spreadsheets/d/163uj_m-z5LC35G5ZLQtzNDqp5CJsz7qIq8XmyaIr9WA/edit#gid=1018).

## R05.1 change record (2026-11-24)

- Replace the report-derived 0.1.0 browser/source models with matching 0.2.0 canonical-bound-local JSON.
- Run updated `validate.cjs` and `validate-widget.cjs`. `canonical_*` identifiers remain data metadata only, never rendered in the public visitor-facing UI.
- Update only `research-category-demo.webp` to preserve the lower evidence row and correct its HTML image intrinsic dimensions. All other existing images remain unchanged.
- Provenance limitation: local source registries reconciled; PythonAnywhere deployment and full application end-to-end behavior are **not certified** by this change.
- Track deployment baseline, PR merge SHA, two Vercel production deployment IDs, QA, and rollback in Release 05 master tracker.
