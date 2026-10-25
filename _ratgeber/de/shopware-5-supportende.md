---
slug: shopware-5-supportende
lang: de
translation: shopware-5-end-of-life
title: "Shopware 5 Supportende: Risiken und Optionen 2026"
seo_title: "Shopware 5 End of Life: Risiken & Optionen 2026 | Velonify"
description: "Shopware 5 bekommt seit Juli 2024 keine Sicherheitsupdates mehr, Ende 2026 läuft auch PHP 8.2 aus. Was das heißt und welche drei Wege euch 2026 bleiben."
author: lukas
published: 2026-10-25
updated: 2026-10-25
order: 1
category: "Shopware"
summary: "Shopware 5 bekommt seit Ende Juli 2024 keine Sicherheitsupdates mehr vom Hersteller. Die letzte Version 5.7.20 unterstützt offiziell PHP bis 8.2, und PHP 8.2 bekommt nur noch bis zum 31. Dezember 2026 Sicherheitsupdates. Ab 2027 läuft ein Shopware-5-Shop damit auf keiner offiziell unterstützten Kombination mehr. 2026 bleiben drei Wege: verlängerter Support über einen Drittanbieter wie safefive als Übergang, ein Umstieg auf Shopware 6, der technisch ein Neuaufbau ist, oder ein Wechsel zu Shopify. Bei Shopware 6 und Shopify muss in beiden Fällen auch die Anbindung von Warenwirtschaft und Versand neu eingerichtet werden."
service: "/leistungen/shopify-migration/ | Shopify-Migration"
related: shopware-zu-shopify-migration, shopify-migration-kosten, magento-supportende
---

## Was bedeutet das Supportende von Shopware 5?

Shopware hat die Entwicklung von Shopware 5 Ende Juli 2024 eingestellt, das End of Life ist erreicht. Seitdem gibt es vom Hersteller keine Sicherheitsupdates, Fehlerkorrekturen oder neuen Funktionen mehr. Die letzte veröffentlichte Version ist 5.7.20 vom Juni 2025. Laut Changelog enthält sie nur Aufräumarbeiten am Captcha-Code.

Euer Shop läuft trotzdem weiter. Er verkauft, Bestellungen kommen an, die Warenwirtschaft gleicht ab. Das Problem zeigt sich erst, wenn eine neue Sicherheitslücke bekannt wird. Für Shopware 5 schließt sie der Hersteller nicht mehr.

| Termin | Was passiert ist oder passiert |
|---|---|
| 31. Juli 2024 | Ende der Sicherheitsupdates für Shopware 5.7 |
| Juni 2025 | Version 5.7.20 mit Aufräumarbeiten, ohne neue Funktionen |
| 31. Dezember 2025 | PHP 8.1 bekommt keine Sicherheitsupdates mehr |
| 31. Dezember 2026 | PHP 8.2, die höchste offiziell unterstützte PHP-Version von Shopware 5, bekommt keine Sicherheitsupdates mehr |

## Welche Risiken hat ein Shopware-5-Shop 2026?

**Sicherheit.** Jede Lücke, die ab jetzt in Shopware 5 gefunden wird, bleibt im Original-Code offen. Ein Shop speichert Kundenkonten, Adressen und Bestellungen. Er ist damit ein lohnendes Ziel.

**PHP-Versionen.** Shopware 5.7.20 erlaubt laut seiner `composer.json` PHP 7.4 bis 8.2. PHP 7.4, 8.0 und 8.1 sind bereits ohne Sicherheitsupdates. Für PHP 8.2 endet die Sicherheitsunterstützung am 31. Dezember 2026. Ab 2027 läuft ein Shopware-5-Shop deshalb entweder auf einer PHP-Version ohne Sicherheitsupdates oder auf einer neueren Version, die Shopware nie offiziell freigegeben hat. Fragt euren Hoster, wie lange er PHP 8.2 noch anbietet.

**Plugins und Zahlungsanbieter.** Zahlungsarten, Versanddienstleister und Rechtstexte hängen in Shopware 5 an Plugins. Ändern Zahlungsanbieter ihre Schnittstellen, braucht das Plugin ein Update. Fragt bei euren Anbietern nach, wie lange sie ihre Shopware-5-Plugins noch pflegen, und lasst euch das schriftlich geben.

