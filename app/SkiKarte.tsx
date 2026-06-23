"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import skigebiete from "@/data/skigebiete.json";

// Farben je Land
const landFarbe: Record<string, string> = {
  "Österreich": "#e8443a",
  "Schweiz": "#e8443a",
  "Schweiz / Frankreich": "#f59e0b",
  "Frankreich": "#2fae66",
  "Italien": "#1457c8",
};

function makeIcon(name: string, land: string) {
  const farbe = landFarbe[land] ?? "#1457c8";
  const html = `
    <div style="
      background: ${farbe};
      color: white;
      border: 2px solid white;
      border-radius: 20px;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 700;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0,0,0,0.35);
      font-family: sans-serif;
      display: flex; align-items: center; gap: 4px;
    ">
      ⛷️ ${name.length > 22 ? name.slice(0, 20) + "…" : name}
    </div>
  `;
  return L.divIcon({ html, className: "", iconAnchor: [0, 10] });
}

const lats = skigebiete.gebiete.map((g) => g.lat);
const lngs = skigebiete.gebiete.map((g) => g.lng);
const bounds: [[number, number], [number, number]] = [
  [Math.min(...lats) - 0.4, Math.min(...lngs) - 0.5],
  [Math.max(...lats) + 0.4, Math.max(...lngs) + 0.5],
];

const flakes = ["❄️","❅","❆","❄️","🌨️","❅","❆","❄️","❅","❆","❄️","❅"];

export default function SkiKarte() {
  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>

      {/* Schneeflocken-Leiste */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 1100,
        pointerEvents: "none", display: "flex", justifyContent: "space-around",
        padding: "3px 0", background: "rgba(20,87,200,0.12)",
      }}>
        {flakes.map((f, i) => <span key={i} style={{ fontSize: 13, opacity: 0.5 }}>{f}</span>)}
      </div>

      {/* Header */}
      <div style={{
        position: "absolute", top: 26, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        padding: "0 16px", pointerEvents: "none",
      }}>
        {/* Logo */}
        <div style={{
          background: "linear-gradient(135deg, #0b3a8c, #1457c8)",
          color: "white", borderRadius: 16, padding: "10px 16px",
          boxShadow: "0 4px 20px rgba(20,87,200,0.45)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            background: "white", color: "#1457c8",
            fontWeight: 900, fontSize: 17, borderRadius: 8,
            padding: "3px 9px", letterSpacing: 1,
          }}>E&amp;P</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15 }}>Skigebiete</div>
            <div style={{ fontSize: 10, opacity: 0.85 }}>Skipass inklusive ✓</div>
          </div>
        </div>

        {/* Legende */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: 14, padding: "10px 14px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
          border: "1px solid #cfe6ff", fontSize: 11, fontWeight: 600,
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {[
            { land: "Österreich", farbe: "#e8443a" },
            { land: "Schweiz", farbe: "#e8443a" },
            { land: "Frankreich", farbe: "#2fae66" },
            { land: "Italien", farbe: "#1457c8" },
          ].map(({ land, farbe }) => (
            <div key={land} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: farbe }} />
              {land}
            </div>
          ))}
        </div>
      </div>

      {/* Bergige Topografie-Karte */}
      <MapContainer bounds={bounds} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
        />
        {skigebiete.gebiete.map((g) => (
          <Marker
            key={g.id}
            position={[g.lat, g.lng]}
            icon={makeIcon(g.name, g.land)}
          />
        ))}
      </MapContainer>

      {/* Slogan */}
      <div style={{
        position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        zIndex: 1000, pointerEvents: "none",
        background: "rgba(11,58,140,0.88)", color: "white",
        borderRadius: 20, padding: "6px 18px",
        fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)", whiteSpace: "nowrap",
      }}>
        ❄️ Viel Schnee für wenig Flocken · #schneesüchtig
      </div>
    </div>
  );
}
