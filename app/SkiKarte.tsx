"use client";

import { useState } from "react";
import skigebiete from "@/data/skigebiete.json";

const SVG_W = 1100;
const SVG_H = 680;
const LNG_MIN = 5.8, LNG_MAX = 13.2;
const LAT_MIN = 44.5, LAT_MAX = 48.2;

function project(lat: number, lng: number): [number, number] {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * SVG_W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * SVG_H;
  return [x, y];
}

const landFarbe: Record<string, string> = {
  "Österreich": "#d94f3d",
  "Schweiz": "#c0392b",
  "Schweiz / Frankreich": "#e67e22",
  "Frankreich": "#2980b9",
  "Italien": "#27ae60",
};

const laenderListe = ["Alle", "Österreich", "Schweiz", "Frankreich", "Italien"];
const flakePositions = [4,10,17,24,31,38,45,52,59,66,73,80,87,94];

// Tal-Zonen (grüne Täler zwischen den Bergen)
const TAELER = [
  "M 120 340 Q 200 320 280 350 Q 340 365 400 355 Q 460 345 520 360 Q 580 375 650 360 Q 720 345 800 355 Q 860 362 920 350 L 950 400 Q 870 420 790 410 Q 720 400 650 415 Q 575 430 500 415 Q 430 400 360 415 Q 290 430 220 415 Q 165 405 120 390 Z",
  "M 60 280 Q 100 265 140 275 Q 170 283 190 295 L 180 340 Q 145 328 105 335 Q 72 340 50 330 Z",
  "M 820 280 Q 870 268 920 275 Q 960 282 990 295 L 980 340 Q 940 325 900 330 Q 860 335 835 325 Z",
];

// Waldgebiete (dunkles Grün, Baum-Silhouetten)
const WAELDER = [
  [130, 360], [160, 370], [200, 355], [240, 368], [280, 360],
  [320, 372], [370, 358], [420, 368], [470, 362], [530, 370],
  [580, 360], [630, 372], [680, 358], [730, 368], [780, 360],
  [840, 372], [890, 360], [940, 368],
  [75, 300], [105, 308], [870, 298], [910, 306],
];

// Schneefelder auf Gipfeln
const SCHNEEFELDER = [
  "M 303 145 Q 320 130 338 145 Q 325 155 303 145 Z",
  "M 374 128 Q 395 112 415 128 Q 398 140 374 128 Z",
  "M 458 110 Q 480 93 502 110 Q 482 122 458 110 Z",
  "M 540 108 Q 562 92 582 108 Q 563 120 540 108 Z",
  "M 622 120 Q 642 106 660 120 Q 644 130 622 120 Z",
  "M 698 138 Q 716 125 735 138 Q 718 147 698 138 Z",
  "M 770 158 Q 785 147 800 158 Q 787 166 770 158 Z",
  "M 214 167 Q 230 156 246 167 Q 232 175 214 167 Z",
  "M 176 178 Q 190 168 204 178 Q 191 186 176 178 Z",
];

// Bergrücken-Konturen (Hauptalpenkamm)
const BERGKAMM =
  "M 60 220 Q 100 195 140 185 Q 175 175 214 167 Q 248 158 280 148 Q 310 138 345 128 Q 380 118 415 110 Q 455 100 495 98 Q 535 96 572 100 Q 610 105 645 112 Q 680 120 715 132 Q 748 143 778 156 Q 810 170 840 182 Q 875 195 910 205 Q 945 215 980 222 Q 1010 228 1040 232";

