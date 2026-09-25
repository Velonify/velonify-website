---
slug: magento-zu-shopify-migration
lang: de
translation: magento-to-shopify-migration
title: "Magento zu Shopify migrieren: Ablauf, Dauer und Kosten"
seo_title: "Magento zu Shopify migrieren: Dauer & Kosten | Velonify"
description: "Wie eine Migration von Magento auf Shopify abläuft, welche Daten mitkommen, wie lange sie dauert und was sie kostet. Mit Zeitplan, Kostenrahmen und Checkliste."
author: lukas
published: 2026-09-24
updated: 2026-09-24
order: 2
category: "Shopify-Migration"
summary: "Eine Migration von Magento auf Shopify läuft in vier Phasen: Audit, Mapping, Aufbau mit Testmigration und Go-live mit Nachbetreuung. Ein schlanker Shop ist oft in vier bis sechs Wochen live, mit mehreren Integrationen oder auf Shopify Plus dauert es acht bis zwölf Wochen, große B2B-Projekte drei bis sechs Monate. Die Kosten reichen am Markt von einem niedrigen vierstelligen Betrag für kleine Shops bis in den sechsstelligen Bereich für Enterprise-Projekte. Die größten Risiken sind fehlende Weiterleitungen, unvollständige Daten und Tracking, das nach dem Umschalten nicht mehr misst."
service: "/leistungen/shopify-migration/ | Shopify-Migration"
related: magento-supportende, server-side-tracking-shopify
---

## Wann lohnt sich der Wechsel von Magento auf Shopify?

Der Wechsel lohnt sich, wenn die Plattform euch mehr Zeit und Geld kostet, als sie leistet. Typische Anlässe:

- Eure Magento-Version bekommt keine Sicherheitsupdates mehr (mehr dazu in [Magento 2.4.6 ohne Support](/ratgeber/magento-supportende/)).
- Jede Änderung am Shop braucht einen Entwickler und dauert Tage.
- Hosting, Wartung und Extension-Lizenzen fressen einen spürbaren Teil der Marge.
- Ihr wollt in neue Länder oder an Geschäftskunden verkaufen, und das System bremst.
- Der Shop lädt langsam, besonders auf dem Smartphone.

Weniger sinnvoll ist ein Umzug, wenn der Shop technisch gesund ist und nur die Zahlen schwach sind. Dann liegt die Ursache meist im Funnel, und eine [Conversion-Optimierung](/leistungen/conversion-optimierung/) bringt mehr als ein neues System.

## Welche Daten kommen von Magento zu Shopify mit?

Fast alles, aber nicht alles 1:1. Magento speichert Produktdaten flexibel in Attributen, Shopify arbeitet mit einem festeren Modell aus Produkten, Varianten und Metafeldern. Deshalb braucht jede Migration ein Mapping.

| Daten | Übernehmbar? | Worauf ihr achten müsst |
|---|---|---|
| Produkte und Varianten | Ja | Shopify erlaubt bis zu 2.048 Varianten, aber maximal drei Optionen pro Produkt (etwa Größe, Farbe, Material). Konfigurierbare Magento-Produkte mit mehr Optionen müssen aufgeteilt werden. |
| Attribute | Ja, als Metafelder | Vorher entscheiden, welche Attribute ihr wirklich braucht. Viele Magento-Shops schleppen Hunderte ungenutzte mit. |
| Kategorien | Ja, als Kollektionen | Shopify-Kollektionen sind flach. Verschachtelte Kategoriebäume werden über Navigation und Filter abgebildet. |
| Kundenkonten | Ja | Passwörter lassen sich technisch nicht übertragen. Mit den neuen Shopify-Kundenkonten melden sich Kunden per Einmal-Code an, ein Passwort-Reset entfällt dann. |
| Bestellhistorie | Ja | Wird als historische Bestellungen importiert, ohne dass Kunden E-Mails bekommen. |
| Rabatte und Gutscheine | Teilweise | Preisregeln funktionieren in Shopify anders und werden meist neu aufgesetzt. Offene Gutscheincodes lassen sich übernehmen. |
| CMS-Seiten und Blog | Ja | Guter Anlass, veraltete Inhalte auszusortieren. |
| Bewertungen | Ja, über eine Review-App | Den Export aus Magento früh testen. |
| URLs | Nein, sie ändern sich | Shopify gibt feste Pfade vor (`/products/`, `/collections/`, `/pages/`). Jede alte URL braucht eine 301-Weiterleitung. |

