---
slug: jtl-to-shopify-migration
lang: en
translation: jtl-zu-shopify-migration
title: "Migrating from JTL to Shopify: replace JTL-Shop, keep JTL-Wawi"
seo_title: "JTL to Shopify: Migrate the Store, Keep JTL-Wawi | Velonify"
description: "Migrating JTL-Shop to Shopify and connecting JTL-Wawi via JTL-Connector: what transfers, where the connector has limits, process, timeline and cost."
series: migration
series_label: JTL
author: lukas
published: 2026-10-25
updated: 2026-10-25
order: 5
category: "Shopify migration"
summary: "If you move from JTL to Shopify, you can keep JTL-Wawi as your inventory and order management system and only replace the store. The connection runs through the JTL-Connector for Shopify, which JTL operates itself. It syncs items, stock and orders between JTL-Wawi and Shopify and is billed per transferred order. There are limits on categories (Shopify takes only one level), on variant images and on Shopify plans: for new stores, booking through the JTL customer centre requires at least the Grow plan. URLs, theme and content from JTL-Shop are rebuilt, and every old URL needs a 301 redirect. A lean store is often moved in four to six weeks."
service: "/en/services/shopify-migration/ | Shopify migration"
related: shopify-migration-cost, shopware-to-shopify-migration, magento-to-shopify-migration
---

## What does “JTL to Shopify” actually mean?

“JTL” covers two products: JTL-Shop is the store software, and JTL-Wawi is the inventory and order management system (Wawi is short for Warenwirtschaft) behind it. When you move to Shopify, the first question is whether you replace only JTL-Shop or JTL-Wawi as well. If JTL-Wawi stays, it remains the system where you manage items, warehouse, orders, invoices and marketplaces such as Amazon or eBay. Shopify becomes the new sales channel and gets its data from the Wawi.

That gives you two starting points with very different effort:

| Scenario | What happens | Effort |
|---|---|---|
| JTL-Shop to Shopify, JTL-Wawi stays | Shopify replaces the store. The Wawi feeds Shopify with items and stock via the JTL-Connector and pulls in the orders. | Manageable. Warehouse, shipping and accounting keep running as before. |
| Replace JTL entirely | Store and inventory system are replaced, for example by Shopify plus another system with a Shopify connection such as Xentral, PlentyONE or Billbee | Much larger. Warehouse, shipping and accounting processes move too. |

This article focuses on the first scenario.

## When does moving from JTL-Shop to Shopify make sense?

It makes sense when the store is the problem and the Wawi works well. Typical triggers:

- The template is ageing, and every new layout needs a developer.
- Updates to JTL-Shop and its plugins regularly cost you time and testing.
- Hosting, maintenance and security sit with you or your service provider.
- You want to use Shop Pay, the Shop app or the native channels to Google, Meta and TikTok directly.
- You are planning new countries and want to manage languages, currencies and domains in one system.

Stay on JTL-Shop if your business relies on features that are tightly linked to the Wawi, such as complex customer group pricing or configurable items. Whether the connector supports them is listed in JTL's feature compatibility overview. Check such cases one by one in the audit before you decide.

## How is JTL-Wawi connected to Shopify?

Through the JTL-Connector for Shopify. It is offered and operated by JTL-Software-GmbH itself. Because Shopify is a hosted platform, you do not install anything on a server. According to JTL, setup happens entirely in the JTL customer centre and in JTL-Wawi.

**What the connector syncs.** JTL names items, stock and orders. Item data, categories and images go from the Wawi to Shopify. Orders, customers and, for an initial takeover, items go from Shopify to the Wawi. Shipping confirmations go back to Shopify, but according to JTL the tracking URL is only generated if the shipping method name starts with a carrier from Shopify's list, for example “DPD”.

**Two ways to book it.** You book the connector either in the JTL customer centre or as the “JTL ERP-Connector” app in the Shopify App Store. The app has been listed since October 2022, and installation is free.

**What it costs.** According to JTL, costs arise as soon as the connector transfers an order to JTL-Wawi. Every transferred order counts as a transaction and is billed through your order package. There is no trial period. Orders created at least seven days before the licence was activated do not count as transactions when imported. In the customer centre you can also set a start date from which orders are imported. JTL lists the current order package prices in the customer centre.

### Where the connector has limits

JTL's documentation lists several points you should know before the move:

