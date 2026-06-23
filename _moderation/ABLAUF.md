# Moderations-Skript — E&P KI-Werkstatt (90 Min)

Internes Format, ~5 Abteilungsleitungen, 2er-Gruppen. Du moderierst.

## Vorab-Checkliste (Generalprobe + Tag davor)
- [ ] **Proxy deployt** (Vercel), Keys gesetzt, alle 4 Funktionen getestet, Spend-Limits bei den Anbietern aktiv.
- [ ] **Proxy-URL + WORKSHOP_TOKEN** in `ep-ki-workshop/lib/config.ts` eingetragen (Token identisch zum Proxy).
- [ ] **Template-Repo gepusht**; einmal in claude.ai/code geöffnet, Setup + Vorschau laufen.
- [ ] **Generalprobe:** alle 3 Konzepte über die Briefs selbst nachgebaut → `_referenz/` ist aktuell. Zeiten notiert.
- [ ] **Coach-Stresstest:** „wir hängen" an mehreren Stellen → Coach führt sauber weiter.
- [ ] **Zugang:** Account-Login auf den Gruppen-Laptops getestet (parallele Sessions ok).
- [ ] **Raum:** WLAN getestet (mehrere Sessions), Hotspot als Backup, Beamer, Ideen-Karten gedruckt.

## Ablauf

### 0:00–0:08 · Intro-Präsentation („Was mit KI heute geht")
- **Präsentation am Beamer:** `public/praesentation.html` (Doppelklick) **oder** live: https://ep-ki-workshop.vercel.app/praesentation.html — Pfeiltasten blättern, **F** = Vollbild.
- Bildstarker Schnelldurchlauf (2025/26-Beispiele: Video/Veo, Musik/Suno, Bild/Nano-Banana, Stimme, Echtzeit/Gemini Live, Agenten, Vibe Coding). Wenig reden, staunen lassen.
- Letzte Slides leiten über: „Und jetzt baut **ihr** das" → die 3 Konzepte. Kernbotschaft: **ihr redet auf Deutsch — es entsteht echte Software**, am Ende habt ihr was zum Behalten.
- Die Bilder **und Videos** der Präsentation sind **selbst mit KI erzeugt** (Veo 3.1 + Imagen 4) — starker Aufhänger: „alles, was ihr hier seht, ist KI."
- **Zwei Live-Mitmach-Slides** (🎨 Bild & 🔊 Stimme): das Publikum ruft ein Motiv/einen Satz zu, du tippst ihn ein → die KI erzeugt es **live**. ⚠️ Dafür die Präsentation über die **Online-URL** öffnen (nicht die lokale Datei), sonst sind die Live-Buttons inaktiv. Vorab einmal testen.

### 0:05–0:12 · Setup + Gruppen
- 2er-Gruppen bilden, je ein Konzept zuteilen (oder wählen lassen).
- Alle: claude.ai/code öffnen, Template-Projekt öffnen, „Setup starten" tippen → Vorschau läuft.
- Tipp: „Euer Coach im Chat fragt euch gleich, welche Gruppe ihr seid — antwortet einfach."

### 0:12–0:48 · Geführter Bau (das Herzstück)
- Gruppen arbeiten **selbstständig mit dem Coach**. Du gehst herum, hältst Energie hoch, hilfst bei Hängern (oder erinnerst: „Sagt dem Coach einfach ‚wir hängen'").
- Zwischenruf nach ~15 Min: „Lasst zwischendurch mal im Browser ausprobieren, was schon geht!"
- Wer schnell ist → auf Stretch-Goals + Personalisierung hinweisen.

### 0:48–0:55 · Personalisierung
- „Macht es zu eurem: euer Skigebiet, euer Gruß, eure Farben, eigenes Foto, KI-Bild, Vorlesen."

### 0:55–1:00 · Showcase + Brücke
- Jede Gruppe zeigt 30–60 Sek. am Beamer. Applaus, Spaß.
- **Brücke:** „Ihr habt gerade Software gebaut, indem ihr geredet habt. Stellt euch das für eure Abteilung vor." → **Ideen-Karte** austeilen, 1 Idee notieren lassen (siehe `ideen-karte.md`).

### 1:00–1:30 · KI-Check
- Überleitung: „Jetzt schauen wir, wo ihr/wir mit KI gerade steht — und nehmt was Handfestes mit." → ki-check.friedemann-schuetz.de, Infografik als Mitnehm-Ergebnis.

## Notfälle
- **KI-Funktion zickt:** Coach baut Platzhalter — weitermachen.
- **Build kaputt:** Coach zieht aus `_referenz/` den nächsten Schritt.
- **Zu schwer/zu langsam:** auf **Postkarte** wechseln (robusteste).
- **WLAN schwach:** Hotspot; eine Gruppe auf Google AI Studio (gratis) ausweichen.
