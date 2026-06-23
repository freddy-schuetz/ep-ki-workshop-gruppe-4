import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E&P KI-Werkstatt ❄️",
  description:
    "Baue dein eigenes Winter-Web-Erlebnis – mit KI, auf Deutsch. Viel Schnee für wenig Flocken.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-snow text-night antialiased">
        {children}
      </body>
    </html>
  );
}
