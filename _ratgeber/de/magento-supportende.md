---
slug: magento-supportende
lang: de
translation: magento-end-of-support
title: "Magento 2.4.6 ohne Support: Was Shopbetreiber jetzt tun sollten"
seo_title: "Magento 2.4.6 Supportende: Risiken und Optionen | Velonify"
description: "Seit dem 11. August 2026 bekommt Magento 2.4.6 keine regulären Sicherheitsupdates mehr. Was das für euren Shop bedeutet und welche Optionen ihr jetzt habt."
author: lukas
published: 2026-09-24
updated: 2026-09-24
order: 1
category: "Magento"
summary: "Magento 2.4.6 hat am 11. August 2026 den regulären Support verloren. Für Magento Open Source kommen seitdem keine Sicherheitspatches und Qualitätsfixes mehr von Adobe, Adobe-Commerce-Kunden erhalten Extended Support bis zum 31. August 2027. Der Shop läuft weiter, wird aber mit jeder neu entdeckten Lücke angreifbarer. Realistisch habt ihr drei Wege: auf 2.4.8 oder 2.4.9 upgraden, auf eine SaaS-Plattform wie Shopify umziehen oder den Shop als Übergang absichern, bis der Umzug steht."
service: "/leistungen/shopify-migration/ | Shopify-Migration"
related: magento-zu-shopify-migration, server-side-tracking-shopify
---

## Was ist am 11. August 2026 passiert?

Adobe begrenzt den Support jeder Magento-2.4-Version auf einen festen Zeitraum. Für Version 2.4.6 endete der reguläre Support („Standard Support“) am 11. August 2026. Das betrifft Magento Open Source und Adobe Commerce gleichermaßen. Nur Adobe-Commerce-Lizenzkunden bekommen danach noch ein Jahr Extended Support ohne Aufpreis.

So sieht der Stand laut Adobe Software Lifecycle Policy aus:

| Version | Ende Standard Support | Extended Support (nur Adobe Commerce) | Stand September 2026 |
|---|---|---|---|
| 2.4.4 | 12.04.2025 | 14.04.2026 | ohne Support |
| 2.4.5 | 12.08.2025 | 11.08.2026 | ohne Support |
| 2.4.6 | 11.08.2026 | 31.08.2027 | Open Source ohne Support |
| 2.4.7 | 31.05.2027 | 31.05.2028 | läuft in acht Monaten aus |
| 2.4.8 | 31.05.2028 | noch offen | unterstützt |
| 2.4.9 | 31.05.2029 | noch offen | unterstützt, seit Mai 2026 verfügbar |

Wer noch auf Magento 1 läuft, ist schon länger allein: Für Magento 1 gibt es seit dem 30. Juni 2020 keine offiziellen Patches mehr.

## Was bedeutet „kein Support“ konkret?

Euer Shop geht nicht offline und funktioniert am nächsten Morgen genauso wie vorher. Was fehlt, sind drei Dinge:

- **Sicherheitspatches.** Wird eine Lücke in Magento 2.4.6 bekannt, schließt Adobe sie für Open Source nicht mehr. Die Lücke bleibt offen, und sie ist öffentlich dokumentiert.
- **Qualitätsfixes.** Fehler im Core werden nicht mehr behoben, auch nicht solche, die nach Browser- oder Payment-Updates neu auftreten.
- **Kompatibilität.** Hersteller von Extensions, Themes und Payment-Modulen testen ihre Updates gegen unterstützte Versionen. Neue Releases setzen früher oder später 2.4.7 oder 2.4.8 voraus.

Dazu kommt der Unterbau. Magento 2.4.6 läuft auf PHP 8.1 und 8.2. Für PHP 8.1 gibt es seit dem 31. Dezember 2025 keine Sicherheitsupdates mehr, für PHP 8.2 endet die Versorgung am 31. Dezember 2026. Ab Januar 2027 ist also auch die Laufzeitumgebung unter eurem Shop nicht mehr gepflegt, selbst wenn ihr Magento selbst noch notdürftig patcht.

## Warum das mehr ist als ein IT-Thema

**Zahlungsdaten.** Magento-Shops sind seit Jahren ein bevorzugtes Ziel von Skimming-Angriffen, bei denen Schadcode im Checkout Kartendaten abgreift. Solche Angriffe laufen fast immer über bekannte, ungepatchte Lücken.

