---
slug: shopware-5-end-of-life
lang: en
translation: shopware-5-supportende
title: "Shopware 5 end of life: risks and options in 2026"
seo_title: "Shopware 5 End of Life: Risks & Options 2026 | Velonify"
description: "Shopware 5 has had no security updates since July 2024, and PHP 8.2 runs out at the end of 2026. What that means and the three paths you have in 2026."
author: lukas
published: 2026-10-25
updated: 2026-10-25
order: 1
category: "Shopware"
summary: "Shopware 5 has received no security updates from the vendor since the end of July 2024. The last version, 5.7.20, officially supports PHP up to 8.2, and PHP 8.2 only receives security updates until 31 December 2026. From 2027, a Shopware 5 store therefore no longer runs on any officially supported combination. In 2026 you have three paths: extended support from a third party such as safefive as a bridge, an upgrade to Shopware 6, which is technically a rebuild, or a move to Shopify. With Shopware 6 and Shopify alike, the connection to your inventory and shipping systems has to be set up again."
service: "/en/services/shopify-migration/ | Shopify migration"
related: shopware-to-shopify-migration, shopify-migration-cost, magento-end-of-support
---

## What does Shopware 5 end of life mean?

Shopware discontinued development of Shopware 5 at the end of July 2024, and the platform has reached end of life. Since then, the vendor has provided no security updates, bug fixes or new features. The last released version is 5.7.20 from June 2025. According to its changelog, it only contains clean-up work on the captcha code.

Your store keeps running. It sells, orders come in, and your inventory system keeps syncing. The problem only shows when a new security vulnerability becomes known. For Shopware 5, the vendor no longer closes it.

| Date | What happened or will happen |
|---|---|
| 31 July 2024 | End of security updates for Shopware 5.7 |
| June 2025 | Version 5.7.20 with clean-up work, no new features |
| 31 December 2025 | PHP 8.1 stops receiving security updates |
| 31 December 2026 | PHP 8.2, the highest PHP version officially supported by Shopware 5, stops receiving security updates |

## What risks does a Shopware 5 store face in 2026?

**Security.** Every vulnerability found in Shopware 5 from now on stays open in the original code. A store holds customer accounts, addresses and orders. That makes it a worthwhile target.

**PHP versions.** According to its `composer.json`, Shopware 5.7.20 allows PHP 7.4 to 8.2. PHP 7.4, 8.0 and 8.1 already receive no security updates. Security support for PHP 8.2 ends on 31 December 2026. From 2027, a Shopware 5 store therefore runs either on a PHP version without security updates or on a newer version that Shopware never officially approved. Ask your hosting provider how long they will keep offering PHP 8.2.

**Plugins and payment providers.** Payment methods, shipping carriers and legal texts depend on plugins in Shopware 5. When payment providers change their interfaces, the plugin needs an update. Ask your providers how long they will maintain their Shopware 5 plugins, and get the answer in writing.

**Data protection and payment security.** Article 32 of the GDPR requires technical measures that take the state of the art into account. The card payment standard PCI DSS requires, in requirement 6.3.3, that systems are protected from known vulnerabilities by installing security patches. Software without vendor updates makes both harder to justify. This is not legal advice. Clarify your situation with your data protection officer.

**Service providers.** Check with your agency or developer how long they will continue to support Shopware 5. You need that answer before the next emergency.

## What options do you have in 2026?

Realistically, three paths remain. They are not mutually exclusive: you can secure the store first and plan the move in parallel.

| | Extended support (e.g. safefive) | Upgrade to Shopware 6 | Move to Shopify |
|---|---|---|---|
| What it is | Security and compatibility updates from a third party | New store on Shopware 6, data via the Migration Assistant | New store on Shopify, data via CSV, import apps or migration services |
| Effort | Low, plugin plus contract | High. Theme, Shopping Worlds, plugins and shipping costs are rebuilt. | High. Theme, apps and URLs are rebuilt. |
| Ongoing operation | Stays with you: hosting, updates, plugins | Stays with you: hosting, updates, major upgrades | With the provider: hosting, security, updates |
| Running costs | Contract based on online revenue plus current operating costs | Community Edition free up to €1 million revenue, above that from €600 per month, plus hosting | Basic from €27, Advanced €289, Plus from €2,100 per month |
| Fits | The time until the move | Merchants with a development team and highly custom processes | Merchants who want to hand off operations and updates |

