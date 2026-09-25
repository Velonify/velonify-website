#!/usr/bin/env python3
"""Builds the Ratgeber (DE) and Guides (EN) pages from the Markdown files in _ratgeber/de and _ratgeber/en.

    python3 _ratgeber/build.py

Writes ratgeber/**, en/guides/**, updates sitemap.xml and llms.txt. Header and mobile menu are taken
from impressum/ and en/legal-notice/, so navigation changes there carry over on the next build.
Only the Python standard library is used, no install step.
"""
import html, json, math, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / '_ratgeber'
SITE = 'https://velonify.de'
LOGO = SITE + '/assets/img/velonify-wordmark.png'
ORG_ID = SITE + '/#organization'

AUTHORS = {
    'lukas': {'name': 'Lukas Hanke', 'initials': 'LH',
              'role': {'de': 'Backend, CRM & Integrationen', 'en': 'Backend, CRM & integrations'},
              'bio': {'de': 'Verbindet Shop, CRM und Drittsysteme über stabile Schnittstellen.',
                      'en': 'Connects stores, CRM and third-party systems through stable interfaces.'}},
    'johannes': {'name': 'Johannes Braun', 'initials': 'JB',
                 'role': {'de': 'Frontend & Creative Direction', 'en': 'Frontend & creative direction'},
                 'bio': {'de': 'Verantwortet Gestaltung, Frontend und individuelle Code-Lösungen.',
                         'en': 'Owns design, frontend and custom code solutions.'}},
}

L = {
    'de': {
        'base': '/ratgeber/', 'home': '/', 'contact': '/#kontakt', 'template': 'impressum/index.html',
        'switch_from': '/en/legal-notice/', 'locale': 'de-DE', 'og_locale': 'de_DE',
        'start': 'Start', 'index': 'Ratgeber', 'toc': 'Inhalt', 'summary': 'Kurz gesagt',
        'updated': 'Stand', 'minutes': 'Min. Lesezeit', 'by': 'Von', 'author_label': 'Über den Autor',
        'sources': 'Quellen', 'related': 'Weiterlesen', 'read': 'Artikel lesen', 'service': 'Zur Leistung',
        'cta_title': 'Fragen zu eurem Shop?',
        'cta_text': 'In 30 Minuten klären wir Ausgangslage, Ziel und nächste Schritte. Kostenlos und unverbindlich, direkt mit der Person, die euer Projekt später umsetzt.',
        'cta_button': 'Projekt anfragen',
        'index_title': 'Ratgeber',
        'index_seo': 'Ratgeber: Shopify-Migration, Tracking & E-Commerce | Velonify',
        'index_desc': 'Praxiswissen aus unseren Projekten: Shopify-Migration, Magento-Supportende, Tracking und Performance Marketing. Konkret, mit Zahlen und Quellen.',
        'index_lead': 'Was wir in Projekten lernen, schreiben wir hier auf: konkret, mit Zahlen und mit Quellen. Für Shopbetreiber, die eine Entscheidung vorbereiten.',
        'skip': 'Zum Inhalt springen',
    },
    'en': {
        'base': '/en/guides/', 'home': '/en/', 'contact': '/en/#kontakt', 'template': 'en/legal-notice/index.html',
        'switch_from': '/impressum/', 'locale': 'en', 'og_locale': 'en_GB',
        'start': 'Home', 'index': 'Guides', 'toc': 'Contents', 'summary': 'In short',
        'updated': 'Updated', 'minutes': 'min read', 'by': 'By', 'author_label': 'About the author',
        'sources': 'Sources', 'related': 'Keep reading', 'read': 'Read article', 'service': 'See the service',
        'cta_title': 'Questions about your store?',
        'cta_text': 'In 30 minutes we clarify where you stand, where you want to go and what comes next. Free and without obligation, directly with the person who will build your project.',
        'cta_button': 'Start a project',
        'index_title': 'Guides',
        'index_seo': 'Guides: Shopify Migration, Tracking & E-commerce | Velonify',
        'index_desc': 'Practical knowledge from our projects: Shopify migration, Magento end of support, tracking and performance marketing. Specific, with numbers and sources.',
        'index_lead': 'What we learn in projects, we write down here: specific, with numbers and with sources. For store owners preparing a decision.',
        'skip': 'Skip to content',
    },
}

