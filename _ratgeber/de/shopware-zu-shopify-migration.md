---
slug: shopware-zu-shopify-migration
lang: de
translation: shopware-to-shopify-migration
title: "Shopware zu Shopify migrieren: Anlass, Ablauf und Kosten"
seo_title: "Shopware zu Shopify migrieren: Ablauf & Kosten | Velonify"
description: "Shopware 5 ohne Updates, 6.5 läuft aus, die Community Edition hat eine Umsatzgrenze: wann sich Shopify lohnt, welche Daten mitkommen, was es kostet."
series: migration
series_label: Shopware
author: lukas
published: 2026-10-19
updated: 2026-10-25
order: 3
category: "Shopify-Migration"
summary: "Shopware 5 bekommt seit Ende Juli 2024 keine Sicherheitsupdates mehr. Für Shopware 6.5 gibt es nur noch Sicherheitsfixes, laut Shopwares Lebenszyklus-Planung voraussichtlich bis Ende Februar 2027. Seit März 2025 brauchen Shops mit mehr als 1 Mio. € Jahresumsatz auf der kostenlosen Community Edition einen bezahlten Plan ab 600 € im Monat, um Account und Store weiter zu nutzen. Ein Umzug zu Shopify läuft wie jede Migration in vier Phasen: Audit, Mapping, Aufbau mit Testmigration, Go-live. Produkte, Kunden und Bestellungen lassen sich übertragen, URLs, Passwörter und Erlebniswelten nicht. Für Shopware gibt es kein offizielles Shopify-Importwerkzeug, die Daten laufen über CSV-Importe oder spezialisierte Migrationsdienste."
service: "/leistungen/shopify-migration/ | Shopify-Migration"
related: shopware-5-supportende, shopify-migration-kosten, jtl-zu-shopify-migration
---

## Warum wechseln gerade so viele Shops von Shopware zu Shopify?

Weil 2024 bis 2027 gleich drei Termine zusammenfallen, die für Shopware-Händler Geld oder Aufwand bedeuten:

| Anlass | Was gilt | Was es für euch heißt |
|---|---|---|
| Shopware 5 | Seit Ende Juli 2024 keine Sicherheitsupdates mehr vom Hersteller. Verlängerten Support gibt es nur noch kostenpflichtig über Drittanbieter. | Wer noch auf Shopware 5 läuft, betreibt einen ungepatchten Shop und muss so oder so migrieren, auch zu Shopware 6. Details im Artikel [Shopware 5 Supportende](/ratgeber/shopware-5-supportende/). |
| Shopware 6.5 | Nur noch Sicherheitsfixes, ausgeliefert über ein Security-Plugin. Laut Shopwares Lebenszyklus-Grafik endet auch das voraussichtlich am 28. Februar 2027. | Das nächste Major-Upgrade steht an. Jedes Plugin und das Theme müssen dafür kompatibel sein. |
| Community Edition | Seit 24. März 2025 gilt eine Fair-Usage-Regel: Wer mit seinen Shops mehr als 1 Mio. € Umsatz in 365 Tagen macht, braucht einen bezahlten Plan, um Shopware-Account und Plugin-Store weiter nutzen zu können. | Ab dieser Grenze kostet Shopware mindestens die Edition Rise ab 600 € pro Monat zuzüglich Hosting. |

Jeder dieser Termine zwingt zu einem Projekt. Viele Händler nutzen ihn, um grundsätzlich zu prüfen, ob sie Hosting, Updates und Plugin-Pflege überhaupt selbst tragen wollen.

## Shopware oder Shopify: Was ist der grundlegende Unterschied?

Shopware ist ein Shopsystem, das ihr selbst betreibt oder hosten lasst. Shopify ist eine gemietete Plattform, bei der Hosting, Sicherheit und Updates beim Anbieter liegen.

| | Shopware 6 | Shopify |
|---|---|---|
| Betrieb | Eigener Server oder Hoster, Shopware PaaS als Option | Komplett gehostet (SaaS) |
| Updates | Ihr spielt sie ein und testet Plugins und Theme | Laufen automatisch, ohne Upgrade-Projekte |
| Lizenz | Community Edition kostenlos bis 1 Mio. € Umsatz, danach Rise ab 600 €, Evolve ab 2.400 € pro Monat | Basic ab 27 €, Advanced 289 €, Plus ab 2.100 € pro Monat |
| Erweiterungen | Plugins aus dem Shopware Store, eigener Code im Core möglich | Apps aus dem Shopify App Store, eigene Logik über Apps und Shopify Functions |
| Seitengestaltung | Erlebniswelten | Theme-Abschnitte und Vorlagen (Online Store 2.0) |
| Regeln und Automatisierung | Rule Builder, Flow Builder | Rabatte, Shopify Functions, Shopify Flow |
| B2B | B2B-Funktionen in den höheren Editionen | Grundfunktionen in Basic, Grow und Advanced, voller Umfang in Plus |

