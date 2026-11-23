# Release 05 · Intelligence Universe · Source of Truth (R05-01)

This directory contains the **source-grounded editorial dataset** and visual architecture for R05-02…R05-08. It does not change production pages, routes, styles, JavaScript or application behavior.

## Provenance and verification

The five source Markdown reports supplied by the owner were audited as of 2026-11-20. `model.v1.json` lists **19 families, 54 report-labelled typed keys, 11 knowledge types, 20 exact profile IDs, five decision domains and ten recommendation categories**. Numbers refer to the unified knowledge catalog only, **not all fields available throughout Cultural Brain**.

**IMPORTANT**: The actual app source `services/conocimiento/catalogo.json` (and current CEREBRO contract files) was not present in accessible `Pablitobjj/cultural-brain` main/staging on 2026-11-21. Canonical semantic keys are **intentionally null**. Presentation-only locators `Fxx/NN` must NEVER be used as backend identifiers or exposed as exact official IDs. `report-derived` is not `source-code-verified`. The current app source must be connected or provided before final contract-level R05-01 acceptance and before relying on exact key IDs in R05-03.

The JSON stores the accurate **ES display labels from the audited report**, not fabricated backend slugs. EN naming for UI may be added and reviewed in the next design stage. The five domains are editorial groupings; they do not introduce new canonical families. Zero typed keys ≠ zero structured audience/cultural/media information: these families also permit qualitative findings and use specialized domain contracts.

Source: CB_MAPA_PRODUCTO_CONOCIMIENTO_CEREBRO_LEARNING_20261120.md lines 35–76 and 78–126; CB_CIERRE_GAP_ANALYSIS_20261120.md lines 40–65; CB_CIERRE_ROADMAP_20261120.md; CB_CIERRE_QA_E2E_20261120.md; CB_HANDOFF_LANDING_CULTURALBRAIN_NET_PROMESA_DIFERENCIAL_20261120.md.

## Files

- `model.v1.json`: knowledge domains, 19 family records, 54 display keys, 11 types, 20 selector profiles, 5 CEREBRO domains, 10 recommendation types.
- `architecture.v1.json`: Loop/Universe presentation, operation ownership, source-grounded vs target-state graph edges, 14 page/asset map, guardrails.
- `validate.cjs`: dependency-free Node contract tests for counts, uniqueness, metadata, page coverage and canonical-ID safety.

## Source-of-truth upgrade checklist

1. Access the app deployment's **actual 2026 authoritative catalog** `services/conocimiento/catalogo.json`, along with `services/cerebro/contracts.py`, `services/cerebro/verticales.py`, and relevant knowledge/source schema. Never assume a 2025 or older GitHub tree represents the current app.
2. Extract exact keys, compare field by field against these 54 report labels, annotate owner/allowed operators and correct profile statuses as needed.
3. Replace `canonical_key_id:null` with code-verified values, mark `verification.status: source_code_verified` only after deterministic comparison; do not silently fill missing IDs with display IDs.
4. Validate tests; update PR and tracker R05-01 (complete) then unblock R05-03.
5. R05-02 can proceed on verified **high-level** domains and Loop, provided R05-01 unresolved canonical IDs stay clearly marked. Final Universe data binding is gated.

## Scope / ownership

Brand Research produces research; TAR/Audience produces audience proposals; Strategy V2 owns strategy; Planner calculates and versions plans; CEREBRO composes context-aware recommendations; Sofía coordinates; Closure evaluates and seals hypotheses; Pulse monitors source validity. Avoid depicting all operations as being owned by CEREBRO.

Marketing site: `repo-ecosistema-landings`, both Vercel projects; app source is outside this repo. All R05 implementation occurs on branch `release/05-intelligence-universe-loop`. No production merge until R05-08 QA and permission.

Tracked in: [R05 Runbook](https://docs.google.com/document/d/1hAaK77fhgfpmlGjekzLcg4hU9ElHAI9AgQDbo4etV4k/edit), [Tracker R05](https://docs.google.com/spreadsheets/d/163uj_m-z5LC35G5ZLQtzNDqp5CJsz7qIq8XmyaIr9WA/edit#gid=1017), [Session log](https://docs.google.com/spreadsheets/d/163uj_m-z5LC35G5ZLQtzNDqp5CJsz7qIq8XmyaIr9WA/edit#gid=1018).
