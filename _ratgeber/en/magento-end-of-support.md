---
slug: magento-end-of-support
lang: en
translation: magento-supportende
title: "Magento 2.4.6 end of support: what store owners should do now"
seo_title: "Magento 2.4.6 End of Support: Risks and Options | Velonify"
description: "Since 11 August 2026, Magento 2.4.6 no longer receives regular security updates. What that means for your store, which options you have and how to decide."
author: lukas
published: 2026-09-24
updated: 2026-09-24
order: 1
category: "Magento"
summary: "Magento 2.4.6 reached the end of regular support on 11 August 2026. Magento Open Source no longer gets security patches or quality fixes from Adobe, while Adobe Commerce customers receive extended support until 31 August 2027. Your store keeps running, but every newly discovered vulnerability stays open. Realistically you have three paths: upgrade to 2.4.8 or 2.4.9, move to a SaaS platform such as Shopify, or harden the store as a bridge until the move is done."
service: "/en/services/shopify-migration/ | Shopify migration"
related: magento-to-shopify-migration, shopify-server-side-tracking
---

## What happened on 11 August 2026?

Adobe limits support for every Magento 2.4 release to a fixed period. For version 2.4.6, regular support ("standard support") ended on 11 August 2026. This applies to both Magento Open Source and Adobe Commerce. Only Adobe Commerce licence holders get one more year of extended support at no extra cost.

This is the current state according to Adobe's Software Lifecycle Policy:

| Version | End of standard support | Extended support (Adobe Commerce only) | Status, September 2026 |
|---|---|---|---|
| 2.4.4 | 12 Apr 2025 | 14 Apr 2026 | unsupported |
| 2.4.5 | 12 Aug 2025 | 11 Aug 2026 | unsupported |
| 2.4.6 | 11 Aug 2026 | 31 Aug 2027 | Open Source unsupported |
| 2.4.7 | 31 May 2027 | 31 May 2028 | ends in eight months |
| 2.4.8 | 31 May 2028 | to be announced | supported |
| 2.4.9 | 31 May 2029 | to be announced | supported, available since May 2026 |

If you are still on Magento 1, you have been on your own for a while: Magento 1 has had no official patches since 30 June 2020.

## What does "no support" actually mean?

Your store does not go offline and works the next morning exactly as before. Three things are missing:

- **Security patches.** When a vulnerability in Magento 2.4.6 becomes known, Adobe no longer fixes it for Open Source. The hole stays open, and it is publicly documented.
- **Quality fixes.** Core bugs are no longer fixed, including new ones that appear after browser or payment updates.
- **Compatibility.** Vendors of extensions, themes and payment modules test their updates against supported versions. Sooner or later, new releases require 2.4.7 or 2.4.8.

Then there is the stack underneath. Magento 2.4.6 runs on PHP 8.1 and 8.2. PHP 8.1 has had no security updates since 31 December 2025, and PHP 8.2 support ends on 31 December 2026. From January 2027, the runtime under your store is unmaintained as well, even if you keep patching Magento yourself.

## Why this is more than an IT issue

**Payment data.** Magento stores have been a favourite target of skimming attacks for years, where malicious code in the checkout steals card data. These attacks almost always use known, unpatched vulnerabilities.

**PCI DSS.** If you accept card payments, PCI DSS v4.0.1 (requirement 6.3.3) requires you to install critical security patches within one month of release. Without patches from the vendor, you cannot meet that requirement. Your payment provider asks about it in the annual self-assessment.

**Data protection.** In the EU, Art. 32 GDPR requires security measures that reflect the state of the art. After a data breach, knowingly running software without security updates is hard to defend. This is not legal advice, but it is worth raising with your data protection officer.

**Cost.** The longer a system runs without support, the more every change costs. Developers have to work around outdated dependencies, and new extensions often cannot be installed at all.

## Which version are you on? How to check

It takes two minutes:

1. **In the admin:** The Magento backend shows the version in the bottom right of the footer, for example "Magento ver. 2.4.6-p8".
2. **On the server:** Run `bin/magento --version` in the store directory.
3. **In the code:** The file `composer.lock` lists the version of `magento/product-community-edition` (Open Source) or `magento/product-enterprise-edition` (Adobe Commerce).

If it says 2.4.6 or lower, this article applies to you directly. On 2.4.7 you have until the end of May 2027, but you should prepare the decision now.

## Your options compared