| Topic | What applies according to JTL | What you need to do |
|---|---|---|
| Shopify plan | For stores created on or after 24 January 2024, personal data can only be transferred via a customer centre booking from the Grow plan upwards | Choose the right plan or book the connector through the Shopify App Store |
| Categories | Shopify only has one category level. Items from subcategories end up at the top level. Only manual collections are transferred. | Plan navigation and filters in Shopify from scratch |
| Images | Images belong to the product in Shopify. Only the highest-priority image is transferred per variant. | Check and sort variant images in the Wawi |
| Alt text | The attributes `img_alt_1`, `img_alt_2` etc. are not transferred | Maintain alt text directly on the image in JTL-Wawi |
| Taxes | The Shopify API cannot read tax rates set via Shopify tax overrides | Enter these rates manually in the customer centre |
| Languages | Multilingual item and category data from connector version 2.1.0 | Enable the languages in Shopify and grant translation permissions |
| Errors | From version 2.1.6, the connector skips faulty records | Check the sync log after every sync |

Then there is Shopify's own product model: up to 2,048 variants, but no more than three options per product. JTL items with more than three variations need to be restructured before the first sync.

A tip from practice: set up the connector first with a development store and a copy of your Wawi database. JTL recommends backing up the database before the first sync anyway, because the initial sync can take a long time.

## Which data comes along from JTL-Shop to Shopify?

If the Wawi stays, items, stock and prices come from the Wawi and do not need to be migrated from the store. Everything that only lives in JTL-Shop has to move.

| Data | Route to Shopify | What to watch out for |
|---|---|---|
| Items, variants, stock | JTL-Connector from the Wawi | Reduce variations to no more than three options per product, create a root category for Shopify |
| Categories | JTL-Connector, as manual collections | Only one level. Map deeper trees with menus and filters. |
| Characteristics and custom fields | As metafields | Metafields must be enabled in the connector setup. Decide beforehand which ones you actually need for filters. |
| Customer accounts | Export from the Wawi or JTL-Shop, import via CSV or app | Passwords cannot be transferred. With Shopify's new customer accounts, customers log in with a one-time code. |
| Order history | Stays in the Wawi, imported into Shopify as historical orders if needed | Worth importing if customers should see past orders in their account. Shop and Wawi number ranges must differ. |
| CMS pages, blog, homepage | Rebuilt in the Shopify theme | Text and images move, the layout is rebuilt |
| Reviews | Via a review app | Test the export from JTL-Shop early |
| URLs | They change | Shopify uses fixed paths (`/products/`, `/collections/`, `/pages/`). Every old URL needs a 301 redirect. |

**How the store data moves technically.** Shopify's own migration app does not support JTL. It lists WooCommerce, Wix, Etsy, Amazon and eBay among its source systems. For JTL, content, reviews and customer data therefore move via CSV exports, import apps or specialised migration services. Choose a route you can repeat, so the test migration and the delta migration on go-live day run the same way.

## How does a migration from JTL to Shopify work?

The new store is built in parallel. JTL-Shop keeps selling until switchover day, and the Wawi serves both channels in the meantime.

1. **Audit (one to two weeks).** Which plugins run in JTL-Shop? Which functions live in the Wawi and which in the store? Which payment methods, shipping methods and marketplaces are connected? Which URLs bring traffic according to Search Console?
2. **Mapping (one to two weeks).** Variation to variant, characteristic to metafield, category to collection, plugin to app or dropped. Plus the complete redirect list.
3. **Connector and build (two to six weeks).** Set up the connector with a development store, create the root category and sales channel in the Wawi, check the first sync. Theme, apps and tracking are built in parallel.
4. **Test migration.** Customers, content and reviews are imported, and test orders run through to the Wawi and back, including the shipping confirmation.
5. **Go-live and aftercare (switchover day plus four to eight weeks).** Delta migration, domain switch, live checks of redirects and tracking, deactivate JTL-Shop as a sales channel in the Wawi. Then monitor rankings, sync logs and orders.

We describe each phase in detail in [Migrating from Magento to Shopify](/en/guides/magento-to-shopify-migration/). It applies to JTL in the same way.

## How long does the move take and what does it cost?

Timeline and cost depend less on the number of items than on the number of connected systems and the data quality in the Wawi.

| Starting point | Typical timeline | Typical market range |
|---|---|---|
| Lean store, under 500 items, standard theme, Wawi stays | four to six weeks | approx. €2,000 to €7,000 |
| Several integrations (marketplaces, fulfilment), customised design | eight to twelve weeks | approx. €7,000 to €28,000 |
| Several countries, B2B, ERP change, Shopify Plus | three to six months | from approx. €30,000 |

These ranges are market figures that agencies publish in 2026. A reliable price only exists after the audit. What pushes the range up and how to compare quotes is covered in [What does a Shopify migration cost?](/en/guides/shopify-migration-cost/).

