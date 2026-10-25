---
slug: google-ads-shopify
lang: de
translation: shopify-google-ads
title: "Google Ads für Shopify: Einrichtung, Tracking und Kampagnen"
seo_title: "Shopify Google Ads: Setup, Tracking & Kampagnen | Velonify"
description: "Google Ads für Shopify aufsetzen: Google & YouTube App oder manuell, Merchant-Center-Feed, Conversion-Tracking mit Consent Mode und typische Fehler."
author: lukas
published: 2026-10-25
updated: 2026-10-25
order: 3
category: "Performance Marketing"
summary: "Für Google Ads braucht ein Shopify-Shop drei Dinge: einen sauberen Produktfeed im Google Merchant Center, ein Conversion-Tracking, das jeden Kauf genau einmal mit dem richtigen Wert meldet, und eine Einwilligungsabfrage, die Google Consent Mode v2 bedient. Die kostenlose Google & YouTube App von Shopify deckt Feed, Kauf-Tracking und erweiterte Conversions für die meisten Shops ab. Ein manuelles Setup über Custom Pixel und Tag Manager lohnt sich, wenn ihr Nettowerte, Marge oder mehrere Kanäle steuern wollt. Die häufigsten Fehler sind doppelt gezählte Käufe, Umsatzwerte mit Mehrwertsteuer und Versand und Warenkorb-Events als Gebotsziel."
service: "/leistungen/performance-marketing/ | Performance Marketing"
related: server-side-tracking-shopify, shopify-migration-kosten, magento-zu-shopify-migration
---

## Was braucht ein Shopify-Shop für Google Ads?

Google Ads für Shopify steht auf drei Bausteinen. Fehlt einer, arbeiten die Kampagnen mit falschen oder unvollständigen Daten.

| Baustein | Wofür | Wo eingerichtet |
|---|---|---|
| Produktfeed im Google Merchant Center | Shopping-Anzeigen und Performance Max zeigen eure Produkte mit Bild und Preis | Google & YouTube App oder Feed-App |
| Conversion-Tracking | Google Ads lernt, welche Klicks zu Käufen führen, und bietet danach | Google & YouTube App oder Custom Pixel mit Tag Manager |
| Einwilligung (Consent Mode v2) | Ohne gültige Einwilligung nutzt Google Daten aus dem EWR nicht für personalisierte Werbung | Cookie-Banner, angebunden an Shopifys Customer Privacy API |

Erst wenn alle drei stehen, lohnt es sich, Budget in Kampagnen zu stecken.

## Google & YouTube App oder manuelles Setup?

Shopify bietet mit der Google & YouTube App einen eigenen Vertriebskanal für Google. Sie synchronisiert eure Produkte automatisch ins Merchant Center, verbindet das Google-Ads-Konto und richtet das Conversion-Tracking ein. Laut Google legt die App beim Verknüpfen die Conversion-Aktionen „Kauf“, „In den Einkaufswagen“ und „Direktkauf gestartet“ an. Erweiterte Conversions lassen sich in den Einstellungen der App aktivieren.

| | Google & YouTube App | Manuelles Setup (Custom Pixel, Tag Manager) |
|---|---|---|
| Produktfeed | Automatisch aus Shopify | Eigene Feed-App oder Feed-Regeln |
| Kauf-Tracking | Fertig eingerichtet | Selbst gebaut, volle Kontrolle über Wert und Parameter |
| Erweiterte Conversions | Schalter in der App | Selbst übergeben |
| Consent Mode v2 | Über Shopifys Customer Privacy API | Laut Shopify per Code-Snippet im Custom Pixel selbst aktivieren |
| Umsatzwert | Wie von der App übergeben | Frei wählbar: brutto, netto, mit oder ohne Versand, Marge |
| Aufwand | Gering | Einrichtung plus Pflege nach jeder Änderung |
| Passt für | Die meisten Shops mit Google als einem von wenigen Kanälen | Shops mit mehreren Kanälen, eigenem Reporting oder Marge als Ziel |

**Unsere Empfehlung:** Startet mit der Google & YouTube App. Ein manuelles Setup lohnt sich, sobald ihr nach Nettoumsatz oder Marge steuern wollt oder mehrere Werbeplattformen über einen gemeinsamen Datenstrom bedient. Wie das serverseitig aussieht, beschreiben wir im Artikel [Server-Side Tracking auf Shopify](/ratgeber/server-side-tracking-shopify/).

