---
slug: shopware-to-shopify-migration
lang: en
translation: shopware-zu-shopify-migration
title: "Migrating from Shopware to Shopify: triggers, process and cost"
seo_title: "Shopware to Shopify Migration: Process & Cost | Velonify"
description: "Shopware 5 gets no updates, 6.5 is running out, the Community Edition has a revenue cap: when Shopify pays off, which data moves and what it costs."
series: migration
series_label: Shopware
author: lukas
published: 2026-10-19
updated: 2026-10-25
order: 3
category: "Shopify migration"
summary: "Shopware 5 has received no security updates since the end of July 2024. Shopware 6.5 only gets security fixes, which according to Shopware's lifecycle plan are expected to end in late February 2027. Since March 2025, stores on the free Community Edition with more than €1 million in annual revenue need a paid plan from €600 per month to keep using the Shopware Account and Store. A move to Shopify runs in four phases like any migration: audit, mapping, build with a test migration, go-live. Products, customers and orders can be transferred. URLs, passwords and Shopping Experiences cannot. Shopify has no official import tool for Shopware, so data moves via CSV imports or specialised migration services."
service: "/en/services/shopify-migration/ | Shopify migration"
related: shopware-5-end-of-life, shopify-migration-cost, jtl-to-shopify-migration
---

## Why are so many stores moving from Shopware to Shopify right now?

Because three dates between 2024 and 2027 all cost Shopware merchants money or effort:

| Trigger | What applies | What it means for you |
|---|---|---|
| Shopware 5 | No security updates from the vendor since the end of July 2024. Extended support is only available as a paid service from third parties. | If you still run Shopware 5, your store is unpatched and you have to migrate either way, even if it is to Shopware 6. Details in [Shopware 5 end of life](/en/guides/shopware-5-end-of-life/). |
| Shopware 6.5 | Security fixes only, delivered through a security plugin. According to Shopware's lifecycle chart this is expected to end on 28 February 2027. | The next major upgrade is due. Every plugin and the theme must be compatible with it. |
| Community Edition | A fair usage policy has applied since 24 March 2025: if your stores make more than €1 million in revenue within 365 days, you need a paid plan to keep using the Shopware Account and plugin store. | Above that line, Shopware costs at least the Rise edition from €600 per month, plus hosting. |

Each of these dates forces a project. Many merchants use it to ask whether they want to carry hosting, updates and plugin maintenance themselves at all.

## Shopware or Shopify: what is the core difference?

Shopware is a store system you run yourself or have hosted. Shopify is a rented platform where hosting, security and updates sit with the provider.

| | Shopware 6 | Shopify |
|---|---|---|
| Operation | Own server or host, Shopware PaaS as an option | Fully hosted (SaaS) |
| Updates | You install them and test plugins and theme | Run automatically, no upgrade projects |
| Licence | Community Edition free up to €1M revenue, then Rise from €600 or Evolve from €2,400 per month | Basic from €27, Advanced €289, Plus from €2,100 per month |
| Extensions | Plugins from the Shopware Store, custom code in the core possible | Apps from the Shopify App Store, custom logic via apps and Shopify Functions |
| Page design | Shopping Experiences | Theme sections and templates (Online Store 2.0) |
| Rules and automation | Rule Builder, Flow Builder | Discounts, Shopify Functions, Shopify Flow |
| B2B | B2B features in the higher editions | Core features on Basic, Grow and Advanced, full scope on Plus |

Shopware is more flexible if you want to change processes deep down and have a development team. Shopify is cheaper to run if you would rather spend the money on marketing and product range than on servers and upgrades.

## When does the move make sense, and when not?

The move makes sense if at least two of these apply to you:

- You are facing a major upgrade anyway (Shopware 5 to 6, or 6.5 to a newer version).
- Hosting, maintenance and plugin licences cost you more than a Shopify plan with apps.
- You have no in-house developer, and every change goes through an agency.
- You are getting close to the €1 million cap of the Community Edition.
- You want to use marketing tools such as the Shop app, Shop Pay or the native channels to Google, Meta and TikTok directly.

Stay on Shopware if your business model depends on heavily customised processes deep in the store core, such as complex configurators or custom pricing logic per customer, and you have a team that maintains that logic. In that case an upgrade within Shopware is often the smaller step.

## Which data comes along from Shopware to Shopify?

