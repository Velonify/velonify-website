// Leitet jede Anfrage aus dem Formular „anfrage“ an den CRM-Eingang weiter (Apps Script, siehe
// Velonify/velonify-crm → apps-script/eingang). Netlify ruft eine Funktion mit diesem Namen automatisch
// nach jeder angenommenen Einsendung auf; Spam, den Netlify aussortiert, kommt hier nicht an.
//
// Warum nicht der „Outgoing webhook“ aus dem Dashboard: Apps Script antwortet mit einer Weiterleitung,
// der Netlify per POST folgt und dafür 405 bekommt. Nach sechs solchen „Fehlern“ schaltet Netlify den
// Hook ab, obwohl die Anfragen angekommen sind. fetch folgt der Weiterleitung korrekt per GET.
//
// Adresse samt Token steht in der Umgebungsvariable CRM_EINGANG_URL:
//   https://script.google.com/macros/s/…/exec?token=…

export const handler = async (event) => {
  const { payload } = JSON.parse(event.body || '{}');
  if (!payload || payload.form_name !== 'anfrage') return { statusCode: 200 };

  const url = process.env.CRM_EINGANG_URL;
  if (!url) {
    console.error('CRM_EINGANG_URL ist nicht gesetzt, Anfrage nicht ans CRM übergeben:', payload.id);
    return { statusCode: 200 };
  }

  // Google antwortet ab und zu kurz mit 404/5xx, dann nach einer Pause ein zweites Mal
  for (let versuch = 1; versuch <= 2; versuch++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      // das Skript meldet Erfolg oder Fehler im Text, der HTTP-Status ist dort immer 200
      const antwort = res.ok ? await res.json().catch(() => null) : null;
      if (antwort) {
        if (antwort.status === 200) console.log('CRM-Eingang:', antwort.text, payload.id);
        else console.error('CRM-Eingang hat abgelehnt:', antwort.status, antwort.text, payload.id);
        break;
      }
      console.error(`CRM-Eingang Versuch ${versuch}: HTTP ${res.status} ohne Antwort des Skripts`, payload.id);
    } catch (fehler) {
      console.error(`CRM-Eingang Versuch ${versuch} nicht erreichbar:`, String(fehler), payload.id);
    }
    if (versuch === 1) await new Promise((r) => setTimeout(r, 3000));
  }
  // die Einsendung selbst ist bei Netlify gespeichert, egal was das CRM sagt
  return { statusCode: 200 };
};