Wichtig, wenn bereits Google-Tags im Shop laufen: Google rät, die App zu installieren, bevor ihr Tags neu einbaut, und alte Tags zu entfernen, damit Käufe nicht doppelt zählen.

## Wie richtet ihr den Produktfeed im Merchant Center ein?

Der Feed entscheidet, ob und wie eure Produkte in Shopping-Anzeigen und Performance Max erscheinen. Die Google & YouTube App überträgt die Produkte aus Shopify automatisch. Die Qualität der Daten bleibt eure Aufgabe.

Laut Googles Produktdatenspezifikation sind unter anderem diese Angaben Pflicht: ID, Titel, Beschreibung, Link, Bildlink, Verfügbarkeit, Preis und Marke. Dazu kommen je nach Produkt:

- **GTIN.** Pflicht für Produkte, die eine GTIN haben. Google lehnt Produkte mit falschen GTINs ab, also keine erfundenen Werte eintragen. Pflegt die Barcodes in Shopify direkt an der Variante.
- **Varianten.** In Deutschland brauchen alle Varianten eines Produkts eine gemeinsame `item_group_id`. Prüft im Merchant Center, ob eure Varianten richtig gruppiert ankommen.
- **Bekleidung.** Für Kleidung verlangt Google in Deutschland zusätzlich Altersgruppe, Geschlecht und Farbe. In Shopify pflegt ihr das am besten über Metafelder oder die Produktkategorie.
- **Titel.** Maximal 150 Zeichen. Die wichtigsten Begriffe gehören nach vorn: Marke, Produktart, Material, Größe oder Farbe.

Prüft nach der ersten Synchronisation im Merchant Center die Diagnose. Abgelehnte Produkte tauchen dort mit Grund auf, zum Beispiel fehlende oder falsche GTINs oder Preise, die nicht zur Produktseite passen.

## Conversion-Tracking: Kauf, erweiterte Conversions und Consent

### Welche Conversions zählen?

Google Ads unterscheidet primäre und sekundäre Conversion-Aktionen. Primäre Aktionen stehen in der Spalte „Conversions“ und fließen in die Gebotsstrategie ein. Sekundäre dienen nur der Beobachtung und stehen unter „Alle Conversions“.

Für einen Shop sollte in der Regel nur der Kauf primär sein. Laut Google legt die Google & YouTube App neben „Kauf“ auch „In den Einkaufswagen“ und „Direktkauf gestartet“ an. Bleiben diese primär, optimiert Google auf Warenkörbe statt auf Bestellungen. Stellt sie nach der Einrichtung auf sekundär.

### Erweiterte Conversions

Erweiterte Conversions ergänzen das Tracking um Kundendaten aus dem Checkout, etwa E-Mail-Adresse, Name, Adresse oder Telefonnummer. Die Daten werden laut Google vor dem Senden mit dem Verfahren SHA256 gehasht. Google kann Käufe damit besser Anzeigenklicks zuordnen, auch wenn Cookies fehlen. In der Google & YouTube App aktiviert ihr sie unter Einstellungen und stimmt dort den Bedingungen für Kundendaten zu.

### Consent Mode v2

Für Nutzer aus dem Europäischen Wirtschaftsraum verlangt Google zwei Einwilligungssignale: `ad_user_data` für das Senden von Nutzerdaten zu Werbezwecken und `ad_personalization` für personalisierte Werbung. Shopify schreibt dazu, dass Ereignisdaten von Kunden aus dem EWR nicht für personalisierte Werbung genutzt werden, solange Consent Mode v2 nicht aktiviert ist und keine gültige Einwilligung vorliegt.

Für euch heißt das:

- Das Cookie-Banner muss an Shopifys Customer Privacy API angebunden sein, damit Shopify und die Google-App den Einwilligungsstatus kennen.
- Wer ein Custom Pixel nutzt, muss Consent Mode v2 laut Shopify selbst per Code-Snippet aktivieren.
- Testet das Banner in beiden Varianten: alles erlauben und alles ablehnen. Prüft danach im Google Tag Assistant, welche Signale ankommen.