## Wie läuft eine Migration ab?

Wir planen jede Migration rückwärts vom Go-live-Termin. Der neue Shop entsteht parallel zum alten, euer Tagesgeschäft läuft ungestört weiter.

### Phase 1: Audit (ein bis zwei Wochen)

Bestandsaufnahme des Altshops: Extensions und was sie tun, Datenqualität, angebundene Systeme wie Warenwirtschaft, Payment und Newsletter. Dazu die wichtigsten URLs aus Search Console und Analytics, damit klar ist, welche Seiten Umsatz und Rankings tragen. Am Ende steht die Zielarchitektur: Shopify oder Shopify Plus, ein Markt oder mehrere, mit oder ohne B2B.

### Phase 2: Mapping (ein bis zwei Wochen)

Hier fallen die Entscheidungen, die später teuer werden, wenn sie fehlen. Welches Magento-Attribut wird welches Metafeld? Welche Kategorie wird welche Kollektion? Welche Extension ersetzt eine App, welche wird Eigenentwicklung und welche fällt weg? Und die vollständige Weiterleitungsliste: jede alte URL mit ihrem neuen Ziel.

### Phase 3: Aufbau und Testmigration (zwei bis sechs Wochen, bei großen Projekten länger)

Theme, Integrationen und Tracking entstehen im neuen Shop. Dann läuft eine vollständige Testmigration mit echten Daten. Ihr prüft Produkte, Preise, Kundenkonten und Prozesse, bevor ein einziger Kunde den neuen Shop sieht.

### Phase 4: Go-live und Nachbetreuung (Umschalttag plus vier bis acht Wochen)

Kurz vor dem Umschalten werden die Bestellungen und Kunden übertragen, die seit der Testmigration dazugekommen sind. Dann wird die Domain umgestellt, Weiterleitungen und Tracking werden live geprüft. In den Wochen danach beobachten wir Rankings, Crawling-Fehler in der Search Console und die Bestellzahlen.

## Wie lange dauert eine Migration von Magento auf Shopify?

| Ausgangslage | Typische Dauer |
|---|---|
| Schlanker Shop, wenige hundert Produkte, kaum Zusatzsysteme | vier bis sechs Wochen |
| Mehrere Integrationen (Warenwirtschaft, Newsletter, Marktplätze) oder Shopify Plus | acht bis zwölf Wochen |
| Mehrere Länder, B2B, ERP-Anbindung, individuelle Funktionen | drei bis sechs Monate |

Die Dauer hängt weniger an der Zahl der Produkte als an der Zahl der Systeme, die mitziehen müssen, und daran, wie schnell Entscheidungen fallen. Ein Shop mit 150 Produkten und zwei Warenwirtschaften kann aufwendiger sein als einer mit 20.000 Artikeln und sauberem Datenbestand.

## Was kostet eine Migration von Magento auf Shopify?

Einen Festpreis ohne Audit kann seriös niemand nennen. Die Marktspannen, die Agenturen 2026 öffentlich angeben, geben aber eine gute Orientierung:

| Projektgröße | Merkmale | Marktübliche Spanne |
|---|---|---|
| Kleiner Shop | unter 500 Produkten, einfache Struktur | ca. 2.000 bis 7.000 € |
| Mittelgroßer Shop | 500 bis 10.000 Produkte, mehrere Integrationen | ca. 7.000 bis 28.000 € |
| Enterprise und Shopify Plus | B2B, mehrere Märkte, ERP- und PIM-Anbindung | ca. 30.000 bis über 200.000 € |

Die größten Kostentreiber sind:

- **Integrationen.** Jede angebundene Warenwirtschaft, jedes PIM, jeder Marktplatz ist ein eigener Baustein mit eigenem Testaufwand.
- **Design.** Ein angepasstes Standard-Theme kostet einen Bruchteil eines komplett individuellen Designs.
- **Individuelle Funktionen.** Alles, was keine App abdeckt, wird entwickelt.
- **Datenqualität.** Unsaubere Altdaten zu bereinigen kostet oft mehr als ihr Import.
- **Interner Aufwand.** Abstimmungen, Freigaben und Tests auf eurer Seite werden gern vergessen.

