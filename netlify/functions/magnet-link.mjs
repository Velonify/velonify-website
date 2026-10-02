// Die Knöpfe in der Mail der Lead-Magnete (siehe _ressourcen/README.md):
//
//   GET  /m/d/<token>   Download: Klick im CRM vermerken, weiter zur Datei
//   POST /m/n  (t=…)    Newsletter bestätigen (Double-Opt-in), kommt vom Knopf auf /ressourcen/newsletter/
//   POST /m/a  (t=…)    vom Newsletter abmelden, kommt vom Knopf auf /ressourcen/abmelden/
//
// Bestätigen und Abmelden gehen nur per Knopf, weil Virenscanner in Firmen-Postfächern Links vorab öffnen.
// Die eigentliche Arbeit macht das Apps Script im CRM (apps-script/magnete), Adresse in CRM_MAGNETE_URL.

import { anSkript } from '../lib/crm.mjs';

const AKTIONEN = {
  d: { aktion: 'download', methode: 'GET' },
  n: { aktion: 'newsletter', methode: 'POST', weiter: '/ressourcen/newsletter/bestaetigt/' },
  a: { aktion: 'abmelden', methode: 'POST', weiter: '/ressourcen/abgemeldet/' },
};
const HOPPLA = '/ressourcen/hoppla/';

const weiter = (ziel, basis, status = 303) =>
  new Response(null, { status, headers: { Location: new URL(ziel, basis).toString(), 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });

export default async (req) => {
  const adresse = new URL(req.url);
  const [, art, ausPfad = ''] = adresse.pathname.split('/').filter(Boolean);
  const eintrag = AKTIONEN[art];
  if (!eintrag || req.method !== eintrag.methode) return weiter(HOPPLA, adresse);

  let token = ausPfad;
  if (req.method === 'POST') token = String((await req.formData().catch(() => null))?.get('t') ?? '');
  if (!/^[a-f0-9]{32}$/.test(token)) return weiter(HOPPLA, adresse);

  const url = process.env.CRM_MAGNETE_URL;
  if (!url) {
    console.error('CRM_MAGNETE_URL ist nicht gesetzt');
    return weiter(HOPPLA, adresse);
  }

  // Wer klickt, wartet: nur ein kurzer zweiter Versuch.
  const antwort = await anSkript(url, { aktion: eintrag.aktion, token }, `${eintrag.aktion} ${token.slice(0, 6)}…`, { pauseMs: 800 });
  if (antwort?.status !== 200) return weiter(HOPPLA, adresse);
  if (eintrag.aktion === 'download') return /^https:\/\//.test(antwort.ziel ?? '') ? weiter(antwort.ziel, adresse, 302) : weiter(HOPPLA, adresse);
  return weiter(eintrag.weiter, adresse);
};

export const config = { path: ['/m/d/*', '/m/n', '/m/a'] };
