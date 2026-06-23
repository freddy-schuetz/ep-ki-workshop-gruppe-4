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

// Karte passt sich automatisch an alle Gebiete an
const lats = skigebiete.gebiete.map((g) => g.lat);
const lngs = skigebiete.gebiete.map((g) => g.lng);
const bounds: [[number, number], [number, number]] = [
  [Math.min(...lats) - 0.5, Math.min(...lngs) - 0.5],
  [Math.max(...lats) + 0.5, Math.max(...lngs) + 0.5],
];

export default function SkiKarte() {
  return (
    <div style={{ height: "100vh", width: "100vw", background: "#0b1f3a" }}>
      {/* Kopfzeile im E&P-Stil */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "linear-gradient(135deg, #0b3a8c 0%, #1457c8 100%)",
          color: "white",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>❄️</span>
          <div>
            <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: 1 }}>
              E&amp;P Skigebiete
            </div>
            <div style={{ fontSize: 12, opacity: 0.8, marginTop: 1 }}>
              Skipass inklusive · #schneesüchtig
            </div>
          </div>
        </div>
        <div style={{ fontSize: 13, opacity: 0.8, textAlign: "right" }}>
          {skigebiete.gebiete.length} Gebiete · Alpen
        </div>
      </div>

      {/* Karte */}
      <MapContainer
        bounds={bounds}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {skigebiete.gebiete.map((g) => (
          <Marker key={g.id} position={[g.lat, g.lng]} icon={icon}>
            <Popup>
              <strong>{g.name}</strong>
              <br />
              {g.land}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