| Option | What you get | Effort | Right if … |
|---|---|---|---|
| Upgrade to 2.4.8 or 2.4.9 | Support until May 2028 or May 2029 | Medium to high: PHP 8.3 to 8.5, OpenSearch, every extension checked | the store is heavily customised and your team can maintain Magento long term |
| Move to Shopify | No more patching, Shopify runs and secures the platform | One-off: a four to twelve week project | you want to stop maintaining a platform and manage content yourselves |
| Harden as a bridge | Time until the upgrade or move is done | Low | only as a bridge for a few months, not as a permanent answer |
| Do nothing | Nothing | None, until something happens | never, as long as you process customer or payment data |

**On upgrading:** Going from 2.4.6 to 2.4.8 is not a patch, it is a small project. Magento 2.4.8 requires PHP 8.3 or 8.4, Magento 2.4.9 requires PHP 8.4 or 8.5. Every extension and every custom module has to run on the new stack. And in two to three years the next upgrade is due, because each release gets roughly three years of support.

**On moving:** Shopify has no versions you need to update yourselves. Security updates, hosting and PCI compliance of the checkout are Shopify's job. In return you give up some of the technical freedom Magento offers. How the move works, what it costs and how long it takes is covered in [Migrating from Magento to Shopify](/en/guides/magento-to-shopify-migration/).

**On hardening as a bridge:** Put a web application firewall in front of the store, restrict the admin by IP and two-factor login, remove unused extensions, run regular malware scans and monitor changes to checkout files. This lowers the risk, but it does not replace patches.

## Upgrade or move? Five questions to decide

1. **How much custom code is in the store?** Lots of custom modules point towards an upgrade, since they would need rethinking on Shopify. An audit often shows, though, that much of it is standard today or solved by an app.
2. **What does Magento cost you per year?** Add up hosting, developer hours, extension licences and upgrades. That total is what you compare against Shopify's fees.
3. **Who runs the store day to day?** If every landing page, banner and promotion needs a developer, the platform is slowing down your marketing.
4. **How many more major upgrades do you want to do?** With Magento, the next deadline is certain, every two to three years.
5. **What are your plans for the next two years?** New countries, B2B customers, more channels: check which platform covers them with less custom work.

If three or more answers point towards the cost of maintaining the platform, a move deserves a serious look.

## Timing: why you should not move before Black Friday

It is the end of September. For most stores, the busiest months of the year start now. We almost never recommend switching platforms in the middle of the holiday season. This sequence works better:

- **Now:** Harden the store (see above), check your version, collect costs and requirements.
- **October and November:** Audit and a decision on upgrade or move. This takes little of your team's time.
- **December to February:** Build in parallel to the live store.
- **January to March 2027:** Go live in the quieter period after the holidays.

For Adobe Commerce customers with extended support until August 2027, this is comfortable. For Open Source stores, the time until go-live is the riskiest phase, which is why hardening comes first.

## Frequently asked questions {faq}

### Does my Magento store keep running after end of support?

Yes. The store keeps working technically. There are simply no regular security and quality updates anymore, so newly discovered vulnerabilities stay open.

### Does the end of support also apply to Adobe Commerce?

Standard support for 2.4.6 ended for both editions on 11 August 2026. Adobe Commerce licence holders also receive extended support until 31 August 2027 at no extra cost. There is no extended support for Magento Open Source.

### Is upgrading to Magento 2.4.7 enough?

Only as a short stopover. Standard support for 2.4.7 ends on 31 May 2027, roughly eight months from now. If you upgrade, go straight to 2.4.8 or 2.4.9.

### How long does a move from Magento to Shopify take?

A lean store with few connected systems is often live in four to six weeks. With several integrations or on Shopify Plus, eight to twelve weeks is realistic. An audit gives you the exact schedule.

### What happens to our Google rankings when we move?

They stay, as long as every old URL points to its new counterpart with a 301 redirect and the metadata is carried over. Small fluctuations in the first weeks are normal.

## Sources {sources}

- [Adobe: Software Lifecycle Policy for Adobe Commerce and Magento Open Source](https://experienceleague.adobe.com/en/docs/commerce-operations/release/planning/lifecycle-policy)
- [PHP: Supported Versions](https://www.php.net/supported-versions.php)
- [PCI Security Standards Council: PCI DSS v4.0.1](https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1)
- [Adobe: Magento Open Source 2.4.6 release notes](https://experienceleague.adobe.com/en/docs/commerce-operations/release/notes/magento-open-source/2-4-6)