**Datenschutz und Zahlungssicherheit.** Die DSGVO verlangt in Artikel 32 technische Maßnahmen, die den Stand der Technik berücksichtigen. Der Kartenzahlungsstandard PCI DSS verlangt in Anforderung 6.3.3, Systeme durch Sicherheitspatches vor bekannten Schwachstellen zu schützen. Mit einer Software ohne Herstellerupdates wird beides schwerer zu begründen. Das ist keine Rechtsberatung. Klärt eure Lage mit eurem Datenschutzbeauftragten.

**Dienstleister.** Klärt mit eurer Agentur oder eurem Entwickler, wie lange sie Shopware 5 noch betreuen. Diese Antwort braucht ihr vor dem nächsten Notfall.

## Welche Optionen habt ihr 2026?

Realistisch bleiben drei Wege. Sie schließen sich nicht aus: Ihr könnt den Shop zuerst absichern und parallel den Umzug planen.

| | Verlängerter Support (z. B. safefive) | Upgrade auf Shopware 6 | Wechsel zu Shopify |
|---|---|---|---|
| Was es ist | Sicherheits- und Kompatibilitätsupdates von einem Drittanbieter | Neuer Shop auf Shopware 6, Daten über den Migrationsassistenten | Neuer Shop auf Shopify, Daten über CSV, Import-Apps oder Migrationsdienste |
| Aufwand | Gering, Plugin plus Vertrag | Hoch. Theme, Einkaufswelten, Plugins und Versandkosten werden neu aufgebaut. | Hoch. Theme, Apps und URLs werden neu aufgebaut. |
| Laufender Betrieb | Weiter bei euch: Hosting, Updates, Plugins | Weiter bei euch: Hosting, Updates, Major-Upgrades | Beim Anbieter: Hosting, Sicherheit, Updates |
| Laufende Kosten | Vertrag nach Online-Umsatz plus bisheriger Betrieb | Community Edition kostenlos bis 1 Mio. € Umsatz, darüber ab 600 € pro Monat, plus Hosting | Basic ab 27 €, Advanced 289 €, Plus ab 2.100 € pro Monat |
| Passt für | Die Zeit bis zum Umzug | Händler mit Entwicklerteam und stark individuellen Prozessen | Händler, die Betrieb und Updates abgeben wollen |

### Verlängerter Support als Übergang

Ein Anbieter dafür ist safefive. Laut Shopware Store liefert safefive seit August 2024 Sicherheits- und Kompatibilitätsupdates für Shopware 5 als Plugin, Voraussetzung ist ein Vertrag. Unterstützt werden die Versionen 5.5.0 bis 5.7.20. Im Interview mit dem Hoster maxcluster nannte safefive 2023 eine Laufzeit von mindestens fünf Jahren und einen Preis abhängig vom Online-Umsatz. Fehlerkorrekturen und neue Funktionen gehören ausdrücklich nicht dazu. safefive selbst beschreibt das Angebot als Brücke, bis der Umzug abgeschlossen ist.

Das ist eine sinnvolle Absicherung, wenn ihr den Umzug erst in einigen Monaten schafft. Als Dauerlösung bleibt der Shop auf einer Plattform, die sich nicht mehr weiterentwickelt.

### Upgrade auf Shopware 6

Der Schritt von Shopware 5 auf 6 ist kein Update. Shopware selbst beschreibt ihn als Start auf der grünen Wiese mit einem komplett neuen Shop. Der Migrationsassistent überträgt laut Shopware Kategorien, Produkte, Kunden, Bestellungen, Rabatte, Bewertungen und Medien. Nicht übernommen werden laut Shopware:

- Templates und Themes
- Einkaufswelten (sie werden als Erlebniswelten neu gebaut)
- Versandkosten
- E-Mail- und Dokumentvorlagen
- SEO-Einstellungen
- Daten aus der B2B-Suite

Dazu kommt, dass jedes Plugin eine Shopware-6-Version braucht. Auch Shopware 6 hat Versionszyklen: Shopware 6.5 bekommt laut endoflife.date nur noch bis 28. Februar 2027 Sicherheitsupdates, 6.6 und 6.7 bis 28. Februar 2028. Wer auf Shopware 6 geht, plant das nächste Upgrade-Projekt also gleich mit.

Shopware 6 ist der richtige Weg, wenn euer Geschäft auf tief individualisierten Prozessen im Shop-Core aufbaut und ihr ein Team habt, das diese Logik pflegt.

### Wechsel zu Shopify

