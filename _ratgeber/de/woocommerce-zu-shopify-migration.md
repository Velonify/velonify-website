---
slug: woocommerce-zu-shopify-migration
lang: de
translation: woocommerce-to-shopify-migration
title: "WooCommerce zu Shopify migrieren: Ablauf, Daten und Kosten"
seo_title: "WooCommerce zu Shopify migrieren: Ablauf & Kosten | Velonify"
description: "Wann sich der Umzug von WooCommerce auf Shopify lohnt, welche Daten mitkommen, was mit Blog, SEO-Plugin und Abos passiert und was er kostet."
series: migration
series_label: WooCommerce
author: lukas
published: 2026-10-19
updated: 2026-10-25
order: 4
category: "Shopify-Migration"
summary: "WooCommerce selbst ist kostenlos, aber Hosting, kostenpflichtige Erweiterungen, Updates und Sicherheit liegen bei euch. 2025 wurden im WordPress-Umfeld 11.334 neue Sicherheitslücken gemeldet, 91 % davon in Plugins. Ein Umzug zu Shopify verlagert Hosting und Updates zum Anbieter. Shopifys eigene App Store Migration unterstützt WooCommerce direkt, Produkte, Kunden und Bestellungen lassen sich übertragen. Neu aufgebaut werden Theme, URLs mit 301-Weiterleitungen, SEO-Angaben aus Yoast oder Rank Math und Abos. Kundenpasswörter lassen sich nicht übernehmen. Ein schlanker Shop ist oft in vier bis sechs Wochen umgezogen."
service: "/leistungen/shopify-migration/ | Shopify-Migration"
related: shopify-migration-kosten, shopware-zu-shopify-migration, server-side-tracking-shopify
---

## Wann lohnt sich der Wechsel von WooCommerce zu Shopify?

Der Wechsel lohnt sich, wenn der Shop gewachsen ist und WordPress mehr Pflege braucht, als ihr leisten wollt. Typische Anzeichen:

- Nach Plugin- oder WordPress-Updates geht regelmäßig etwas kaputt, und ihr traut euch kaum noch zu aktualisieren.
- Der Shop wird mit mehr Produkten und Besuchern langsam, besonders im Warenkorb und an der Kasse.
- Ihr bezahlt Jahreslizenzen für ein Dutzend Erweiterungen und gutes Hosting und kommt damit an die Kosten eines Shopify-Plans.
- Sicherheit hängt an euch: Updates, Backups, Firewall.
- Ihr wollt Kanäle wie Google, Meta, TikTok oder Marktplätze anbinden, ohne für jeden ein eigenes Plugin zu pflegen.

Weniger sinnvoll ist der Umzug, wenn euer Geschäft vor allem aus Inhalten besteht und der Shop nur ein kleiner Zusatz ist, etwa bei einem großen Magazin mit wenigen Produkten. Dann ist WordPress als Content-System oft die bessere Basis.

## WooCommerce oder Shopify: Was ist der Unterschied?

WooCommerce ist ein Plugin, das WordPress zum Shop macht. Ihr betreibt also eine WordPress-Installation mit allem, was dazugehört. Shopify ist eine gemietete Shop-Plattform, bei der Server, Sicherheit und Updates beim Anbieter liegen.

| | WooCommerce | Shopify |
|---|---|---|
| Betrieb | WordPress auf eigenem Hosting | Komplett gehostet (SaaS) |
| Software-Kosten | Plugin kostenlos, Erweiterungen meist als Jahreslizenz | Basic ab 27 €, Advanced 289 €, Plus ab 2.100 € pro Monat |
| Updates und Sicherheit | Ihr spielt WordPress-, Theme- und Plugin-Updates selbst ein | Laufen automatisch beim Anbieter |
| Erweiterungen | Zehntausende WordPress-Plugins | Apps aus dem Shopify App Store |
| Checkout | Abhängig von Theme und Plugins | Einheitlicher Shopify-Checkout mit Shop Pay |
| Blog und Inhalte | Sehr stark, WordPress ist dafür gebaut | Einfacher Blog, für Shops meist ausreichend |

