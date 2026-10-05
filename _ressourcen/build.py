#!/usr/bin/env python3
"""Builds the lead magnet pages under /ressourcen/ from the Markdown files in _ressourcen/.

    python3 _ressourcen/build.py

Most landing pages are not built here at all: netlify/functions/ressourcen-seite.mjs renders
/ressourcen/<slug>/ on request from the template this script writes to netlify/lib/magnet-vorlage.mjs, filled with
the texts of the active magnet in the hub. A file _ressourcen/<slug>.md is only needed for a hand-made page; it
becomes a static page /ressourcen/<slug>/, and static pages win over the function. The shared pages after the form and behind the links in the mail (danke, newsletter,
abmelden, hoppla …) are written on every build as well. Header, menu, footer and base styles come from the
Ratgeber build, so the pages look like the rest of the site. Only the Python standard library is used.

What happens after the form: netlify/functions/submission-created.mjs passes the entry to the Apps Script
in the CRM (apps-script/magnete), which stores it and sends the mail; the links in that mail run through
netlify/functions/magnet-link.mjs. File link, mail text and on/off switch are kept in the hub (Lead-Magnete),
not here – the slug is what ties both together.

Magnets of type "audit" (Shop-Roast) use a second template with a required shop address, a confirmation that the
person works for the shop and the number of free places. Their report is shown on /roast/<token>/ by
netlify/functions/roast-seite.mjs, in the frame this script writes to netlify/lib/roast-vorlage.mjs.
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / '_ressourcen'
sys.path.insert(0, str(ROOT / '_ratgeber'))
import build as rg  # noqa: E402  (header, footer, Markdown subset and styles of the Ratgeber)

BASE = '/ressourcen/'
SITE = rg.SITE
esc, inline = rg.esc, rg.inline

# Wording of the newsletter box. It is sent along with the form and stored in the CRM as proof of what was
# agreed to – change it here only, and mention the change in the commit.
NEWSLETTER_TEXT = ('Schickt mir zusätzlich den Velonify-Newsletter mit Praxiswissen zu Shopify, Tracking und '
                   'E-Mail-Marketing (etwa einmal im Monat). Abmelden geht jederzeit mit einem Klick.')

SHOPSYSTEME = [('', 'Bitte wählen'), ('shopify', 'Shopify'), ('magento', 'Magento'), ('shopware', 'Shopware'),
               ('woocommerce', 'WooCommerce'), ('anderes', 'Anderes'), ('keins', 'Noch kein Shop')]

CSS = rg.CSS + '\n' + (SRC / 'ressourcen.css').read_text(encoding='utf-8')
ROAST_CSS = (SRC / 'roast.css').read_text(encoding='utf-8')

# Shop-Roast: wording of the required box. Netlify keeps it with every submission.
SHOP_BESTAETIGT = 'Ich arbeite für diesen Shop oder betreue ihn.'


def body(text):
    """Markdown below the head: `##` headings by hand, the rest with the Ratgeber's block parser (it splits at `##` itself)."""
    out = []
    for i, chunk in enumerate(re.split(r'(?m)^## ', text.strip())):
        head, _, rest = chunk.partition('\n') if i > 0 else ('', '', chunk)
        if head.strip():
            out.append(f'<h2 id="{rg.slugify(head)}">{inline(head.strip())}</h2>')
        out.append(rg.render_blocks(rg.blocks(rest.splitlines())))
    return '\n'.join(x for x in out if x)


SLUG = re.compile(r'^[a-z0-9]+(?:-[a-z0-9]+)*$')


def parse(path):
    raw = path.read_text(encoding='utf-8')
    m = re.match(r'---\n(.*?)\n---\n(.*)', raw, re.S)
    meta = {}
    for line in m.group(1).splitlines():
        k, _, v = line.partition(':')
        v = v.strip()
        if len(v) >= 2 and v[0] == v[-1] == '"':
            v = v[1:-1]
        meta[k.strip()] = v
    meta['slug'] = path.stem
    if not SLUG.match(meta['slug']):
        sys.exit(f'{path.name}: Dateiname nur aus Kleinbuchstaben, Ziffern und Bindestrichen, z. B. shopify-skills.md.')
    if meta['slug'] in SEITEN or meta['slug'].split('/')[0] in {k.split('/')[0] for k in SEITEN}:
        sys.exit(f'{path.name}: „{meta["slug"]}“ ist schon eine feste Seite unter /ressourcen/. Bitte die Datei umbenennen.')
    meta['body'] = body(m.group(2))
    for key in ('titel', 'description', 'lead'):
        if not meta.get(key):
            sys.exit(f'{path.name}: Feld „{key}“ fehlt im Kopf.')
    return meta


