// Shop-Roast: der Report eines Shops unter velonify.de/roast/<token>/
//
// Den Report schreibt das Team im Hub (crm.velonify.de → Lead-Magnete → Shop prüfen) und gibt ihn dort frei. Diese
// Funktion holt ihn beim Aufruf vom Apps Script im CRM (Aktion „report“, Adresse in CRM_MAGNETE_URL) und setzt ihn
// in den Rahmen aus netlify/lib/roast-vorlage.mjs (erzeugt von _ressourcen/build.py). Nicht freigegebene oder
// unbekannte Reports bekommen die normale 404-Seite.
//
// Die Seite ist privat: nur wer den Link kennt, sieht sie. Deshalb kein Cache, kein Suchindex und kein Referrer,
// damit der Link nicht über Klicks auf andere Seiten weitergereicht wird. Jeder Aufruf zählt im CRM mit; mit
// ?vorschau (aus dem Hub) zählt er nicht.

import { anSkript } from '../lib/crm.mjs';
import { esc } from '../lib/inhalt.mjs';
import { reportSeite } from '../lib/report.mjs';
import vorlage from '../lib/roast-vorlage.mjs';

const TOKEN = /^[a-f0-9]{32}$/;
const PRIVAT = { 'Cache-Control': 'private, no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' };

async function fehlerseite(basis, status) {
  const seite = await fetch(new URL('/404.html', basis))
    .then((r) => (r.ok ? r.text() : null))
    .catch(() => null);
  return new Response(seite ?? 'Diese Seite gibt es nicht.', { status, headers: { 'Content-Type': 'text/html; charset=utf-8', ...PRIVAT } });
}

export default async (req) => {
  const basis = new URL(req.url);
  const [, token = '', ...rest] = basis.pathname.split('/').filter(Boolean);
  if (!token) return Response.redirect(new URL('/', basis), 302);
  if (rest.length > 0 || !TOKEN.test(token)) return fehlerseite(basis, 404);
  if (!basis.pathname.endsWith('/')) return Response.redirect(new URL(`/roast/${token}/${basis.search}`, basis), 301);

  const url = process.env.CRM_MAGNETE_URL;
  if (!url) {
    console.error('CRM_MAGNETE_URL ist nicht gesetzt');
    return fehlerseite(basis, 503);
  }
  const zaehlen = !basis.searchParams.has('vorschau');
  const antwort = await anSkript(url, { aktion: 'report', token, zaehlen }, `report ${token.slice(0, 6)}…`, { pauseMs: 500 });
  if (!antwort) return fehlerseite(basis, 503);
  if (antwort.status !== 200 || !antwort.report) return fehlerseite(basis, 404);

  const link = new URL(`/roast/${token}/`, basis).toString();
  const { titel, untertitel, inhalt } = reportSeite(antwort, link);
  const werte = { TOKEN: token, TITEL: esc(titel), UNTERTITEL: esc(untertitel), INHALT: inhalt };
  // Ein Durchgang über die Vorlage: was im Report selbst wie ein Platzhalter aussieht, bleibt Text.
  const html = vorlage.replace(/%%(TOKEN|TITEL|UNTERTITEL|INHALT)%%/g, (_, name) => werte[name]);

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', ...PRIVAT } });
};

export const config = { path: '/roast/*' };