**PCI DSS.** Wer Kartenzahlungen annimmt, muss nach PCI DSS v4.0.1 (Anforderung 6.3.3) kritische Sicherheitsupdates innerhalb eines Monats nach Erscheinen einspielen. Ohne Patches vom Hersteller ist das nicht erfüllbar. Euer Payment-Anbieter fragt das im jährlichen Self-Assessment ab.

**Datenschutz.** Die DSGVO verlangt in Art. 32 Sicherheitsmaßnahmen nach dem Stand der Technik. Kommt es zu einer Datenpanne, wird eine bewusst weiter betriebene Software ohne Sicherheitsupdates schwer zu erklären sein. Das ist keine Rechtsberatung, aber ein Punkt, den ihr mit eurem Datenschutzbeauftragten besprechen solltet.

**Kosten.** Je länger ein System ohne Support läuft, desto teurer wird jede Änderung. Entwickler müssen um veraltete Abhängigkeiten herumarbeiten, und neue Extensions lassen sich oft gar nicht mehr installieren.

## Welche Version habt ihr? So prüft ihr es

Das dauert zwei Minuten:

1. **Im Admin:** Unten rechts im Footer des Magento-Backends steht die Version, zum Beispiel „Magento ver. 2.4.6-p8“.
2. **Auf dem Server:** Der Befehl `bin/magento --version` im Shop-Verzeichnis gibt die installierte Version aus.
3. **Im Code:** In der Datei `composer.lock` steht die Version des Pakets `magento/product-community-edition` (Open Source) oder `magento/product-enterprise-edition` (Adobe Commerce).

Steht dort 2.4.6 oder älter, betrifft euch dieser Artikel direkt. Bei 2.4.7 habt ihr noch bis Ende Mai 2027 Zeit, solltet die Entscheidung aber jetzt vorbereiten.

## Eure Optionen im Vergleich

| Option | Was ihr bekommt | Aufwand | Passt, wenn … |
|---|---|---|---|
| Upgrade auf 2.4.8 oder 2.4.9 | Support bis Mai 2028 bzw. Mai 2029 | Mittel bis hoch: PHP 8.3 bis 8.5, OpenSearch, alle Extensions prüfen | der Shop stark individualisiert ist und euer Team Magento dauerhaft betreuen kann |
| Umzug auf Shopify | Kein eigenes Patchen mehr, Shopify betreibt und sichert die Plattform | Einmalig: vier bis zwölf Wochen Projekt | ihr die Plattformpflege loswerden und Inhalte selbst pflegen wollt |
| Übergangsweise absichern | Zeit gewinnen, bis Upgrade oder Umzug stehen | Gering | nur als Brücke für wenige Monate, nicht als Dauerlösung |
| Nichts tun | Nichts | Keiner, bis etwas passiert | nie, sobald ihr Kunden- oder Zahlungsdaten verarbeitet |

**Zum Upgrade:** Ein Sprung von 2.4.6 auf 2.4.8 ist kein Patch, sondern ein kleines Projekt. Magento 2.4.8 verlangt PHP 8.3 oder 8.4, Magento 2.4.9 PHP 8.4 oder 8.5. Jede Extension und jede Eigenentwicklung muss mit der neuen Umgebung laufen. Und in zwei bis drei Jahren steht das nächste Upgrade an, denn jede Version bekommt rund drei Jahre Support.

**Zum Umzug:** Auf Shopify gibt es keine Versionen, die ihr selbst aktualisieren müsst. Sicherheitsupdates, Hosting und PCI-Konformität des Checkouts liegen bei Shopify. Dafür gebt ihr einen Teil der Freiheit auf, die Magento technisch bietet. Wie der Umzug abläuft, was er kostet und wie lange er dauert, steht in unserem Artikel [Magento zu Shopify migrieren](/ratgeber/magento-zu-shopify-migration/).

**Zur Absicherung als Übergang:** Web Application Firewall vor dem Shop, Admin-Bereich per IP-Freigabe und Zwei-Faktor-Anmeldung schützen, ungenutzte Extensions entfernen, regelmäßige Malware-Scans und ein Monitoring auf Änderungen an Checkout-Dateien. Das senkt das Risiko, ersetzt aber keine Patches.

## Upgrade oder Umzug? Fünf Fragen für die Entscheidung

