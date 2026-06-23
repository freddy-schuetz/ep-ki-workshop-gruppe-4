# 🗺️ Konzept 2: Scrollytelling „Reise zur Piste"

> Für den Coach: kleinschrittig führen, Inhalte die Gruppe wählen lassen, KI-Funktionen
> aktiv anbieten. Referenz-Lösung liegt in `_referenz/journey/`.

## Ziel
Eine Scroll-Geschichte: Beim Runterscrollen reist man von der Weltkarte hinab
in die Alpen bis ins gewählte E&P-Skigebiet und zum Hotel. Animierte Stationen
mit Bildern und Texten. Im Stil einer „Journey".

## So sieht „gut" aus
- **4 bildschirmfüllende Stationen**, die beim Scrollen sanft erscheinen.
- Gefühl von **„immer näher heranzoomen"**: Welt → Europa/Alpen → Skigebiet → Hotel/Piste.
- Pro Station ein **großer Titel**, ein **kurzer Text** und idealerweise ein **Bild**.
- Oben eine dünne **Fortschrittsleiste** der Reise. E&P-Look.

## Meilensteine (eine Etappe nach der anderen)
1. **Vier Stationen untereinander:** je ein voller Bildschirm mit Titel + Text (erstmal Platzhalter).
   *Was ihr jetzt seht:* Scrollen durch 4 große Abschnitte.
2. **Einblenden beim Scrollen:** jede Station blendet sanft ein, wenn sie in den Blick kommt.
   *Was ihr jetzt seht:* Die Reise fühlt sich lebendig an.
3. **Inhalt füllen:** echtes E&P-Skigebiet wählen (aus `data/skigebiete.json`), Texte per KI erzeugen.
   *Was ihr jetzt seht:* eine echte, stimmige Reise-Story.
4. **Feinschliff:** Fortschrittsleiste oben + Schneeflocken in der letzten Station.
   *Was ihr jetzt seht:* eine runde, animierte Mini-Reise.

## Welche KI hilft hier (`lib/kreativ.ts`)
- `kiText("…")` → schreibt die Stationstexte (z. B. „beschreibe in 2 Sätzen die Anreise ins Montafon").
- `kiBild("…")` → erzeugt ein Bild pro Station (Weltkarte-Gefühl, Alpenpanorama, Pistenblick, Hütte).

## Formulierungshilfen (so könnt ihr es dem Coach sagen)
- „Mach 4 große Abschnitte untereinander, jeder füllt den Bildschirm."
- „Lass jeden Abschnitt sanft einblenden, wenn ich dorthin scrolle."
- „Schreib mir für Station 3 einen kurzen, begeisterten Text über [Sölden]."
- „Füg oben eine dünne Fortschrittsleiste hinzu."

## Personalisieren
Zielgebiet, Reisetitel, eigene Fakten (Pistenkilometer, Höhe — stehen in `data/skigebiete.json`), Bildstil, Textstil (sachlich vs. enthusiastisch).

## Stretch-Goals (wenn Zeit bleibt)
- Eine Karte/Pin, der mit-„reist".
- Mini-Sound oder Vorlese-Stimme (`kiStimme`) pro Station.
- Auswahl am Anfang: „Wohin soll die Reise gehen?" → passt die Stationen an.