MONTHS = {'de': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']}

MARK = ('<path d="M0 242 L199 44 L412 44 L412 456 L0 456 Z"></path>'
        '<path d="M412 456 L570 456 L982 44 L1278 44 L1278 292 L702 857 L412 857 Z"></path>')
ARROW = ('<svg class="arrow" width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" '
         'stroke-width="2" aria-hidden="true"><path d="M0 6 H16 M11 1 L16 6 L11 11"></path></svg>')


def esc(s):
    return html.escape(s, quote=True)


def fmt_date(iso, lang):
    y, m, d = (int(x) for x in iso.split('-'))
    return f'{d}. {MONTHS["de"][m - 1]} {y}' if lang == 'de' else f'{d} {MONTHS["en"][m - 1]} {y}'


def slugify(s):
    s = s.lower()
    for a, b in (('ä', 'ae'), ('ö', 'oe'), ('ü', 'ue'), ('ß', 'ss')):
        s = s.replace(a, b)
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


# ---------- Markdown (the small subset the articles use) ----------

def inline(text):
    codes = []

    def keep_code(m):
        codes.append(f'<code>{esc(m.group(1))}</code>')
        return f'\x00{len(codes) - 1}\x00'

    text = re.sub(r'`([^`]+)`', keep_code, text)
    text = esc(text).replace('&#x27;', "'")

    def link(m):
        label, url = m.group(1), html.unescape(m.group(2))
        ext = url.startswith('http')
        attrs = ' target="_blank" rel="noopener"' if ext else ''
        return f'<a href="{esc(url)}"{attrs}>{label}</a>'

    text = re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)', link, text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    return re.sub(r'\x00(\d+)\x00', lambda m: codes[int(m.group(1))], text)


def plain(text):
    text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
    return re.sub(r'[`*]', '', text)


def parse(path):
    raw = path.read_text(encoding='utf-8')
    m = re.match(r'---\n(.*?)\n---\n(.*)', raw, re.S)
    meta = {}
    for line in m.group(1).splitlines():
        k, _, v = line.partition(':')
        v = v.strip()
        if len(v) >= 2 and v[0] == v[-1] == '"':  # quoted so Obsidian reads the front matter as YAML
            v = v[1:-1]
        meta[k.strip()] = v
    meta['related'] = [x.strip() for x in meta.get('related', '').split(',') if x.strip()]
    if meta.get('service'):
        href, _, label = meta['service'].partition('|')
        meta['service'] = (href.strip(), label.strip())
    body = m.group(2)
    meta['words'] = len(re.findall(r'\w+', plain(body) + ' ' + meta['summary']))
    meta['sections'] = sections(body)
    return meta


def blocks(lines):
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
        elif line.startswith('### '):
            out.append(('h3', line[4:].strip()))
            i += 1
        elif line.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                cells = [c.strip() for c in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r':?-+:?', c) for c in cells):
                    rows.append(cells)
                i += 1
            out.append(('table', rows))
        elif re.match(r'- ', line):
            items = []
            while i < len(lines) and lines[i].startswith('- '):
                items.append(lines[i][2:].strip())
                i += 1
            out.append(('ul', items))
        elif re.match(r'\d+\. ', line):
            items = []
            while i < len(lines) and re.match(r'\d+\. ', lines[i]):
                items.append(re.sub(r'^\d+\. ', '', lines[i]).strip())
                i += 1
            out.append(('ol', items))
        else:
            para = []
            while i < len(lines) and lines[i].strip() and not re.match(r'(#{2,3} |\||- |\d+\. )', lines[i]):
                para.append(lines[i].strip())
                i += 1
            out.append(('p', ' '.join(para)))
    return out