Almost all business data comes along. Anything tied to Shopware itself, such as URLs, Shopping Experiences and rules, is rebuilt in Shopify.

| Data | Transferable? | What to watch out for |
|---|---|---|
| Products and variants | Yes | Shopify allows up to 2,048 variants but at most three options per product. Shopware products with more property groups in the variant generator have to be split or modelled differently. |
| Properties and custom fields | Yes, as metafields | Decide beforehand which ones you really need for filters and the product page. |
| Categories | Yes, as collections | Shopify collections are flat. The category tree is rebuilt through menus and filters. Dynamic product groups become automated collections. |
| Customer accounts and addresses | Yes | Passwords cannot be transferred. With the new Shopify customer accounts, customers sign in with a one-time code. |
| Order history | Yes | Imported as historical orders without customers receiving emails. |
| Vouchers and promotions | Partly | Open codes can be carried over, the rules behind them are set up again. |
| Shopping Experiences and CMS pages | No, only the content | Text and images move, the layout is rebuilt in the theme. |
| Reviews | Yes, via a review app | Test the export from Shopware early. |
| URLs | No, they change | Shopware uses freely configurable SEO URLs, Shopify uses fixed paths (`/products/`, `/collections/`, `/pages/`). Every old URL needs a 301 redirect. |

**How the data moves technically.** Shopify's own Store Migration app does not support Shopware. There are three common routes: CSV exports from Shopware reshaped for the Shopify import, import apps such as Matrixify for large data sets with metafields, or specialised migration services that connect both systems directly. With more than a few hundred products or many properties, choose a route you can repeat. The test migration and the delta migration on go-live day then use the same process.

## How does the migration work?

The new store is built in parallel, and the Shopware store keeps selling until switch-over day.

1. **Audit (one to two weeks).** Which plugins are installed and what do they actually do? Which systems are connected: inventory management, payment providers, shipping, newsletter? Which URLs bring traffic and revenue according to Search Console?
2. **Mapping (one to two weeks).** Property to metafield, category to collection, plugin to app, custom build or removal. Plus the complete redirect list.
3. **Build and test migration (two to six weeks, longer for large projects).** Theme, apps, integrations and tracking are set up, then a full test migration runs with real data.
4. **Go-live and aftercare (switch-over day plus four to eight weeks).** Delta migration, domain switch, redirects and tracking checked live, then rankings and orders monitored.

We describe each phase in detail in [Migrating from Magento to Shopify](/en/guides/magento-to-shopify-migration/). It applies to Shopware in the same way.

## What is different about Shopware compared with other migrations?

Four things regularly take time in Shopware projects:

- **Plugins built for the German market.** Many Shopware stores use plugins for invoice payment, legal texts, unit prices or shipping carriers. There are Shopify apps or built-in features for almost all of them. But every function needs a deliberate decision, and some plugins are dropped entirely because Shopify already covers the function.
- **Inventory management.** Check early whether your inventory or ERP system has a Shopify connector and whether it covers the same processes as the Shopware connector. More on this in the next section.
- **Shopping Experiences.** The homepage, landing pages and category pages with custom layouts are rebuilt in the Shopify theme. A good moment to leave pages without traffic behind.
- **Rule Builder.** Shipping costs, payment methods by country or customer group and tiered discounts often live in Shopware rules. They have to be collected one by one and rebuilt in Shopify through shipping profiles, discounts or Shopify Functions.

## Connecting inventory, ERP and shipping

After the move, more than the store has to work: orders must reach your inventory system, stock must flow back to the store, and shipping confirmations and invoices must reach your customers. In Shopware stores, these connections usually run through a plugin or connector that has to be set up again for Shopify. For Shopify there are ready-made connections for widely used systems in Germany, Austria and Switzerland, for example the [JTL-Connector for JTL-Wawi](/en/guides/jtl-to-shopify-migration/), Xentral's Shopify connector, and apps from PlentyONE (formerly plentymarkets) and Billbee in the Shopify App Store.

We connect your system as part of our [Shopify migration](/en/services/shopify-migration/) service and check with real test orders before go-live that payment method, shipping method, stock, shipping confirmation and invoice are correct. If there is no ready-made connection for your system, we clarify in the audit whether an app, a middleware service or a custom integration is the right route.

## How long does the move take and what does it cost?

