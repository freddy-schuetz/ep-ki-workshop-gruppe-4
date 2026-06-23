// Zentrale Workshop-Konfiguration.
//
// PROXY_URL + WORKSHOP_TOKEN werden von Friedemann VOR dem Workshop gesetzt
// (sobald der Kreativ-Proxy auf Vercel deployt ist). Der Token ist ein
// kurzlebiges Wegwerf-Gate, KEIN Anbieter-Key — er wird nach dem Workshop
// rotiert. Die echten API-Keys (Anthropic, Google, ElevenLabs) liegen
// AUSSCHLIESSLICH im Proxy, niemals hier im Teilnehmer-Repo.
//
// Diese Werte werden nur serverseitig (in den /app/api-Routen) gelesen —
// sie landen NIE im Browser der Teilnehmenden.

export const PROXY_URL =
  process.env.PROXY_URL ?? "https://ep-ki-workshop-proxy.vercel.app";

export const WORKSHOP_TOKEN = process.env.WORKSHOP_TOKEN ?? "ep-winter-2026";