def sections(body):
    secs = []
    for chunk in re.split(r'(?m)^## ', body):
        if not chunk.strip():
            continue
        head, _, rest = chunk.partition('\n')
        kind = 'text'
        km = re.search(r'\s*\{(faq|sources)\}\s*$', head)
        if km:
            kind, head = km.group(1), head[:km.start()]
        secs.append({'title': head.strip(), 'id': slugify(head), 'kind': kind, 'blocks': blocks(rest.splitlines())})
    return secs


def render_blocks(bl):
    out = []
    for kind, val in bl:
        if kind == 'p':
            out.append(f'<p>{inline(val)}</p>')
        elif kind == 'h3':
            out.append(f'<h3 id="{slugify(val)}">{inline(val)}</h3>')
        elif kind in ('ul', 'ol'):
            out.append(f'<{kind}>' + ''.join(f'<li>{inline(x)}</li>' for x in val) + f'</{kind}>')
        elif kind == 'table':
            head, *rows = val
            t = '<thead><tr>' + ''.join(f'<th scope="col">{inline(c)}</th>' for c in head) + '</tr></thead><tbody>'
            t += ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in rows) + '</tbody>'
            out.append(f'<div class="rg-table" role="region" tabindex="0"><table>{t}</table></div>')
    return '\n'.join(out)


def faq_items(sec):
    items, q, ans = [], None, []
    for kind, val in sec['blocks'] + [('h3', None)]:
        if kind == 'h3':
            if q:
                items.append((q, ans))
            q, ans = val, []
        elif q:
            ans.append(val)
    return items


# ---------- Page chrome from the hand-built pages ----------

def chrome(lang):
    src = (ROOT / L[lang]['template']).read_text(encoding='utf-8')
    head = src[src.index('<head>') + 6:src.index('</head>')]
    head = re.sub(r'<title>.*?</title>\s*', '', head, flags=re.S)
    head = re.sub(r'<meta (name="description"|property="og:[^"]+"|name="twitter:card")[^>]*>\s*', '', head)
    head = re.sub(r'<link rel="(canonical|alternate)"[^>]*>\s*', '', head)
    head = re.sub(r'<script type="application/ld\+json">.*?</script>\s*', '', head, flags=re.S)
    desk = src[src.index('<div class="v v-desktop">'):src.index('<div class="v v-mobile">')]
    dheader = desk[desk.index('<header'):desk.index('</header>') + 9]
    mob = src[src.index('<div class="v v-mobile">'):]
    mheader = mob[mob.index('<header'):mob.index('</nav>', mob.index('class="menu-panel"')) + 6]
    return head, dheader, mheader


def page_chrome(lang, counterpart):
    head, dh, mh = chrome(lang)
    base = L[lang]['base']
    sw = L[lang]['switch_from']
    dh = dh.replace(f'href="{sw}"', f'href="{counterpart}"')
    mh = mh.replace(f'href="{sw}"', f'href="{counterpart}"')
    mh = mh.replace('href="#kontakt"', f'href="{L[lang]["contact"]}"')
    dh = dh.replace(f'<a class="navlink" href="{base}" style="color: #FFFFFF;">',
                    f'<a class="navlink" href="{base}" aria-current="page" style="color: #C5D8E6;">')
    return head, dh, mh


def footer(lang):
    t = L[lang]
    legal = [('/impressum/', 'Impressum'), ('/datenschutz/', 'Datenschutz')] if lang == 'de' else \
            [('/en/legal-notice/', 'Legal notice'), ('/en/privacy/', 'Privacy')]
    links = [(t['home'], t['start']), (t['home'] + '#cases', 'Cases'), (t['base'], t['index'])] + legal
    nav = ''.join(f'<a class="navlink" href="{h}">{esc(x)}</a>' for h, x in links)
    ig = 'Velonify auf Instagram' if lang == 'de' else 'Velonify on Instagram'
    li = 'Velonify auf LinkedIn' if lang == 'de' else 'Velonify on LinkedIn'
    return f'''<footer class="rg-footer">
  <img src="/assets/img/velonify-wordmark.png" alt="Velonify" style="height: 22px; width: auto;">
  <nav aria-label="Footer">{nav}</nav>
  <div class="rg-social"><a href="https://www.instagram.com/velonify.de/" target="_blank" rel="noopener" aria-label="{ig}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4.2"></circle><circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none"></circle></svg></a><a href="https://www.linkedin.com/company/velonify/" target="_blank" rel="noopener" aria-label="{li}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="7.5" cy="8" r="0.9" fill="currentColor" stroke="none"></circle><path d="M7.5 11 V17"></path><path d="M11.5 17 V12.5 C11.5 11 13 10.3 14.3 11 C15.3 11.5 15.5 12.3 15.5 13 V17"></path><path d="M11.5 11 V17"></path></svg></a><span>© 2026 Velonify</span></div>
</footer>'''