Der wichtigste Unterschied ist die Verantwortung. Bei WooCommerce seid ihr Betreiber der Software, bei Shopify Kunde einer Plattform.

**Warum Sicherheit ein echtes Argument ist.** Das Sicherheitsunternehmen Patchstack hat für 2025 im WordPress-Umfeld 11.334 neue Sicherheitslücken gezählt, 42 % mehr als im Vorjahr. 91 % davon steckten in Plugins. Ein WooCommerce-Shop mit vielen Erweiterungen hat also viele Stellen, die ihr aktuell halten müsst.

## Welche Daten kommen von WooCommerce zu Shopify mit?

| Daten | Übernehmbar? | Worauf ihr achten müsst |
|---|---|---|
| Produkte und Varianten | Ja | Shopify erlaubt bis zu 2.048 Varianten, aber maximal drei Optionen pro Produkt. Variable WooCommerce-Produkte mit mehr Attributen müssen aufgeteilt werden. |
| Attribute und eigene Felder | Ja, als Metafelder | Felder aus Plugins wie ACF müssen einzeln zugeordnet werden. |
| Kategorien und Schlagwörter | Ja | Kategorien werden zu Kollektionen, Schlagwörter zu Produkt-Tags. Verschachtelte Kategorien bildet ihr über Menü und Filter ab. |
| Kundenkonten | Ja | WordPress-Passwörter lassen sich nicht übertragen. Mit den neuen Shopify-Kundenkonten melden sich Kunden per Einmal-Code an. |
| Bestellhistorie | Ja | Erst Produkte, dann Kunden, dann Bestellungen importieren, sonst fehlen die Verknüpfungen. |
| Gutscheine | Teilweise | Codes lassen sich übernehmen, Bedingungen werden in Shopify neu angelegt. |
| Blogbeiträge und Seiten | Ja | Shopify-Blogs kennen Tags, aber keine Kategorien. Eine große Blog-Struktur braucht ein eigenes Konzept. |
| SEO-Titel und Beschreibungen | Ja, mit Aufwand | Angaben aus Yoast oder Rank Math liegen in eigenen Feldern und müssen gezielt exportiert werden. Sonst gehen eure gepflegten Titel verloren. |
| Abos | Teilweise | WooCommerce Subscriptions wird durch eine Shopify-Abo-App ersetzt. Ob gespeicherte Zahlungsdaten mitkommen, hängt vom Zahlungsanbieter und von der App ab. |
| URLs | Nein, sie ändern sich | Aus `/product/` wird `/products/`, aus `/product-category/` wird `/collections/`. Jede alte URL braucht eine 301-Weiterleitung. |

**Wie die Daten technisch umziehen.** Anders als bei Magento oder Shopware hat Shopify für WooCommerce ein eigenes Werkzeug: Die App Store Migration verbindet sich mit dem WooCommerce-Shop oder liest dessen Exporte und überträgt Produkte, Kunden und historische Bestellungen. Für einfache Shops reicht das oft. Bei vielen eigenen Feldern, Blog-Inhalten und SEO-Angaben ergänzen wir sie mit Import-Apps wie Matrixify, damit sich der Import für die Testmigration und den Go-live-Tag wiederholen lässt.

## Wie läuft die Migration ab?

Der neue Shop entsteht parallel, der WooCommerce-Shop verkauft bis zum Umschalttag weiter.

1. **Audit (ein bis zwei Wochen).** Welche Plugins laufen und was davon braucht ihr wirklich? Welche Seiten und Beiträge bringen laut Search Console Traffic? Welche Zahlarten, Versanddienste und Schnittstellen hängen am Shop?
2. **Mapping (ein bis zwei Wochen).** Attribut zu Metafeld, Kategorie zu Kollektion, Plugin zu App oder Shopify-Bordmittel, dazu die vollständige Weiterleitungsliste für Produkte, Kategorien, Seiten und Blog.
3. **Aufbau und Testmigration (zwei bis sechs Wochen).** Theme, Apps, Tracking und Rechtstexte entstehen, dann läuft eine vollständige Testmigration.
4. **Go-live und Nachbetreuung (Umschalttag plus vier bis acht Wochen).** Delta-Migration, Domain umstellen, Weiterleitungen und Tracking prüfen, Rankings beobachten.