**Calculating running costs properly.** On the Shopify side you have the plan, apps, payment fees and the connector transactions per order. Billed yearly, the Grow plan costs €79 per month, Basic €27 and Advanced €289. Keep the connector's Grow requirement in mind when comparing plans. On the JTL side, hosting, maintenance and updates of JTL-Shop go away, while the cost of JTL-Wawi remains.

## Checklist before you start

- Decided whether JTL-Wawi stays or is replaced as well
- List of all JTL-Shop plugins with the question: do we still need this function?
- Items with more than three variations identified
- Category tree checked against Shopify's single collection level
- Shopify plan chosen with the connector's Grow requirement in mind
- Wawi database backed up, connector tested with a development store
- Top URLs exported from Search Console as the basis for redirects
- Tracking for GA4, Google Ads and Meta planned (see [Server-side tracking on Shopify](/en/guides/shopify-server-side-tracking/))
- Go-live date set outside peak season

If you do not want to handle the move alone: we take care of the audit, connector setup and go-live as part of our [Shopify migration](/en/services/shopify-migration/) service. That includes checking orders, stock, shipping confirmations and invoices between Shopify and JTL-Wawi with real test orders before the switch.

## After go-live: marketing from one team

The same team that moves your store to Shopify can then take over your Meta ads, Google Ads and email marketing with Klaviyo. You skip the handover to a second agency, and tracking works from day one because we set it up during the move. More on our [performance marketing](/en/services/performance-marketing/) page.

## Frequently asked questions {faq}

### Can I keep using JTL-Wawi with Shopify?

Yes. JTL offers the JTL-Connector for Shopify for this. It syncs items, stock and orders between JTL-Wawi and Shopify. You book it in the JTL customer centre or as the “JTL ERP-Connector” app in the Shopify App Store.

### What does the JTL-Connector for Shopify cost?

Installation is free. You are billed per order the connector transfers to JTL-Wawi, through your order package. According to JTL there is no trial period. You will find the current package prices in the JTL customer centre.

### Which Shopify plan do I need for the JTL-Connector?

For stores created on or after 24 January 2024, JTL requires at least the Grow plan when you book through the customer centre, so that personal data such as customer addresses can be transferred. Alternatively, you book the connector through the Shopify App Store.

### Can Shopify handle nested categories from JTL?

Only with workarounds. The connector transfers one category level as manual collections. Items from subcategories end up at the top level. You rebuild the deeper structure in Shopify with menus and filters.

### Will I lose my Google rankings during the migration?

Not if every old JTL URL points to its counterpart with a 301 redirect and titles, descriptions and content move along. Small fluctuations in the first weeks are normal and part of what you monitor during aftercare.

### Can customers keep their passwords?

No, passwords cannot be transferred for security reasons. With Shopify's new customer accounts, customers log in with a one-time code, so a password reset is not needed.

## Sources {sources}

- [JTL Guide: JTL-Connector for Shopify (German)](https://guide.jtl-software.com/jtl-connector/shopify/)
- [JTL Guide: Notes on using Shopify (German)](https://guide.jtl-software.com/jtl-connector/shopify/hinweise-zur-nutzung-von-shopify/)
- [JTL Guide: Transferring data from JTL-Wawi to Shopify (German)](https://guide.jtl-software.com/jtl-connector/shopify/daten-von-jtl-wawi-an-shopify-uebertragen/)
- [JTL Guide: Transferring data from Shopify to JTL-Wawi (German)](https://guide.jtl-software.com/jtl-connector/shopify/daten-von-shopify-an-jtl-wawi-uebertragen/)
- [JTL: Feature compatibility of the JTL connectors (PDF, German)](https://static.jtl-software.de/downloads/JTL-Connector-Funktionen.pdf)
- [JTL Guide: Transaction costs for Shopware 6 and Shopify (German)](https://guide.jtl-software.com/jtl-connector/unnoetige-transaktionen-bei-shopware-6-und-shopify-vermeiden/)
- [Shopify App Store: JTL ERP-Connector](https://apps.shopify.com/jtl-connector-erp-integration)
- [Shopify App Store: Store Migration](https://apps.shopify.com/store-migration)
- [Xentral: Shopify integration (German)](https://xentral.com/de/integrationen/shopify)
- [Shopify App Store: PlentyONE](https://apps.shopify.com/plentymarkets-1)
- [Shopify App Store: Billbee](https://apps.shopify.com/billbee-de)
- [Shopify: Pricing for Germany](https://www.shopify.com/de/preise)
- [Shopify Developer Changelog: 2,048 variant limit for all merchants](https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants)
- [Shopify Help Center: URL redirects](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect)