CSS = (SRC / 'ratgeber.css').read_text(encoding='utf-8') if (SRC / 'ratgeber.css').exists() else ''


def document(lang, head, dh, mh, meta_head, main):
    t = L[lang]
    return f'''<!doctype html>
<html lang="{lang}">
<head>
{meta_head}
{head.strip()}
<style>
{CSS}
</style>
</head>
<body>
<a class="rg-skip" href="#inhalt">{t["skip"]}</a>
<div class="v v-desktop rg-bar"><div>
{dh}
</div></div>
<div class="v v-mobile rg-bar"><div>
{mh}
</div></div>
<main>
{main}
</main>
{footer(lang)}
<script>if (window.matchMedia('(max-width: 1023px)').matches) document.querySelectorAll('details.rg-toc-box').forEach(function (d) {{ d.removeAttribute('open'); }});</script>
</body>
</html>
'''


def meta_tags(lang, title, desc, url, de_url, en_url, og_type, ld, extra=''):
    return f'''<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="de" href="{de_url}">
<link rel="alternate" hreflang="en" href="{en_url}">
<link rel="alternate" hreflang="x-default" href="{de_url}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:type" content="{og_type}">
<meta property="og:locale" content="{L[lang]["og_locale"]}">
<meta property="og:site_name" content="Velonify">
<meta property="og:image" content="{LOGO}">
<meta name="twitter:card" content="summary">{extra}
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>'''


def publisher():
    return {'@type': 'Organization', '@id': ORG_ID, 'name': 'Velonify', 'url': SITE + '/',
            'logo': {'@type': 'ImageObject', 'url': LOGO}}


def author_ld(key, lang):
    a = AUTHORS[key]
    return {'@type': 'Person', 'name': a['name'], 'jobTitle': a['role'][lang],
            'worksFor': {'@id': ORG_ID}}


def hero(lang, crumbs, eyebrow, title, below=''):
    sep = '<span class="rg-dot" aria-hidden="true"></span>'
    trail = []
    for i, (label, href) in enumerate(crumbs):
        trail.append(f'<span aria-current="page">{esc(label)}</span>' if href is None else f'<a href="{href}">{esc(label)}</a>')
    bc = 'Brotkrumen' if lang == 'de' else 'Breadcrumb'
    eb = f'<p class="rg-eyebrow">{esc(eyebrow)}</p>' if eyebrow else ''
    return f'''<section id="top" class="rg-hero">
<svg class="mark-a" viewBox="0 44 1278 813" fill="#45142D" aria-hidden="true">{MARK}</svg>
<div class="rg-wrap rg-hero-in">
<nav aria-label="{bc}" class="rg-crumbs">{sep.join(trail)}</nav>
{eb}
<h1>{esc(title)}</h1>
{below}
</div>
</section>'''


def cta(lang, service=None):
    t = L[lang]
    sec = f'<a class="rg-cta-link" href="{service[0]}">{t["service"]}: {esc(service[1])} {ARROW}</a>' if service else ''
    return f'''<section class="rg-cta">
<div class="rg-wrap">
<h2>{esc(t["cta_title"])}</h2>
<p>{esc(t["cta_text"])}</p>
<div class="rg-cta-row"><a class="btn btn-ice rg-btn" href="{t["contact"]}">{esc(t["cta_button"])} {ARROW}</a>{sec}</div>
</div>
</section>'''