1. **Wie viel Eigenentwicklung steckt im Shop?** Viele individuelle Module sprechen eher für ein Upgrade, denn sie müssten auf Shopify neu gedacht werden. Oft stellt sich im Audit aber heraus, dass ein Großteil davon heute Standard oder per App lösbar ist.
2. **Was kostet euch Magento pro Jahr?** Rechnet Hosting, Entwickler-Stunden, Extension-Lizenzen und Upgrades zusammen. Diese Summe ist die Vergleichsgröße für die Shopify-Gebühren.
3. **Wer pflegt den Shop im Alltag?** Wenn jede Landingpage, jedes Banner und jede Aktion einen Entwickler braucht, bremst die Plattform euer Marketing.
4. **Wie oft wollt ihr noch große Upgrades machen?** Bei Magento kommt die nächste Frist sicher, alle zwei bis drei Jahre.
5. **Was plant ihr in den nächsten zwei Jahren?** Neue Länder, B2B-Kunden, mehr Kanäle: Prüft, welche Plattform das mit weniger Eigenbau abbildet.

Wenn ihr bei drei oder mehr Fragen zur Plattformpflege tendiert, lohnt sich ein ernsthafter Blick auf den Umzug.

## Timing: Warum ihr nicht vor Black Friday umziehen solltet

Wir haben Ende September. Für die meisten Shops beginnt jetzt die umsatzstärkste Zeit des Jahres. Einen Plattformwechsel mitten ins Weihnachtsgeschäft zu legen, raten wir fast nie. Sinnvoller ist dieser Ablauf:

- **Jetzt:** Shop absichern (siehe oben), Version prüfen, Kosten und Anforderungen sammeln.
- **Oktober und November:** Audit und Entscheidung für Upgrade oder Umzug. Das bindet euer Team kaum.
- **Dezember bis Februar:** Aufbau parallel zum laufenden Shop.
- **Januar bis März 2027:** Go-live in der ruhigeren Zeit nach dem Weihnachtsgeschäft.

Für Adobe-Commerce-Kunden mit Extended Support bis August 2027 ist das entspannt machbar. Für Open-Source-Shops ist der Zeitraum bis zum Go-live die Phase mit dem höchsten Risiko, deshalb gehört die Absicherung an den Anfang.

## Häufige Fragen {faq}

### Läuft mein Magento-Shop nach dem Supportende weiter?

Ja. Der Shop funktioniert technisch weiter. Es erscheinen nur keine regulären Sicherheits- und Qualitätsupdates mehr, sodass neu entdeckte Lücken offen bleiben.

### Gilt das Supportende auch für Adobe Commerce?

Der reguläre Support für 2.4.6 endete für beide Editionen am 11. August 2026. Adobe-Commerce-Lizenzkunden erhalten zusätzlich Extended Support bis zum 31. August 2027 ohne Aufpreis. Für Magento Open Source gibt es keinen Extended Support.

### Reicht ein Upgrade auf Magento 2.4.7?

Nur als kurzer Zwischenschritt. Der reguläre Support für 2.4.7 endet am 31. Mai 2027, also in rund acht Monaten. Wer upgradet, sollte direkt auf 2.4.8 oder 2.4.9 gehen.

### Wie lange dauert ein Umzug von Magento auf Shopify?

Ein schlanker Shop mit wenigen Zusatzsystemen ist oft in vier bis sechs Wochen live. Mit mehreren Integrationen oder auf Shopify Plus sind acht bis zwölf Wochen realistisch. Den genauen Zeitplan liefert ein Audit.

### Was passiert mit unseren Google-Rankings beim Umzug?

Sie bleiben erhalten, wenn jede alte URL per 301-Weiterleitung auf ihr neues Gegenstück zeigt und die Metadaten übernommen werden. Kleine Schwankungen in den ersten Wochen sind normal.

## Quellen {sources}

- [Adobe: Software Lifecycle Policy für Adobe Commerce und Magento Open Source](https://experienceleague.adobe.com/en/docs/commerce-operations/release/planning/lifecycle-policy)
- [PHP: Supported Versions](https://www.php.net/supported-versions.php)
- [PCI Security Standards Council: PCI DSS v4.0.1](https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1)
- [Adobe: Release Notes Magento Open Source 2.4.6](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-6)