def document(title, desc, path, main, robots='noindex, follow', image=None, extra_head='', css=''):
    """A full page: Ratgeber chrome, own meta tags. Magnet pages are reached by link, not by search."""
    # Not rg.page_chrome: that one marks „Ratgeber“ in the menu as the current page.
    head, dh, mh = rg.chrome('de')
    dh = dh.replace('href="/en/legal-notice/"', 'href="/en/"')
    mh = mh.replace('href="/en/legal-notice/"', 'href="/en/"').replace('href="#kontakt"', 'href="/#kontakt"')
    url = SITE + path
    image = image or SITE + '/assets/img/og-image.png'
    meta = f'''<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{url}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
<meta property="og:site_name" content="Velonify">
<meta property="og:image" content="{image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="{image}">{extra_head}'''
    return f'''<!doctype html>
<html lang="de">
<head>
{meta}
{head.strip()}
<style>
{CSS}{css}
</style>
</head>
<body>
<a class="rg-skip" href="#inhalt">Zum Inhalt springen</a>
<div class="v v-desktop rg-bar"><div>
{dh}
</div></div>
<div class="v v-mobile rg-bar"><div>
{mh}
</div></div>
<main>
{main}
</main>
{rg.footer('de')}
</body>
</html>
'''


def hero(eyebrow, title, lead=''):
    eb = f'<p class="rg-eyebrow">{esc(eyebrow)}</p>' if eyebrow else ''
    ld = f'<p class="rg-lead">{esc(lead)}</p>' if lead else ''
    return f'''<section id="top" class="rg-hero rs-hero">
<svg class="mark-a" viewBox="0 44 1278 813" fill="#45142D" aria-hidden="true">{rg.MARK}</svg>
<div class="rg-wrap rg-hero-in">
{eb}
<h1>{esc(title)}</h1>
{ld}
</div>
</section>'''


def formular(m):
    optionen = ''.join(f'<option value="{v}"{" disabled selected" if not v else ""}>{esc(t)}</option>' for v, t in SHOPSYSTEME)
    utm = ''.join(f'<input type="hidden" name="{k}" value="">' for k in ('utm_source', 'utm_medium', 'utm_campaign', 'utm_content'))
    audit = m.get('typ') == 'audit'
    knopf = m.get('cta') or ('Shop prüfen lassen' if audit else 'Kostenlos anfordern')
    titel = m.get('form_titel') or ('Shop prüfen lassen' if audit else 'Per Mail zuschicken lassen')
    if audit:
        shop = ('<div class="rs-field"><label for="rs-shop">Shop-URL</label><input id="rs-shop" name="shop" type="text" inputmode="url" '
                'autocomplete="url" required placeholder="meinshop.de" minlength="4" maxlength="200"></div>')
        bestaetigt = f'<label class="rs-check"><input type="checkbox" name="shop_bestaetigt" value="ja" required><span>{esc(SHOP_BESTAETIGT)}</span></label>'
        klein = ('Du bekommst gleich eine Bestätigung und innerhalb von zwei Werktagen den Report per Mail. Für den Newsletter kommt '
                 'zusätzlich ein Bestätigungslink. Mehr dazu in der <a href="/datenschutz/#shop-roast">Datenschutzerklärung</a>.')
        danke = f'{BASE}danke/roast/'
    else:
        shop = ('<div class="rs-field"><label for="rs-shop">Shop-URL <span>(optional)</span></label><input id="rs-shop" name="shop" type="text" '
                'inputmode="url" autocomplete="url" placeholder="meinshop.de" maxlength="200"></div>')
        bestaetigt = ''
        klein = ('Den Link schicken wir an deine E-Mail-Adresse. Für den Newsletter kommt zusätzlich ein Bestätigungslink. Mehr dazu in der '
                 '<a href="/datenschutz/#ressourcen">Datenschutzerklärung</a>.')
        danke = f'{BASE}danke/'
    plaetze = m.get('plaetze', '')
    return f'''<form class="rs-form" name="magnet" method="POST" action="{danke}" data-netlify="true" netlify-honeypot="bot-field" aria-labelledby="rs-form-titel">
<input type="hidden" name="form-name" value="magnet">
<input type="hidden" name="magnet" value="{esc(m["slug"])}">
<input type="hidden" name="newsletter_text" value="{esc(NEWSLETTER_TEXT)}">
{utm}
<p hidden><label>Nicht ausfüllen: <input name="bot-field"></label></p>
<h2 id="rs-form-titel">{esc(titel)}</h2>
{plaetze}
<div class="rs-field"><label for="rs-vorname">Vorname</label><input id="rs-vorname" name="vorname" type="text" autocomplete="given-name" required maxlength="80"></div>
<div class="rs-field"><label for="rs-email">E-Mail</label><input id="rs-email" name="email" type="email" autocomplete="email" inputmode="email" required placeholder="name@shop.de" maxlength="200"></div>
{shop}
<div class="rs-field"><label for="rs-system">Shopsystem</label><select id="rs-system" name="shopsystem" required>{optionen}</select></div>
{bestaetigt}
<label class="rs-check"><input type="checkbox" name="newsletter" value="ja"><span>{esc(NEWSLETTER_TEXT)}</span></label>
<button type="submit" class="btn btn-ice rg-btn rs-btn">{esc(knopf)} {rg.ARROW}</button>
<p class="rs-klein">{klein}</p>
</form>
<script>
(function () {{
  var p = new URLSearchParams(location.search), f = document.querySelector('form[name="magnet"]');
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(function (k) {{
    if (p.get(k)) f.elements[k].value = p.get(k).slice(0, 100);
  }});
  f.addEventListener('submit', function () {{ f.querySelector('button[type="submit"]').disabled = true; }});
}})();
</script>'''


