# velonify.de – statische Website

Export aus dem Velonify-Design-Canvas. Reines HTML/CSS/JS, kein Build-Schritt.

## Struktur
- `/` Deutsch, `/en/` Englisch (je 12 Seiten), eine Seite pro Adresse
- Desktop- und Mobil-Layout stecken in derselben Seite; `assets/js/site.js` behält beim Laden nur das passende (Umbruch bei 1024 px)
- Schriften (Krona One, Albert Sans), GSAP, Lenis und Bilder liegen lokal unter `/assets` – keine externen Anfragen
- `sitemap.xml`, `robots.txt`, `404.html`, `favicon.svg`, `netlify.toml` (www → velonify.de, Caching, Sicherheits-Header)

## Deploy auf Netlify
1. app.netlify.com → Add new site → Deploy manually → diesen Ordner hineinziehen
2. Domain management → Add domain → velonify.de
3. Beim Domain-Anbieter: `@` A-Record 75.2.60.5 (oder ALIAS apex-loadbalancer.netlify.com), `www` CNAME auf <projekt>.netlify.app – MX-Einträge nicht anfassen
4. Formular: Das Kontaktformular heißt „anfrage“ (Netlify Forms). Anfragen erscheinen unter Forms; E-Mail-Benachrichtigung dort einstellen.

## Vor dem Livegang ersetzen
- `[BUCHUNGSLINK]` – Link zum Buchungstool (Buttons „Erstgespräch vereinbaren“)
- Datenschutz: `[HOSTING-ANBIETER MIT ANSCHRIFT]`, `[BUCHUNGSTOOL MIT ANBIETER UND ANSCHRIFT]` (auch EN-Version)
- Über uns: `[FOTO …]`, `[ROLLE]` und die Ein-Satz-Beschreibungen (auch EN-Version)
