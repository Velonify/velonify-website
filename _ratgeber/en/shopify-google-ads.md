---
slug: shopify-google-ads
lang: en
translation: google-ads-shopify
title: "Google Ads for Shopify: setup, tracking and campaigns"
seo_title: "Shopify Google Ads: Setup, Tracking & Campaigns | Velonify"
description: "Setting up Google Ads for Shopify: Google & YouTube app or manual setup, Merchant Center feed, conversion tracking with Consent Mode and common mistakes."
author: lukas
published: 2026-10-25
updated: 2026-10-25
order: 3
category: "Performance marketing"
summary: "For Google Ads, a Shopify store needs three things: a clean product feed in Google Merchant Center, conversion tracking that reports every purchase exactly once with the right value, and a consent banner that supports Google Consent Mode v2. Shopify's free Google & YouTube app covers the feed, purchase tracking and enhanced conversions for most stores. A manual setup with a custom pixel and Tag Manager pays off if you want to steer by net revenue, margin or several channels. The most common mistakes are purchases counted twice, revenue values that include VAT and shipping, and cart events used as bidding goals."
service: "/en/services/performance-marketing/ | Performance marketing"
related: shopify-server-side-tracking, shopify-migration-cost, magento-to-shopify-migration
---

## What does a Shopify store need for Google Ads?

Google Ads for Shopify rests on three building blocks. If one is missing, your campaigns work with wrong or incomplete data.

| Building block | What it is for | Where it is set up |
|---|---|---|
| Product feed in Google Merchant Center | Shopping ads and Performance Max show your products with image and price | Google & YouTube app or a feed app |
| Conversion tracking | Google Ads learns which clicks lead to purchases and bids accordingly | Google & YouTube app or a custom pixel with Tag Manager |
| Consent (Consent Mode v2) | Without valid consent, Google does not use EEA data for personalised advertising | Consent banner connected to Shopify's Customer Privacy API |

Only once all three are in place does it make sense to put budget into campaigns.

## Google & YouTube app or manual setup?

With the Google & YouTube app, Shopify offers its own sales channel for Google. It automatically syncs your products to Merchant Center, links your Google Ads account and sets up conversion tracking. According to Google, the app creates the conversion actions “Purchase”, “Add to cart” and “Begin checkout” when you link the account. Enhanced conversions can be turned on in the app's settings.

| | Google & YouTube app | Manual setup (custom pixel, Tag Manager) |
|---|---|---|
| Product feed | Automatic from Shopify | Separate feed app or feed rules |
| Purchase tracking | Set up out of the box | Built by you, with full control over value and parameters |
| Enhanced conversions | Toggle in the app | Passed by you |
| Consent Mode v2 | Via Shopify's Customer Privacy API | According to Shopify, enabled by you with a code snippet in the custom pixel |
| Revenue value | As passed by the app | Your choice: gross, net, with or without shipping, margin |
| Effort | Low | Setup plus maintenance after every change |
| Fits | Most stores where Google is one of a few channels | Stores with several channels, their own reporting or margin as the goal |

**Our recommendation:** start with the Google & YouTube app. A manual setup pays off once you want to steer by net revenue or margin, or serve several ad platforms from one shared data stream. What that looks like server-side is covered in [Server-side tracking on Shopify](/en/guides/shopify-server-side-tracking/).

Important if Google tags are already running in your store: Google advises installing the app before re-implementing tags, and removing old tags so that purchases are not counted twice.

## How do you set up the product feed in Merchant Center?

The feed decides whether and how your products appear in Shopping ads and Performance Max. The Google & YouTube app transfers products from Shopify automatically. Data quality is still your job.

According to Google's product data specification, these attributes are required, among others: ID, title, description, link, image link, availability, price and brand. Depending on the product, you also need:

