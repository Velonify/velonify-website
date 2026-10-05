// Der Text „Was drin ist“ aus dem Hub → HTML für die Landingpage. Bewusst nur ein kleiner Teil von Markdown:
//   „## “ am Zeilenanfang → Zwischenüberschrift, „- “ → Listenpunkt, **so** → fett, Leerzeile → neuer Absatz.
// Alles andere wird als Text ausgegeben (HTML im Hub-Text wird maskiert, nicht ausgeführt).

export const esc = (text) =>
  String(text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const inline = (text) => esc(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

export function inhaltHtml(text) {
  const out = [];
  let liste = [];
  let absatz = [];
  const listeZu = () => {
    if (liste.length) out.push('<ul>' + liste.map((x) => `<li>${inline(x)}</li>`).join('') + '</ul>');
    liste = [];
  };
  const absatzZu = () => {
    if (absatz.length) out.push(`<p>${absatz.map(inline).join('<br>')}</p>`);
    absatz = [];
  };
  for (const roh of String(text ?? '').replace(/\r\n?/g, '\n').split('\n')) {
    const zeile = roh.trim();
    if (!zeile) {
      listeZu();
      absatzZu();
    } else if (/^##\s+/.test(zeile)) {
      listeZu();
      absatzZu();
      out.push(`<h2>${inline(zeile.replace(/^##\s+/, ''))}</h2>`);
    } else if (/^[-•]\s+/.test(zeile)) {
      absatzZu();
      liste.push(zeile.replace(/^[-•]\s+/, ''));
    } else {
      listeZu();
      absatz.push(zeile);
    }
  }
  listeZu();
  absatzZu();
  return out.join('\n');
}
