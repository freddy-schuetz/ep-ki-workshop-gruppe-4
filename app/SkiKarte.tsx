"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import skigebiete from "@/data/skigebiete.json";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const lats = skigebiete.gebiete.map((g) => g.lat);
const lngs = skigebiete.gebiete.map((g) => g.lng);
const bounds: [[number, number], [number, number]] = [
  [Math.min(...lats) - 0.5, Math.min(...lngs) - 0.5],
  [Math.max(...lats) + 0.5, Math.max(...lngs) + 0.5],
];

const flakes = ["❄️","🌨️","❄️","❅","❆","❄️","🌨️","❅","❆","❄️","❅","❆"];

export default function SkiKarte() {
  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>

      {/* Schneeflocken-Deko oben */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 1100,
        pointerEvents: "none", display: "flex", justifyContent: "space-around",
        padding: "4px 0", background: "rgba(11,58,140,0.07)",
      }}>
        {flakes.map((f, i) => (
          <span key={i} style={{ fontSize: 14, opacity: 0.5 }}>{f}</span>
        ))}
      </div>

      {/* Header */}
      <div style={{
        position: "absolute", top: 28, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px",
        pointerEvents: "none",
      }}>
        {/* Logo-Card */}
        <div style={{
          background: "linear-gradient(135deg, #0b3a8c 0%, #1457c8 100%)",
          color: "white",
          borderRadius: 16,
          padding: "10px 18px",
          boxShadow: "0 4px 20px rgba(20,87,200,0.4)",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            background: "white", color: "#1457c8",
            fontWeight: 900, fontSize: 18, borderRadius: 8,
            padding: "4px 10px", letterSpacing: 1,
          }}>
            E&amp;P
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16 }}>Skigebiete</div>
            <div style={{ fontSize: 11, opacity: 0.85 }}>Skipass inklusive ✓</div>
          </div>
        </div>

        {/* Rechte Info-Badge */}
        <div style={{
          background: "rgba(255,255,255,0.92)",
          color: "#0b1f3a",
          borderRadius: 12,
          padding: "8px 14px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          fontSize: 13, fontWeight: 600,
          border: "1px solid #cfe6ff",
          textAlign: "center",
        }}>
          ⛷️ {skigebiete.gebiete.length} Gebiete<br />
          <span style={{ fontWeight: 400, fontSize: 11, color: "#1457c8" }}>in 4 Ländern</span>
        </div>
      </div>

      {/* Karte mit hellem Winter-Stil */}
      <MapContainer bounds={bounds} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {skigebiete.gebiete.map((g) => (
          <Marker key={g.id} position={[g.lat, g.lng]} icon={icon}>
            <Popup>
              <strong style={{ color: "#1457c8" }}>{g.name}</strong><br />
              {g.land}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Slogan unten */}
      <div style={{
        position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        zIndex: 1000, pointerEvents: "none",
        background: "rgba(11,58,140,0.85)",
        color: "white", borderRadius: 20, padding: "6px 18px",
        fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}>
        ❄️ Viel Schnee für wenig Flocken · #schneesüchtig
      </div>
    </div>
  );
}