Das ist keine Rechtsberatung. Stimmt das Setup mit eurem Datenschutzbeauftragten ab. Wenn ihr das Tracking nicht selbst aufsetzen wollt, übernehmen wir das im Bereich [Tracking & Attribution](/leistungen/tracking/).

## Welche Kampagnentypen passen zu Shopify?

| Kampagnentyp | Was sie macht | Voraussetzung | Passt für |
|---|---|---|---|
| Standard-Shopping | Produktanzeigen mit Bild und Preis in der Google-Suche und im Shopping-Tab | Merchant-Center-Feed | Shops, die Gebote pro Produktgruppe selbst steuern wollen |
| Performance Max | Eine Kampagne für das gesamte Google-Ads-Inventar, laut Google inklusive YouTube, Display, Suche, Discover, Gmail und Maps | Feed, Conversion-Tracking, Bilder und Texte | Shops mit sauberem Tracking und genug Käufen, damit Googles Gebotsautomatik lernen kann |
| Suchkampagne | Textanzeigen zu Suchbegriffen | Keywords und Anzeigentexte | Markenbegriffe und Suchbegriffe mit klarer Kaufabsicht |

**Wie die Typen zusammenspielen.** Google spielt Suchkampagnen mit einem genau passenden Keyword vorrangig vor Performance Max aus. Für Markenbegriffe lohnt sich deshalb eine eigene Suchkampagne. So seht ihr getrennt, wie viel Umsatz von Menschen kommt, die euch schon kennen, und wie viel von neuen Kunden.

**Gebotsstrategie.** Sobald das Kauf-Tracking zuverlässig misst und genug Käufe zusammenkommen, steuert ihr mit einem Ziel-ROAS auf den Umsatzwert. Vorher führt jede automatische Gebotsstrategie mit falschen Daten in die falsche Richtung.

## Die häufigsten Fehler bei Google Ads auf Shopify

1. **Doppelte Conversions.** Kauf-Tracking läuft gleichzeitig über die Google & YouTube App, ein altes Tag im Theme und vielleicht noch ein Custom Pixel. Google Ads meldet dann mehr Käufe als Shopify. Prüft unter Ziele, welche Kauf-Aktionen primär sind, und lasst nur eine übrig.
2. **Falscher Umsatzwert.** Shopify kennt im Checkout mehrere Summen. Der Gesamtpreis enthält laut Shopify-Dokumentation Steuern und Rabatte, die Zwischensumme ist vor Versand und Steuern. Entscheidet bewusst, welchen Wert ihr meldet, und rechnet euer ROAS-Ziel auf dieselbe Basis. Wer brutto meldet und netto kalkuliert, überschätzt seine Rendite um die Mehrwertsteuer.
3. **Warenkorb-Events als Gebotsziel.** Bleiben „In den Einkaufswagen“ und „Direktkauf gestartet“ primär, bietet Google auf Absichten statt auf Käufe.
4. **Consent nicht angebunden.** Ohne Consent Mode v2 fehlen für Nutzer aus dem EWR Remarketing-Listen und Teile der Messung.
5. **Feed-Fehler ignoriert.** Abgelehnte Produkte im Merchant Center erscheinen in keiner Shopping-Anzeige. Ein Blick in die Diagnose pro Woche reicht, um das zu vermeiden.
6. **Kein Abgleich mit Shopify.** Vergleicht einmal pro Woche die Käufe in Google Ads mit den Bestellungen in Shopify. Exakt gleich werden die Zahlen nie, weil nicht jeder einwilligt und Google nur Käufe nach Anzeigeninteraktionen zählt. Plötzliche Sprünge zeigen aber, dass etwas kaputt ist.

## Checkliste für den Start

- Google & YouTube App installiert, Merchant Center und Google Ads verknüpft
- Produkte im Merchant Center freigegeben, Diagnose ohne offene Fehler
- GTINs, Marke und bei Kleidung Altersgruppe, Geschlecht und Farbe gepflegt
- Nur „Kauf“ als primäre Conversion-Aktion, Warenkorb-Events sekundär
- Alte Google-Tags im Theme und doppelte Pixel entfernt
- Erweiterte Conversions aktiviert
- Cookie-Banner mit Customer Privacy API verbunden, Consent Mode v2 getestet
- Entschieden, ob der Umsatzwert brutto oder netto gemeldet wird
- Testbestellung durchgeführt, Kauf kommt genau einmal in Google Ads an

