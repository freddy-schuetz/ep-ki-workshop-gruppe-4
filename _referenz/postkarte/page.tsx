// REFERENZLÖSUNG – Konzept 1: Animierte Pisten-Postkarte
// Spickzettel für den Coach. NICHT 1:1 ausgeben – die Gruppe soll den Weg selbst gehen.
"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { kiBild, kiFoto, kiText, kiStimme } from "@/lib/kreativ";

export default function PostkarteRef() {
  const [bgUrl, setBgUrl] = useState("/platzhalter.svg");
  const [gruss, setGruss] = useState("Grüße aus den Bergen! ⛷️");
  const [busy, setBusy] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  async function bildErzeugen() {
    setBusy("bild");
    try {
      setBgUrl(await kiBild("Verschneite Alpenlandschaft bei goldenem Sonnenuntergang, Postkartenmotiv, hochwertig"));
    } finally {
      setBusy(null);
    }
  }

  async function fotoHochladen(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy("foto");
    try {
      const dataUrl = await new Promise<string>((res) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.readAsDataURL(file);
      });
      setBgUrl(await kiFoto(dataUrl, "Mach daraus eine winterliche, leicht gemalte Postkarte mit weichem Licht."));
    } finally {
      setBusy(null);
    }
  }

  async function grussVorschlagen() {
    setBusy("text");
    try {
      setGruss(await kiText("Ein kurzer, herzlicher Postkarten-Gruß aus einem Skiurlaub (max. 1 Satz)."));
    } finally {
      setBusy(null);
    }
  }

  async function vorlesen() {
    setBusy("stimme");
    try {
      setAudio(await kiStimme(gruss));
    } finally {
      setBusy(null);
    }
  }

  async function speichern() {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "ep-postkarte.png";
    a.click();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-6">
      <style>{`
        @keyframes kenburns { from { transform: scale(1) } to { transform: scale(1.18) } }
        @keyframes fall { to { transform: translateY(110%) } }
      `}</style>

      <h1 className="text-2xl font-black text-night">Eure Pisten-Postkarte</h1>

      {/* Die Postkarte selbst (wird als Bild exportiert) */}
      <div
        ref={cardRef}
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl"
      >
        <img
          src={bgUrl}
          alt="Postkarte"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ animation: "kenburns 18s ease-in-out infinite alternate" }}
        />
        {/* Schnee */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute -top-4 text-white/90"
              style={{
                left: `${(i * 53) % 100}%`,
                fontSize: `${10 + (i % 4) * 4}px`,
                animation: `fall ${6 + (i % 5)}s linear ${i * 0.4}s infinite`,
              }}
            >
              ❄
            </span>
          ))}
        </div>
        <p className="absolute bottom-5 left-0 right-0 text-center text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          {gruss}
        </p>
      </div>

      <input
        value={gruss}
        onChange={(e) => setGruss(e.target.value)}
        className="w-full rounded-lg border border-ice px-3 py-2"
        placeholder="Euer Gruß …"
      />

      <div className="flex flex-wrap justify-center gap-2">
        <button onClick={bildErzeugen} disabled={!!busy} className="rounded-lg bg-brand px-4 py-2 text-white disabled:opacity-50">
          {busy === "bild" ? "…" : "KI-Bild"}
        </button>
        <label className="cursor-pointer rounded-lg bg-brand px-4 py-2 text-white">
          {busy === "foto" ? "…" : "Foto hochladen"}
          <input type="file" accept="image/*" onChange={fotoHochladen} className="hidden" />
        </label>
        <button onClick={grussVorschlagen} disabled={!!busy} className="rounded-lg bg-ice px-4 py-2 text-brand-dark disabled:opacity-50">
          {busy === "text" ? "…" : "Gruß-Idee"}
        </button>
        <button onClick={vorlesen} disabled={!!busy} className="rounded-lg bg-ice px-4 py-2 text-brand-dark disabled:opacity-50">
          {busy === "stimme" ? "…" : "Vorlesen"}
        </button>
        <button onClick={speichern} className="rounded-lg bg-brand-accent px-4 py-2 font-semibold text-white">
          Als Bild speichern
        </button>
      </div>

      {audio && <audio src={audio} controls autoPlay className="w-full" />}
    </main>
  );
}