Shopify ist eine gemietete Plattform. Hosting, Sicherheitsupdates und Weiterentwicklung liegen beim Anbieter, Versionen und Upgrade-Projekte gibt es nicht. Der Aufwand für den Umzug ist ähnlich hoch wie für ein Upgrade auf Shopware 6, weil beide ein Neuaufbau sind. Der Unterschied liegt im Betrieb danach.

Welche Daten mitkommen, wo Shopify andere Grenzen hat (etwa drei Optionen pro Produkt) und wie der Umzug abläuft, beschreiben wir ausführlich in [Shopware zu Shopify migrieren](/ratgeber/shopware-zu-shopify-migration/). Was so ein Projekt kostet, steht in [Was kostet eine Shopify-Migration?](/ratgeber/shopify-migration-kosten/).

## Welche Rolle spielt die Anbindung der Warenwirtschaft?

Eine große. In Shopware-5-Shops hängen Warenwirtschaft, Versand und Buchhaltung meist über ein Plugin oder einen Connector am Shop. Egal ob ihr zu Shopware 6 oder zu Shopify wechselt: Diese Anbindung wird neu eingerichtet.

Prüft deshalb früh, ob euer System den Zielshop unterstützt. Für Shopify gibt es Anbindungen der verbreiteten Systeme im DACH-Raum, zum Beispiel den JTL-Connector für JTL-Wawi, den Shopify-Connector von Xentral sowie Apps von PlentyONE (früher plentymarkets) und Billbee im Shopify App Store. JTL bietet seinen Connector auch für Shopware 6 an.

Im Projekt testen wir die Anbindung mit echten Testbestellungen: Kommen Bestellungen mit Zahlart und Versandart richtig an, stimmen Bestände, laufen Versandmeldungen und Rechnungen? Erst dann wird umgeschaltet.

## Wie trefft ihr die Entscheidung?

Fünf Fragen bringen euch in einer Stunde zu einer klaren Richtung:

1. **Wann seid ihr frühestens bereit für einen neuen Shop?** Liegt der Termin mehr als ein paar Monate entfernt, sichert den Shop bis dahin über verlängerten Support ab.
2. **Wer betreibt den Shop heute?** Habt ihr ein eigenes Entwicklerteam, das Shopware 6 betreuen will, oder läuft jede Änderung über eine Agentur?
3. **Was kostet euch Shopware 5 pro Jahr?** Hosting, Wartung, Plugin-Lizenzen, Entwicklerstunden und jetzt der verlängerte Support. Diese Summe ist die Vergleichsgröße.
4. **Welche Funktionen sind wirklich individuell?** Was ein Plugin oder eine App abdeckt, ist kein Argument für eine Plattform.
5. **Hat eure Warenwirtschaft eine Anbindung an das Zielsystem?** Fragt beim Anbieter nach, welche Daten in welche Richtung laufen.

Wenn ihr bei Frage 2 und 4 merkt, dass ihr Betrieb und Updates abgeben wollt und eure Prozesse Standard sind, spricht vieles für Shopify. Wenn ihr ein Team habt und tief in Prozesse eingreift, spricht vieles für Shopware 6.

## Was ihr jetzt sofort tun solltet

- Shopware-Version und PHP-Version eures Shops prüfen
- Beim Hoster nachfragen, wie lange er PHP 8.2 noch anbietet
- Admin-Zugänge aufräumen, ungenutzte Konten löschen, Backups prüfen
- Plugins entfernen, die ihr nicht mehr braucht
- Entscheiden, ob ihr verlängerten Support als Übergang bucht
- Top-URLs aus der Search Console exportieren, als Grundlage für jede spätere Migration
- Bei der Warenwirtschaft nachfragen, welche Shopsysteme sie anbindet

## Nach dem Umzug: Marketing aus einer Hand

Wenn ihr zu Shopify wechselt, kann dasselbe Team, das den Umzug macht, danach eure Meta Ads, Google Ads und das E-Mail-Marketing mit Klaviyo übernehmen. Das Tracking steht dann ab dem ersten Tag, weil wir es beim Umzug eingerichtet haben. Mehr dazu unter [Performance Marketing](/leistungen/performance-marketing/). Für den Umzug selbst findet ihr alles auf der Seite [Shopify-Migration](/leistungen/shopify-migration/).

## Häufige Fragen {faq}

### Funktioniert Shopware 5 nach dem Supportende weiter?

