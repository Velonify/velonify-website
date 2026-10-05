# Lead-Magnete (/ressourcen/)

**Ein neuer Magnet braucht keinen Deploy.** Jeder aktive Magnet aus dem Hub (crm.velonify.de → Lead-Magnete →
Magnete) hat automatisch seine Landingpage `velonify.de/ressourcen/<adresse>/`. Die Funktion
`netlify/functions/ressourcen-seite.mjs` baut sie beim Aufruf aus der Vorlage und den Texten im Hub (Titel,
Untertitel, „Was drin ist“, Knopf). Netlify hält jede Seite 2 Minuten vor; Änderungen im Hub sind also spätestens
nach 2 Minuten online. Inaktive oder unbekannte Adressen bekommen die normale 404-Seite.

## Was hier im Repo liegt

    python3 _ressourcen/build.py

schreibt:
- `netlify/lib/magnet-vorlage.mjs`: die Vorlage der Landingpages (Kopf, Menü, Fuß und Stil wie im Ratgeber,
  Formular `magnet`) mit Platzhaltern `%%TITEL%%`, `%%UNTERTITEL%%`, `%%INHALT%%`, `%%KNOPF%%`, `%%SLUG%%`.
  Nach Änderungen an Formular, Kopf/Menü (kommt aus `impressum/`) oder `ressourcen.css` neu bauen und deployen.
- die festen Seiten `danke`, `newsletter`, `newsletter/bestaetigt`, `abmelden`, `abgemeldet`, `hoppla`. Auf
  `danke` steht zusätzlich eine versteckte Kopie des Formulars: Netlify nimmt Einsendungen nur für Formulare an,
  die es beim Deploy in statischem HTML gefunden hat.
- handgebaute Seiten aus `_ressourcen/<adresse>.md` (optional, siehe unten).

## Handgebaute Seite (optional)

Für einen Magneten, der mehr braucht als die Vorlage (eigenes Vorschaubild, eigener Aufbau), eine Datei
`_ressourcen/<adresse>.md` anlegen und bauen. Statische Seiten gehen vor, die Funktion springt dann nicht an.
Mail, Datei-Link und Aktiv-Schalter kommen trotzdem aus dem Hub, die Adresse muss gleich sein.

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

`test.md` ist die interne Testseite unter `/ressourcen/test/`.

## Ablauf

Seite → Formular `magnet` (Netlify Forms) → `netlify/functions/submission-created.mjs` → Apps Script im CRM
(`apps-script/magnete` im Repo velonify-crm) → Zeile im Tab `magnet_leads` + Mail von lukas@velonify.de.
Die Knöpfe in der Mail laufen über `netlify/functions/magnet-link.mjs`:

- `/m/d/<token>` zählt den Download und leitet zur Datei weiter
- `/ressourcen/newsletter/?t=<token>` → Knopf → `POST /m/n` bestätigt den Newsletter (Double-Opt-in)
- `/ressourcen/abmelden/?t=<token>` → Knopf → `POST /m/a` meldet ab (Link für künftige Newsletter)

Bestätigt und abgemeldet wird bewusst per Knopf und nicht schon beim Öffnen des Links, weil Virenscanner
in Firmen-Postfächern Links vorab öffnen.

Der Wortlaut der Newsletter-Checkbox steht in `build.py` (`NEWSLETTER_TEXT`) und wird mit jedem Eintrag als
Nachweis gespeichert. Alle Seiten sind `noindex` und stehen nicht in der Sitemap.

Netlify braucht die Umgebungsvariable `CRM_MAGNETE_URL` (Adresse des Apps Scripts samt `?token=…`).
