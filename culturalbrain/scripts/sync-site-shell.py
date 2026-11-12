#!/usr/bin/env python3
"""Reapply the canonical Cultural Brain header/footer templates to 13 static pages.

Run: python3 culturalbrain/scripts/sync-site-shell.py
Check only: python3 culturalbrain/scripts/sync-site-shell.py --check
Preserves each page's content, metadata, sections, and form behavior outside markers.
"""
from pathlib import Path
import sys

ROOT=Path(__file__).resolve().parents[1]
PAGES=["cultural_brain_index.html","cultural_brain_nosotros.html","cultural_brain_precios.html","cultural_brain_resources.html","cb_research_center.html","cb_cerebro.html","cb_sofia.html","cb_pulse.html","cb_how_it_works.html","cb_demo.html","cb_platform.html","cb_solutions_agencies.html","cb_solutions_brands.html"]
for name in PAGES:
    path=ROOT/"public"/name
    text=path.read_text(encoding="utf-8")
    new=text
    for kind in ("HEADER","FOOTER"):
        begin="<!-- CB_SITE_SHELL_"+kind+"_START -->"
        end="<!-- CB_SITE_SHELL_"+kind+"_END -->"
        source=(ROOT/"site-shell"/("header.html" if kind=="HEADER" else "footer.html")).read_text(encoding="utf-8").strip()
        if begin not in new or end not in new:
            raise RuntimeError(f"{path} is missing {kind} markers")
        start=new.index(begin)
        finish=new.index(end,start)+len(end)
        new=new[:start]+source+new[finish:]
    if sys.argv[1:]==["--check"]:
        if text!=new:raise SystemExit(f"Outdated shared shell: {path}")
    elif text!=new:
        path.write_text(new,encoding="utf-8")
        print("Synced",path.name)
print("Shared navigation: 13/13 pages consistent")
