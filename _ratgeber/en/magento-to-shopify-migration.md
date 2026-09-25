---
slug: magento-to-shopify-migration
lang: en
translation: magento-zu-shopify-migration
title: "Migrating from Magento to Shopify: process, timeline and cost"
seo_title: "Magento to Shopify Migration: Timeline & Cost | Velonify"
description: "How a Magento to Shopify migration works, which data comes along, how long it takes and what it costs. With a schedule, cost ranges and a go-live checklist."
author: lukas
published: 2026-09-24
updated: 2026-09-24
order: 2
category: "Shopify migration"
summary: "A migration from Magento to Shopify runs in four phases: audit, mapping, build with a test migration, and go-live with aftercare. A lean store is often live in four to six weeks. With several integrations or on Shopify Plus it takes eight to twelve weeks, and large B2B projects three to six months. Market prices range from a low four-figure sum for small stores to six figures for enterprise projects. The biggest risks are missing redirects, incomplete data and tracking that stops measuring after the switch."
service: "/en/services/shopify-migration/ | Shopify migration"
related: magento-end-of-support, shopify-server-side-tracking
---

## When does moving from Magento to Shopify make sense?

It makes sense when the platform costs you more time and money than it delivers. Typical triggers:

- Your Magento version no longer receives security updates (see [Magento 2.4.6 end of support](/en/guides/magento-end-of-support/)).
- Every change to the store needs a developer and takes days.
- Hosting, maintenance and extension licences eat a noticeable share of your margin.
- You want to sell in new countries or to business customers, and the system holds you back.
- The store loads slowly, especially on mobile.

A move makes less sense if the store is technically healthy and only the numbers are weak. Then the cause usually sits in the funnel, and [conversion optimisation](/en/services/conversion-optimization/) will do more than a new system.

## Which data comes along from Magento to Shopify?

Almost everything, but not everything one to one. Magento stores product data flexibly in attributes, while Shopify uses a firmer model of products, variants and metafields. That is why every migration needs a mapping.

| Data | Transferable? | What to watch |
|---|---|---|
| Products and variants | Yes | Shopify allows up to 2,048 variants but no more than three options per product (for example size, colour, material). Configurable Magento products with more options have to be split. |
| Attributes | Yes, as metafields | Decide first which attributes you really need. Many Magento stores carry hundreds of unused ones. |
| Categories | Yes, as collections | Shopify collections are flat. Nested category trees are rebuilt through navigation and filters. |
| Customer accounts | Yes | Passwords cannot be transferred for technical reasons. With Shopify's new customer accounts, customers sign in with a one-time code, so no password reset is needed. |
| Order history | Yes | Imported as historical orders, without sending emails to customers. |
| Discounts and vouchers | Partly | Price rules work differently in Shopify and are usually set up again. Open voucher codes can be carried over. |
| CMS pages and blog | Yes | A good moment to drop outdated content. |
| Reviews | Yes, via a review app | Test the export from Magento early. |
| URLs | No, they change | Shopify uses fixed paths (`/products/`, `/collections/`, `/pages/`). Every old URL needs a 301 redirect. |

## How does a migration work?

We plan every migration backwards from the go-live date. The new store is built in parallel to the old one, so your day-to-day business carries on undisturbed.

### Phase 1: Audit (one to two weeks)

A review of the current store: which extensions exist and what they do, data quality, connected systems such as ERP, payment and newsletter. Plus the most important URLs from Search Console and analytics, so it is clear which pages carry revenue and rankings. The result is the target architecture: Shopify or Shopify Plus, one market or several, with or without B2B.

### Phase 2: Mapping (one to two weeks)

This is where the decisions are made that get expensive later if they are missing. Which Magento attribute becomes which metafield? Which category becomes which collection? Which extension is replaced by an app, which becomes custom work and which is dropped? And the complete redirect list: every old URL with its new target.

### Phase 3: Build and test migration (two to six weeks, longer for large projects)

Theme, integrations and tracking are built in the new store. Then a full test migration runs with real data. You check products, prices, customer accounts and processes before a single customer sees the new store.

### Phase 4: Go-live and aftercare (switch day plus four to eight weeks)

Shortly before the switch, the orders and customers added since the test migration are transferred. Then the domain is switched, and redirects and tracking are checked live. In the weeks that follow, we watch rankings, crawl errors in Search Console and order numbers.

## How long does a Magento to Shopify migration take?

| Starting point | Typical duration |
|---|---|
| Lean store, a few hundred products, hardly any connected systems | four to six weeks |
| Several integrations (ERP, newsletter, marketplaces) or Shopify Plus | eight to twelve weeks |
| Several countries, B2B, ERP connection, custom features | three to six months |

