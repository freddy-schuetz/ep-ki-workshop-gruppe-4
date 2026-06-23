# E&P KI-Werkstatt ❄️

Ihr baut **zu zweit** in ~45 Minuten euer eigenes kleines Winter-Web-Erlebnis —
einfach indem ihr auf Deutsch sagt, was ihr wollt. Die KI baut, der Coach führt euch.

## 🚀 So startet ihr
Euer Projekt ist schon offen. Schreibt im Chat einfach:

> **Starten**

Der Coach begrüßt euch, fragt **welches Konzept** ihr bauen wollt, und legt **Schritt für Schritt** los:
- 🏔️ **Pisten-Postkarte** — Winterbild mit sanftem Zoom, Schnee und eurem Gruß, zum Teilen
- 🗺️ **Reise zur Piste** — eine Scroll-Story bis ins Skigebiet
- 📍 **Skigebiet-Karte** — interaktive Karte der echten E&P-Gebiete

## 👀 So seht ihr euer Ergebnis
Nach jedem Schritt macht der Coach euer Ergebnis sichtbar (er „veröffentlicht" es kurz).
Ihr bekommt **eure Vorschau-Adresse** genannt — einfach im Browser öffnen und nach jedem
Schritt **neu laden**. (Es dauert ca. eine Minute pro Aktualisierung — kurz Geduld.)

## Spielregeln
- Es gibt **kein Falsch**. Probiert aus, ändert, fragt.
- **Ihr** entscheidet den Inhalt (Skigebiet, Gruß, Farben), die **KI macht die Technik**.
- Wenn ihr nicht weiterwisst: einfach **„wir hängen"** schreiben — der Coach hilft sofort.
- Ihr müsst **nichts** installieren und keine Schlüssel/Keys eingeben.

Viel Spaß — und **viel Schnee für wenig Flocken!** ⛷️ #schneesüchtig

---

<details>
<summary>Für die Moderation / Technik (Teilnehmer können das überspringen)</summary>

- **Plattform:** Claude Code Web (claude.ai/code). Jede Gruppe öffnet ihr eigenes Repo
  (`ep-ki-workshop-gruppe-1` … `-5`) — **nicht** „richte mir … ein" tippen, einfach **Starten**.
- **Vorschau:** Auto-Deploy via Vercel bei jedem Push auf `main` → `https://<repo>.vercel.app`.
  Der Coach pusht nach jedem Schritt auf `main` (`git push origin HEAD:main`).
- **Coach-Logik:** `CLAUDE.md` (Claude Code) bzw. `AGENTS.md` (andere Tools). Konzept-Fahrpläne in `briefs/`,
  Referenzlösungen in `_referenz/`, Kreativ-KI in `lib/kreativ.ts`, echte E&P-Gebiete in `data/skigebiete.json`.
- **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind 4 · Leaflet · framer-motion · html-to-image.
</details>