Shopware ist flexibler, wenn ihr tief in Prozesse eingreifen wollt und ein Entwicklerteam habt. Shopify ist günstiger im Betrieb, wenn ihr das Geld lieber in Marketing und Sortiment steckt als in Server und Upgrades.

## Wann lohnt sich der Wechsel, wann nicht?

Der Wechsel lohnt sich, wenn mindestens zwei dieser Punkte auf euch zutreffen:

- Ihr steht ohnehin vor einem großen Upgrade (Shopware 5 auf 6 oder 6.5 auf eine neuere Version).
- Hosting, Wartung und Plugin-Lizenzen kosten euch mehr als ein Shopify-Plan mit Apps.
- Ihr habt keinen eigenen Entwickler, und jede Änderung läuft über eine Agentur.
- Ihr nähert euch der 1-Mio.-Grenze der Community Edition.
- Ihr wollt Marketing-Werkzeuge wie Shop App, Shop Pay oder die nativen Kanäle zu Google, Meta und TikTok direkt nutzen.

Bleibt bei Shopware, wenn euer Geschäftsmodell auf stark individualisierten Prozessen aufbaut, die tief im Shop-Core stecken, zum Beispiel komplexe Konfiguratoren oder eigene Preislogik pro Kunde, und ihr ein Team habt, das diese Logik pflegt. Dann ist ein Upgrade innerhalb von Shopware oft der kleinere Schritt.

## Welche Daten kommen von Shopware zu Shopify mit?

Die Geschäftsdaten kommen fast vollständig mit. Was an Shopware selbst hängt, also URLs, Erlebniswelten und Regeln, wird in Shopify neu aufgebaut.

| Daten | Übernehmbar? | Worauf ihr achten müsst |
|---|---|---|
| Produkte und Varianten | Ja | Shopify erlaubt bis zu 2.048 Varianten, aber maximal drei Optionen pro Produkt. Shopware-Produkte mit mehr Eigenschaftsgruppen im Variantengenerator müssen aufgeteilt oder anders abgebildet werden. |
| Eigenschaften und Zusatzfelder | Ja, als Metafelder | Vorher entscheiden, welche ihr für Filter und Produktseite wirklich braucht. |
| Kategorien | Ja, als Kollektionen | Shopify-Kollektionen sind flach. Der Kategoriebaum wird über Menü und Filter nachgebildet. Dynamische Produktgruppen werden zu automatischen Kollektionen. |
| Kundenkonten und Adressen | Ja | Passwörter lassen sich nicht übertragen. Mit den neuen Shopify-Kundenkonten melden sich Kunden per Einmal-Code an. |
| Bestellhistorie | Ja | Wird als historische Bestellungen importiert, ohne dass Kunden E-Mails bekommen. |
| Gutscheine und Promotions | Teilweise | Offene Codes lassen sich übernehmen, die Regeln dahinter werden neu angelegt. |
| Erlebniswelten und CMS-Seiten | Nein, nur die Inhalte | Texte und Bilder ziehen um, das Layout wird im Theme neu gebaut. |
| Bewertungen | Ja, über eine Review-App | Den Export aus Shopware früh testen. |
| URLs | Nein, sie ändern sich | Shopware nutzt frei konfigurierbare SEO-URLs, Shopify feste Pfade (`/products/`, `/collections/`, `/pages/`). Jede alte URL braucht eine 301-Weiterleitung. |

**Wie die Daten technisch umziehen.** Shopifys eigene Migrations-App unterstützt Shopware nicht. Üblich sind drei Wege: CSV-Exporte aus Shopware, die für den Shopify-Import umgebaut werden, Import-Apps wie Matrixify für große Datenmengen mit Metafeldern, oder spezialisierte Migrationsdienste, die beide Systeme direkt verbinden. Bei mehr als ein paar hundert Produkten oder vielen Eigenschaften lohnt sich ein Weg, den man mehrfach wiederholen kann. Die Testmigration und die Delta-Migration am Go-live-Tag laufen dann mit demselben Ablauf.

## Wie läuft die Migration ab?

Der neue Shop entsteht parallel, der Shopware-Shop verkauft bis zum Umschalttag weiter.