Duration depends less on the number of products than on the number of systems that have to move along, and on how quickly decisions are made. A store with 150 products and two ERP systems can take more work than one with 20,000 items and clean data.

## What does a Magento to Shopify migration cost?

Nobody can honestly quote a fixed price without an audit. The ranges agencies publish in 2026 are a good guide, though:

| Project size | Characteristics | Typical market range |
|---|---|---|
| Small store | under 500 products, simple structure | approx. €2,000 to €7,000 |
| Mid-sized store | 500 to 10,000 products, several integrations | approx. €7,000 to €28,000 |
| Enterprise and Shopify Plus | B2B, several markets, ERP and PIM connections | approx. €30,000 to over €200,000 |

The biggest cost drivers are:

- **Integrations.** Every connected ERP, PIM or marketplace is its own building block with its own testing effort.
- **Design.** An adapted standard theme costs a fraction of a fully custom design.
- **Custom features.** Anything no app covers has to be built.
- **Data quality.** Cleaning up messy legacy data often costs more than importing it.
- **Internal effort.** Meetings, approvals and testing on your side are easy to forget.

**Running costs compared.** In Germany, Shopify costs between €27 (Basic, billed yearly) and €289 (Advanced) per month, and Shopify Plus starts at €2,100 per month. Apps and payment fees come on top. Important: if you use an external payment provider instead of Shopify Payments, you pay an additional transaction fee between 2% (Basic) and 0.2% (Plus), depending on your plan. On the Magento side, you have hosting, maintenance, security updates, extension licences and regular upgrades. Put both totals side by side for three years before you decide.

## The five most common migration mistakes

1. **Redirects after go-live.** Category and product pages then drop out of the index within days. The redirect list belongs in phase 2.
2. **Rebuilding the old store one to one.** Replacing every Magento extension with an app makes the new store as heavy as the old one. Ask first whether the feature is still needed.
3. **Not telling customers.** Anyone who suddenly has to sign in differently needs a short email in advance. Otherwise the questions end up with your support team.
4. **Forgetting tracking.** After the switch, campaigns run on wrong numbers for days if GA4, Meta and Google Ads were not set up and tested beforehand. How to do this properly on Shopify is covered in [Server-side tracking on Shopify](/en/guides/shopify-server-side-tracking/).
5. **Going live before peak season.** We always schedule the switch around your peaks, never right before them.

## Go-live day checklist

- Delta migration of new orders and customers since the test migration completed
- Redirects imported and the 100 most important URLs spot-checked
- Domain switched, SSL certificate active, `www` and the main domain redirect correctly
- New sitemap submitted in Google Search Console
- Test order placed with every payment method
- Purchases arrive in Shopify, GA4, Meta and Google Ads
- Transactional emails (order confirmation, shipping) checked
- Old store in maintenance mode, but still reachable for lookups

## Frequently asked questions {faq}

### Will we lose Google rankings during the migration?

Not if every old URL points to its counterpart with a 301 redirect and titles, descriptions and content are carried over. Small fluctuations in the first weeks are normal, which is why close monitoring of Search Console is part of the aftercare.

### Does the store have to go offline during the migration?

No. The new store is built in parallel. The switch only happens once the test migration has run cleanly. The switch itself usually takes just a few hours.

### Can we keep our domain and email addresses?

Yes. The domain is pointed to Shopify by changing only the records for the website. The MX records for your email stay untouched.

### Do we need Shopify or Shopify Plus?

A standard plan is enough for most stores. Shopify Plus pays off with several markets that have their own catalogues, with B2B that needs company accounts and payment terms, or at higher revenue, where lower fees offset the Plus price.

### Can customers keep their passwords?

No, passwords cannot be transferred for security reasons. With Shopify's new customer accounts this no longer matters, because sign-in works with a one-time code sent by email.

## Sources {sources}

- [Shopify: pricing for Germany](https://www.shopify.com/de/preise)
- [Shopify developer changelog: variant limit of 2,048 for all merchants](https://shopify.dev/changelog/the-product-variant-limit-is-now-2048-for-all-merchants)
- [Shopify Help Center: URL redirects](https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect)
- [Uncap: Magento to Shopify migration cost](https://www.uncap.com/post/magento-to-shopify-migration-cost)
- [WeArePresta: Shopify migration cost breakdown 2026](https://wearepresta.com/shopify-migration-cost-breakdown-what-agencies-actually-charge-in-2026/)
