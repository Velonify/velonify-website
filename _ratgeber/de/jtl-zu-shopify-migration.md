---
slug: jtl-zu-shopify-migration
lang: de
translation: jtl-to-shopify-migration
title: "JTL zu Shopify migrieren: JTL-Shop ablösen, JTL-Wawi behalten"
seo_title: "JTL zu Shopify: Shop migrieren, Wawi anbinden | Velonify"
description: "JTL-Shop zu Shopify migrieren und JTL-Wawi per JTL-Connector anbinden: was übertragen wird, wo der Connector Grenzen hat, Ablauf, Dauer und Kosten."
series: migration
series_label: JTL
author: lukas
published: 2026-10-25
updated: 2026-10-25
order: 5
category: "Shopify-Migration"
summary: "Wer von JTL zu Shopify wechselt, kann JTL-Wawi als Warenwirtschaft behalten und nur den Shop austauschen. Die Verbindung läuft über den JTL-Connector für Shopify, den JTL selbst betreibt. Er gleicht Artikel, Bestände und Aufträge zwischen Wawi und Shopify ab, abgerechnet wird pro übertragenem Auftrag. Grenzen gibt es bei Kategorien (Shopify übernimmt nur eine Ebene), bei Variantenbildern und bei Shopify-Plänen: Für neue Shops verlangt die Buchung über das JTL-Kundencenter mindestens den Plan Grow. URLs, Theme und Inhalte aus dem JTL-Shop werden neu aufgebaut, jede alte URL braucht eine 301-Weiterleitung. Ein schlanker Shop ist oft in vier bis sechs Wochen umgezogen."
service: "/leistungen/shopify-migration/ | Shopify-Migration"
related: shopify-migration-kosten, shopware-zu-shopify-migration, magento-zu-shopify-migration
---

## Was bedeutet „JTL zu Shopify“ eigentlich?

Hinter „JTL“ stecken zwei Produkte: JTL-Shop ist das Shopsystem, JTL-Wawi die Warenwirtschaft dahinter. Beim Wechsel zu Shopify stellt sich deshalb zuerst die Frage, ob nur der JTL-Shop abgelöst wird oder auch die Wawi. Bleibt JTL-Wawi, ist sie weiter das System, in dem Artikel, Lager, Aufträge, Rechnungen und Marktplätze wie Amazon oder eBay gepflegt werden. Shopify wird zum neuen Verkaufskanal und bekommt seine Daten aus der Wawi.

Daraus ergeben sich zwei Ausgangslagen mit unterschiedlichem Aufwand:

| Szenario | Was passiert | Aufwand |
|---|---|---|
| JTL-Shop zu Shopify, JTL-Wawi bleibt | Shopify ersetzt den Shop, die Wawi beliefert Shopify über den JTL-Connector mit Artikeln und Beständen und holt die Aufträge ab | Überschaubar. Lager, Versand und Buchhaltung laufen weiter wie bisher. |
| JTL komplett ablösen | Shop und Warenwirtschaft werden ersetzt, etwa durch Shopify plus ein anderes System mit Shopify-Anbindung wie Xentral, PlentyONE oder Billbee | Deutlich größer. Lager-, Versand- und Buchhaltungsprozesse ziehen mit um. |

Dieser Artikel konzentriert sich auf das erste Szenario.

## Wann lohnt sich der Wechsel von JTL-Shop zu Shopify?

Der Wechsel lohnt sich, wenn der Shop die Baustelle ist und die Wawi gut funktioniert. Typische Anlässe:

- Das Template ist in die Jahre gekommen, und jedes neue Layout braucht einen Entwickler.
- Updates des JTL-Shops und seiner Plugins kosten euch regelmäßig Zeit und Testaufwand.
- Hosting, Wartung und Sicherheit liegen bei euch oder eurem Dienstleister.
- Ihr wollt Shop Pay, die Shop App oder die nativen Kanäle zu Google, Meta und TikTok direkt nutzen.
- Ihr plant neue Länder und wollt Sprachen, Währungen und Domains in einem System steuern.