1. **Audit (ein bis zwei Wochen).** Welche Plugins sind installiert und was tun sie wirklich? Welche Systeme hängen dran: Warenwirtschaft, Zahlungsanbieter, Versand, Newsletter? Welche URLs bringen laut Search Console Traffic und Umsatz?
2. **Mapping (ein bis zwei Wochen).** Eigenschaft zu Metafeld, Kategorie zu Kollektion, Plugin zu App, Eigenentwicklung oder Wegfall. Dazu die vollständige Weiterleitungsliste.
3. **Aufbau und Testmigration (zwei bis sechs Wochen, bei großen Projekten länger).** Theme, Apps, Schnittstellen und Tracking entstehen, dann läuft eine vollständige Testmigration mit echten Daten.
4. **Go-live und Nachbetreuung (Umschalttag plus vier bis acht Wochen).** Delta-Migration, Domain umstellen, Weiterleitungen und Tracking live prüfen, danach Rankings und Bestellungen beobachten.

Den Ablauf jeder Phase im Detail beschreiben wir im Artikel [Magento zu Shopify migrieren](/ratgeber/magento-zu-shopify-migration/). Er gilt für Shopware genauso.

## Was ist bei Shopware anders als bei anderen Migrationen?

Vier Punkte kosten bei Shopware-Projekten regelmäßig Zeit:

- **Plugins aus dem deutschen Markt.** Viele Shopware-Shops nutzen Plugins für Rechnungskauf, Rechtstexte, Grundpreise oder Versanddienstleister. Für fast alles gibt es Shopify-Apps oder Bordmittel. Aber jede Funktion braucht eine bewusste Entscheidung, und manche Plugins fallen ersatzlos weg, weil Shopify die Funktion schon mitbringt.
- **Warenwirtschaft.** Klärt früh, ob eure Warenwirtschaft eine Shopify-Anbindung hat und ob sie dieselben Prozesse abdeckt wie die Shopware-Anbindung. Mehr dazu im nächsten Abschnitt.
- **Erlebniswelten.** Startseite, Landingpages und Kategorieseiten mit eigenem Layout werden im Shopify-Theme neu gebaut. Ein guter Moment, um Seiten ohne Traffic gar nicht erst mitzunehmen.
- **Rule Builder.** Versandkosten, Zahlarten nach Land oder Kundengruppe und Staffelrabatte stecken in Shopware oft in Regeln. Die müssen einzeln gesammelt und in Shopify über Versandprofile, Rabatte oder Shopify Functions nachgebaut werden.

## Warenwirtschaft, ERP und Versand anbinden

Nach dem Umzug muss mehr laufen als der Shop: Bestellungen müssen in der Warenwirtschaft ankommen, Bestände zurück in den Shop, Versandmeldungen und Rechnungen an die Kunden. In Shopware-Shops laufen diese Verbindungen meist über ein Plugin oder einen Connector, der für Shopify neu eingerichtet wird. Für Shopify gibt es fertige Anbindungen der verbreiteten Systeme im DACH-Raum, zum Beispiel den [JTL-Connector für JTL-Wawi](/ratgeber/jtl-zu-shopify-migration/), den Shopify-Connector von Xentral sowie Apps von PlentyONE (früher plentymarkets) und Billbee im Shopify App Store.

Wir binden euer System im Rahmen der [Shopify-Migration](/leistungen/shopify-migration/) an und prüfen vor dem Go-live mit echten Testbestellungen, ob Zahlart, Versandart, Bestände, Versandmeldung und Rechnung stimmen. Fehlt für euer System eine fertige Anbindung, klären wir im Audit, ob eine App, ein Middleware-Dienst oder eine eigene Schnittstelle der richtige Weg ist.

## Wie lange dauert der Umzug und was kostet er?

Dauer und Kosten hängen weniger an der Zahl der Produkte als an der Zahl der angebundenen Systeme und an der Datenqualität.

| Ausgangslage | Typische Dauer | Marktübliche Spanne |
|---|---|---|
| Schlanker Shop, unter 500 Produkten, Standard-Theme | vier bis sechs Wochen | ca. 2.000 bis 7.000 € |
| Mehrere Schnittstellen (Warenwirtschaft, Marktplätze), angepasstes Design | acht bis zwölf Wochen | ca. 7.000 bis 28.000 € |
| Mehrere Länder, B2B, ERP-Anbindung, Shopify Plus | drei bis sechs Monate | ab ca. 30.000 € |

Die Spannen sind Marktwerte, die Agenturen 2026 öffentlich nennen. Einen belastbaren Preis gibt es erst nach dem Audit. Was die Spanne nach oben treibt und wie ihr Angebote vergleicht, steht im Artikel [Was kostet eine Shopify-Migration?](/ratgeber/shopify-migration-kosten/).