def card(lang, a):
    t = L[lang]
    au = AUTHORS[a['author']]['name']
    mins = math.ceil(a['words'] / 200)
    return f'''<a class="rg-card" href="{t["base"]}{a["slug"]}/">
<p class="rg-card-cat">{esc(a["category"])}</p>
<h3>{esc(a["title"])}</h3>
<p class="rg-card-desc">{esc(a["description"])}</p>
<p class="rg-card-meta">{esc(au)} · {fmt_date(a["updated"], lang)} · {mins} {t["minutes"]}</p>
<span class="rg-card-go">{t["read"]} {ARROW}</span>
</a>'''


def article_page(a, by_slug, other):
    lang = a['lang']
    t = L[lang]
    url = f'{SITE}{t["base"]}{a["slug"]}/'
    cp = other[a['translation']]
    cp_path = f'{L[cp["lang"]]["base"]}{cp["slug"]}/'
    de_url, en_url = (url, SITE + cp_path) if lang == 'de' else (SITE + cp_path, url)
    au = AUTHORS[a['author']]
    mins = math.ceil(a['words'] / 200)

    body, toc, faq_ld, sources = [], [], [], []
    for s in a['sections']:
        toc.append(f'<li><a href="#{s["id"]}">{esc(s["title"])}</a></li>')
        if s['kind'] == 'faq':
            det = []
            for q, ans in faq_items(s):
                ans_html = ''.join(f'<p>{inline(x)}</p>' for x in ans)
                det.append(f'<details class="rg-faq"><summary><h3>{inline(q)}</h3><span class="rg-plus" aria-hidden="true"></span></summary><div class="rg-faq-a">{ans_html}</div></details>')
                faq_ld.append({'@type': 'Question', 'name': plain(q),
                               'acceptedAnswer': {'@type': 'Answer', 'text': ' '.join(plain(x) for x in ans)}})
            body.append(f'<section class="rg-sec" aria-labelledby="{s["id"]}"><h2 id="{s["id"]}">{esc(s["title"])}</h2>{"".join(det)}</section>')
        elif s['kind'] == 'sources':
            items = [x for k, v in s['blocks'] if k == 'ul' for x in v]
            sources = [re.search(r'\((https?://[^)]+)\)', x).group(1) for x in items]
            box = (f'<aside class="rg-author"><div class="rg-avatar" aria-hidden="true">{au["initials"]}</div><div>'
                   f'<p class="rg-author-label">{t["author_label"]}</p><p class="rg-author-name">{esc(au["name"])}</p>'
                   f'<p class="rg-author-role">{esc(au["role"][lang])}</p><p>{esc(au["bio"][lang])}</p></div></aside>')
            body.append(box)
            body.append(f'<section class="rg-sec rg-sources" aria-labelledby="{s["id"]}"><h2 id="{s["id"]}">{esc(s["title"])}</h2>'
                        f'<ul>{"".join(f"<li>{inline(x)}</li>" for x in items)}</ul></section>')
        else:
            body.append(f'<section class="rg-sec" aria-labelledby="{s["id"]}"><h2 id="{s["id"]}">{esc(s["title"])}</h2>{render_blocks(s["blocks"])}</section>')

    meta_row = (f'<div class="rg-meta"><div class="rg-avatar" aria-hidden="true">{au["initials"]}</div>'
                f'<p><span>{t["by"]} <strong>{esc(au["name"])}</strong>, {esc(au["role"][lang])}</span>'
                f'<span>{t["updated"]}: <time datetime="{a["updated"]}">{fmt_date(a["updated"], lang)}</time> · {mins} {t["minutes"]}</span></p></div>')
    main = hero(lang, [(t['start'], t['home']), (t['index'], t['base']), (a['title'], None)], a['category'], a['title'], meta_row)
    main += f'''
<div id="inhalt" class="rg-wrap rg-body">
<nav class="rg-toc" aria-label="{t["toc"]}"><details class="rg-toc-box" open><summary>{t["toc"]}</summary><ol>{"".join(toc)}</ol></details></nav>
<article class="rg-article">
<div class="rg-summary"><p class="rg-label">{t["summary"]}</p><p>{esc(a["summary"])}</p></div>
{"".join(body)}
</article>
</div>
{cta(lang, a.get("service"))}'''
    rel = [by_slug[s] for s in a['related'] if s in by_slug]
    if rel:
        main += f'''
<section class="rg-related"><div class="rg-wrap"><h2>{t["related"]}</h2><div class="rg-grid">{"".join(card(lang, r) for r in rel)}</div></div></section>'''

    graph = [{
        '@type': 'BlogPosting', '@id': url + '#article', 'headline': a['title'], 'description': a['description'],
        'abstract': a['summary'], 'inLanguage': t['locale'], 'url': url, 'mainEntityOfPage': url,
        'datePublished': a['published'], 'dateModified': a['updated'], 'image': LOGO,
        'articleSection': a['category'], 'wordCount': a['words'],
        'author': author_ld(a['author'], lang), 'publisher': publisher(), 'citation': sources,
    }, {
        '@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': t['start'], 'item': SITE + t['home']},
            {'@type': 'ListItem', 'position': 2, 'name': t['index'], 'item': SITE + t['base']},
            {'@type': 'ListItem', 'position': 3, 'name': a['title'], 'item': url}]}]
    if faq_ld:
        graph.append({'@type': 'FAQPage', '@id': url + '#faq', 'mainEntity': faq_ld})
    extra = (f'\n<meta property="article:published_time" content="{a["published"]}">'
             f'\n<meta property="article:modified_time" content="{a["updated"]}">'
             f'\n<meta name="author" content="{esc(au["name"])}">')
    head, dh, mh = page_chrome(lang, cp_path)
    mh_ = meta_tags(lang, a['seo_title'], a['description'], url, de_url, en_url, 'article',
                    {'@context': 'https://schema.org', '@graph': graph}, extra)
    return document(lang, head, dh, mh, mh_, main)


