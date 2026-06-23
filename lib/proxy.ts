import { PROXY_URL, WORKSHOP_TOKEN } from "@/lib/config";

// Leitet einen Aufruf serverseitig an den abgesicherten E&P-Kreativ-Proxy
// weiter und hängt den Workshop-Token an. Der Token verlässt damit NIE den
// Server — der Browser der Teilnehmenden sieht ihn nicht.
export async function forwardToProxy(
  fn: "text" | "bild" | "foto" | "stimme",
  body: unknown
): Promise<Response> {
  try {
    const res = await fetch(`${PROXY_URL}/api/${fn}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WORKSHOP_TOKEN}`,
      },
      body: JSON.stringify(body),
    });
    const payload = await res.text();
    return new Response(payload, {
      status: res.status,
      headers: {
        "Content-Type":
          res.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch {
    return Response.json(
      { error: "Der Kreativ-Dienst ist gerade nicht erreichbar." },
      { status: 502 }
    );
  }
}