// Länderflächen
const LAENDER_PATHS = [
  {
    name: "Österreich",
    fill: "#f0e8d0",
    stroke: "#c8a96e",
    path: "M 400 145 L 465 127 L 538 119 L 622 122 L 696 132 L 758 140 L 806 153 L 879 171 L 895 192 L 879 214 L 844 226 L 792 234 L 724 238 L 649 242 L 573 242 L 502 238 L 440 232 L 398 214 L 390 190 Z",
  },
  {
    name: "Schweiz",
    fill: "#ede0c4",
    stroke: "#b89a5a",
    path: "M 188 183 L 244 165 L 305 156 L 366 159 L 400 172 L 398 214 L 380 238 L 330 256 L 275 263 L 226 250 L 193 226 L 181 205 Z",
  },
  {
    name: "Frankreich",
    fill: "#e8dcc0",
    stroke: "#b08850",
    path: "M 70 207 L 122 177 L 181 205 L 193 226 L 183 263 L 159 305 L 110 330 L 67 311 L 49 275 L 55 238 Z",
  },
  {
    name: "Italien",
    fill: "#f5edd8",
    stroke: "#d4b878",
    path: "M 188 183 L 366 159 L 400 172 L 440 232 L 502 238 L 573 242 L 649 242 L 724 238 L 792 234 L 844 226 L 895 250 L 885 293 L 844 337 L 733 360 L 610 360 L 489 367 L 378 342 L 293 318 L 226 317 L 183 293 L 183 263 L 226 250 L 275 263 L 330 256 L 380 238 L 398 214 Z",
  },
];

const LAND_LABEL: Record<string, [number, number]> = {
  "Österreich": [638, 193],
  "Schweiz": [291, 218],
  "Frankreich": [112, 262],
  "Italien": [525, 318],
};

// Gipfel-Dreiecke
const GIPFEL = [
  [303,161],[338,152],[374,144],[415,133],[458,124],[498,120],
  [540,122],[582,128],[622,134],[660,142],[698,153],[735,163],
  [770,174],[804,183],[214,181],[179,192],[248,170],
  [330,235],[402,240],[468,242],
];