def index_page(lang, arts):
    t = L[lang]
    other = 'en' if lang == 'de' else 'de'
    url = SITE + t['base']
    de_url, en_url = SITE + L['de']['base'], SITE + L['en']['base']
    lead = f'<p class="rg-lead">{esc(t["index_lead"])}</p>'
    main = hero(lang, [(t['start'], t['home']), (t['index'], None)], None, t['index_title'], lead)
    main += f'''
<section id="inhalt" class="rg-list"><div class="rg-wrap"><div class="rg-grid rg-grid-index">{"".join(card(lang, a) for a in arts)}</div></div></section>
{cta(lang)}'''
    ld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'CollectionPage', '@id': url + '#page', 'name': t['index_seo'], 'description': t['index_desc'],
         'url': url, 'inLanguage': t['locale'], 'publisher': publisher(),
         'mainEntity': {'@type': 'ItemList', 'itemListElement': [
             {'@type': 'ListItem', 'position': i + 1, 'url': f'{url}{a["slug"]}/', 'name': a['title']}
             for i, a in enumerate(arts)]}},
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': t['start'], 'item': SITE + t['home']},
            {'@type': 'ListItem', 'position': 2, 'name': t['index'], 'item': url}]}]}
    head, dh, mh = page_chrome(lang, L[other]['base'])
    return document(lang, head, dh, mh, meta_tags(lang, t['index_seo'], t['index_desc'], url, de_url, en_url, 'website', ld), main)


