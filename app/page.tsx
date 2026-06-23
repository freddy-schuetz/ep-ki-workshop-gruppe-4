// Diese Startseite seht ihr, wenn die Vorschau läuft.
// Sie ist nur euer Ausgangspunkt — gleich baut ihr sie zu eurem Konzept um.
// Sagt einfach Claude Code, welche Gruppe ihr seid und welches Konzept ihr wollt.

const KONZEPTE = [
  {
    emoji: "🏔️",
    titel: "Pisten-Postkarte",
    text: "Bild wählen → schicke Postkarte mit sanftem Zoom, Schnee und eurem Gruß. Zum Teilen & Herunterladen.",
  },
  {
    emoji: "🗺️",
    titel: "Reise zur Piste",
    text: "Scroll-Story: von der Weltkarte hinab bis ins E&P-Skigebiet. Animierte Stationen mit KI-Texten & -Bildern.",
  },
  {
    emoji: "📍",
    titel: "Skigebiet-Karte",
    text: "Interaktive Karte der echten E&P-Gebiete. Klick auf einen Ort → Info-Karte mit Bild und Fakten.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-10 p-8">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">
          E&amp;P KI-Werkstatt ❄️
        </p>
        <h1 className="mt-2 text-4xl font-black text-night sm:text-5xl">
          Baut euer eigenes Winter-Erlebnis
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-night/70">
          Ihr beschreibt auf Deutsch, was ihr wollt — die KI baut es.
          Euer Coach (Claude Code) nimmt euch an die Hand. Los geht&apos;s:
          <br />
          <span className="mt-2 inline-block rounded-lg bg-ice px-3 py-1 font-medium text-brand-dark">
            Sagt im Chat: &bdquo;Wir sind Gruppe&nbsp;X und wollen loslegen.&ldquo;
          </span>
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-3">
        {KONZEPTE.map((k) => (
          <div
            key={k.titel}
            className="rounded-2xl border border-ice bg-white p-6 shadow-sm"
          >
            <div className="text-4xl">{k.emoji}</div>
            <h2 className="mt-3 text-xl font-bold text-night">{k.titel}</h2>
            <p className="mt-2 text-sm text-night/70">{k.text}</p>
          </div>
        ))}
      </section>

      <footer className="text-center text-sm text-night/50">
        Viel Schnee für wenig Flocken · #schneesüchtig
      </footer>
    </main>
  );
}