Die Phasen im Detail beschreiben wir im Artikel [Magento zu Shopify migrieren](/ratgeber/magento-zu-shopify-migration/).

## Was ist bei WooCommerce anders?

- **Blog und Inhalte.** Viele WooCommerce-Shops haben über Jahre einen großen Blog aufgebaut, der viel organischen Traffic bringt. Diese Beiträge brauchen dieselbe Sorgfalt wie Produkte: Inhalte übernehmen, interne Links anpassen, jede URL weiterleiten. Wer den Blog lieber in WordPress lässt, kann ihn auf einer Subdomain weiterbetreiben, verteilt damit aber Inhalte und Rankings auf zwei Adressen.
- **Deutsche Rechtsplugins.** Plugins wie Germanized oder German Market regeln Grundpreise, Lieferzeiten, Pflichtangaben im Checkout und Rechnungen. In Shopify übernehmen das Theme-Einstellungen, Rechtstext-Apps und Rechnungs-Apps. Diese Punkte gehören vor dem Go-live juristisch geprüft.
- **Page-Builder.** Seiten aus Elementor oder ähnlichen Buildern lassen sich nicht übertragen. Inhalte ziehen um, das Layout wird im Shopify-Theme neu gebaut.
- **Eigener Code.** Anpassungen in der `functions.php` oder in Child-Themes fallen beim Umzug oft erst spät auf. Sammelt sie im Audit, damit klar ist, was davon eine App oder Shopify-Bordmittel übernimmt.

## Warenwirtschaft, ERP und Versand anbinden

Nach dem Umzug muss mehr laufen als der Shop: Bestellungen müssen in der Warenwirtschaft ankommen, Bestände zurück in den Shop, Versandmeldungen und Rechnungen an die Kunden. In WooCommerce-Shops laufen diese Verbindungen meist über Plugins, die beim Umzug wegfallen. Für Shopify gibt es fertige Anbindungen der verbreiteten Systeme im DACH-Raum, zum Beispiel den [JTL-Connector für JTL-Wawi](/ratgeber/jtl-zu-shopify-migration/), den Shopify-Connector von Xentral sowie Apps von PlentyONE (früher plentymarkets) und Billbee im Shopify App Store.

Wir binden euer System im Rahmen der [Shopify-Migration](/leistungen/shopify-migration/) an und prüfen vor dem Go-live mit echten Testbestellungen, ob Zahlart, Versandart, Bestände, Versandmeldung und Rechnung stimmen. Fehlt für euer System eine fertige Anbindung, klären wir im Audit, ob eine App, ein Middleware-Dienst oder eine eigene Schnittstelle der richtige Weg ist.

## Wie lange dauert der Umzug und was kostet er?

| Ausgangslage | Typische Dauer | Marktübliche Spanne |
|---|---|---|
| Schlanker Shop, unter 500 Produkten, Standard-Theme | vier bis sechs Wochen | ca. 2.000 bis 7.000 € |
| Größerer Katalog, Blog, mehrere Schnittstellen, angepasstes Design | acht bis zwölf Wochen | ca. 7.000 bis 28.000 € |
| Mehrere Länder, B2B, ERP-Anbindung, Shopify Plus | drei bis sechs Monate | ab ca. 30.000 € |

Die Spannen sind Marktwerte, die Agenturen 2026 öffentlich nennen. Einen belastbaren Preis gibt es erst nach dem Audit. Was die Spanne nach oben treibt und wie ihr Angebote vergleicht, steht im Artikel [Was kostet eine Shopify-Migration?](/ratgeber/shopify-migration-kosten/).

**Laufende Kosten vergleichen.** WooCommerce wirkt günstiger, weil die Software nichts kostet. Rechnet für drei Jahre: Hosting, Jahreslizenzen der Erweiterungen, Wartung und Updates, Sicherheitsdienste und Backups. Dagegen stehen bei Shopify Plan, Apps und Zahlungsgebühren. Wer bei Shopify einen externen Zahlungsanbieter statt Shopify Payments nutzt, zahlt je nach Plan zusätzlich zwischen 2 % (Basic) und 0,2 % (Plus) Transaktionsgebühr.