Bleibt beim JTL-Shop, wenn euer Geschäft auf Funktionen aufbaut, die eng mit der Wawi verzahnt sind, etwa komplexe Kundengruppenpreise oder Konfiguratorartikel. Ob der Connector sie abbildet, steht in JTLs Übersicht zur Funktionskompatibilität. Prüft solche Fälle im Audit einzeln, bevor ihr entscheidet.

## Wie wird JTL-Wawi an Shopify angebunden?

Über den JTL-Connector für Shopify. Er wird von der JTL-Software-GmbH selbst angeboten und betrieben. Weil Shopify eine gehostete Plattform ist, installiert ihr nichts auf einem Server. Die Einrichtung läuft laut JTL komplett im JTL-Kundencenter und in JTL-Wawi.

**Was der Connector abgleicht.** JTL nennt Artikel, Bestände und Aufträge. Von der Wawi an Shopify gehen Artikeldaten, Kategorien und Bilder. Von Shopify an die Wawi gehen Aufträge, Kunden und, bei einer Erstübernahme, Artikel. Versandmeldungen laufen zurück an Shopify, die Tracking-URL entsteht laut JTL aber nur, wenn der Name der Versandart mit einem Versanddienstleister aus Shopifys Liste beginnt, zum Beispiel „DPD“.

**Zwei Wege zur Buchung.** Ihr bucht den Connector entweder im JTL-Kundencenter oder als App „JTL ERP-Connector“ im Shopify App Store. Die App ist seit Oktober 2022 gelistet, die Installation ist kostenlos.

**Was er kostet.** Kosten entstehen laut JTL, sobald der Connector einen Auftrag an JTL-Wawi überträgt. Jede übertragene Bestellung zählt als Transaktion und wird über euer Auftragspaket abgerechnet. Eine Testphase gibt es nicht. Bestellungen, die mindestens sieben Tage vor Aktivierung der Lizenz entstanden sind, gelten beim Import nicht als Transaktion. Im Kundencenter könnt ihr außerdem ein Startdatum setzen, ab dem Aufträge importiert werden. Die aktuellen Preise der Auftragspakete nennt JTL im Kundencenter.

### Wo der Connector Grenzen hat

JTL listet in seiner Dokumentation einige Punkte, die ihr vor dem Umzug kennen solltet:

| Thema | Was gilt laut JTL | Was ihr tun müsst |
|---|---|---|
| Shopify-Plan | Bei Shops, die ab dem 24. Januar 2024 angelegt wurden, lassen sich personenbezogene Daten über eine Buchung im Kundencenter nur ab dem Plan Grow übertragen | Plan passend wählen oder den Connector über den Shopify App Store buchen |
| Kategorien | Shopify kennt nur eine Kategorieebene. Artikel aus Unterkategorien landen in der obersten Ebene. Übertragen werden nur manuelle Kollektionen. | Navigation und Filter in Shopify bewusst neu planen |
| Bilder | Bilder hängen in Shopify am Produkt. Pro Variante wird nur das Bild mit der höchsten Priorität übertragen. | Variantenbilder in der Wawi prüfen und sortieren |
| Alt-Texte | Die Attribute `img_alt_1`, `img_alt_2` usw. werden nicht übertragen | Alt-Text direkt am Bild in JTL-Wawi pflegen |
| Steuern | Steuersätze aus Shopify-Steuerüberschreibungen kann die Shopify-API nicht auslesen | Diese Sätze manuell im Kundencenter hinterlegen |
| Sprachen | Mehrsprachige Artikel- und Kategoriedaten ab Connector-Version 2.1.0 | Sprachen in Shopify aktivieren und Übersetzungsrechte setzen |
| Fehler | Ab Version 2.1.6 überspringt der Connector fehlerhafte Datensätze | Nach jedem Abgleich das Abgleichprotokoll prüfen |

