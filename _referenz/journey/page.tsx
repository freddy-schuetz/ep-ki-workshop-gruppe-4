// REFERENZLÖSUNG – Konzept 2: Scrollytelling „Reise zur Piste"
// Spickzettel für den Coach. NICHT 1:1 ausgeben.
"use client";

import { motion, useScroll } from "framer-motion";
import { useState } from "react";
import { kiText, kiBild } from "@/lib/kreativ";
import skigebiete from "@/data/skigebiete.json";

const ziel = skigebiete.gebiete.find((g) => g.id === "soelden")!;

const STATIONEN = [
  { emoji: "🌍", titel: "Es beginnt mit einer Idee", text: "Irgendwo da draußen wartet euer Berg.", farbe: "#0b1f3a" },
  { emoji: "🇦🇹", titel: "Ab in die Alpen", text: "Über Wolken und Gipfel hinweg Richtung Tirol.", farbe: "#0b3a8c" },
  { emoji: "🏔️", titel: ziel.name, text: `${ziel.pistenKm} Pistenkilometer, bis ${ziel.hoeheMeter} m. ${ziel.highlight}`, farbe: "#1457c8" },
  { emoji: "🏨", titel: "Angekommen", text: "Hotel bezogen, Skipass inklusive – los geht's!", farbe: "#2fae66" },
];

export default function JourneyRef() {
  const { scrollYProgress } = useScroll();
  const [texte, setTexte] = useState(STATIONEN.map((s) => s.text));
  const [bild, setBild] = useState<string | null>(null);

  async function texteAufpolieren() {
    const neu = await Promise.all(
      STATIONEN.map((s) => kiText(`Schreibe einen begeisterten Satz für die Reise-Station "${s.titel}" einer Skireise nach ${ziel.name}.`))
    );
    setTexte(neu);
  }

  async function zielbild() {
    setBild(await kiBild(`Panorama des Skigebiets ${ziel.name}, verschneite Pisten, sonnig, hochwertig`));
  }

  return (
    <main className="relative">
      {/* Fortschrittsleiste */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-50 h-1.5 w-full origin-left bg-brand-accent"
      />

      <div className="fixed right-4 top-4 z-50 flex gap-2">
        <button onClick={texteAufpolieren} className="rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-brand-dark shadow">
          Texte mit KI
        </button>
        <button onClick={zielbild} className="rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-brand-dark shadow">
          Zielbild
        </button>
      </div>

      {STATIONEN.map((s, i) => (
        <section
          key={i}
          className="flex min-h-screen flex-col items-center justify-center p-8 text-center text-white"
          style={{ backgroundColor: s.farbe }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <div className="text-7xl">{s.emoji}</div>
            <h2 className="mt-4 text-4xl font-black">{s.titel}</h2>
            <p className="mt-3 text-lg text-white/85">{texte[i]}</p>
            {i === 2 && bild && (
              <img src={bild} alt={ziel.name} className="mx-auto mt-6 max-h-64 rounded-xl shadow-lg" />
            )}
          </motion.div>

          {/* Schnee in der letzten Station */}
          {i === STATIONEN.length - 1 && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <style>{`@keyframes fall { to { transform: translateY(110vh) } }`}</style>
              {Array.from({ length: 24 }).map((_, k) => (
                <span
                  key={k}
                  className="absolute -top-6 text-white/80"
                  style={{ left: `${(k * 41) % 100}%`, animation: `fall ${6 + (k % 5)}s linear ${k * 0.3}s infinite` }}
                >
                  ❄
                </span>
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
