// ────────────────────────────────────────────────────────────────────────
//  KREATIV-KI — vier fertige Funktionen für eure App.
//  Ruft sie einfach auf, der Rest passiert hinter den Kulissen (über den
//  abgesicherten E&P-Proxy). Ihr braucht KEINE API-Keys.
//
//  Beispiele:
//    const text = await kiText("Schreibe einen kurzen Postkarten-Gruß aus Sölden");
//    const bild = await kiBild("Verschneite Berghütte bei Sonnenuntergang, Postkarte");
//    const foto = await kiFoto(meinFotoDataUrl, "mach daraus eine winterliche Aquarell-Postkarte");
//    const audio = await kiStimme("Grüße aus den Bergen!");
//
//  Alle Funktionen geben einen String zurück:
//    kiText   → der fertige Text
//    kiBild   → eine Bild-URL (direkt in <img src={...}> verwendbar)
//    kiFoto   → eine Bild-URL (stilisiertes Foto)
//    kiStimme → eine Audio-URL (direkt in <audio src={...}> verwendbar)
// ────────────────────────────────────────────────────────────────────────

async function callApi<T>(pfad: string, body: unknown): Promise<T> {
  const res = await fetch(pfad, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const info = await res.text().catch(() => "");
    throw new Error(
      `KI-Funktion (${pfad}) hat nicht geklappt (${res.status}). ${info}`.trim()
    );
  }
  return (await res.json()) as T;
}

/** Lässt die KI einen Text schreiben (Gruß, Reise-Story, Beschreibung …). */
export async function kiText(prompt: string, stil?: string): Promise<string> {
  const { text } = await callApi<{ text: string }>("/api/text", {
    prompt,
    stil,
  });
  return text;
}

/** Erzeugt aus einer Beschreibung ein neues Bild. Gibt eine Bild-URL zurück. */
export async function kiBild(prompt: string): Promise<string> {
  const { bildUrl } = await callApi<{ bildUrl: string }>("/api/bild", {
    prompt,
  });
  return bildUrl;
}

/**
 * Stilisiert ein vorhandenes Foto (z. B. winterlich, als Gemälde …).
 * @param bildDataUrl  das Foto als Data-URL (z. B. aus einem File-Upload)
 * @param prompt       was die KI damit machen soll
 */
export async function kiFoto(
  bildDataUrl: string,
  prompt: string
): Promise<string> {
  const { bildUrl } = await callApi<{ bildUrl: string }>("/api/foto", {
    bild: bildDataUrl,
    prompt,
  });
  return bildUrl;
}

/** Wandelt Text in gesprochene Sprache um. Gibt eine Audio-URL zurück. */
export async function kiStimme(text: string, stimme?: string): Promise<string> {
  const { audioUrl } = await callApi<{ audioUrl: string }>("/api/stimme", {
    text,
    stimme,
  });
  return audioUrl;
}