Ja. Der Shop läuft weiter und verkauft. Es kommen nur keine Sicherheitsupdates und Fehlerkorrekturen mehr vom Hersteller. Das Risiko steigt mit jeder neu bekannten Lücke und mit jeder PHP-Version, die ausläuft.

### Seit wann bekommt Shopware 5 keine Sicherheitsupdates mehr?

Seit Ende Juli 2024. Bis dahin hat Shopware noch Sicherheitsupdates geliefert. Die spätere Version 5.7.20 vom Juni 2025 enthielt laut Changelog nur Aufräumarbeiten.

### Kann ich Shopware 5 mit PHP 8.3 betreiben?

Offiziell nein. Die letzte Version 5.7.20 erlaubt laut ihrer `composer.json` PHP 7.4 bis 8.2. safefive bietet laut Shopware Store neben Sicherheits- auch Kompatibilitätsupdates an. Fragt dort nach, welche PHP-Versionen abgedeckt sind.

### Ist das Upgrade auf Shopware 6 einfacher als ein Wechsel zu Shopify?

Nicht unbedingt. Beide sind ein Neuaufbau. Der Migrationsassistent von Shopware überträgt Produkte, Kunden und Bestellungen, Themes, Einkaufswelten, Versandkosten und SEO-Einstellungen aber nicht. Der Unterschied liegt im Betrieb danach: Bei Shopware 6 bleiben Upgrades und in der Regel auch das Hosting bei euch, bei Shopify liegt beides beim Anbieter.

### Kann ich von Shopware 5 direkt zu Shopify wechseln?

Ja. Ein Zwischenschritt über Shopware 6 ist nicht nötig. Die Daten werden direkt aus Shopware 5 exportiert und in Shopify importiert.

### Was passiert mit meiner Warenwirtschaft beim Wechsel?

Die Anbindung wird für den neuen Shop neu eingerichtet. Für Shopify gibt es fertige Anbindungen unter anderem für JTL-Wawi, Xentral, PlentyONE und Billbee. Klärt vor dem Projekt, welche Daten euer System mit Shopify austauscht.

### Was kostet verlängerter Support für Shopware 5?

Bei safefive richtet sich der Preis laut Anbieter nach dem Online-Umsatz des Shops. Die aktuellen Konditionen nennt safefive selbst. Rechnet die Summe in euren Kostenvergleich ein, denn sie fällt zusätzlich zu Hosting und Wartung an.

## Quellen {sources}

- [endoflife.date: Shopware-Versionen und Support-Zeiträume](https://endoflife.date/shopware)
- [GitHub: Shopware 5 Release v5.7.20](https://github.com/shopware5/shopware/releases/tag/v5.7.20)
- [GitHub: Shopware 5.7.20 composer.json mit PHP-Anforderungen](https://github.com/shopware5/shopware/blob/v5.7.20/composer.json)
- [PHP: Unterstützte Versionen](https://www.php.net/supported-versions.php)
- [PHP: Nicht mehr unterstützte Versionen](https://www.php.net/eol.php)
- [Shopware Store: safefive](https://store.shopware.com/de/extension-partners/safefive)
- [maxcluster: Shopware 5 End of Life, Interview mit safefive](https://maxcluster.de/en/blog/shopware-5-eol-interview-safefive)
- [Shopware Docs: Migration von Shopware 5](https://docs.shopware.com/de/migration-de/shopware5)
- [Shopware Docs: Was wird von Shopware 5 auf 6 migriert](https://docs.shopware.com/de/de/migration-de/was-wird-migriert)
- [Shopware: Fair Usage Policy für die Community Edition](https://shopware.com/en/news/fair-usage-policy-community-edition/)
- [Shopify: Preise für Deutschland](https://www.shopify.com/de/preise)
- [DSGVO Art. 32: Sicherheit der Verarbeitung](https://dsgvo-gesetz.de/art-32-dsgvo/)
- [PCI Security Standards Council: Dokumentenbibliothek (PCI DSS v4.0.1)](https://www.pcisecuritystandards.org/document_library/)
- [JTL-Guide: JTL-Connector](https://guide.jtl-software.com/jtl-connector/)
- [Xentral: Shopify-Integration](https://xentral.com/de/integrationen/shopify)
- [Shopify App Store: PlentyONE](https://apps.shopify.com/plentymarkets-1)
- [Shopify App Store: Billbee](https://apps.shopify.com/billbee-de)
