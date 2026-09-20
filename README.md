# velonify.de – statische Website

Export aus dem Velonify-Design-Canvas. Reines HTML/CSS/JS, kein Build-Schritt.

## Struktur
- `/` Deutsch, `/en/` Englisch (je 12 Seiten), eine Seite pro Adresse
- Desktop- und Mobil-Layout stecken in derselben Seite; `assets/js/site.js` behält beim Laden nur das passende (Umbruch bei 1024 px)
- Schriften (Krona One, Albert Sans), GSAP, Lenis und Bilder liegen lokal unter `/assets` – keine externen Anfragen
- `sitemap.xml`, `robots.txt`, `404.html`, `favicon.svg`, `netlify.toml` (www → velonify.de, Caching, Sicherheits-Header)

## Deploy auf Netlify
Netlify hängt an diesem Repo: jeder Push auf `main` geht automatisch live, ein Build-Schritt läuft nicht (`publish = "."`).
Domain velonify.de liegt auf Netlify, `www` leitet auf die Adresse ohne www (siehe `netlify.toml`); die MX-Einträge bleiben unberührt.

## Kontaktformular
Das Formular heißt `anfrage` (Netlify Forms) und steht auf der deutschen und der englischen Startseite,
je zweimal – einmal im Desktop-, einmal im Mobil-Layout. Beide Kopien müssen dieselben Felder tragen:
`name`, `email`, `shop`, `themen` (verstecktes Feld, von `site.js` aus den Chips befüllt), `sprache` (`de`/`en`),
`nachricht` sowie den Honeypot `bot-field`. Nach dem Absenden landet man auf `/danke/` bzw. `/en/thanks/`.

Einmalig im Netlify-Dashboard einzustellen:
1. Site configuration → Forms → **Form detection einschalten**, danach einen Deploy auslösen. Ohne diesen Schalter
   nimmt Netlify keine Einsendung an (POST auf die Seite antwortet mit 404) – Stand 2026-09-20 ist er noch aus.
2. Forms → Notifications → E-Mail-Benachrichtigung an die Adresse, die Anfragen sehen soll.
3. Forms → Notifications → Outgoing webhook auf den CRM-Eingang, damit jede Anfrage in der internen Plattform landet.

## Vor dem Livegang ersetzen
- `[BUCHUNGSLINK]` – Link zum Buchungstool (Buttons „Erstgespräch vereinbaren“)
- Datenschutz: `[HOSTING-ANBIETER MIT ANSCHRIFT]`, `[BUCHUNGSTOOL MIT ANBIETER UND ANSCHRIFT]` (auch EN-Version)
- Über uns: `[FOTO …]`, `[ROLLE]` und die Ein-Satz-Beschreibungen (auch EN-Version)