Dazu kommt Shopifys eigenes Produktmodell: bis zu 2.048 Varianten, aber höchstens drei Optionen pro Produkt. Variationsartikel aus JTL mit mehr als drei Variationen müssen vor dem ersten Abgleich umgebaut werden.

Ein Rat aus der Praxis: Richtet den Connector zuerst mit einem Entwicklungsshop und einer Kopie eurer Wawi-Datenbank ein. JTL empfiehlt ohnehin, die Datenbank vor dem ersten Abgleich zu sichern, weil der initiale Abgleich lange dauern kann.

## Welche Daten kommen vom JTL-Shop zu Shopify mit?

Bleibt die Wawi, kommen Artikel, Bestände und Preise aus der Wawi und müssen nicht aus dem Shop migriert werden. Umziehen muss alles, was nur im JTL-Shop liegt.

| Daten | Weg zu Shopify | Worauf ihr achten müsst |
|---|---|---|
| Artikel, Varianten, Bestände | JTL-Connector aus der Wawi | Variationen auf höchstens drei Optionen pro Produkt bringen, Wurzelkategorie für Shopify anlegen |
| Kategorien | JTL-Connector, als manuelle Kollektionen | Nur eine Ebene. Tiefere Bäume über Menü und Filter abbilden. |
| Merkmale und Zusatzfelder | Als Metafelder | Metafelder müssen im Connector-Setup aktiviert werden. Vorher festlegen, welche ihr für Filter wirklich braucht. |
| Kundenkonten | Export aus Wawi oder JTL-Shop, Import per CSV oder App | Passwörter lassen sich nicht übertragen. Mit den neuen Shopify-Kundenkonten melden sich Kunden per Einmal-Code an. |
| Bestellhistorie | Bleibt in der Wawi, bei Bedarf als historische Bestellungen in Shopify | Für Kundenkonten mit Bestellübersicht lohnt sich der Import. Nummernkreise von Shop und Wawi müssen sich unterscheiden. |
| CMS-Seiten, Blog, Startseite | Neu im Shopify-Theme | Texte und Bilder ziehen um, das Layout entsteht neu |
| Bewertungen | Über eine Review-App | Export aus dem JTL-Shop früh testen |
| URLs | Ändern sich | Shopify nutzt feste Pfade (`/products/`, `/collections/`, `/pages/`). Jede alte URL braucht eine 301-Weiterleitung. |

**Wie die Shop-Daten technisch umziehen.** Shopifys eigene Migrations-App unterstützt JTL nicht. Sie listet unter anderem WooCommerce, Wix, Etsy, Amazon und eBay als Quellsysteme. Für JTL laufen Inhalte, Bewertungen und Kundendaten deshalb über CSV-Exporte, Import-Apps oder spezialisierte Migrationsdienste. Wählt einen Weg, den ihr wiederholen könnt, damit Testmigration und Delta-Migration am Go-live-Tag gleich ablaufen.

## Wie läuft die Migration von JTL zu Shopify ab?

Der neue Shop entsteht parallel. Der JTL-Shop verkauft bis zum Umschalttag weiter, die Wawi bedient in dieser Zeit beide Kanäle.

1. **Audit (ein bis zwei Wochen).** Welche Plugins laufen im JTL-Shop? Welche Funktionen stecken in der Wawi und welche im Shop? Welche Zahlarten, Versandarten und Marktplätze hängen dran? Welche URLs bringen laut Search Console Traffic?
2. **Mapping (ein bis zwei Wochen).** Variation zu Variante, Merkmal zu Metafeld, Kategorie zu Kollektion, Plugin zu App oder Wegfall. Dazu die vollständige Weiterleitungsliste.
3. **Connector und Aufbau (zwei bis sechs Wochen).** Connector mit Entwicklungsshop einrichten, Wurzelkategorie und Verkaufskanal in der Wawi anlegen, ersten Abgleich prüfen. Parallel entstehen Theme, Apps und Tracking.
4. **Testmigration.** Kunden, Inhalte und Bewertungen werden importiert, Testbestellungen laufen bis in die Wawi und zurück, inklusive Versandmeldung.
5. **Go-live und Nachbetreuung (Umschalttag plus vier bis acht Wochen).** Delta-Migration, Domain umstellen, Weiterleitungen und Tracking live prüfen, JTL-Shop als Verkaufskanal in der Wawi deaktivieren. Danach Rankings, Abgleichprotokolle und Bestellungen beobachten.