**Laufende Kosten richtig vergleichen.** Legt für drei Jahre nebeneinander: auf der Shopware-Seite Lizenz oder Edition, Hosting, Wartung, Sicherheitsupdates, Plugin-Lizenzen und das nächste Major-Upgrade. Auf der Shopify-Seite Plan, Apps und Zahlungsgebühren. Achtung: Wer bei Shopify einen externen Zahlungsanbieter statt Shopify Payments nutzt, zahlt je nach Plan zusätzlich zwischen 2 % (Basic) und 0,2 % (Plus) Transaktionsgebühr.

## Checkliste vor dem Start

- Shopware-Version und Support-Status geprüft (5, 6.4, 6.5 oder neuer)
- Umsatz der letzten 365 Tage gegen die 1-Mio.-Grenze der Community Edition geprüft
- Liste aller Plugins mit der Frage: brauchen wir die Funktion noch?
- Anbindung der Warenwirtschaft an Shopify beim Anbieter angefragt
- Top-URLs aus der Search Console exportiert, als Grundlage für die Weiterleitungen
- Regeln aus dem Rule Builder gesammelt (Versand, Zahlarten, Rabatte)
- Go-live-Termin außerhalb der Hochsaison festgelegt

## Nach dem Go-live: Marketing aus einer Hand

Dasselbe Team, das euren Shop zu Shopify bringt, kann danach eure Meta Ads, Google Ads und das E-Mail-Marketing mit Klaviyo übernehmen. Ihr spart euch die Übergabe an eine zweite Agentur, und das Tracking steht ab dem ersten Tag, weil wir es beim Umzug eingerichtet haben. Mehr dazu unter [Performance Marketing](/leistungen/performance-marketing/).

## Häufige Fragen {faq}

### Kann ich von Shopware 5 direkt zu Shopify wechseln?

Ja. Ein Zwischenschritt über Shopware 6 ist nicht nötig, die Daten werden direkt aus Shopware 5 exportiert und in Shopify importiert. Für viele Shopware-5-Shops ist das sogar der kürzere Weg, weil ein Upgrade auf Shopware 6 ohnehin einem Neuaufbau gleichkommt.

### Ist die Shopware Community Edition nicht günstiger als Shopify?

Bis 1 Mio. € Umsatz kostet die Lizenz nichts. Hosting, Wartung, Updates und Plugin-Lizenzen bezahlt ihr trotzdem, oft mehr als einen Shopify-Plan. Ab 1 Mio. € Umsatz in 365 Tagen braucht ihr zusätzlich einen bezahlten Plan ab 600 € im Monat, um Account und Plugin-Store weiter zu nutzen.

### Verliere ich bei der Migration meine Google-Rankings?

Nicht, wenn jede alte Shopware-URL per 301 auf ihr Gegenstück zeigt und Titel, Beschreibungen und Inhalte mitziehen. Kleine Schwankungen in den ersten Wochen sind normal und gehören zur Beobachtung in der Nachbetreuung.

### Funktioniert Kauf auf Rechnung auch mit Shopify?

Ja, über Zahlungsanbieter wie Klarna, die in Deutschland in Shopify Payments integriert sind, oder über externe Anbieter mit eigener App. Prüft vorher, welche Zahlarten eure Kunden heute nutzen, damit beim Umzug keine wegfällt.

### Kann ich B2B-Kunden auch auf Shopify bedienen?

Ja. Shopify B2B ist in den Plänen Basic, Grow, Advanced und Plus enthalten, der Funktionsumfang hängt vom Plan ab. Firmenkonten, Zahlungsziele und eigene Preise gibt es in Grundzügen schon ohne Plus. Wer viele Firmen mit eigenen Katalogen hat, landet meist bei Shopify Plus.

## Quellen {sources}

- [Shopware Store: safefive, Sicherheitsupdates für Shopware 5 nach dem End of Life](https://store.shopware.com/de/extension-partners/safefive)
- [Shopware: Fair Usage Policy für die Community Edition](https://shopware.com/en/news/fair-usage-policy-community-edition/)
- [Shopware: Preise und Editionen](https://www.shopware.com/de/preise/)
- [endoflife.date: Shopware-Versionen und Support-Zeiträume](https://endoflife.date/shopware)
- [Shopify: Preise für Deutschland](https://www.shopify.com/de/preise)
- [Shopify Help Center: Shopify B2B](https://help.shopify.com/en/manual/b2b)
- [Shopify Developer Changelog: Variantenlimit 2.048 für alle Händler](https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants)
- [Shopify App Store: Store Migration](https://apps.shopify.com/store-migration)
- [JTL-Guide: JTL-Connector für Shopify](https://guide.jtl-software.com/jtl-connector/shopify/)
- [Xentral: Shopify-Integration](https://xentral.com/de/integrationen/shopify)
- [Shopify App Store: PlentyONE](https://apps.shopify.com/plentymarkets-1)
- [Shopify App Store: Billbee](https://apps.shopify.com/billbee-de)
