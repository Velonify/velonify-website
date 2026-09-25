#!/usr/bin/env python3
"""Adds the Ratgeber/Guides link to header, mobile menu and footer of every hand-built page.

Idempotent: pages that already carry the link are left alone. Run once after a new page
was exported from the design canvas:  python3 _ratgeber/nav.py [--dry]
"""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DRY = '--dry' in sys.argv

LABEL = {'de': ('Ratgeber', '/ratgeber/'), 'en': ('Guides', '/en/guides/')}
MENU_STYLE = ("font-family: 'Krona One', 'Arial Narrow', sans-serif; font-weight: 400; text-transform: uppercase; "
              "font-size: 26px; line-height: 1.1; color: #FFFFFF; padding: 14px 0 14px 0px; "
              "border-bottom: 1px solid rgba(255,255,255,0.14); animation-delay: 0.46s;")


FIX = '.menu-panel > * { flex-shrink: 0; }'


def patch(html, lang):
    label, href = LABEL[lang]
    n = 0
    # the extra menu entry must not squeeze the CTA at the bottom of the mobile menu
    if FIX not in html:
        html, k = re.subn(r'(\.menu-link \{ animation: fadeUp[^}]*\})', f'\\1 {FIX}', html, count=1)
        n += k
    if f'href="{href}"' in html:
        return html, n
    # desktop header: before the Kontakt/Contact link
    html, k = re.subn(r'(<a class="navlink" href="(?:/en/|/)?#kontakt"[^>]*>(?:Kontakt|Contact)</a>)',
                      f'<a class="navlink" href="{href}" style="color: #FFFFFF;">{label}</a>\n      \\1', html)
    n += k
    # mobile menu: before the Kontakt/Contact entry
    html, k = re.subn(r'(<a class="menu-link" href="(?:/en/|/)?#kontakt")',
                      f'<a class="menu-link" href="{href}" style="{MENU_STYLE}">{label}</a>\n      \n        \\1', html)
    n += k
    # footer: after Cases
    html, k = re.subn(r'(<footer[^>]*>.*?<a class="navlink" href="(?:/en/|/)?#cases"[^>]*>Cases</a>)',
                      f'\\1\n      <a class="navlink" href="{href}" style="color: #FFFFFF;">{label}</a>', html, flags=re.S)
    n += k
    return html, n


def main():
    for f in sorted(ROOT.rglob('index.html')):
        rel = f.relative_to(ROOT).as_posix()
        if rel.startswith(('ratgeber/', 'en/guides/', '_ratgeber/')):
            continue
        lang = 'en' if rel.startswith('en/') else 'de'
        src = f.read_text(encoding='utf-8')
        out, n = patch(src, lang)
        print(f'{n:2d}  {rel}')
        if n and not DRY:
            f.write_text(out, encoding='utf-8')


if __name__ == '__main__':
    main()