**Laufende Kosten im Vergleich.** Shopify kostet in Deutschland zwischen 27 € (Basic, jährliche Zahlung) und 289 € (Advanced) pro Monat, Shopify Plus ab 2.100 € pro Monat. Dazu kommen Apps und Zahlungsgebühren. Wichtig: Wer statt Shopify Payments einen externen Zahlungsanbieter nutzt, zahlt je nach Plan eine zusätzliche Transaktionsgebühr zwischen 2 % (Basic) und 0,2 % (Plus). Auf der Magento-Seite stehen dem Hosting, Wartung, Sicherheitsupdates, Extension-Lizenzen und regelmäßige Upgrades gegenüber. Legt beide Summen für drei Jahre nebeneinander, bevor ihr entscheidet.

## Die fünf häufigsten Fehler bei der Migration

1. **Weiterleitungen erst nach dem Go-live.** Dann fallen Kategorie- und Produktseiten schon in den ersten Tagen aus dem Index. Die Weiterleitungsliste gehört in Phase 2.
2. **Den alten Shop 1:1 nachbauen.** Jede Magento-Extension durch eine App zu ersetzen, macht den neuen Shop so schwer wie den alten. Erst fragen, ob die Funktion noch gebraucht wird.
3. **Kunden nicht informieren.** Wer sich plötzlich anders anmelden muss, braucht eine kurze E-Mail vorab. Sonst landen die Fragen beim Support.
4. **Tracking vergessen.** Nach dem Umschalten laufen Kampagnen tagelang auf falschen Zahlen, wenn GA4, Meta und Google Ads nicht vorher eingerichtet und getestet wurden. Wie das auf Shopify sauber geht, steht in [Server-Side Tracking auf Shopify](/ratgeber/server-side-tracking-shopify/).
5. **Go-live vor der Hochsaison.** Wir legen den Umschalttermin grundsätzlich um eure Spitzen herum, nie direkt davor.

## Checkliste für den Go-live-Tag

- Delta-Migration der neuen Bestellungen und Kunden seit der Testmigration abgeschlossen
- Weiterleitungen importiert und die 100 wichtigsten URLs stichprobenartig geprüft
- Domain umgestellt, SSL-Zertifikat aktiv, `www` und Hauptdomain leiten korrekt
- Neue Sitemap in der Google Search Console eingereicht
- Testbestellung mit jeder Zahlungsart durchgeführt
- Käufe kommen in Shopify, GA4, Meta und Google Ads an
- Transaktionale E-Mails (Bestellbestätigung, Versand) geprüft
- Alter Shop im Wartungsmodus, aber für Rückfragen noch erreichbar

## Häufige Fragen {faq}

### Gehen bei der Migration Google-Rankings verloren?

Nicht, wenn jede alte URL per 301 auf ihr Gegenstück zeigt und Titel, Beschreibungen und Inhalte übernommen werden. Kleine Schwankungen in den ersten Wochen sind normal, deshalb gehört eine enge Beobachtung der Search Console zur Nachbetreuung.

### Muss der Shop während der Migration offline gehen?

Nein. Der neue Shop wird parallel aufgebaut. Umgeschaltet wird erst, wenn die Testmigration sauber durchgelaufen ist. Der eigentliche Wechsel dauert meist nur wenige Stunden.

### Können wir unsere Domain und E-Mail-Adressen behalten?

Ja. Die Domain wird auf Shopify umgestellt, indem nur die Einträge für die Website geändert werden. Die MX-Einträge für eure E-Mails bleiben unberührt.

### Brauchen wir Shopify oder Shopify Plus?

Für die meisten Shops reicht ein Standard-Plan. Shopify Plus lohnt sich bei mehreren Märkten mit eigenen Katalogen, bei B2B mit Firmenkonten und Zahlungszielen oder bei höheren Umsätzen, wo die niedrigeren Gebühren den Plus-Preis ausgleichen.

### Können Kunden ihre Passwörter behalten?

Nein, Passwörter lassen sich aus Sicherheitsgründen nicht übertragen. Mit den neuen Shopify-Kundenkonten ist das kein Problem mehr, denn die Anmeldung läuft dort über einen Einmal-Code per E-Mail.

## Quellen {sources}

- [Shopify: Preise für Deutschland](https://www.shopify.com/de/preise)
- [Shopify Developer Changelog: Variantenlimit 2.048 für alle Händler](https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants)
- [Shopify Help Center: URL-Weiterleitungen](https://help.shopify.com/de/manual/online-store/menus-and-links/url-redirect)
- [Uncap: Magento to Shopify Migration Cost](https://www.uncap.com/post/magento-to-shopify-migration-cost)
- [WeArePresta: Shopify Migration Cost Breakdown 2026](https://wearepresta.com/shopify-migration-cost-breakdown-what-agencies-actually-charge-in-2026/)