Die Phasen im Detail beschreiben wir im Artikel [Magento zu Shopify migrieren](/ratgeber/magento-zu-shopify-migration/). Sie gelten für JTL genauso.

## Wie lange dauert der Umzug und was kostet er?

Dauer und Kosten hängen weniger an der Zahl der Artikel als an der Zahl der angebundenen Systeme und an der Datenqualität in der Wawi.

| Ausgangslage | Typische Dauer | Marktübliche Spanne |
|---|---|---|
| Schlanker Shop, unter 500 Artikeln, Standard-Theme, Wawi bleibt | vier bis sechs Wochen | ca. 2.000 bis 7.000 € |
| Mehrere Schnittstellen (Marktplätze, Fulfillment), angepasstes Design | acht bis zwölf Wochen | ca. 7.000 bis 28.000 € |
| Mehrere Länder, B2B, ERP-Wechsel, Shopify Plus | drei bis sechs Monate | ab ca. 30.000 € |

Die Spannen sind Marktwerte, die Agenturen 2026 öffentlich nennen. Einen belastbaren Preis gibt es erst nach dem Audit. Was die Spanne nach oben treibt und wie ihr Angebote vergleicht, steht im Artikel [Was kostet eine Shopify-Migration?](/ratgeber/shopify-migration-kosten/).

**Laufende Kosten richtig rechnen.** Auf der Shopify-Seite stehen Plan, Apps, Zahlungsgebühren und die Connector-Transaktionen pro Auftrag. Der Plan Grow kostet bei jährlicher Zahlung 79 € pro Monat, Basic 27 €, Advanced 289 €. Achtet beim Planvergleich auf die Grow-Grenze des Connectors. Auf der JTL-Seite fallen Hosting, Wartung und Updates des JTL-Shops weg, die Kosten für JTL-Wawi bleiben.

## Checkliste vor dem Start

- Entschieden, ob JTL-Wawi bleibt oder mit abgelöst wird
- Liste aller JTL-Shop-Plugins mit der Frage: brauchen wir die Funktion noch?
- Variationsartikel mit mehr als drei Variationen identifiziert
- Kategoriebaum gegen Shopifys eine Kollektionsebene geprüft
- Shopify-Plan mit Blick auf die Grow-Voraussetzung des Connectors gewählt
- Wawi-Datenbank gesichert, Connector mit Entwicklungsshop getestet
- Top-URLs aus der Search Console exportiert, als Grundlage für die Weiterleitungen
- Tracking für GA4, Google Ads und Meta geplant (siehe [Server-Side Tracking auf Shopify](/ratgeber/server-side-tracking-shopify/))
- Go-live-Termin außerhalb der Hochsaison festgelegt

Wenn ihr den Umzug nicht allein stemmen wollt: Wir übernehmen Audit, Connector-Einrichtung und Go-live im Rahmen unserer [Shopify-Migration](/leistungen/shopify-migration/). Dazu gehört, dass Bestellungen, Bestände, Versandmeldungen und Rechnungen zwischen Shopify und JTL-Wawi vor dem Umschalten mit echten Testbestellungen geprüft sind.

## Nach dem Go-live: Marketing aus einer Hand

Dasselbe Team, das euren Shop zu Shopify bringt, kann danach eure Meta Ads, Google Ads und das E-Mail-Marketing mit Klaviyo übernehmen. Ihr spart euch die Übergabe an eine zweite Agentur, und das Tracking steht ab dem ersten Tag, weil wir es beim Umzug eingerichtet haben. Mehr dazu unter [Performance Marketing](/leistungen/performance-marketing/).

