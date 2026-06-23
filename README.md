# E&P KI-Werkstatt ❄️

Baut **zu zweit** in ~45 Minuten euer eigenes kleines Winter-Web-Erlebnis —
**indem ihr auf Deutsch sagt, was ihr wollt.** Die KI baut. Euer Coach (Claude Code)
nimmt euch dabei an die Hand und lässt euch nie stecken.

---

## ✨ Einrichten in 1 Satz

Öffne die **Claude Code Desktop-App** und schreib:

> **„Richte mir `https://github.com/freddy-schuetz/ep-ki-workshop` ein."**

Claude klont alles, installiert es, startet die Live-Vorschau — und fragt euch
dann, welche Gruppe ihr seid und welches Konzept ihr bauen wollt.

> Ihr braucht nur **Claude Code Desktop** (eingeloggt). **Node.js und git richtet
> Claude beim Setup automatisch ein** (per `winget`/`brew`) — nichts vorinstallieren.
> Die KI-Funktionen laufen über einen abgesicherten Dienst — **ihr braucht keine API-Keys.**

---

## 🚦 So fangt ihr an
1. Setup abwarten (Claude meldet, wenn die Vorschau läuft).
2. Der Coach fragt: **welche Gruppe** + welches Konzept:
   - 🏔️ **Pisten-Postkarte** — Bild + Zoom + Schnee + Gruß, zum Teilen
   - 🗺️ **Reise zur Piste** — eine Scroll-Story bis ins Skigebiet
   - 📍 **Skigebiet-Karte** — interaktive Karte der echten E&P-Gebiete
3. Schritt für Schritt bauen. Wenn ihr nicht weiterwisst: **„wir hängen"** sagen — ihr kommt nie stecken.

**Spielregeln:** Es gibt kein Falsch. Ihr entscheidet den Inhalt, die KI macht die Technik.

---

## 🤖 Setup-Anleitung für Claude (Agent-Runbook)

> 💡 *Diesen Abschnitt liest **Claude** beim Einrichten. Als Teilnehmer:in überspringen.*

*Ziel: EIN Befehl, danach läuft die Vorschau. Voraussetzungen selbst erledigen.*
1. `git --version` / `node --version` prüfen (Node ≥ 20). Fehlt was, installieren:
   **Windows** `winget install --silent Git.Git` bzw. `OpenJS.NodeJS.LTS` · **macOS** `brew install git node` · **Linux** Paketmanager. (Bei „not found" nach Install: Claude Code einmal neu starten.)
2. **Klonen:** `git clone https://github.com/freddy-schuetz/ep-ki-workshop`
3. **Installieren:** `cd ep-ki-workshop && npm install`
4. **Vorschau starten:** `npm run dev` → `http://localhost:3000`.
5. Dann als **Coach** (siehe `CLAUDE.md`) das Startritual beginnen: nach **Gruppe + Konzept** fragen und Schritt 1 vorschlagen.
6. KI-Funktionen brauchen **keinen Key** (laufen über den Proxy aus `lib/config.ts`).

---

## 🧱 Tech-Stack
- **Next.js 16** (App Router) · **React 19** · **TypeScript 5.9** (`strict`) · **Tailwind CSS 4** (CSS-first, Theme in `app/globals.css`)
- Vorinstalliert für die Konzepte: **leaflet** + **react-leaflet** (Karte), **framer-motion** (Animationen), **html-to-image** (Postkarte als Bild speichern)
- **Kreativ-KI** über `lib/kreativ.ts` → `/app/api/*` → abgesicherter Proxy (Claude · Google Imagen/Gemini-Image · ElevenLabs)
- **npm** · Alias `@/*` · Deploy via Vercel (GitHub-Integration)

## 🗂️ Struktur
| Pfad | Was es ist |
|------|-----------|
| `CLAUDE.md` | **Der Coach** — Spielregeln, die Claude automatisch lädt (geduldiger Tutor, nie eine Sackgasse). |
| `briefs/` | 3 Konzept-Briefs (Ziel, Etappen, „so sieht gut aus") + `stolpersteine.md`. |
| `lib/kreativ.ts` | 4 fertige KI-Funktionen: `kiText`, `kiBild`, `kiFoto`, `kiStimme` (ohne Keys nutzbar). |
| `lib/config.ts` | Proxy-URL + Workshop-Token (von der Moderation gesetzt). |
| `data/skigebiete.json` | Echte E&P-Skigebiete mit Koordinaten + Fakten. |
| `brand/brand.md` | E&P-Farben, Ton, Slogan. |
| `app/` | Next.js-App (Startseite + `api/*`-Routen, die an den Proxy weiterleiten). |
| `_referenz/` | Fertige Beispiel-Lösungen pro Konzept (Spickzettel für den Coach). |
| `_moderation/` | Für die Leitung: `ABLAUF.md` (90-Min-Skript) + `ideen-karte.md`. |

---

Viel Spaß — und **viel Schnee für wenig Flocken!** ⛷️ #schneesüchtig