- **GTIN.** Required for products that have a GTIN. Google disapproves products with incorrect GTINs, so never enter made-up values. Maintain barcodes in Shopify directly on the variant.
- **Variants.** In Germany, all variants of a product need a shared `item_group_id`. Check in Merchant Center that your variants arrive correctly grouped.
- **Apparel.** For clothing, Google also requires age group, gender and colour in Germany. In Shopify, the best place to maintain these is in metafields or the product category.
- **Title.** A maximum of 150 characters. Put the most important terms first: brand, product type, material, size or colour.

After the first sync, check the diagnostics in Merchant Center. Disapproved products are listed there with a reason, for example missing or incorrect GTINs or prices that do not match the product page.

## Conversion tracking: purchases, enhanced conversions and consent

### Which conversions count?

Google Ads distinguishes primary and secondary conversion actions. Primary actions appear in the “Conversions” column and feed into your bidding strategy. Secondary actions are for observation only and appear under “All conversions”.

For a store, usually only the purchase should be primary. According to Google, the Google & YouTube app creates “Add to cart” and “Begin checkout” alongside “Purchase”. If those stay primary, Google optimises for carts instead of orders. Set them to secondary after setup.

### Enhanced conversions

Enhanced conversions add customer data from checkout to your tracking, such as email address, name, address or phone number. According to Google, the data is hashed with SHA256 before it is sent. This helps Google match purchases to ad clicks even when cookies are missing. In the Google & YouTube app you turn them on in the settings and accept the customer data terms there.

### Consent Mode v2

For users in the European Economic Area, Google requires two consent signals: `ad_user_data` for sending user data for advertising purposes and `ad_personalization` for personalised advertising. Shopify states that event data from customers in the EEA is not used for personalised advertising unless Consent Mode v2 is activated and valid consent has been obtained.

For you, that means:

- Your consent banner must be connected to Shopify's Customer Privacy API so that Shopify and the Google app know the consent status.
- If you use a custom pixel, Shopify says you have to activate Consent Mode v2 yourself with a code snippet.
- Test the banner both ways: accept all and reject all. Then check in Google Tag Assistant which signals arrive.

This is not legal advice. Agree the setup with your data protection officer. If you do not want to set up tracking yourself, we handle it as part of our [tracking & attribution](/en/services/tracking/) service.

## Which campaign types suit Shopify?

| Campaign type | What it does | Requirement | Fits |
|---|---|---|---|
| Standard Shopping | Product ads with image and price in Google Search and the Shopping tab | Merchant Center feed | Stores that want to control bids per product group themselves |
| Performance Max | One campaign across the entire Google Ads inventory, according to Google including YouTube, Display, Search, Discover, Gmail and Maps | Feed, conversion tracking, images and copy | Stores with clean tracking and enough purchases for Google's automated bidding to learn |
| Search campaign | Text ads for search terms | Keywords and ad copy | Brand terms and search terms with clear purchase intent |

**How the types work together.** Google serves Search campaigns with an exact match keyword ahead of Performance Max. A separate Search campaign for brand terms is therefore worthwhile. It lets you see separately how much revenue comes from people who already know you and how much from new customers.

**Bidding strategy.** Once purchase tracking measures reliably and enough purchases come in, you steer on revenue with a target ROAS. Before that, any automated bidding strategy fed with wrong data heads in the wrong direction.

## The most common Google Ads mistakes on Shopify

1. **Duplicate conversions.** Purchase tracking runs simultaneously through the Google & YouTube app, an old tag in the theme and perhaps a custom pixel. Google Ads then reports more purchases than Shopify. Check under Goals which purchase actions are primary and keep only one.
2. **Wrong revenue value.** Shopify knows several totals at checkout. According to Shopify's documentation, the total price includes taxes and discounts, while the subtotal is before shipping and taxes. Decide deliberately which value you report and calculate your ROAS target on the same basis. If you report gross and calculate net, you overestimate your return by the VAT.
3. **Cart events as bidding goals.** If “Add to cart” and “Begin checkout” stay primary, Google bids on intent instead of purchases.
4. **Consent not connected.** Without Consent Mode v2, remarketing lists and parts of the measurement are missing for EEA users.
5. **Feed errors ignored.** Disapproved products in Merchant Center do not appear in any Shopping ad. A weekly look at the diagnostics is enough to prevent this.
6. **No reconciliation with Shopify.** Compare purchases in Google Ads with orders in Shopify once a week. The numbers will never match exactly, because not everyone consents and Google only counts purchases after ad interactions. Sudden jumps, however, show that something is broken.