def magnet_page(m):
    path = f'{BASE}{m["slug"]}/'
    image = SITE + m['bild'] if m.get('bild') else None
    main = hero(m.get('eyebrow', 'Kostenlos'), m['titel'], m['lead'])
    main += f'''
<div id="inhalt" class="rg-wrap rs-body">
<article class="rg-article rs-inhalt">
{m["body"]}
</article>
<aside class="rs-aside">
{formular(m)}
</aside>
</div>'''
    return document(m.get('seo_title') or f'{m["titel"]} | Velonify', m['description'], path, main, image=image)


# Placeholders of the template; the function fills them with the texts from the hub (already HTML-escaped).
VORLAGE = {'slug': '%%SLUG%%', 'titel': '%%TITEL%%', 'lead': '%%UNTERTITEL%%', 'description': '%%UNTERTITEL%%',
           'body': '%%INHALT%%', 'cta': '%%KNOPF%%'}
# Shop-Roast: the function also fills in how many places are left (or nothing without a limit).
VORLAGE_AUDIT = {**VORLAGE, 'typ': 'audit', 'eyebrow': 'Kostenlos · Shop-Roast', 'plaetze': '%%PLAETZE%%'}


def formular_definition():
    """The form once more, hidden and without content: Netlify only accepts submissions for forms it found in
    static HTML at deploy time, and the template pages are not static."""
    felder = ['form-name', 'magnet', 'newsletter_text', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content',
              'vorname', 'email', 'shop', 'shopsystem', 'newsletter', 'shop_bestaetigt']
    inputs = ''.join(f'<input type="hidden" name="{f}" value="{"magnet" if f == "form-name" else ""}">' for f in felder)
    return (f'<form name="magnet" method="POST" action="{BASE}danke/" data-netlify="true" netlify-honeypot="bot-field" hidden>'
            f'{inputs}<input name="bot-field"></form>')


def einfache_seite(path, eyebrow, title, absaetze, extra=''):
    text = ''.join(f'<p>{inline(a)}</p>' for a in absaetze)
    main = hero(eyebrow, title) + f'''
<div id="inhalt" class="rg-wrap rs-einfach">
<div class="rg-article">
{text}
{extra}
</div>
</div>'''
    return document(f'{title} | Velonify', rg.plain(absaetze[0]), path, main, robots='noindex, nofollow')


def token_formular(ziel, knopf):
    """Confirmation by button, not by opening the link: mail scanners open links on their own."""
    return f'''<form class="rs-token" method="POST" action="{ziel}">
<input type="hidden" name="t" value="">
<button type="submit" class="btn btn-ice rg-btn rs-btn">{esc(knopf)} {rg.ARROW}</button>
</form>
<script>
(function () {{
  var t = new URLSearchParams(location.search).get('t') || '', f = document.querySelector('.rs-token');
  if (!/^[a-f0-9]{{32}}$/.test(t)) {{ location.replace('{BASE}hoppla/'); return; }}
  f.elements.t.value = t;
  f.addEventListener('submit', function () {{ f.querySelector('button').disabled = true; }});
}})();
</script>'''


