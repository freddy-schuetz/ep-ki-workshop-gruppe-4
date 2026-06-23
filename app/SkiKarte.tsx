"use client";

import { useState } from "react";
import skigebiete from "@/data/skigebiete.json";

// --- Projektion: Geo-Koordinaten → SVG-Pixel ---
const SVG_W = 1100;
const SVG_H = 680;
const LNG_MIN = 5.8, LNG_MAX = 13.2;
const LAT_MIN = 44.5, LAT_MAX = 48.2;

function project(lat: number, lng: number): [number, number] {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * SVG_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * SVG_H;
  return [x, y];
}

// --- Vereinfachte Alpen-Umrisse (skaliert auf 1100×680) ---
const LAENDER = [
  {
    name: "Österreich",
    farbe: "#c8e6ff",
    rand: "#7ab8f5",
    path: "M 400 145 L 465 127 L 538 119 L 622 122 L 696 132 L 758 140 L 806 153 L 879 171 L 895 192 L 879 214 L 844 226 L 792 234 L 724 238 L 649 242 L 573 242 L 502 238 L 440 232 L 398 214 L 390 190 Z",
  },
  {
    name: "Schweiz",
    farbe: "#d4eeff",
    rand: "#5aaaf0",
    path: "M 188 183 L 244 165 L 305 156 L 366 159 L 400 172 L 398 214 L 380 238 L 330 256 L 275 263 L 226 250 L 193 226 L 181 205 Z",
  },
  {
    name: "Frankreich",
    farbe: "#ddf0ff",
    rand: "#90c8f8",
    path: "M 70 207 L 122 177 L 181 205 L 193 226 L 183 263 L 159 305 L 110 330 L 67 311 L 49 275 L 55 238 Z",
  },
  {
    name: "Italien",
    farbe: "#e8f6ff",
    rand: "#a8d4f8",
    path: "M 188 183 L 366 159 L 400 172 L 440 232 L 502 238 L 573 242 L 649 242 L 724 238 L 792 234 L 844 226 L 895 250 L 885 293 L 844 337 L 733 360 L 610 360 L 489 367 L 378 342 L 293 318 L 226 317 L 183 293 L 183 263 L 226 250 L 275 263 L 330 256 L 380 238 L 398 214 Z",
  },
];

// Berggipfel-Symbole entlang des Alpenbogens
const GIPFEL = [
  [303,161],[338,152],[374,144],[415,133],[458,124],[498,120],
  [540,122],[582,128],[622,134],[660,142],[698,153],[735,163],
  [770,174],[804,183],
  [214,181],[179,192],[248,170],
  [330,235],[402,240],[468,242],
];

// Ländernamen-Position
const LAND_LABEL: Record<string, [number, number]> = {
  "Österreich": [638, 193],
  "Schweiz": [291, 214],
  "Frankreich": [112, 257],
  "Italien": [525, 310],
};

const landFarbe: Record<string, string> = {
  "Österreich": "#1457c8",
  "Schweiz": "#e8443a",
  "Schweiz / Frankreich": "#f59e0b",
  "Frankreich": "#2fae66",
  "Italien": "#9333ea",
};

const laenderListe = ["Alle", "Österreich", "Schweiz", "Frankreich", "Italien"];

const flakePositions = [5,12,19,27,34,41,48,55,62,69,76,83,90,97];

