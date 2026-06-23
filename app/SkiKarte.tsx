"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import skigebiete from "@/data/skigebiete.json";

const landFarbe: Record<string, string> = {
  "Österreich":         "#d94f3d",
  "Schweiz":            "#c0392b",
  "Schweiz / Frankreich": "#e67e22",
  "Frankreich":         "#2980b9",
  "Italien":            "#27ae60",
};

const laenderListe = ["Alle", "Österreich", "Schweiz", "Frankreich", "Italien"];
const flakePositions = [4,11,18,25,33,41,49,57,65,73,81,89,96];

function chaletHTML(farbe: string, kurzname: string, aktiv: boolean) {
  return `
    <div style="opacity:${aktiv ? 1 : 0.15};transition:opacity 0.3s;cursor:pointer">
      <svg width="44" height="52" viewBox="0 0 44 52" xmlns="http://www.w3.org/2000/svg">
        <!-- Schatten -->
        <ellipse cx="22" cy="50" rx="12" ry="3" fill="rgba(0,0,0,0.2)"/>
        <!-- Wände -->
        <rect x="8" y="24" width="28" height="20" rx="2" fill="${farbe}" stroke="white" stroke-width="1.5"/>
        <!-- Tür -->
        <rect x="17" y="32" width="9" height="12" rx="1" fill="rgba(255,255,255,0.55)"/>
        <!-- Fenster L -->
        <rect x="10" y="27" width="6" height="6" rx="1" fill="rgba(255,255,220,0.9)" stroke="white" stroke-width="0.5"/>
        <!-- Fenster R -->
        <rect x="28" y="27" width="6" height="6" rx="1" fill="rgba(255,255,220,0.9)" stroke="white" stroke-width="0.5"/>
        <!-- Dach -->
        <polygon points="5,24 22,6 39,24" fill="#8b3a2a" stroke="white" stroke-width="1"/>
        <!-- Schneedach -->
        <polygon points="5,24 11,15 22,6 33,15 39,24 36,24 22,9 8,24" fill="white" opacity="0.88"/>
        <!-- Schornstein -->
        <rect x="28" y="2" width="5" height="9" fill="#7a3020" stroke="white" stroke-width="0.8"/>
        <rect x="27" y="1" width="7" height="2.5" fill="#5a2015"/>
        <!-- E&P Label -->
        <text x="22" y="36" text-anchor="middle" font-size="5.5" fill="white" font-weight="900" font-family="sans-serif">E&amp;P</text>
      </svg>
      <!-- Name-Badge -->
      <div style="
        background:${farbe};color:white;font-size:9px;font-weight:700;
        padding:2px 7px;border-radius:8px;text-align:center;
        margin-top:-4px;white-space:nowrap;
        font-family:sans-serif;box-shadow:0 1px 4px rgba(0,0,0,0.3);
      ">${kurzname}</div>
    </div>
  `;
}

