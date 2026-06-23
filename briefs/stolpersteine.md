# 🩹 Stolpersteine & Soforthilfen

> Für den Coach: Wenn etwas hakt, **zuerst hier schauen**. Ruhig bleiben, in
> Alltagssprache erklären, kleinen nächsten Schritt geben.

## „Ich sehe nichts / die Vorschau ist leer"
- Läuft die Vorschau (`npm run dev`)? Sonst starten.
- Tippfehler/Fehler im Code? Den Fehler lesen, die betroffene Stelle korrigieren, neu laden.
- Browser-Tab einmal neu laden.

## „Das Bild lädt nicht / Upload geht nicht"
- Foto-Upload: per `<input type="file">` + `FileReader` als **Data-URL** einlesen, dann an `kiFoto(...)` geben.
- KI-Bild dauert ein paar Sekunden — eine kleine **Ladeanzeige** einbauen.
- Antwort von `kiBild`/`kiFoto` direkt in `<img src={...}>` stecken (es ist schon eine fertige URL).

## „Eine KI-Funktion gibt einen Fehler"
- Kurz nochmal probieren (manchmal nur ein Hänger).
- Prompt etwas kürzer/klarer machen.
- **Kein Stillstand:** Ersatz bauen (Platzhalterbild aus `public/` oder ein fester Beispieltext) und weitermachen. Die Idee steht trotzdem.

## „Die Leaflet-Karte ist leer/grau" (Konzept 3)
- Die Karte braucht eine **feste Höhe** — der Container muss z. B. `h-screen` oder `height: 100%` haben (im Theme ist `.leaflet-container { height:100% }` schon gesetzt; das Elternelement braucht trotzdem Höhe).
- Das Leaflet-CSS muss geladen sein: `import "leaflet/dist/leaflet.css"`.
- Karte nur **im Browser** rendern (kein Server-Render): in Next.js die Karten-Komponente dynamisch mit `ssr: false` laden.
- Marker-Icon fehlt? Ein einfaches eigenes Icon setzen oder die Standard-Icon-URLs konfigurieren.

## „Die Scroll-Animation ruckelt/zeigt nichts" (Konzept 2)
- Zum Einblenden beim Scrollen einen `IntersectionObserver` nutzen **oder** `framer-motion` (`whileInView`).
- Jede Station als voller Bildschirm: `min-h-screen`.
- Nicht zu viele schwere Effekte gleichzeitig.

## „Der Download/Speichern-Knopf macht nichts" (Konzept 1)
- `html-to-image` ist vorinstalliert: das Postkarten-Element per Ref greifen → `toPng(node)` → als Link herunterladen.
- Externe Bilder können den Export blockieren (CORS) — KI-Bilder als Data-URL nutzen, dann klappt's.

## „Es sieht hässlich aus"
- Weniger ist mehr: viel Weißraum, 1–2 E&P-Farben (`bg-brand`, `bg-snow`, `text-night`), große klare Schrift.
- Abstände mit `p-…`/`gap-…`, runde Ecken `rounded-2xl`, leichter Schatten `shadow`.
- Brand-Werte stehen in `brand/brand.md`.

## „Wir wissen gerade gar nicht weiter"
- Eskalations-Leiter aus `CLAUDE.md`: Frage → kleiner machen → Optionen → Formulierungshilfe → vormachen+erklären.
- Notfalls Blick in `_referenz/<konzept>/` und den korrekten nächsten Schritt daraus ableiten.
