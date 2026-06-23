"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import skigebiete from "@/data/skigebiete.json";

const landFarbe: Record<string, string> = {
  "Österreich": "#e8443a",
  "Schweiz": "#e8443a",
  "Schweiz / Frankreich": "#f59e0b",
  "Frankreich": "#2fae66",
  "Italien": "#1457c8",
};

const flakes = ["❄️","❅","❆","❄️","🌨️","❅","❆","❄️","❅","❆","❄️","❅"];

export default function SkiKarte() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: {
        version: 8,
        sources: {
          "osm": {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap",
          },
          "terrain": {
            type: "raster-dem",
            url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
        sky: {
          "sky-color": "#cfe6ff",
          "sky-horizon-blend": 0.5,
          "horizon-color": "#f4f9ff",
          "horizon-fog-blend": 0.5,
          "fog-color": "#d8eaff",
          "fog-ground-blend": 0.5,
        },
      },
      center: [10.5, 46.5],
      zoom: 6,
      pitch: 55,
      bearing: -15,
    });

    map.on("load", () => {
      // 3D-Terrain aktivieren
      map.setTerrain({ source: "terrain", exaggeration: 2.5 });

      // Schnee-Overlay: weißes Layer über hohe Regionen
      map.addSource("hillshade-source", {
        type: "raster-dem",
        url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
        tileSize: 256,
      });
      map.addLayer({
        id: "hillshade",
        type: "hillshade",
        source: "hillshade-source",
        paint: {
          "hillshade-shadow-color": "#aac8e8",
          "hillshade-highlight-color": "#ffffff",
          "hillshade-accent-color": "#b0cce8",
          "hillshade-illumination-direction": 315,
          "hillshade-exaggeration": 0.6,
        },
      });

      // Marker für jedes Skigebiet
      skigebiete.gebiete.forEach((g) => {
        const farbe = landFarbe[g.land] ?? "#1457c8";
        const el = document.createElement("div");
        el.innerHTML = `
          <div style="
            background: ${farbe};
            color: white;
            border: 2px solid white;
            border-radius: 20px;
            padding: 4px 10px;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            font-family: sans-serif;
            cursor: pointer;
          ">⛷️ ${g.name.length > 22 ? g.name.slice(0, 20) + "…" : g.name}</div>
        `;

        new maplibregl.Marker({ element: el })
          .setLngLat([g.lng, g.lat])
          .setPopup(
            new maplibregl.Popup({ offset: 25 }).setHTML(`
              <div style="font-family:sans-serif; min-width:160px">
                <div style="font-weight:800;color:${farbe};font-size:14px">${g.name}</div>
                <div style="color:#666;font-size:12px;margin-top:2px">${g.land}</div>
                <div style="margin-top:6px;font-size:12px">
                  🎿 <b>${g.pistenKm} km</b> Pisten<br>
                  ⛰️ bis <b>${g.hoeheMeter} m</b><br>
                  ✨ ${g.highlight}
                </div>
              </div>
            `)
          )
          .addTo(map);
      });

      // Karte auf alle Gebiete zoomen
      const lngs = skigebiete.gebiete.map((g) => g.lng);
      const lats = skigebiete.gebiete.map((g) => g.lat);
      map.fitBounds(
        [[Math.min(...lngs) - 0.3, Math.min(...lats) - 0.3],
         [Math.max(...lngs) + 0.3, Math.max(...lats) + 0.3]],
        { padding: 80, pitch: 55, bearing: -15 }
      );
    });

    return () => map.remove();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative", overflow: "hidden" }}>

      {/* Schneeflocken */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 1100,
        pointerEvents: "none", display: "flex", justifyContent: "space-around",
        padding: "3px 0", background: "rgba(20,87,200,0.1)",
      }}>
        {flakes.map((f, i) => <span key={i} style={{ fontSize: 13, opacity: 0.5 }}>{f}</span>)}
      </div>

      {/* Header */}
      <div style={{
        position: "absolute", top: 26, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        padding: "0 16px", pointerEvents: "none",
      }}>
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

        <div style={{
          background: "rgba(255,255,255,0.95)", borderRadius: 14, padding: "10px 14px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.14)", border: "1px solid #cfe6ff",
          fontSize: 11, fontWeight: 600, display: "flex", flexDirection: "column", gap: 4,
        }}>
          {[
            { land: "Österreich / Schweiz", farbe: "#e8443a" },
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

      {/* Karte */}
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />

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
