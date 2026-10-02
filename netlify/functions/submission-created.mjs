// Leitet Einsendungen der Netlify-Formulare ans CRM weiter (Apps Scripts, siehe Velonify/velonify-crm →
// apps-script/). Netlify ruft eine Funktion mit diesem Namen automatisch nach jeder angenommenen Einsendung
// auf; Spam, den Netlify aussortiert, kommt hier nicht an.
//
//   anfrage → CRM-Eingang (apps-script/eingang), Adresse samt Token in CRM_EINGANG_URL
//   magnet  → Lead-Magnete (apps-script/magnete), Adresse samt Token in CRM_MAGNETE_URL;
//             das Skript legt den Eintrag an und schickt die Mail mit dem Download
//
// Warum nicht der „Outgoing webhook“ aus dem Dashboard: Apps Script antwortet mit einer Weiterleitung,
// der Netlify per POST folgt und dafür 405 bekommt. Nach sechs solchen „Fehlern“ schaltet Netlify den
// Hook ab, obwohl die Anfragen angekommen sind.

import { anSkript } from '../lib/crm.mjs';

const ZIELE = {
  anfrage: { variable: 'CRM_EINGANG_URL', body: (payload) => payload },
  magnet: { variable: 'CRM_MAGNETE_URL', body: (payload) => ({ aktion: 'eintrag', payload }) },
};

export const handler = async (event) => {
  const { payload } = JSON.parse(event.body || '{}');
  const ziel = payload && ZIELE[payload.form_name];
  if (!ziel) return { statusCode: 200 };

  const url = process.env[ziel.variable];
  if (!url) {
    console.error(`${ziel.variable} ist nicht gesetzt, Einsendung nicht ans CRM übergeben:`, payload.form_name, payload.id);
    return { statusCode: 200 };
  }

  // Ein zweiter Versuch schickt keine doppelte Mail: das Magnet-Skript erkennt dieselbe Adresse wieder.
  await anSkript(url, ziel.body(payload), `${payload.form_name} ${payload.id}`);
  // die Einsendung selbst ist bei Netlify gespeichert, egal was das CRM sagt
  return { statusCode: 200 };
};