export default function SkiKarte() {
  const [aktivesLand, setAktivesLand] = useState("Alle");
  const [hover, setHover] = useState<string | null>(null);

  const sichtbar = skigebiete.gebiete.filter(
    (g) => aktivesLand === "Alle" || g.land === aktivesLand || g.land.includes(aktivesLand)
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #1a3a6b 0%, #2563a8 50%, #3d7fc4 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      fontFamily: "'Georgia', serif", padding: "0 0 28px",
    }}>

      {/* Schneeflocken */}
      <style>{`
        @keyframes fallSnow {
          0%   { transform: translateY(-20px) rotate(0deg)   translateX(0px);   opacity: 0.8 }
          50%  { transform: translateY(50vh)  rotate(180deg) translateX(12px);  opacity: 0.5 }
          100% { transform: translateY(105vh) rotate(360deg) translateX(-8px);  opacity: 0   }
        }
        .flake { position:fixed; top:-20px; pointer-events:none; z-index:9999; animation: fallSnow linear infinite; color:white; }
      `}</style>
      {flakePositions.map((left, i) => (
        <span key={i} className="flake" style={{
          left: `${left}%`, fontSize: 14 + (i % 3) * 5,
          animationDuration: `${7 + (i % 5) * 1.5}s`,
          animationDelay: `${i * 0.6}s`, opacity: 0.5,
        }}>❄</span>
      ))}

      {/* Header */}
      <div style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 28px",
        background: "rgba(15,35,80,0.7)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            background: "white", color: "#1457c8", fontWeight: 900,
            fontSize: 20, borderRadius: 8, padding: "4px 12px", letterSpacing: 2,
            fontFamily: "sans-serif",
          }}>E&amp;P</div>
          <div style={{ color: "white", fontFamily: "sans-serif" }}>
            <div style={{ fontWeight: 800, fontSize: 17 }}>Skigebiete der Alpen</div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>Skipass inklusive · Viel Schnee für wenig Flocken</div>
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontFamily: "sans-serif" }}>
          ⛷ {sichtbar.length} Gebiete
        </div>
      </div>

      {/* Länder-Filter */}
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap", justifyContent: "center" }}>
        {laenderListe.map((land) => (
          <button key={land} onClick={() => setAktivesLand(land)} style={{
            padding: "6px 16px", borderRadius: 20,
            border: `2px solid ${aktivesLand === land ? "white" : "rgba(255,255,255,0.3)"}`,
            background: aktivesLand === land ? "white" : "rgba(255,255,255,0.1)",
            color: aktivesLand === land ? "#1a3a6b" : "white",
            fontWeight: aktivesLand === land ? 800 : 500,
            fontSize: 13, cursor: "pointer", transition: "all 0.2s",
            fontFamily: "sans-serif",
          }}>
            {land === "Alle" ? "🗺️ Alle" : land === "Österreich" ? "🇦🇹 Österreich"
              : land === "Schweiz" ? "🇨🇭 Schweiz"
              : land === "Frankreich" ? "🇫🇷 Frankreich" : "🇮🇹 Italien"}
          </button>
        ))}
      </div>

      {/* Karte */}
      <div style={{
        marginTop: 14, borderRadius: 16, overflow: "hidden",
        boxShadow: "0 10px 50px rgba(0,0,0,0.5), 0 0 0 3px rgba(255,255,255,0.2)",
        width: "97vw", maxWidth: 1200,
        border: "4px solid #c8a96e",
      }}>
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          style={{ display: "block", maxHeight: "74vh" }}>

          <defs>
            {/* Hintergrund: Papierton wie gedruckte Karte */}
            <linearGradient id="papier" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#d4eaff" />
              <stop offset="35%" stopColor="#c8e0f5" />
              <stop offset="70%" stopColor="#b8d4ee" />
              <stop offset="100%" stopColor="#a8c8e8" />
            </linearGradient>
            {/* Bergkamm-Schatten */}
            <linearGradient id="schneeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e8f4ff" />
              <stop offset="100%" stopColor="#c8dff5" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="3" floodOpacity="0.2" />
            </filter>
            <filter id="softglow">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* Textur-Muster für Wälder */}
            <pattern id="waldMuster" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#7ab878"/>
              <circle cx="4" cy="4" r="2.5" fill="#5a9858" opacity="0.6"/>
            </pattern>
          </defs>

          {/* Papierhintergrund */}
          <rect width={SVG_W} height={SVG_H} fill="url(#papier)" />

          {/* Länderflächen — Papierton */}
          {LAENDER_PATHS.map((l) => {
            const aktiv = aktivesLand === "Alle" || aktivesLand === l.name;
            return (
              <path key={l.name} d={l.path}
                fill={aktiv ? l.fill : "#dde8f0"}
                stroke={aktiv ? l.stroke : "#c8d8e4"}
                strokeWidth={1.5}
                style={{ transition: "fill 0.35s" }}
              />
            );
          })}

          {/* Tal-Grün */}
          {TAELER.map((d, i) => (
            <path key={i} d={d} fill="#c8dda8" opacity={0.45} />
          ))}

          {/* Wald-Punkte */}
          {WAELDER.map(([wx, wy], i) => (
            <g key={i} transform={`translate(${wx},${wy})`} opacity={0.55}>
              <polygon points="0,-7 5,0 -5,0" fill="#5a9050" />
              <polygon points="0,-11 3.5,-3 -3.5,-3" fill="#4a8040" />
              <rect x={-1.5} y={0} width={3} height={4} fill="#7a6040" />
            </g>
          ))}

          {/* Hauptalpenkamm Schattierung */}
          <path d={BERGKAMM} fill="none"
            stroke="#c8d8f0" strokeWidth={28} strokeLinecap="round"
            opacity={0.35}
          />

          {/* Gipfel-Dreiecke */}
          {GIPFEL.map(([gx, gy], i) => (
            <g key={i} transform={`translate(${gx},${gy})`}>
              <polygon points="0,-13 9,2 -9,2"
                fill="#9ab8d4" stroke="#7898b8" strokeWidth={0.8} />
              <polygon points="0,-13 5,-3 -5,-3"
                fill="white" opacity={0.9} />
            </g>
          ))}

          {/* Schneefelder */}
          {SCHNEEFELDER.map((d, i) => (
            <path key={i} d={d} fill="white" opacity={0.75} />
          ))}

          {/* Ländernamen */}
          {LAENDER_PATHS.map((l) => {
            const [lx, ly] = LAND_LABEL[l.name] ?? [0, 0];
            const aktiv = aktivesLand === "Alle" || aktivesLand === l.name;
            return (
              <text key={l.name} x={lx} y={ly} textAnchor="middle"
                fontSize={12} fontWeight={700} letterSpacing={3}
                fill={aktiv ? "#7a5830" : "#b0c0d0"}
                opacity={aktiv ? 0.65 : 0.35}
                style={{ transition: "opacity 0.3s", fontFamily: "Georgia, serif" }}
              >
                {l.name.toUpperCase()}
              </text>
            );
          })}

          {/* Dekorative Flüsse / Linien */}
          <path d="M 400 240 Q 420 280 410 320 Q 400 350 390 370"
            fill="none" stroke="#88b8d8" strokeWidth={1.5} opacity={0.5} />
          <path d="M 270 218 Q 255 260 248 300 Q 242 330 238 360"
            fill="none" stroke="#88b8d8" strokeWidth={1.2} opacity={0.45} />
          <path d="M 640 200 Q 650 240 645 280 Q 640 310 635 340"
            fill="none" stroke="#88b8d8" strokeWidth={1.2} opacity={0.45} />

          {/* Rahmen-Innenkante (Kartenstil) */}
          <rect x={8} y={8} width={SVG_W-16} height={SVG_H-16}
            fill="none" stroke="#c8a96e" strokeWidth={2} rx={4} opacity={0.6} />

          {/* E&P Chalet-Häuschen */}
          {skigebiete.gebiete.map((g) => {
            const [x, y] = project(g.lat, g.lng);
            const farbe = landFarbe[g.land] ?? "#1457c8";
            const aktiv = aktivesLand === "Alle" || g.land === aktivesLand || g.land.includes(aktivesLand);
            const isHover = hover === g.id;
            const kurzname = g.name.split(" ")[0];
            const s = isHover ? 1.3 : 1;

            return (
              <g key={g.id}
                transform={`translate(${x},${y}) scale(${s})`}
                style={{ cursor: "pointer", opacity: aktiv ? 1 : 0.1, transition: "opacity 0.3s" }}
                onMouseEnter={() => setHover(g.id)}
                onMouseLeave={() => setHover(null)}
              >
                {/* Schatten */}
                <ellipse cx={0} cy={22} rx={16} ry={4} fill="rgba(0,0,0,0.2)" />

                {/* Haus-Wände */}
                <rect x={-11} y={5} width={22} height={15} rx={2}
                  fill={farbe} stroke="white" strokeWidth={1.5} />
                {/* Tür */}
                <rect x={-3.5} y={12} width={7} height={8} rx={1}
                  fill="rgba(255,255,255,0.55)" />
                {/* Fenster L */}
                <rect x={-9} y={8} width={5} height={5} rx={1}
                  fill="rgba(255,255,220,0.8)" stroke="white" strokeWidth={0.5} />
                {/* Fenster R */}
                <rect x={4} y={8} width={5} height={5} rx={1}
                  fill="rgba(255,255,220,0.8)" stroke="white" strokeWidth={0.5} />
                {/* Dach */}
                <polygon points="-14,5 0,-11 14,5"
                  fill="#8b3a2a" stroke="white" strokeWidth={1} />
                {/* Schneedach */}
                <polygon points="-14,5 -9,-2 0,-11 9,-2 14,5 11,5 0,-8 -11,5"
                  fill="white" opacity={0.88} />
                {/* Schornstein */}
                <rect x={4} y={-14} width={4} height={7}
                  fill="#7a3020" stroke="white" strokeWidth={0.8} />
                <rect x={3} y={-15} width={6} height={2}
                  fill="#5a2015" />
                {/* Rauch */}
                {isHover && (
                  <path d="M 6,-16 Q 9,-22 6,-26 Q 3,-30 7,-34"
                    fill="none" stroke="rgba(200,200,200,0.7)" strokeWidth={2}
                    strokeLinecap="round" />
                )}

                {/* E&P mini-label */}
                <text x={0} y={16} textAnchor="middle"
                  fontSize={4.5} fill="white" fontWeight={900}
                  fontFamily="sans-serif" opacity={0.9}>
                  E&amp;P
                </text>

                {/* Name-Label */}
                <rect x={-kurzname.length * 2.9 - 4} y={25}
                  width={kurzname.length * 5.8 + 8} height={14} rx={7}
                  fill={farbe} opacity={0.93} />
                <text x={0} y={35} textAnchor="middle"
                  fontSize={9} fill="white" fontWeight={700}
                  fontFamily="sans-serif">
                  {kurzname}
                </text>

                {/* Hover-Info */}
                {isHover && (
                  <g transform="translate(18,-80)" filter="url(#shadow)">
                    <rect x={0} y={0} width={192} height={90} rx={10}
                      fill="#fffdf5" stroke={farbe} strokeWidth={1.8} />
                    <rect x={0} y={0} width={192} height={22} rx={10}
                      fill={farbe} />
                    <rect x={0} y={12} width={192} height={10}
                      fill={farbe} />
                    <text x={10} y={15} fontSize={11} fontWeight={800}
                      fill="white" fontFamily="sans-serif">{g.name.slice(0,24)}</text>
                    <text x={10} y={35} fontSize={10} fill="#555" fontFamily="sans-serif">
                      {g.land} · {g.region.split(",")[0]}
                    </text>
                    <text x={10} y={51} fontSize={10} fill="#333" fontFamily="sans-serif">
                      🎿 {g.pistenKm} km Pisten
                    </text>
                    <text x={10} y={66} fontSize={10} fill="#333" fontFamily="sans-serif">
                      ⛰️ bis {g.hoeheMeter} m Höhe
                    </text>
                    <text x={10} y={82} fontSize={9} fill="#27ae60"
                      fontWeight={700} fontFamily="sans-serif">
                      ✓ Skipass inklusive
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Kompass-Rose unten rechts */}
          <g transform="translate(1055, 620)">
            <circle cx={0} cy={0} r={22} fill="rgba(255,255,255,0.75)"
              stroke="#c8a96e" strokeWidth={1.5} />
            <polygon points="0,-16 3,-4 -3,-4" fill="#c8a96e" />
            <polygon points="0,16 3,4 -3,4" fill="#b0b8c0" />
            <polygon points="-16,0 -4,3 -4,-3" fill="#b0b8c0" />
            <polygon points="16,0 4,3 4,-3" fill="#b0b8c0" />
            <text x={0} y={-7} textAnchor="middle" fontSize={7}
              fill="#7a5830" fontWeight={800} fontFamily="sans-serif">N</text>
            <circle cx={0} cy={0} r={3} fill="#c8a96e" />
          </g>

          {/* Maßstab-Balken */}
          <g transform="translate(30, 640)">
            <rect x={0} y={0} width={80} height={6} fill="#7a5830" opacity={0.7} />
            <rect x={0} y={0} width={40} height={6} fill="white" opacity={0.7} />
            <text x={0} y={18} fontSize={9} fill="#7a5830" fontFamily="sans-serif">0</text>
            <text x={35} y={18} fontSize={9} fill="#7a5830" fontFamily="sans-serif">~150 km</text>
          </g>

        </svg>
      </div>

      {/* Slogan */}
      <div style={{
        marginTop: 12, color: "rgba(255,255,255,0.7)",
        fontSize: 12, fontWeight: 600, letterSpacing: 1, fontFamily: "sans-serif",
      }}>
        ❄️ Viel Schnee für wenig Flocken · #schneesüchtig
      </div>
    </div>
  );
}