# Fixed pages after the form; their names are taken (the hub refuses them as magnet addresses as well).
SEITEN = {
    'danke': ('Fast geschafft', 'Schau in dein Postfach', [
        'Die Mail mit dem Link ist unterwegs. Sie kommt von Lukas von Velonify und ist meist nach einer Minute da.',
        'Nichts angekommen? Schau im Spam- oder Werbe-Ordner nach. Hilft das nicht, schreib uns an [hallo@velonify.de](mailto:hallo@velonify.de).',
        'Hast du den Newsletter angehakt, steckt in der Mail zusätzlich ein Knopf zum Bestätigen. Erst dann tragen wir dich ein.',
    ], 'formular_definition'),
    'danke/roast': ('Danke', 'Wir schauen uns deinen Shop an', [
        'Die Bestätigung ist per Mail unterwegs. Sie kommt von Lukas von Velonify und ist meist nach einer Minute da.',
        'Innerhalb von zwei Werktagen bekommst du den Report: vier geprüfte Bereiche und drei Beobachtungen aus unserem Team. Waren schon alle Plätze vergeben, steht das in der Mail. Du bist dann auf der Warteliste.',
        'Nichts angekommen? Schau im Spam- oder Werbe-Ordner nach. Hilft das nicht, schreib uns an [hallo@velonify.de](mailto:hallo@velonify.de).',
    ], ''),
    'newsletter': ('Newsletter', 'Anmeldung bestätigen', [
        'Ein Klick noch, dann bekommst du etwa einmal im Monat Praxiswissen zu Shopify, Tracking und E-Mail-Marketing von uns.',
    ], 'newsletter_formular'),
    'newsletter/bestaetigt': ('Newsletter', 'Du bist dabei', [
        'Danke! Die nächste Ausgabe landet in deinem Postfach. Abmelden geht in jeder Mail mit einem Klick.',
    ], ''),
    'abmelden': ('Newsletter', 'Vom Newsletter abmelden', [
        'Schade, dass du gehst. Mit dem Knopf bist du sofort abgemeldet und bekommst keinen Newsletter mehr von uns.',
    ], 'abmelden_formular'),
    'abgemeldet': ('Newsletter', 'Du bist abgemeldet', [
        'Wir schicken dir keinen Newsletter mehr. War das ein Versehen, kannst du dich bei jedem kostenlosen Download wieder anmelden.',
    ], ''),
    'hoppla': ('Hoppla', 'Dieser Link funktioniert nicht', [
        'Entweder ist der Link unvollständig angekommen oder der Download ist nicht mehr verfügbar.',
        'Schreib uns kurz an [hallo@velonify.de](mailto:hallo@velonify.de), dann schicken wir dir das Richtige.',
    ], ''),
}


def roast_vorlage():
    """Frame of the Shop-Roast report page; netlify/functions/roast-seite.mjs fills in the report (netlify/lib/report.mjs)."""
    main = hero('Shop-Roast', '%%TITEL%%', '%%UNTERTITEL%%') + '\n%%INHALT%%'
    extra = '\n<meta name="referrer" content="no-referrer">'
    return document('%%TITEL%% | Velonify', 'Euer persönlicher Shop-Report von Velonify.', f'/roast/%%TOKEN%%/', main,
                    robots='noindex, nofollow', extra_head=extra, css='\n' + ROAST_CSS)


def main():
    magnete = [parse(p) for p in sorted(SRC.glob('*.md')) if p.name != 'README.md']
    for m in magnete:
        out = ROOT / BASE.strip('/') / m['slug'] / 'index.html'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(magnet_page(m), encoding='utf-8')
        print('wrote', out.relative_to(ROOT))
    out = ROOT / 'netlify' / 'lib' / 'magnet-vorlage.mjs'
    out.write_text('// Generated by _ressourcen/build.py – do not edit. Templates of the landing pages rendered by\n'
                   '// netlify/functions/ressourcen-seite.mjs; %%NAME%% are filled with the texts from the hub.\n'
                   '// `audit` is the Shop-Roast variant (shop address required, free places).\n'
                   f'export default {json.dumps(magnet_page(VORLAGE), ensure_ascii=False)};\n'
                   f'export const audit = {json.dumps(magnet_page(VORLAGE_AUDIT), ensure_ascii=False)};\n', encoding='utf-8')
    print('wrote', out.relative_to(ROOT))
    out = ROOT / 'netlify' / 'lib' / 'roast-vorlage.mjs'
    out.write_text('// Generated by _ressourcen/build.py – do not edit. Frame of the Shop-Roast report page rendered by\n'
                   '// netlify/functions/roast-seite.mjs; %%NAME%% are filled per report.\n'
                   f'export default {json.dumps(roast_vorlage(), ensure_ascii=False)};\n', encoding='utf-8')
    print('wrote', out.relative_to(ROOT))
    formulare = {
        'newsletter_formular': token_formular('/m/n', 'Ja, Newsletter bestätigen'),
        'abmelden_formular': token_formular('/m/a', 'Jetzt abmelden'),
        'formular_definition': formular_definition(),
    }
    for name, (eyebrow, title, absaetze, extra) in SEITEN.items():
        path = f'{BASE}{name}/'
        out = ROOT / path.strip('/') / 'index.html'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(einfache_seite(path, eyebrow, title, absaetze, formulare.get(extra, '')), encoding='utf-8')
        print('wrote', out.relative_to(ROOT))


if __name__ == '__main__':
    main()