## Google Ads, Meta Ads und E-Mail aus einer Hand

Wir betreuen Google Ads für Shopify-Shops zusammen mit Meta Ads und E-Mail-Marketing mit Klaviyo. Das Tracking richten wir selbst ein, damit alle Kanäle mit denselben Zahlen arbeiten. Wer gerade zu Shopify umzieht, bekommt Migration und Marketing vom selben Team, und die Kampagnen laufen ab dem ersten Tag auf sauberen Daten. Mehr dazu unter [Performance Marketing](/leistungen/performance-marketing/) und [Shopify-Migration](/leistungen/shopify-migration/).

## Häufige Fragen {faq}

### Kostet die Google & YouTube App von Shopify etwas?

Die Installation ist laut Shopify App Store kostenlos. Ihr bezahlt das Werbebudget in Google Ads. Betreut eine Agentur die Kampagnen, kommt deren Honorar dazu.

### Brauche ich für Google Ads auf Shopify einen Tag Manager?

Nein. Die Google & YouTube App richtet Kauf-Tracking und erweiterte Conversions ohne Tag Manager ein. Ein Tag Manager lohnt sich, wenn ihr eigene Werte wie Nettoumsatz oder Marge senden oder mehrere Plattformen aus einem Datenstrom bedienen wollt.

### Sollte ich den Umsatz brutto oder netto an Google Ads melden?

Beides funktioniert, solange ihr konsequent bleibt. Wer nach Rendite steuert, meldet besser netto ohne Mehrwertsteuer und Versand, weil das näher am echten Erlös liegt. Wichtig ist, dass euer ROAS-Ziel auf derselben Basis berechnet ist.

### Warum zeigt Google Ads mehr Käufe als Shopify?

Meist zählt der Kauf doppelt, weil mehrere Tags oder Pixel gleichzeitig senden, oder weil neben dem Kauf weitere Aktionen primär sind. Prüft unter Ziele die primären Conversion-Aktionen und entfernt alte Tags aus dem Theme.

### Performance Max oder Standard-Shopping?

Performance Max deckt mit einer Kampagne das gesamte Google-Inventar ab und braucht dafür sauberes Tracking und genug Käufe zum Lernen. Standard-Shopping gibt euch mehr Kontrolle über Gebote pro Produktgruppe. Viele Shops starten mit einer der beiden und ergänzen eine Suchkampagne für Markenbegriffe.

### Funktioniert Google Ads auf Shopify ohne Cookie-Banner?

Technisch ja, rechtlich nein. Für Nutzer aus dem EWR braucht ihr eine Einwilligung und Consent Mode v2. Ohne gültige Einwilligung nutzt Google die Daten laut Shopify nicht für personalisierte Werbung.

## Quellen {sources}

- [Shopify Help Center: Google & YouTube](https://help.shopify.com/en/manual/online-sales-channels/google)
- [Shopify App Store: Google & YouTube](https://apps.shopify.com/google)
- [Google Ads Hilfe: Conversion-Tracking mit der Google & YouTube App auf Shopify einrichten](https://support.google.com/google-ads/answer/13494537?hl=de)
- [Google Ads Hilfe: Erweiterte Conversions](https://support.google.com/google-ads/answer/9888656?hl=de)
- [Google Ads Hilfe: Primäre und sekundäre Conversion-Aktionen](https://support.google.com/google-ads/answer/11461796?hl=de)
- [Google Ads Hilfe: Einwilligungsmodus für Traffic aus dem EWR](https://support.google.com/google-ads/answer/13695607?hl=de)
- [Google Ads Hilfe: Performance Max-Kampagnen](https://support.google.com/google-ads/answer/10724817?hl=de)
- [Google Ads Hilfe: Shopping-Anzeigen](https://support.google.com/google-ads/answer/2454022?hl=de)
- [Google Merchant Center Hilfe: Produktdatenspezifikation](https://support.google.com/merchants/answer/7052112?hl=de)
- [Shopify Help Center: Einwilligung und Google Consent Mode v2](https://help.shopify.com/en/manual/privacy-and-security/privacy/consent)
- [Shopify Developer: Kundenereignis checkout_completed](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed)