### Extended support as a bridge

One provider for this is safefive. According to the Shopware Store, safefive has delivered security and compatibility updates for Shopware 5 as a plugin since August 2024, and a contract is required. Versions 5.5.0 to 5.7.20 are supported. In a 2023 interview with the hosting provider maxcluster, safefive named a term of at least five years and a price based on online revenue. Bug fixes and new features are explicitly not included. safefive itself describes the offer as a bridge until the move is complete.

That is a sensible safeguard if you can only manage the move in a few months. As a permanent solution, the store stays on a platform that no longer develops.

### Upgrade to Shopware 6

Moving from Shopware 5 to 6 is not an update. Shopware itself describes it as starting from scratch with a completely new store. According to Shopware, the Migration Assistant transfers categories, products, customers, orders, discounts, reviews and media. According to Shopware, the following are not transferred:

- Templates and themes
- Shopping Worlds (they are rebuilt as Shopping Experiences)
- Shipping costs
- Email and document templates
- SEO settings
- Data from the B2B Suite

On top of that, every plugin needs a Shopware 6 version. Shopware 6 has version cycles too: according to endoflife.date, Shopware 6.5 only receives security updates until 28 February 2027, and 6.6 and 6.7 until 28 February 2028. If you move to Shopware 6, plan the next upgrade project at the same time.

Shopware 6 is the right path if your business relies on deeply customised processes in the store core and you have a team that maintains this logic.

### Move to Shopify

Shopify is a rented platform. Hosting, security updates and further development sit with the provider, and there are no versions or upgrade projects. The effort of the move is similar to an upgrade to Shopware 6, because both are a rebuild. The difference lies in operations afterwards.

Which data comes along, where Shopify has different limits (such as three options per product) and how the move works is covered in detail in [Migrating from Shopware to Shopify](/en/guides/shopware-to-shopify-migration/). What such a project costs is covered in [What does a Shopify migration cost?](/en/guides/shopify-migration-cost/).

## What role does the inventory system connection play?

A big one. In Shopware 5 stores, inventory management, shipping and accounting are usually connected to the store via a plugin or connector. Whether you move to Shopware 6 or to Shopify, this connection is set up again.

So check early whether your system supports the target platform. For Shopify there are connections for widely used systems in Germany, Austria and Switzerland, for example the JTL-Connector for JTL-Wawi, Xentral's Shopify connector, and apps from PlentyONE (formerly plentymarkets) and Billbee in the Shopify App Store. JTL also offers its connector for Shopware 6.

In the project, we test the connection with real test orders: do orders arrive with the right payment and shipping method, are stock levels correct, do shipping confirmations and invoices work? Only then do we switch over.

## How do you make the decision?

Five questions get you to a clear direction in an hour:

1. **When are you ready for a new store at the earliest?** If that date is more than a few months away, secure the store with extended support until then.
2. **Who runs the store today?** Do you have your own development team that wants to maintain Shopware 6, or does every change go through an agency?
3. **What does Shopware 5 cost you per year?** Hosting, maintenance, plugin licences, developer hours and now extended support. That total is your benchmark.
4. **Which functions are truly custom?** Anything a plugin or an app covers is not an argument for a platform.
5. **Does your inventory system connect to the target platform?** Ask the provider which data flows in which direction.

If questions 2 and 4 show that you want to hand off operations and updates and your processes are standard, a lot speaks for Shopify. If you have a team and intervene deeply in processes, a lot speaks for Shopware 6.

## What you should do right now

- Check your store's Shopware version and PHP version
- Ask your hosting provider how long they will offer PHP 8.2
- Clean up admin accounts, delete unused ones, check backups
- Remove plugins you no longer need
- Decide whether to book extended support as a bridge
- Export top URLs from Search Console as the basis for any later migration
- Ask your inventory system provider which store platforms it connects to

