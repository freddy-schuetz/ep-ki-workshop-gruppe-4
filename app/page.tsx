"use client";

import dynamic from "next/dynamic";

const SkiKarte = dynamic(() => import("./SkiKarte"), { ssr: false });

export default function Home() {
  return (
    <main style={{ height: "100vh", width: "100vw" }}>
      <SkiKarte />
    </main>
  );
}
