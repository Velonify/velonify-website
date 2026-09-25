---
slug: shopify-server-side-tracking
lang: en
translation: server-side-tracking-shopify
title: "Server-side tracking on Shopify: setting up GA4, Meta and consent properly"
seo_title: "Shopify Server-Side Tracking: GA4 & Meta CAPI | Velonify"
description: "Why browser tracking on Shopify loses purchases, the three routes to server-side tracking, and what has applied to Shopify stores since 26 August 2026."
author: lukas
published: 2026-09-24
updated: 2026-09-24
order: 3
category: "Tracking"
summary: "With server-side tracking, a server sends conversion data to GA4, Meta and Google Ads, not just the customer's browser. Fewer purchases get lost to ad blockers, browser restrictions and payment redirects. On Shopify there are three routes: the native Google and Meta apps, a custom pixel with server-side Google Tag Manager, or a dedicated tracking app. Visitor consent is still required, and server-side does not replace a cookie banner. Since 26 August 2026, “Additional scripts” no longer run on the thank-you page of non-Plus Shopify stores, so check your purchase events now."
service: "/en/services/tracking/ | Tracking & attribution"
related: magento-to-shopify-migration, magento-end-of-support
---

## What is server-side tracking?

With classic tracking, your customer's browser loads scripts from Google, Meta or TikTok and sends each event straight to those platforms: page view, add to cart, purchase. With server-side tracking, events first land on a server you control, or Shopify sends them to the platforms directly. From there they travel on through the official server interfaces, such as the Meta Conversions API or Google Tag Manager's server product.

The difference in one sentence: browser tracking depends on what works in the customer's browser. Server-side tracking depends on what happens on your server.

## Why browser tracking alone loses purchases

- **Ad blockers and tracking protection.** Many browsers and extensions block known tracking domains. The event never leaves the browser.
- **Short cookie lifetimes.** Safari limits cookies set by JavaScript to seven days. Someone who clicks an ad on Monday and buys the Tuesday after next is a new visitor to the platform.
- **Payment redirects.** With PayPal, Klarna or Shop Pay, the customer briefly leaves your store. If they do not come back to the thank-you page, the browser never sends the purchase event.
- **Shopify's sandbox.** Pixels added through Shopify customer events run in an isolated environment. That is good for security and privacy, but it does not make browser tracking more robust.

The result: ad platforms see fewer purchases than actually happen. Their algorithms optimise on an incomplete picture, and you judge campaigns on wrong numbers.

## What changed at Shopify in 2026

Shopify has switched off the old ways of adding your own code to the checkout and thank-you page:

| Plan | Deadline | What goes away |
|---|---|---|
| Shopify Plus | 28 August 2025 | `checkout.liquid`, additional scripts, script tags on the thank-you and order status pages |
| Basic, Grow, Advanced | 26 August 2026 | Additional scripts and script tag apps on the thank-you and order status pages |

Stores that did not upgrade themselves were upgraded automatically. The contents of the additional scripts field were removed in the process, and this cannot be reverted. If your purchase tracking for Google Ads, Meta or an affiliate network lived there, those purchases may have been missing from your ad accounts ever since.

**How to check in five minutes:** In Shopify, open Settings → Customer events and see which pixels are active. Then compare the number of orders in Shopify over the last seven days with the purchases in GA4, Meta Events Manager and Google Ads. If one platform has been clearly lower since late August, that is your signal.

## Three routes to server-side tracking on Shopify

| Route | What it does | Effort and cost | Right for |
|---|---|---|---|
| Native Google and Meta apps | GA4, Google Ads conversions, Meta Conversions API, sent directly by Shopify | Low, the apps are free | Stores with one or two ad channels and few special requirements |
| Custom pixel with server-side Google Tag Manager | One data stream for all platforms, full control, enrichment such as margin or a new-customer flag | Setup plus hosting. Google estimates about $45 per server instance per month and recommends at least two to three instances in production. Hosted providers are often cheaper. | Stores with several channels, their own reporting or high ad spend |
| Dedicated tracking app | Ready-made server connections for many platforms | Monthly app fee, usually tiered by orders | Stores that want many channels connected quickly without their own infrastructure |

**Our recommendation:** Start with the native apps and turn on the maximum data sharing setting in Meta's app, which uses the Conversions API. For many stores, that covers most of it. Server-side Tag Manager is worth setting up once you run more than two ad channels, want to optimise for margin rather than revenue, or the numbers still drift apart with the native apps.