## After the move: marketing from one team

If you move to Shopify, the same team that handles the move can then take over your Meta ads, Google Ads and email marketing with Klaviyo. Tracking then works from day one because we set it up during the move. More on our [performance marketing](/en/services/performance-marketing/) page. For the move itself, see our [Shopify migration](/en/services/shopify-migration/) page.

## Frequently asked questions {faq}

### Does Shopware 5 keep working after end of life?

Yes. The store keeps running and selling. There are simply no more security updates and bug fixes from the vendor. The risk grows with every newly known vulnerability and every PHP version that runs out.

### Since when has Shopware 5 received no security updates?

Since the end of July 2024. Until then, Shopware still delivered security updates. The later version 5.7.20 from June 2025 only contained clean-up work according to its changelog.

### Can I run Shopware 5 on PHP 8.3?

Not officially. According to its `composer.json`, the last version 5.7.20 allows PHP 7.4 to 8.2. According to the Shopware Store, safefive offers compatibility updates in addition to security updates. Ask them which PHP versions are covered.

### Is upgrading to Shopware 6 easier than moving to Shopify?

Not necessarily. Both are a rebuild. Shopware's Migration Assistant transfers products, customers and orders, but not themes, Shopping Worlds, shipping costs or SEO settings. The difference lies in operations afterwards: with Shopware 6, upgrades and usually hosting stay with you, while with Shopify both sit with the provider.

### Can I move from Shopware 5 directly to Shopify?

Yes. There is no need for an intermediate step via Shopware 6. The data is exported directly from Shopware 5 and imported into Shopify.

### What happens to my inventory system when I switch?

The connection is set up again for the new store. For Shopify there are ready-made connections for JTL-Wawi, Xentral, PlentyONE and Billbee, among others. Before the project, clarify which data your system exchanges with Shopify.

### What does extended support for Shopware 5 cost?

At safefive, the price depends on the store's online revenue according to the provider. safefive publishes its current terms itself. Include the amount in your cost comparison, because it comes on top of hosting and maintenance.

## Sources {sources}

- [endoflife.date: Shopware versions and support periods](https://endoflife.date/shopware)
- [GitHub: Shopware 5 release v5.7.20](https://github.com/shopware5/shopware/releases/tag/v5.7.20)
- [GitHub: Shopware 5.7.20 composer.json with PHP requirements](https://github.com/shopware5/shopware/blob/v5.7.20/composer.json)
- [PHP: Supported versions](https://www.php.net/supported-versions.php)
- [PHP: Unsupported branches](https://www.php.net/eol.php)
- [Shopware Store: safefive](https://store.shopware.com/en/extension-partners/safefive)
- [maxcluster: Shopware 5 end of life, interview with safefive](https://maxcluster.de/en/blog/shopware-5-eol-interview-safefive)
- [Shopware Docs: Migrating from Shopware 5](https://docs.shopware.com/en/migration-en)
- [Shopware Docs: What is migrated from Shopware 5 to 6 (German)](https://docs.shopware.com/de/de/migration-de/was-wird-migriert)
- [Shopware: Fair usage policy for the Community Edition](https://shopware.com/en/news/fair-usage-policy-community-edition/)
- [Shopify: Pricing for Germany](https://www.shopify.com/de/preise)
- [GDPR Art. 32: Security of processing](https://gdpr-info.eu/art-32-gdpr/)
- [PCI Security Standards Council: Document library (PCI DSS v4.0.1)](https://www.pcisecuritystandards.org/document_library/)
- [JTL Guide: JTL-Connector (German)](https://guide.jtl-software.com/jtl-connector/)
- [Xentral: Shopify integration (German)](https://xentral.com/de/integrationen/shopify)
- [Shopify App Store: PlentyONE](https://apps.shopify.com/plentymarkets-1)
- [Shopify App Store: Billbee](https://apps.shopify.com/billbee-de)
