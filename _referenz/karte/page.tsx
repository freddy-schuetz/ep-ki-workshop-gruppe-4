// REFERENZLÖSUNG – Konzept 3: Interaktive E&P-Skigebiet-Karte
// Spickzettel für den Coach. NICHT 1:1 ausgeben.
// Wichtig: Leaflet braucht den Browser → erst nach dem Mounten rendern (mounted-Flag).
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import skigebiete from "@/data/skigebiete.json";

export default function KarteRef() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative h-screen w-full">
      {/* Schnee-Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[500] overflow-hidden">
        <style>{`@keyframes fall { to { transform: translateY(110vh) } }`}</style>
        {Array.from({ length: 20 }).map((_, k) => (
          <span
            key={k}
            className="absolute -top-6 text-white"
            style={{ left: `${(k * 47) % 100}%`, animation: `fall ${7 + (k % 5)}s linear ${k * 0.4}s infinite` }}
          >
            ❄
          </span>
        ))}
      </div>

      <div className="absolute left-1/2 top-4 z-[600] -translate-x-1/2 rounded-full bg-brand px-5 py-2 font-bold text-white shadow-lg">
        ❄️ E&amp;P-Skigebiete
      </div>

      {mounted && (
        <MapContainer center={[46.8, 10.5]} zoom={6} className="h-full w-full">
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {skigebiete.gebiete.map((g) => (
            <CircleMarker
              key={g.id}
              center={[g.lat, g.lng]}
              radius={9}
              pathOptions={{ color: "#0b3a8c", fillColor: "#1457c8", fillOpacity: 0.9 }}
            >
              <Popup>
                <strong>{g.name}</strong>
                <br />
                {g.region} ({g.land})
                <br />
                {g.pistenKm} Pistenkm · bis {g.hoeheMeter} m
                <br />
                <em>{g.highlight}</em>
                {g.skipassInklusive && (
                  <>
                    <br />
                    <span style={{ color: "#2fae66", fontWeight: 600 }}>Skipass inklusive ✓</span>
                  </>
                )}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      )}
    </main>
  );
}