## Consent: what is allowed server-side

Server-side tracking is not a way around consent. In Germany, section 25 TDDDG governs access to the device and the GDPR governs processing of personal data, and other EU countries have equivalent rules. Forwarding marketing data server-side without consent is the same legal problem as a browser pixel.

For Shopify, that means:

- **Your cookie banner must be connected to Shopify's Customer Privacy API.** Only then do Shopify pixels and native apps know what the visitor has allowed.
- **Google Consent Mode v2 is mandatory for EEA traffic.** Since March 2024, Google requires the `ad_user_data` and `ad_personalization` signals. Without them, remarketing lists and part of conversion measurement are missing.
- **Server-side events carry the consent state.** In server-side Tag Manager you decide per platform what is sent when consent is declined and what is not.

This is not legal advice. Agree the setup with your data protection officer before going live.

## Deduplication: why purchases must not count twice

When the browser and the server report the same event, the platform has to recognise it as one purchase. Meta matches the event name and a shared `event_id`, which must be identical in the browser and server event. GA4 counts purchases with the same `transaction_id` only once. Without this link, your ad account suddenly reports far more purchases than Shopify, and campaign optimisation is just as wrong as before, only in the other direction.

## Setup step by step

1. **Take stock.** Which pixels run today, where are they installed (theme, customer events, apps), which conversions do your ad accounts count?
2. **Remove leftovers.** Duplicate pixels in the theme and in apps are the most common cause of wrong numbers.
3. **Connect consent.** Link the cookie banner to the Customer Privacy API and enable Consent Mode v2.
4. **Set up native channels.** Google & YouTube app for GA4 and Google Ads, Facebook & Instagram app with maximum data sharing.
5. **Add a custom pixel with server-side Tag Manager if needed**, for example for more platforms or enriched data.
6. **Check deduplication.** Place a test order and confirm in Meta Events Manager and GA4 that it arrives exactly once.
7. **Reconcile.** For one week, compare orders in Shopify with purchases in GA4 and the ad accounts.
8. **Document.** Which event goes where, with which parameters. That saves days the next time you switch apps.

## How to check that your tracking works

- **Shopify against GA4.** Purchases in GA4 will never exactly match orders, because not every visitor consents. Large or suddenly growing gaps, though, show that events are missing.
- **Meta Events Manager.** Here you see whether browser and server events arrive, whether they are deduplicated and how well Meta can match events to people (Event Match Quality).
- **Google Ads.** Conversion diagnostics show whether enhanced conversions are active and receiving data.
- **Test after every change.** New apps, theme updates and checkout changes are the typical moments when tracking breaks unnoticed.

## Frequently asked questions {faq}

### Do I still need a cookie banner with server-side tracking?

Yes. Server-side tracking does not change the consent requirement for marketing tracking. The banner also has to be connected to Shopify's Customer Privacy API so pixels and apps know the consent state.

### Is server-side Google Tag Manager required?

No. The native Google and Meta apps already send data server-side. Your own server-side Tag Manager pays off when you run many channels, want to enrich data or need full control over the data stream.

### What does server-side tracking on Shopify cost?

The native apps are free. For server-side Tag Manager on Google Cloud, Google estimates about $45 per instance per month, with at least two to three instances recommended in production. Hosted providers are often cheaper. The one-off setup comes on top.

### Does server-side tracking work on Shopify Basic?

Yes. Customer events, custom pixels and the native apps are available on all plans. Shopify Plus only adds extra options in the checkout.

### Does server-side tracking capture every purchase?

No, and it should not. Purchases by visitors who declined marketing tracking must not be sent to ad platforms. Server-side tracking closes the technical gaps, not the legal ones.

## Sources {sources}

- [Shopify Help Center: upgrading the Thank you and Order status pages](https://help.shopify.com/en/manual/checkout-settings/customize-checkout-configurations/upgrade-thank-you-order-status)
- [Shopify developer docs: web pixels and customer events](https://shopify.dev/docs/apps/build/marketing-analytics/pixels)
- [Google: server-side tagging, infrastructure and cost](https://developers.google.com/tag-platform/learn/sst-fundamentals/7-planning-infrastructure)
- [Google Ads Help: consent mode for EEA traffic](https://support.google.com/google-ads/answer/13695607?hl=en)
- [Meta for Developers: deduplicating pixel and server events](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)
