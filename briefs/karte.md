# 📍 Konzept 3: Interaktive E&P-Skigebiet-Karte

> Für den Coach: kleinschrittig führen, **nur echte Gebiete aus `data/skigebiete.json`**,
> KI-Funktionen aktiv anbieten. Referenz-Lösung liegt in `_referenz/karte/`.

## Ziel
Eine interaktive Karte der Alpen mit Markern für die **echten E&P-Skigebiete**.
Klick auf einen Marker → schicke Info-Karte mit Bild, Pistenkilometern und Fakten.
Im Stil eines kleinen Dashboards.

## So sieht „gut" aus
- Karte zentriert auf die Alpen, **Marker an den echten Orten** (Koordinaten stehen in den Daten).
- **Klick auf Marker → Info-Karte** mit Name, Land, Pistenkm, Höhe, Highlight.
- Animierte **Schneeflocken** über der Seite + Titel „E&P-Skigebiete" im Winter-Look.
- E&P-Farben.

## Meilensteine (eine Etappe nach der anderen)
1. **Karte anzeigen:** Leaflet-Karte (ist vorinstalliert), zentriert auf die Alpen.
   *Was ihr jetzt seht:* eine zoom-/verschiebbare Karte. (Tipp bei leerer Karte → `stolpersteine.md`.)
2. **Marker setzen:** für jedes Gebiet aus `data/skigebiete.json` einen Marker.
   *Was ihr jetzt seht:* Pins an den richtigen Orten.
3. **Info-Karte:** Klick auf Marker öffnet eine schöne Karte mit den Fakten.
   *Was ihr jetzt seht:* anklickbare Gebiete mit Infos.
4. **Aufhübschen:** Schneeflocken, Titel, E&P-Look; optional pro Gebiet ein KI-Bild.
   *Was ihr jetzt seht:* ein vorzeigbares Karten-Erlebnis.

## Welche KI hilft hier (`lib/kreativ.ts`)
- `kiText("…")` → erzeugt eine schöne Beschreibung pro Gebiet (Daten als Vorlage geben).
- `kiBild("…")` → erzeugt ein Stimmungsbild pro Skigebiet für die Info-Karte.

## Formulierungshilfen (so könnt ihr es dem Coach sagen)
- „Zeig mir eine Karte der Alpen."
- „Setz für jedes Skigebiet aus den Daten einen Marker."
- „Wenn ich auf einen Marker klicke, zeig Name, Pistenkm und das Highlight."
- „Erzeug für jedes Gebiet ein passendes Winterbild."

## Personalisieren
Welche Gebiete (alle oder Auswahl), Kartenstil, Farben, was in der Info-Karte steht, Bilder an/aus.

## Stretch-Goals (wenn Zeit bleibt)
- Filter „Österreich / Schweiz / Frankreich / Italien".
- Suchfeld oder Liste neben der Karte.
- „Skipass inklusive"-Badge und Preisangabe.
