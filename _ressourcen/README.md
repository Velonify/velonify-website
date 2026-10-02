# Lead-Magnete (/ressourcen/)

Jede Datei `<slug>.md` hier wird zur Landingpage `velonify.de/ressourcen/<slug>/` mit Formular. Bauen:

    python3 _ressourcen/build.py

Kopf der Datei (Anführungszeichen, damit Obsidian ihn als YAML liest):

| Feld | Pflicht | Wofür |
|---|---|---|
| `titel` | ja | Überschrift der Seite |
| `lead` | ja | Satz unter der Überschrift |
| `description` | ja | Meta-Beschreibung und Vorschautext im LinkedIn-Chat |
| `eyebrow` | nein | Kleine Zeile über dem Titel, Standard „Kostenlos“ |
| `seo_title` | nein | Browser-Titel, Standard „<titel> \| Velonify“ |
| `cta` | nein | Text auf dem Knopf, Standard „Kostenlos anfordern“ |
| `form_titel` | nein | Überschrift über dem Formular |
| `bild` | nein | Vorschaubild für LinkedIn, Pfad ab Domain, z. B. `/assets/img/ressourcen/skills.png` (1200×630) |

Darunter steht der Text der Seite in Markdown (`##`, `###`, Listen, Tabellen – dieselbe Auswahl wie im Ratgeber).

## Was sonst noch dazugehört

Der Slug verbindet die Seite mit dem Magneten im Hub (crm.velonify.de → Lead-Magnete → Magnete). Dort stehen
Datei-Link, Betreff und Text der Mail sowie der Schalter „Aktiv“. Ohne aktiven Magneten mit gleichem Slug wird der
Eintrag zwar gespeichert, aber es geht keine Mail raus.

Ablauf: Formular `magnet` (Netlify Forms) → `netlify/functions/submission-created.mjs` → Apps Script im CRM
(`apps-script/magnete` im Repo velonify-crm) → Zeile im Tab `magnet_leads` + Mail von lukas@velonify.de.
Die Knöpfe in der Mail laufen über `netlify/functions/magnet-link.mjs`:

- `/m/d/<token>` zählt den Download und leitet zur Datei weiter
- `/ressourcen/newsletter/?t=<token>` → Knopf → `POST /m/n` bestätigt den Newsletter (Double-Opt-in)
- `/ressourcen/abmelden/?t=<token>` → Knopf → `POST /m/a` meldet ab (Link für künftige Newsletter)

Bestätigt und abgemeldet wird bewusst per Knopf und nicht schon beim Öffnen des Links, weil Virenscanner
in Firmen-Postfächern Links vorab öffnen.

Der Wortlaut der Newsletter-Checkbox steht in `build.py` (`NEWSLETTER_TEXT`) und wird mit jedem Eintrag als
Nachweis gespeichert. Die Seiten sind `noindex` und stehen nicht in der Sitemap.

Netlify braucht die Umgebungsvariable `CRM_MAGNETE_URL` (Adresse des Apps Scripts samt `?token=…`).