Timeline and cost depend less on the number of products than on the number of connected systems and on data quality.

| Starting point | Typical timeline | Typical market range |
|---|---|---|
| Lean store, under 500 products, standard theme | four to six weeks | approx. €2,000 to €7,000 |
| Several integrations (inventory, marketplaces), customised design | eight to twelve weeks | approx. €7,000 to €28,000 |
| Several countries, B2B, ERP integration, Shopify Plus | three to six months | from approx. €30,000 |

These ranges are market figures that agencies publish in 2026. A reliable price only exists after the audit. What pushes the range up and how to compare quotes is covered in [What does a Shopify migration cost?](/en/guides/shopify-migration-cost/).

**Comparing running costs properly.** Put three years side by side: on the Shopware side the licence or edition, hosting, maintenance, security updates, plugin licences and the next major upgrade. On the Shopify side the plan, apps and payment fees. Note: if you use an external payment provider instead of Shopify Payments, Shopify charges an extra transaction fee of between 2% (Basic) and 0.2% (Plus), depending on the plan.

## Checklist before you start

- Shopware version and support status checked (5, 6.4, 6.5 or newer)
- Revenue of the last 365 days checked against the €1M cap of the Community Edition
- List of all plugins, each with the question: do we still need this function?
- Shopify connector requested from your inventory or ERP provider
- Top URLs exported from Search Console as the basis for redirects
- Rules from the Rule Builder collected (shipping, payment methods, discounts)
- Go-live date set outside peak season

## After go-live: marketing from one team

The same team that moves your store to Shopify can then take over your Meta ads, Google Ads and email marketing with Klaviyo. You skip the handover to a second agency, and tracking works from day one because we set it up during the move. More on our [performance marketing](/en/services/performance-marketing/) page.

## Frequently asked questions {faq}

### Can I move from Shopware 5 directly to Shopify?

Yes. No detour via Shopware 6 is needed. The data is exported straight from Shopware 5 and imported into Shopify. For many Shopware 5 stores this is even the shorter route, because an upgrade to Shopware 6 amounts to a rebuild anyway.

### Isn't the Shopware Community Edition cheaper than Shopify?

Up to €1 million in revenue the licence costs nothing. You still pay for hosting, maintenance, updates and plugin licences, often more than a Shopify plan. Above €1 million in revenue within 365 days you also need a paid plan from €600 per month to keep using the account and plugin store.

### Will I lose my Google rankings during the migration?

Not if every old Shopware URL points to its counterpart with a 301 redirect and titles, descriptions and content move along. Small fluctuations in the first weeks are normal and are part of the monitoring during aftercare.

### Does invoice payment (buy now, pay later) work with Shopify?

Yes, through payment providers such as Klarna, which is integrated into Shopify Payments in Germany, or through external providers with their own app. Check beforehand which payment methods your customers use today, so none is lost in the move.

### Can I serve B2B customers on Shopify?

Yes. Shopify B2B is included in the Basic, Grow, Advanced and Plus plans, and the feature set depends on the plan. Company accounts, payment terms and custom prices are available in basic form without Plus. If you have many companies with their own catalogues, you usually end up on Shopify Plus.

## Sources {sources}

- [Shopware Store: safefive, security updates for Shopware 5 after end of life](https://store.shopware.com/en/extension-partners/safefive)
- [Shopware: Fair Usage Policy for the Community Edition](https://shopware.com/en/news/fair-usage-policy-community-edition/)
- [Shopware: Pricing and editions](https://www.shopware.com/de/preise/)
- [endoflife.date: Shopware versions and support periods](https://endoflife.date/shopware)
- [Shopify: Pricing for Germany](https://www.shopify.com/de/preise)
- [Shopify Help Center: Shopify B2B](https://help.shopify.com/en/manual/b2b)
- [Shopify Developer Changelog: 2,048 variant limit for all merchants](https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants)
- [Shopify App Store: Store Migration](https://apps.shopify.com/store-migration)
- [JTL Guide: JTL-Connector for Shopify (German)](https://guide.jtl-software.com/jtl-connector/shopify/)
- [Xentral: Shopify integration (German)](https://xentral.com/de/integrationen/shopify)
- [Shopify App Store: PlentyONE](https://apps.shopify.com/plentymarkets-1)
- [Shopify App Store: Billbee](https://apps.shopify.com/billbee-de)