def update_sitemap(arts):
    path = ROOT / 'sitemap.xml'
    xml = path.read_text(encoding='utf-8')
    xml = re.sub(r'\s*<url><loc>https://velonify\.de/(ratgeber|en/guides)/.*?</url>', '', xml, flags=re.S)
    entries = []
    pairs = [(L['de']['base'], L['en']['base'], max(a['updated'] for a in arts))]
    for a in arts:
        if a['lang'] == 'de':
            cp = next(x for x in arts if x['slug'] == a['translation'])
            pairs.append((f'{L["de"]["base"]}{a["slug"]}/', f'{L["en"]["base"]}{cp["slug"]}/', max(a['updated'], cp['updated'])))
    for de, en, mod in pairs:
        for loc in (de, en):
            entries.append(f'''  <url><loc>{SITE}{loc}</loc><lastmod>{mod}</lastmod>
    <xhtml:link rel="alternate" hreflang="de" href="{SITE}{de}"/>
    <xhtml:link rel="alternate" hreflang="en" href="{SITE}{en}"/>
  </url>''')
    xml = xml.replace('</urlset>', '\n'.join(entries) + '\n</urlset>')
    path.write_text(xml, encoding='utf-8')


def update_llms(arts):
    de = [a for a in arts if a['lang'] == 'de']
    en = [a for a in arts if a['lang'] == 'en']
    lines = ['# Velonify', '',
             '> Velonify ist eine E-Commerce-Agentur für Shopify aus Deutschland: Shopify-Migration (vor allem von Magento, '
             'Shopware und WooCommerce), Tracking & Attribution, Performance Marketing, E-Mail & Retention und '
             'Conversion-Optimierung. Kleines Team, keine Subunternehmer, Kunden sprechen direkt mit der Person, die umsetzt. '
             'Sprachen: Deutsch (Hauptmarkt DACH) und Englisch.', '',
             'Kontakt: hallo@velonify.de · Anfragen über https://velonify.de/#kontakt', '',
             '## Leistungen', '',
             '- [Shopify-Migration](https://velonify.de/leistungen/shopify-migration/): Umzug von Magento, Shopware oder WooCommerce auf Shopify und Shopify Plus mit Datenübernahme, Redirects und Tracking',
             '- [Tracking & Attribution](https://velonify.de/leistungen/tracking/): GA4, Google Tag Manager, Server-Side Tracking, Conversions API',
             '- [Performance Marketing](https://velonify.de/leistungen/performance-marketing/): Meta Ads und Google Ads, gesteuert nach Umsatz und Marge',
             '- [E-Mail & Retention](https://velonify.de/leistungen/e-mail-marketing/): Klaviyo-Flows, Kampagnen und Segmente',
             '- [Conversion-Optimierung](https://velonify.de/leistungen/conversion-optimierung/): CRO-Audit, Produktseiten und Checkout',
             '', '## Ratgeber (Deutsch)', '']
    lines += [f'- [{a["title"]}]({SITE}{L["de"]["base"]}{a["slug"]}/): {a["description"]}' for a in de]
    lines += ['', '## Guides (English)', '']
    lines += [f'- [{a["title"]}]({SITE}{L["en"]["base"]}{a["slug"]}/): {a["description"]}' for a in en]
    lines += ['', '## Optional', '',
              '- [English homepage](https://velonify.de/en/)',
              '- [Impressum](https://velonify.de/impressum/)', '']
    (ROOT / 'llms.txt').write_text('\n'.join(lines), encoding='utf-8')


def main():
    arts = [parse(p) for p in sorted(SRC.glob('*/*.md'))]
    by_lang = {lang: sorted([a for a in arts if a['lang'] == lang], key=lambda a: (-int(a['published'].replace('-', '')), int(a.get('order', 99))))
               for lang in ('de', 'en')}
    all_by_slug = {a['slug']: a for a in arts}
    for lang, items in by_lang.items():
        by_slug = {a['slug']: a for a in items}
        for a in items:
            out = ROOT / L[lang]['base'].strip('/') / a['slug'] / 'index.html'
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(article_page(a, by_slug, all_by_slug), encoding='utf-8')
            print('wrote', out.relative_to(ROOT))
        out = ROOT / L[lang]['base'].strip('/') / 'index.html'
        out.write_text(index_page(lang, items), encoding='utf-8')
        print('wrote', out.relative_to(ROOT))
    update_sitemap(arts)
    update_llms(arts)
    print('updated sitemap.xml, llms.txt')


if __name__ == '__main__':
    main()