## Checklist for getting started

- Google & YouTube app installed, Merchant Center and Google Ads linked
- Products approved in Merchant Center, no open errors in diagnostics
- GTINs, brand and, for clothing, age group, gender and colour maintained
- Only “Purchase” as the primary conversion action, cart events secondary
- Old Google tags in the theme and duplicate pixels removed
- Enhanced conversions turned on
- Consent banner connected to the Customer Privacy API, Consent Mode v2 tested
- Decided whether revenue is reported gross or net
- Test order placed, purchase arrives in Google Ads exactly once

## Google Ads, Meta ads and email from one team

We manage Google Ads for Shopify stores together with Meta ads and email marketing with Klaviyo. We set up the tracking ourselves so that every channel works with the same numbers. If you are moving to Shopify right now, migration and marketing come from the same team, and campaigns run on clean data from day one. More on our [performance marketing](/en/services/performance-marketing/) and [Shopify migration](/en/services/shopify-migration/) pages.

## Frequently asked questions {faq}

### Does Shopify's Google & YouTube app cost anything?

According to the Shopify App Store, installation is free. You pay your ad budget in Google Ads. If an agency manages the campaigns, its fee comes on top.

### Do I need a Tag Manager for Google Ads on Shopify?

No. The Google & YouTube app sets up purchase tracking and enhanced conversions without Tag Manager. A Tag Manager pays off if you want to send your own values such as net revenue or margin, or serve several platforms from one data stream.

### Should I report revenue to Google Ads gross or net?

Both work as long as you stay consistent. If you steer by profitability, it is better to report net, without VAT and shipping, because that is closer to your actual revenue. What matters is that your ROAS target is calculated on the same basis.

### Why does Google Ads show more purchases than Shopify?

Usually the purchase is counted twice because several tags or pixels fire at the same time, or because other actions besides the purchase are set as primary. Check the primary conversion actions under Goals and remove old tags from the theme.

### Performance Max or Standard Shopping?

Performance Max covers the entire Google inventory with one campaign and needs clean tracking and enough purchases to learn. Standard Shopping gives you more control over bids per product group. Many stores start with one of the two and add a Search campaign for brand terms.

### Does Google Ads on Shopify work without a consent banner?

Technically yes, legally no. For EEA users you need consent and Consent Mode v2. Without valid consent, according to Shopify, Google does not use the data for personalised advertising.

## Sources {sources}

- [Shopify Help Center: Google & YouTube](https://help.shopify.com/en/manual/online-sales-channels/google)
- [Shopify App Store: Google & YouTube](https://apps.shopify.com/google)
- [Google Ads Help: Set up conversion tracking with the Google & YouTube app on Shopify](https://support.google.com/google-ads/answer/13494537?hl=en)
- [Google Ads Help: About enhanced conversions](https://support.google.com/google-ads/answer/9888656?hl=en)
- [Google Ads Help: Primary and secondary conversion actions](https://support.google.com/google-ads/answer/11461796?hl=en)
- [Google Ads Help: Consent mode for EEA traffic](https://support.google.com/google-ads/answer/13695607?hl=en)
- [Google Ads Help: About Performance Max campaigns](https://support.google.com/google-ads/answer/10724817?hl=en)
- [Google Ads Help: About Shopping ads](https://support.google.com/google-ads/answer/2454022?hl=en)
- [Google Merchant Center Help: Product data specification](https://support.google.com/merchants/answer/7052112?hl=en)
- [Shopify Help Center: Customer privacy settings and Google Consent Mode v2](https://help.shopify.com/en/manual/privacy-and-security/privacy/consent)
- [Shopify Developer: checkout_completed customer event](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed)
