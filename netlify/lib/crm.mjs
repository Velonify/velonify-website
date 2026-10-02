// Gemeinsamer Weg zu den Apps Scripts des CRM (Repo Velonify/velonify-crm → apps-script/…).
//
// Apps Script antwortet auf POST mit einer Weiterleitung; fetch folgt ihr korrekt per GET. Das Skript meldet
// Erfolg oder Fehler im JSON ({ status, text, … }), der HTTP-Status ist dort immer 200. Google antwortet ab und
// zu kurz mit 404/5xx, dann nach einer Pause ein zweites Mal.

export async function anSkript(url, body, kennung, { versuche = 2, pauseMs = 3000 } = {}) {
  for (let versuch = 1; versuch <= versuche; versuch++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