export default function SkiKarte() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<{ marker: maplibregl.Marker; land: string }[]>([]);
  const [aktivesLand, setAktivesLand] = useState("Alle");
  const [sichtbar, setSichtbar] = useState(skigebiete.gebiete.length);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      center: [10.0, 46.5],
      zoom: 6,
      pitch: 0,
      attributionControl: false,
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");
    map.addControl(new maplibregl.NavigationControl(), "bottom-right");

    map.on("load", () => {
      // Alle Gebiete als Marker hinzufügen
      skigebiete.gebiete.forEach((g) => {
        const farbe = landFarbe[g.land] ?? "#1457c8";
        const kurzname = g.name.split(" ")[0];
        const el = document.createElement("div");
        el.innerHTML = chaletHTML(farbe, kurzname, true);

        const popup = new maplibregl.Popup({ offset: 30, maxWidth: "220px" }).setHTML(`
          <div style="font-family:sans-serif;padding:4px">
            <div style="font-weight:800;color:${farbe};font-size:13px;margin-bottom:4px">${g.name}</div>
            <div style="color:#666;font-size:11px;margin-bottom:6px">${g.land} · ${g.region.split(",")[0]}</div>
            <div style="font-size:12px;line-height:1.7">
              🎿 <b>${g.pistenKm} km</b> Pisten<br>
              ⛰️ bis <b>${g.hoeheMeter} m</b> Höhe<br>
              ✨ ${g.highlight}
            </div>
            <div style="margin-top:6px;font-size:11px;color:#27ae60;font-weight:700">✓ Skipass inklusive</div>
          </div>
        `);

        const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([g.lng, g.lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push({ marker, land: g.land });
      });

      // Auf alle Gebiete zoomen
      const lngs = skigebiete.gebiete.map((g) => g.lng);
      const lats = skigebiete.gebiete.map((g) => g.lat);
      map.fitBounds(
        [[Math.min(...lngs) - 0.3, Math.min(...lats) - 0.2],
         [Math.max(...lngs) + 0.3, Math.max(...lats) + 0.2]],
        { padding: 60, duration: 1200 }
      );
    });

    mapInstance.current = map;
    return () => { map.remove(); markersRef.current = []; };
  }, []);

  // Länderfilter: Marker ein-/ausblenden
  useEffect(() => {
    let count = 0;
    markersRef.current.forEach(({ marker, land }) => {
      const aktiv = aktivesLand === "Alle" || land === aktivesLand || land.includes(aktivesLand);
      const el = marker.getElement();
      const inner = el.firstElementChild as HTMLElement | null;
      if (inner) inner.style.opacity = aktiv ? "1" : "0.12";
      if (aktiv) count++;
    });
    setSichtbar(count);
  }, [aktivesLand]);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", fontFamily: "sans-serif" }}>

      {/* Schneeflocken */}
      <style>{`
        @keyframes fallSnow { 0%{transform:translateY(-20px) rotate(0deg);opacity:.7} 100%{transform:translateY(105vh) rotate(360deg);opacity:0} }
        .flake{position:fixed;top:-20px;pointer-events:none;z-index:9999;animation:fallSnow linear infinite;color:white;}
      `}</style>
      {flakePositions.map((left, i) => (
        <span key={i} className="flake" style={{
          left: `${left}%`, fontSize: 13 + (i % 3) * 5,
          animationDuration: `${7 + (i % 5) * 1.5}s`,
          animationDelay: `${i * 0.55}s`, opacity: 0.5,
        }}>❄</span>
      ))}

      {/* Header */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "11px 20px",
        background: "linear-gradient(135deg,rgba(11,42,107,0.92),rgba(20,87,200,0.88))",
        backdropFilter: "blur(8px)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            background: "white", color: "#1457c8", fontWeight: 900,
            fontSize: 19, borderRadius: 8, padding: "4px 11px", letterSpacing: 2,
          }}>E&amp;P</div>
          <div style={{ color: "white" }}>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Skigebiete der Alpen ❄️</div>
            <div style={{ fontSize: 10, opacity: 0.75 }}>Skipass inklusive · #schneesüchtig</div>
          </div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>
          ⛷ {sichtbar} Gebiete
        </div>
      </div>

      {/* Länder-Filter */}
      <div style={{
        position: "absolute", top: 66, left: "50%", transform: "translateX(-50%)",
        zIndex: 1000, display: "flex", gap: 7, flexWrap: "wrap", justifyContent: "center",
      }}>
        {laenderListe.map((land) => (
          <button key={land} onClick={() => setAktivesLand(land)} style={{
            padding: "6px 15px", borderRadius: 20,
            border: `2px solid ${aktivesLand === land ? "white" : "rgba(255,255,255,0.35)"}`,
            background: aktivesLand === land ? "white" : "rgba(11,42,107,0.72)",
            color: aktivesLand === land ? "#1457c8" : "white",
            fontWeight: aktivesLand === land ? 800 : 500,
            fontSize: 13, cursor: "pointer", transition: "all 0.2s",
            backdropFilter: "blur(6px)",
            boxShadow: aktivesLand === land ? "0 2px 8px rgba(0,0,0,0.2)" : "none",
          }}>
            {land === "Alle" ? "🗺️ Alle"
              : land === "Österreich" ? "🇦🇹 Österreich"
              : land === "Schweiz" ? "🇨🇭 Schweiz"
              : land === "Frankreich" ? "🇫🇷 Frankreich"
              : "🇮🇹 Italien"}
          </button>
        ))}
      </div>

      {/* Karte */}
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />

      {/* Slogan */}
      <div style={{
        position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
        zIndex: 1000, pointerEvents: "none",
        background: "rgba(11,42,107,0.85)", color: "white",
        borderRadius: 20, padding: "6px 18px",
        fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
        boxShadow: "0 2px 10px rgba(0,0,0,0.25)", whiteSpace: "nowrap",
      }}>
        ❄️ Viel Schnee für wenig Flocken · #schneesüchtig
      </div>
    </div>
  );
}