## Checkliste vor dem Start

- Liste aller Plugins mit der Frage: brauchen wir die Funktion noch?
- SEO-Titel und Beschreibungen aus Yoast oder Rank Math exportiert
- Top-URLs aus der Search Console exportiert, inklusive Blogbeiträgen
- Entscheidung getroffen: Blog zu Shopify oder in WordPress lassen
- Abos und Zahlungsanbieter geprüft: Lassen sich gespeicherte Zahlungsdaten übertragen?
- Rechtliche Pflichtangaben für Shopify geplant (Grundpreise, Lieferzeiten, Rechnungen)
- Go-live-Termin außerhalb der Hochsaison festgelegt

## Nach dem Go-live: Marketing aus einer Hand

Dasselbe Team, das euren Shop zu Shopify bringt, kann danach eure Meta Ads, Google Ads und das E-Mail-Marketing mit Klaviyo übernehmen. Ihr spart euch die Übergabe an eine zweite Agentur, und das Tracking steht ab dem ersten Tag, weil wir es beim Umzug eingerichtet haben. Mehr dazu unter [Performance Marketing](/leistungen/performance-marketing/).

## Häufige Fragen {faq}

### Kann ich meine WooCommerce-Daten selbst zu Shopify übertragen?

Für einen kleinen Shop ja. Shopifys kostenlose App Store Migration unterstützt WooCommerce und überträgt Produkte, Kunden und Bestellungen. Weiterleitungen, SEO-Angaben, Blog und Theme müsst ihr trotzdem selbst aufsetzen, und genau dort entstehen die meisten Rankingverluste.

### Verliere ich bei der Migration meine Google-Rankings?

Nicht, wenn jede alte URL von Produkten, Kategorien, Seiten und Blogbeiträgen per 301 auf ihr Gegenstück zeigt und Titel und Beschreibungen mitziehen. Kleine Schwankungen in den ersten Wochen sind normal.

### Kann ich meinen WordPress-Blog behalten?

Ja, auf zwei Wegen. Entweder ihr zieht die Beiträge in den Shopify-Blog um, dann liegt alles auf einer Domain. Oder ihr betreibt WordPress als Blog auf einer Subdomain weiter. Das spart Aufwand, teilt aber Inhalte und Rankings auf zwei Adressen auf.

### Was passiert mit laufenden Abos?

Sie werden in eine Shopify-Abo-App übertragen. Ob Kunden ihre Zahlungsdaten neu eingeben müssen, hängt vom Zahlungsanbieter ab. Klärt das vor dem Projektstart mit Zahlungsanbieter und Abo-App, und informiert betroffene Kunden rechtzeitig.

### Ist WooCommerce nicht günstiger als Shopify?

Die Software kostet nichts, der Betrieb schon: Hosting, Jahreslizenzen für Erweiterungen, Updates, Sicherheit und Entwicklerzeit. Bei kleinen Shops mit wenigen Plugins ist WooCommerce oft günstiger. Mit wachsendem Shop dreht sich das häufig.

## Quellen {sources}

- [Patchstack: State of WordPress Security in 2026](https://www.patchstack.com/whitepaper/state-of-wordpress-security-in-2026/)
- [Shopify App Store: Store Migration](https://apps.shopify.com/store-migration)
- [Shopify Help Center: Daten mit der Store-Migration-App importieren](https://help.shopify.com/en/manual/migrating-to-shopify/store-migration-app)
- [Shopify: Preise für Deutschland](https://www.shopify.com/de/preise)
- [Shopify Developer Changelog: Variantenlimit 2.048 für alle Händler](https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants)
- [Shopify Help Center: URL-Weiterleitungen](https://help.shopify.com/de/manual/online-store/menus-and-links/url-redirect)
- [JTL-Guide: JTL-Connector für Shopify](https://guide.jtl-software.com/jtl-connector/shopify/)
- [Xentral: Shopify-Integration](https://xentral.com/de/integrationen/shopify)
- [Shopify App Store: PlentyONE](https://apps.shopify.com/plentymarkets-1)
- [Shopify App Store: Billbee](https://apps.shopify.com/billbee-de)