## Häufige Fragen {faq}

### Kann ich JTL-Wawi mit Shopify weiter nutzen?

Ja. JTL bietet dafür den JTL-Connector für Shopify an. Er gleicht Artikel, Bestände und Aufträge zwischen JTL-Wawi und Shopify ab. Ihr bucht ihn im JTL-Kundencenter oder als App „JTL ERP-Connector“ im Shopify App Store.

### Was kostet der JTL-Connector für Shopify?

Die Installation ist kostenlos. Abgerechnet wird pro Auftrag, den der Connector an JTL-Wawi überträgt, über euer Auftragspaket. Eine Testphase gibt es laut JTL nicht. Die aktuellen Paketpreise findet ihr im JTL-Kundencenter.

### Welchen Shopify-Plan brauche ich für den JTL-Connector?

Für Shops, die ab dem 24. Januar 2024 angelegt wurden, verlangt JTL bei einer Buchung über das Kundencenter mindestens den Plan Grow, damit personenbezogene Daten wie Kundenadressen übertragen werden. Alternativ bucht ihr den Connector über den Shopify App Store.

### Kann Shopify verschachtelte Kategorien aus JTL abbilden?

Nur über Umwege. Der Connector überträgt eine Kategorieebene als manuelle Kollektionen. Artikel aus Unterkategorien landen in der obersten Ebene. Die tiefere Struktur bildet ihr in Shopify über Menüs und Filter ab.

### Verliere ich bei der Migration meine Google-Rankings?

Nicht, wenn jede alte JTL-URL per 301 auf ihr Gegenstück zeigt und Titel, Beschreibungen und Inhalte mitziehen. Kleine Schwankungen in den ersten Wochen sind normal und gehören zur Beobachtung in der Nachbetreuung.

### Können Kunden ihre Passwörter behalten?

Nein, Passwörter lassen sich aus Sicherheitsgründen nicht übertragen. Mit den neuen Shopify-Kundenkonten melden sich Kunden per Einmal-Code an, ein Passwort-Reset entfällt dann.

## Quellen {sources}

- [JTL-Guide: JTL-Connector für Shopify](https://guide.jtl-software.com/jtl-connector/shopify/)
- [JTL-Guide: Hinweise zur Nutzung von Shopify](https://guide.jtl-software.com/jtl-connector/shopify/hinweise-zur-nutzung-von-shopify/)
- [JTL-Guide: Daten von JTL-Wawi an Shopify übertragen](https://guide.jtl-software.com/jtl-connector/shopify/daten-von-jtl-wawi-an-shopify-uebertragen/)
- [JTL-Guide: Daten von Shopify an JTL-Wawi übertragen](https://guide.jtl-software.com/jtl-connector/shopify/daten-von-shopify-an-jtl-wawi-uebertragen/)
- [JTL: Funktionskompatibilität der JTL-Connectoren (PDF)](https://static.jtl-software.de/downloads/JTL-Connector-Funktionen.pdf)
- [JTL-Guide: Transaktionskosten bei Shopware 6 und Shopify](https://guide.jtl-software.com/jtl-connector/unnoetige-transaktionen-bei-shopware-6-und-shopify-vermeiden/)
- [Shopify App Store: JTL ERP-Connector](https://apps.shopify.com/jtl-connector-erp-integration)
- [Shopify App Store: Store Migration](https://apps.shopify.com/store-migration)
- [Xentral: Shopify-Integration](https://xentral.com/de/integrationen/shopify)
- [Shopify App Store: PlentyONE](https://apps.shopify.com/plentymarkets-1)
- [Shopify App Store: Billbee](https://apps.shopify.com/billbee-de)
- [Shopify: Preise für Deutschland](https://www.shopify.com/de/preise)
- [Shopify Developer Changelog: Variantenlimit 2.048 für alle Händler](https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants)
- [Shopify Help Center: URL-Weiterleitungen](https://help.shopify.com/de/manual/online-store/menus-and-links/url-redirect)
