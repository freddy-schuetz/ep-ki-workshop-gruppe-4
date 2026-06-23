# 🏔️ Konzept 1: Animierte Pisten-Postkarte

> Für den Coach: kleinschrittig führen, Inhalte die Gruppe wählen lassen, KI-Funktionen
> aktiv anbieten. Referenz-Lösung liegt in `_referenz/postkarte/`.

## Ziel
Eine schicke Web-Postkarte: ein Winterbild, das sanft zoomt, rieselnder Schnee,
ein persönlicher Gruß — zum Herunterladen und Teilen. Im Stil eines „Zoom-Tools".

## So sieht „gut" aus
- Großes, schönes Bild im Mittelpunkt, das **langsam hineinzoomt** (Ken-Burns).
- **Schneeflocken** schweben darüber.
- Ein **Gruß-Text** unten auf dem Bild (gut lesbar, eleganter Schatten).
- E&P-Look (Blau/Weiß, freundlich), Slogan-Gefühl „Viel Schnee für wenig Flocken".
- Ein Knopf **„Als Bild speichern"**.

## Meilensteine (eine Etappe nach der anderen)
1. **Grundgerüst:** Eine Seite mit Bildfeld (erstmal Platzhalterbild) + Titel + Eingabefeld für den Gruß.
   *Was ihr jetzt seht:* Bild, darüber euer getippter Gruß.
2. **Lebendig machen:** Bild zoomt langsam endlos hinein; Schneeflocken rieseln darüber.
   *Was ihr jetzt seht:* Bewegung — die Postkarte „lebt".
3. **Eigenes Bild:** entweder ein Foto hochladen **oder** per KI ein Traum-Winterbild erzeugen lassen.
   *Was ihr jetzt seht:* euer eigenes Motiv als Hintergrund.
4. **Speichern/Teilen:** Knopf, der die Postkarte als Bild herunterlädt.
   *Was ihr jetzt seht:* eine Datei, die ihr verschicken könnt.

## Welche KI hilft hier (`lib/kreativ.ts`)
- `kiBild("…")` → erzeugt euer Hintergrundbild aus einer Beschreibung.
- `kiFoto(euerFoto, "…")` → macht aus eurem eigenen Foto eine winterliche/gemalte Postkarte.
- `kiText("…")` → schlägt einen Gruß vor, falls euch keiner einfällt.
- `kiStimme(gruß)` → die Postkarte liest den Gruß vor (kleiner Extra-Wow).

## Formulierungshilfen (so könnt ihr es dem Coach sagen)
- „Lass das Bild langsam reinzoomen und Schnee drüber fallen."
- „Erzeug mir ein Bild von [Sölden bei Sonnenuntergang] als Postkarte."
- „Mach den Gruß-Text größer und weiß mit Schatten."
- „Bau einen Knopf, der die Postkarte als Bild speichert."

## Personalisieren
Eigenes Foto, eigener Gruß, Lieblingsfarben, Schnee-Stärke, ein E&P-Skigebiet aus `data/skigebiete.json`, Vorlese-Stimme an/aus.

## Stretch-Goals (wenn Zeit bleibt)
- Mehrere Motive zum Durchklicken.
- Gruß per KI in mehreren Stilen vorschlagen (lustig / herzlich / sportlich).
- Kleiner „Verschicken"-Knopf (Bild + Text in die Zwischenablage).
