// Gemeinsamer Weg zur crm-api des Velonify Hub (Repo Velonify/velonify-crm → functions/crm-api, früher Apps Scripts).
//
// Apps Script antwortet auf POST mit einer Weiterleitung; fetch folgt ihr korrekt per GET. Das Skript meldet
// Erfolg oder Fehler im JSON ({ status, text, … }), der HTTP-Status ist dort immer 200. Google antwortet ab und
// zu kurz mit 404/5xx, dann nach einer Pause ein zweites Mal.

// Die Adressen in CRM_EINGANG_URL und CRM_MAGNETE_URL tragen das Token als ?token=…. Für die crm-api geht es als Header
// X-Velonify-Token mit, damit es nicht in deren Request-Logs landet; die Variablen bleiben unverändert.
function ziel(url) {
  const adresse = new URL(url);
  const token = adresse.searchParams.get('token');
  if (!token || adresse.hostname.endsWith('script.google.com')) return { adresse: url, kopf: {} };
  adresse.searchParams.delete('token');
  return { adresse: adresse.toString(), kopf: { 'X-Velonify-Token': token } };
}

export async function anSkript(url, body, kennung, { versuche = 2, pauseMs = 3000 } = {}) {
  const { adresse, kopf } = ziel(url);
  for (let versuch = 1; versuch <= versuche; versuch++) {
    try {
      const res = await fetch(adresse, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...kopf },
        body: JSON.stringify(body),
      });
      const antwort = res.ok ? await res.json().catch(() => null) : null;
      if (antwort) {
        if (antwort.status === 200) console.log('CRM:', antwort.text, kennung);
        else console.error('CRM hat abgelehnt:', antwort.status, antwort.text, kennung);
        return antwort;
      }
      console.error(`CRM Versuch ${versuch}: HTTP ${res.status} ohne Antwort des Skripts`, kennung);
    } catch (fehler) {
      console.error(`CRM Versuch ${versuch} nicht erreichbar:`, String(fehler), kennung);
    }
    if (versuch < versuche) await new Promise((r) => setTimeout(r, pauseMs));
  }
  return null;
}
