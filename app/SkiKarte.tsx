"use client";

import { useState } from "react";
import skigebiete from "@/data/skigebiete.json";

// --- Projektion: Geo-Koordinaten → SVG-Pixel ---
const SVG_W = 900;
const SVG_H = 560;
const LNG_MIN = 5.8, LNG_MAX = 13.2;
const LAT_MIN = 44.5, LAT_MAX = 48.2;

function project(lat: number, lng: number): [number, number] {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * SVG_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * SVG_H;
  return [x, y];
}

// --- Vereinfachte Alpen-Umrisse als SVG-Paths ---
// Grob nachgezeichnete Ländergrenzen der Alpenregion
const LAENDER = [
  {
    name: "Österreich",
    farbe: "#c8e6ff",
    rand: "#7ab8f5",
    path: "M 330 120 L 380 105 L 440 98 L 510 100 L 570 108 L 620 115 L 660 125 L 700 140 L 720 158 L 710 175 L 680 185 L 640 192 L 590 195 L 530 200 L 470 198 L 410 195 L 360 188 L 325 175 L 318 155 Z",
  },
  {
    name: "Schweiz",
    farbe: "#d4eeff",
    rand: "#5aaaf0",
    path: "M 155 150 L 200 135 L 250 128 L 300 130 L 330 140 L 325 175 L 310 195 L 270 210 L 225 215 L 185 205 L 158 185 L 148 168 Z",
  },
  {
    name: "Frankreich",
    farbe: "#ddf0ff",
    rand: "#90c8f8",
    path: "M 58 170 L 100 145 L 148 168 L 158 185 L 150 215 L 130 250 L 90 270 L 55 255 L 40 225 L 45 195 Z",
  },
  {
    name: "Italien",
    farbe: "#e8f6ff",
    rand: "#a8d4f8",
    path: "M 155 150 L 300 130 L 330 140 L 360 188 L 410 195 L 470 198 L 530 200 L 590 195 L 640 192 L 680 185 L 710 175 L 730 200 L 720 240 L 680 275 L 600 295 L 500 305 L 400 300 L 310 280 L 240 260 L 185 240 L 150 215 L 158 185 Z",
  },
];

// Berggipfel-Dekorationen (grob im Alpenbogen)
const GIPFEL = [
  [248, 145], [280, 132], [310, 128], [350, 118], [395, 108],
  [430, 102], [468, 99], [505, 103], [540, 108], [575, 112],
  [610, 118], [645, 126], [675, 138], [700, 148],
  [175, 158], [145, 162], [200, 148],
  [270, 195], [330, 192], [390, 198],
];

// Ländernamen-Position (manuell zentriert)
const LAND_LABEL: Record<string, [number, number]> = {
  "Österreich": [520, 158],
  "Schweiz": [238, 175],
  "Frankreich": [92, 210],
  "Italien": [430, 255],
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
        background: "#b8d9f5", maxWidth: "95vw",
      }}>
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ maxHeight: "62vh", display: "block" }}>
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

          {/* Skigebiete-Pins */}
          {skigebiete.gebiete.map((g) => {
            const [x, y] = project(g.lat, g.lng);
            const farbe = landFarbe[g.land] ?? "#1457c8";
            const aktiv = aktivesLand === "Alle" || g.land === aktivesLand || g.land.includes(aktivesLand);
            const isHover = hover === g.id;
            const kurzname = g.name.length > 18 ? g.name.split(" ")[0] : g.name;

            return (
              <g key={g.id}
                transform={`translate(${x},${y})`}
                style={{ cursor: "pointer", opacity: aktiv ? 1 : 0.15, transition: "opacity 0.3s" }}
                onMouseEnter={() => setHover(g.id)}
                onMouseLeave={() => setHover(null)}
              >
                {/* Schatten-Blob */}
                <ellipse cx={0} cy={14} rx={8} ry={3} fill="rgba(0,0,0,0.15)" />
                {/* Pin */}
                <circle cx={0} cy={0} r={isHover ? 10 : 8}
                  fill={farbe} stroke="white" strokeWidth={2}
                  style={{ transition: "r 0.15s" }}
                />
                <text x={0} y={4} textAnchor="middle" fontSize={10} fill="white" fontWeight={800}>⛷</text>

                {/* Name-Label — immer sichtbar */}
                <rect x={-kurzname.length * 3.2 - 4} y={-30} width={kurzname.length * 6.4 + 8} height={18}
                  rx={9} fill={farbe} opacity={0.92}
                />
                <text x={0} y={-17} textAnchor="middle" fontSize={10} fill="white" fontWeight={700}>
                  {kurzname}
                </text>

                {/* Hover-Tooltip */}
                {isHover && (
                  <g transform="translate(14, -60)">
                    <rect x={0} y={0} width={170} height={72} rx={10}
                      fill="white" stroke={farbe} strokeWidth={1.5}
                      filter="url(#softShadow)"
                    />
                    <text x={10} y={18} fontSize={11} fontWeight={800} fill={farbe}>{g.name}</text>
                    <text x={10} y={33} fontSize={10} fill="#555">{g.land} · {g.region.split(",")[0]}</text>
                    <text x={10} y={48} fontSize={10} fill="#333">🎿 {g.pistenKm} km · ⛰️ {g.hoeheMeter} m</text>
                    <text x={10} y={63} fontSize={9} fill="#2fae66" fontWeight={700}>✓ Skipass inklusive</text>
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