export default function SkiKarte() {
  const [aktivesLand, setAktivesLand] = useState("Alle");
  const [hover, setHover] = useState<string | null>(null);

  const sichtbar = skigebiete.gebiete.filter(
    (g) => aktivesLand === "Alle" || g.land === aktivesLand || g.land.includes(aktivesLand)
  );

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(180deg, #0b2a6b 0%, #1457c8 40%, #4a9de8 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      fontFamily: "sans-serif", padding: "0 0 24px",
    }}>

      {/* Schneeflocken-Animation */}
      <style>{`
        @keyframes fallSnow { 0% { transform: translateY(-20px) rotate(0deg); opacity:0.7 } 100% { transform: translateY(100vh) rotate(360deg); opacity:0 } }
        .snowflake { position:fixed; top:-20px; pointer-events:none; z-index:9999; animation: fallSnow linear infinite; }
      `}</style>
      {flakePositions.map((left, i) => (
        <span key={i} className="snowflake" style={{
          left: `${left}%`, fontSize: 16 + (i % 3) * 6,
          animationDuration: `${6 + (i % 4) * 2}s`,
          animationDelay: `${i * 0.5}s`,
          color: "white", opacity: 0.6,
        }}>❄</span>
      ))}

      {/* Header */}
      <div style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 28px", background: "rgba(11,42,107,0.6)", backdropFilter: "blur(8px)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            background: "white", color: "#1457c8", fontWeight: 900,
            fontSize: 20, borderRadius: 10, padding: "4px 12px", letterSpacing: 1,
          }}>E&amp;P</div>
          <div style={{ color: "white" }}>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Skigebiete ❄️</div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>Skipass inklusive · #schneesüchtig</div>
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
          {sichtbar.length} von {skigebiete.gebiete.length} Gebieten
        </div>
      </div>

      {/* Länder-Filter */}
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {laenderListe.map((land) => (
          <button key={land} onClick={() => setAktivesLand(land)} style={{
            padding: "7px 18px", borderRadius: 20, border: "2px solid",
            borderColor: aktivesLand === land ? "white" : "rgba(255,255,255,0.35)",
            background: aktivesLand === land ? "white" : "rgba(255,255,255,0.12)",
            color: aktivesLand === land ? "#1457c8" : "white",
            fontWeight: aktivesLand === land ? 800 : 500,
            fontSize: 13, cursor: "pointer", transition: "all 0.2s",
          }}>
            {land === "Alle" ? "🗺️ Alle" :
             land === "Österreich" ? "🇦🇹 Österreich" :
             land === "Schweiz" ? "🇨🇭 Schweiz" :
             land === "Frankreich" ? "🇫🇷 Frankreich" : "🇮🇹 Italien"}
          </button>
        ))}
      </div>

      {/* SVG-Karte */}
      <div style={{
        marginTop: 16, borderRadius: 24, overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4), 0 0 0 3px rgba(255,255,255,0.15)",
        background: "#b8d9f5", width: "96vw", maxWidth: 1200,
      }}>
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ maxHeight: "72vh", display: "block" }}>
          {/* Himmel/Schnee-Hintergrund */}
          <defs>
            <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8f4ff" />
              <stop offset="60%" stopColor="#cce8ff" />
              <stop offset="100%" stopColor="#aad4f0" />
            </linearGradient>
            <filter id="softShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>
          <rect width={SVG_W} height={SVG_H} fill="url(#bgGrad)" />

          {/* Länderflächen */}
          {LAENDER.map((l) => (
            <path key={l.name} d={l.path}
              fill={aktivesLand === "Alle" || aktivesLand === l.name ? l.farbe : "#d8eef8"}
              stroke={l.rand} strokeWidth={1.5}
              style={{ transition: "fill 0.3s" }}
              filter="url(#softShadow)"
            />
          ))}

          {/* Berggipfel-Symbole ⛰ */}
          {GIPFEL.map(([x, y], i) => (
            <g key={i} transform={`translate(${x},${y})`}>
              <polygon points="0,-10 7,0 -7,0" fill="white" opacity={0.85} />
              <polygon points="0,-6 4,0 -4,0" fill="#cce8ff" opacity={0.9} />
            </g>
          ))}

          {/* Ländernamen */}
          {LAENDER.map((l) => {
            const [lx, ly] = LAND_LABEL[l.name] ?? [0, 0];
            const aktiv = aktivesLand === "Alle" || aktivesLand === l.name;
            return (
              <text key={l.name} x={lx} y={ly}
                textAnchor="middle" fontSize={13} fontWeight={700}
                fill={aktiv ? "#0b3a8c" : "#aac8e0"}
                opacity={aktiv ? 0.7 : 0.4}
                style={{ transition: "opacity 0.3s", letterSpacing: 2, textTransform: "uppercase" }}
              >
                {l.name.toUpperCase()}
              </text>
            );
          })}

          {/* E&P Chalet-Häuschen für jedes Skigebiet */}
          {skigebiete.gebiete.map((g) => {
            const [x, y] = project(g.lat, g.lng);
            const farbe = landFarbe[g.land] ?? "#1457c8";
            const aktiv = aktivesLand === "Alle" || g.land === aktivesLand || g.land.includes(aktivesLand);
            const isHover = hover === g.id;
            const kurzname = g.name.length > 16 ? g.name.split(" ")[0] : g.name;
            const s = isHover ? 1.25 : 1; // Skalierung beim Hover

            return (
              <g key={g.id}
                transform={`translate(${x},${y}) scale(${s})`}
                style={{ cursor: "pointer", opacity: aktiv ? 1 : 0.12, transition: "opacity 0.3s" }}
                onMouseEnter={() => setHover(g.id)}
                onMouseLeave={() => setHover(null)}
              >
                {/* Schatten */}
                <ellipse cx={0} cy={20} rx={14} ry={4} fill="rgba(0,0,0,0.18)" />

                {/* Chalet-Haus: Wände */}
                <rect x={-10} y={4} width={20} height={14} rx={2}
                  fill={farbe} stroke="white" strokeWidth={1.2} />
                {/* Tür */}
                <rect x={-3} y={10} width={6} height={8} rx={1} fill="white" opacity={0.6} />
                {/* Fenster links */}
                <rect x={-8} y={7} width={4} height={4} rx={1} fill="white" opacity={0.8} />
                {/* Fenster rechts */}
                <rect x={4} y={7} width={4} height={4} rx={1} fill="white" opacity={0.8} />
                {/* Dach */}
                <polygon points="-13,4 0,-10 13,4"
                  fill="white" stroke={farbe} strokeWidth={1} />
                {/* Schneehäubchen auf dem Dach */}
                <polygon points="-13,4 -8,-3 0,-10 8,-3 13,4 10,4 0,-7 -10,4"
                  fill="#e8f4ff" opacity={0.85} />
                {/* E&P-Label auf dem Haus */}
                <text x={0} y={14} textAnchor="middle" fontSize={5} fill="white" fontWeight={900} opacity={0.9}>
                  E&amp;P
                </text>

                {/* Name-Label unter dem Haus */}
                <rect x={-kurzname.length * 3 - 3} y={23} width={kurzname.length * 6 + 6} height={14}
                  rx={7} fill={farbe} opacity={0.9}
                />
                <text x={0} y={33} textAnchor="middle" fontSize={9} fill="white" fontWeight={700}>
                  {kurzname}
                </text>

                {/* Hover-Tooltip */}
                {isHover && (
                  <g transform="translate(18, -70)">
                    <rect x={0} y={0} width={178} height={80} rx={10}
                      fill="white" stroke={farbe} strokeWidth={1.5}
                      filter="url(#softShadow)"
                    />
                    <text x={10} y={18} fontSize={11} fontWeight={800} fill={farbe}>{g.name}</text>
                    <text x={10} y={33} fontSize={10} fill="#555">{g.land} · {g.region.split(",")[0]}</text>
                    <text x={10} y={48} fontSize={10} fill="#333">🎿 {g.pistenKm} km · ⛰️ {g.hoeheMeter} m</text>
                    <text x={10} y={63} fontSize={9} fill="#444" fontStyle="italic">{g.highlight.slice(0,38)}…</text>
                    <text x={10} y={76} fontSize={9} fill="#2fae66" fontWeight={700}>✓ Skipass inklusive</text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Dekorative Schneeflocken auf der Karte */}
          {[[50,40],[820,60],[100,300],[780,400],[450,30],[300,500],[700,480]].map(([fx,fy],i) => (
            <text key={i} x={fx} y={fy} fontSize={18} opacity={0.25} fill="#5599dd">❄</text>
          ))}
        </svg>
      </div>

      {/* Slogan */}
      <div style={{
        marginTop: 14, color: "rgba(255,255,255,0.75)",
        fontSize: 12, fontWeight: 600, letterSpacing: 1,
      }}>
        ❄️ Viel Schnee für wenig Flocken · #schneesüchtig
      </div>
    </div>
  );
}
