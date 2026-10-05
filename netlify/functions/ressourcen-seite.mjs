// Landingpage jedes aktiven Lead-Magneten: velonify.de/ressourcen/<adresse>/
//
// Die Seite wird beim Aufruf aus der Vorlage (netlify/lib/magnet-vorlage.mjs, erzeugt von _ressourcen/build.py)
// und den Texten aus dem Hub gebaut. Die liefert das Apps Script im CRM (Aktion „inhalt“, Adresse in
// CRM_MAGNETE_URL). So braucht ein neuer Magnet keinen Website-Deploy, und die Vorschau in LinkedIn-DMs zeigt
// trotzdem Titel und Untertitel, weil sie schon im HTML stehen.
//
// Statische Seiten gehen vor (preferStatic): danke, newsletter, abmelden … und alle handgebauten Seiten aus
// _ressourcen/<adresse>.md. Unbekannte oder inaktive Magnete bekommen die normale 404-Seite.

import { anSkript } from '../lib/crm.mjs';
import { esc, inhaltHtml } from '../lib/inhalt.mjs';
import vorlage from '../lib/magnet-vorlage.mjs';

const ADRESSE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const KNOPF = 'Kostenlos anfordern';

async function fehlerseite(basis, status) {
  const seite = await fetch(new URL('/404.html', basis))
    .then((r) => (r.ok ? r.text() : null))
    .catch(() => null);
  return new Response(seite ?? 'Diese Seite gibt es nicht.', {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
}

export default async (req) => {
  const basis = new URL(req.url);
  const [, slug = '', ...rest] = basis.pathname.split('/').filter(Boolean);
  if (!slug) return Response.redirect(new URL('/', basis), 302);
  if (rest.length > 0 || !ADRESSE.test(slug)) return fehlerseite(basis, 404);
  if (!basis.pathname.endsWith('/')) return Response.redirect(new URL(`/ressourcen/${slug}/${basis.search}`, basis), 301);

  const url = process.env.CRM_MAGNETE_URL;
  if (!url) {
    console.error('CRM_MAGNETE_URL ist nicht gesetzt');
    return fehlerseite(basis, 503);
  }
  const magnet = await anSkript(url, { aktion: 'inhalt', magnet: slug }, `inhalt ${slug}`, { pauseMs: 500 });
  if (!magnet) return fehlerseite(basis, 503);
  if (magnet.status !== 200) return fehlerseite(basis, 404);

  const werte = {
    SLUG: slug,
    TITEL: esc(magnet.titel),
    UNTERTITEL: esc(magnet.untertitel),
    KNOPF: esc(magnet.knopf || KNOPF),
    INHALT: inhaltHtml(magnet.inhalt),
  };
  // Ein Durchgang über die Vorlage: was im Hub-Text selbst wie ein Platzhalter aussieht, bleibt Text.
  const html = vorlage.replace(/%%(SLUG|TITEL|UNTERTITEL|KNOPF|INHALT)%%/g, (_, name) => werte[name]);

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      // Netlify hält die Seite 2 Minuten vor; Änderungen im Hub sind also spätestens nach 2 Minuten online.
      'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=120, stale-while-revalidate=600',
    },
  });
};

export const config = { path: '/ressourcen/*', preferStatic: true };
