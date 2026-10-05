// Shop-Roast: the report as HTML for /roast/<token>/ (netlify/functions/roast-seite.mjs).
//
// The report is written in the hub (crm.velonify.de → Lead-Magnete → Shop prüfen) and arrives as JSON from the
// Apps Script (Aktion „report“). Its shape is defined in the CRM repo, src/data/roast.ts (type Report, version 1):
//   { domain, geprueft_am, kennzahlen: [{label, wert}], einleitung, fazit,
//     bereiche: [{bereich, label, ampel: rot|gelb|gruen|offen, hinweis, punkte: [{titel, text}]}],
//     beobachtungen: [{titel, text}] }
// Everything in it is text typed by the team or Claude: it is escaped here, never inserted as HTML.
//
// No <section> on purpose: velonify-motion.js hides every "section h2" until it scrolls into view, and a report
// printed straight away ("Als PDF speichern") would lose those headings.

import { esc } from './inhalt.mjs';

const AMPEL = { rot: 'Dringend', gelb: 'Luft nach oben', gruen: 'Passt', offen: 'Nicht geprüft' };
const ARROW =
  '<svg class="arrow" width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M0 6 H16 M11 1 L16 6 L11 11"></path></svg>';

const liste = (wert) => (Array.isArray(wert) ? wert : []);
const text = (wert) => String(wert ?? '').trim();

/** Paragraphs from plain text: empty line → new paragraph, single line break → <br>. */
export function absaetze(wert, klasse = '') {
  const attr = klasse ? ` class="${klasse}"` : '';
  return text(wert)
    .replace(/\r\n?/g, '\n')
    .split(/\n\s*\n/)
    .filter((a) => a.trim())
    .map((a) => `<p${attr}>${esc(a.trim()).replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

const ampel = (wert) => {
  const a = AMPEL[wert] ? wert : 'offen';
  return `<span class="rr-ampel is-${a}" aria-hidden="true"></span>`;
};

/** "2026-10-05T14:11:00Z" → "05.10.2026" (Berlin time). */
export function datum(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin' }).format(d);
}

const punkt = (p) => `<div class="rr-punkt">
${text(p.titel) ? `<h3>${esc(text(p.titel))}</h3>` : ''}
${absaetze(p.text)}
</div>`;

/** Title, line under it and the page body. `link` is the clean address of the page, for copying and forwarding. */
export function reportSeite({ report, vorname, von, freigegeben_am }, link) {
  const domain = text(report?.domain) || 'euren Shop';
  const pruefer = text(von) || 'unserem Team';
  const tag = datum(report?.geprueft_am) || datum(freigegeben_am);
  const bereiche = liste(report?.bereiche);
  const beobachtungen = liste(report?.beobachtungen).filter((b) => text(b.titel) || text(b.text));

  const titel = `Shop-Report für ${domain}`;
  const untertitel = [vorname ? `Für ${text(vorname)}` : '', tag ? `geprüft am ${tag}` : '', `von ${pruefer}`].filter(Boolean).join(' · ');

  const zahlen = liste(report?.kennzahlen).filter((k) => text(k.label) && text(k.wert));
  const zahlenHtml = zahlen.length
    ? `<dl class="rr-zahlen">${zahlen.map((k) => `<div><dt>${esc(text(k.label))}</dt><dd>${esc(text(k.wert))}</dd></div>`).join('')}</dl>`
    : '';

  const ueberblick = bereiche.length
    ? `<h2>Auf einen Blick</h2>
<ul class="rr-ampeln">${bereiche.map((b) => `<li>${ampel(b.ampel)}<strong>${esc(text(b.label))}</strong><span>${AMPEL[b.ampel] ?? AMPEL.offen}</span></li>`).join('')}</ul>`
    : '';

  const bereichHtml = bereiche
    .map((b) => {
      const punkte = liste(b.punkte).filter((p) => text(p.text));
      const leer =
        b.ampel === 'offen'
          ? `<p class="rr-leer">${esc(text(b.hinweis) || 'Diesen Bereich konnten wir nicht automatisch prüfen.')}</p>`
          : '<p class="rr-leer">Hier haben wir nichts gefunden.</p>';
      return `<div class="rr-bereich">
<h2>${ampel(b.ampel)}${esc(text(b.label))}</h2>
${punkte.length ? punkte.map(punkt).join('\n') : leer}
</div>`;
    })
    .join('\n');

  const beobachtungHtml = beobachtungen.length
    ? `<div class="rr-beobachtungen">
<h2>${beobachtungen.length === 3 ? 'Drei' : beobachtungen.length} Beobachtungen aus unserem Team</h2>
<p class="rr-von">Von ${esc(pruefer)}, von Hand angesehen</p>
${beobachtungen.map(punkt).join('\n')}
</div>`
    : '';

  const fazit = text(report?.fazit) ? `<h2>Fazit</h2>\n${absaetze(report.fazit)}` : '';

  const betreff = `Shop-Report für ${domain}`;
  const weiterleiten = `mailto:?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(`Hier ist der Shop-Report, den Velonify für ${domain} erstellt hat:\n\n${link}\n`)}`;
  const frage = `mailto:hallo@velonify.de?subject=${encodeURIComponent(`Frage zum Shop-Report für ${domain}`)}`;

  const inhalt = `<div id="inhalt" class="rg-wrap rr-body">
<div class="rr-aktionen">
<button type="button" class="rr-knopf is-primary" data-aktion="drucken">Als PDF speichern</button>
<button type="button" class="rr-knopf" data-aktion="kopieren" data-link="${esc(link)}">Link kopieren</button>
<a class="rr-knopf" href="${esc(weiterleiten)}">Per Mail weiterleiten</a>
</div>
<article class="rg-article rr-report">
${absaetze(report?.einleitung, 'rr-einleitung')}
${zahlenHtml}
${ueberblick}
${bereichHtml}
${beobachtungHtml}
${fazit}
<p class="rr-grenzen">Was dieser Report ist und was nicht: Wir haben ${esc(domain)} automatisch in vier Bereichen gemessen und uns den Shop zusätzlich von Hand angesehen. Gestaltung, Nutzerführung und Conversion haben wir nicht vollständig geprüft. Messwerte wie die Ladezeit schwanken außerdem von Tag zu Tag.</p>
<p class="rr-druckfuss">Velonify · velonify.de · hallo@velonify.de · ${esc(link)}</p>
</article>
<aside class="rr-aside">
<div class="rr-frage">
<h2>Fragen zum Report?</h2>
<p>Antworte einfach auf unsere Mail oder schreib uns. Wir gehen die Punkte gern in 20 Minuten mit dir durch, kostenlos.</p>
<a class="btn btn-ice rg-btn" href="${esc(frage)}">hallo@velonify.de ${ARROW}</a>
</div>
</aside>
</div>
<script>
(function () {
  document.querySelector('[data-aktion="drucken"]').addEventListener('click', function () { window.print(); });
  var k = document.querySelector('[data-aktion="kopieren"]');
  k.addEventListener('click', function () {
    var fertig = function () { k.textContent = 'Link kopiert'; setTimeout(function () { k.textContent = 'Link kopieren'; }, 2500); };
    if (navigator.clipboard) navigator.clipboard.writeText(k.getAttribute('data-link')).then(fertig, function () { window.prompt('Link kopieren:', k.getAttribute('data-link')); });
    else window.prompt('Link kopieren:', k.getAttribute('data-link'));
  });
})();
</script>`;

  return { titel, untertitel, inhalt };
}
