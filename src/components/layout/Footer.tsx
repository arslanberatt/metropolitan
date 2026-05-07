import studio from "@/data/studio.json";
import { useLang } from "@/lib/useLang";
import MapEmbed from "@/components/ui-extras/MapEmbed";

export default function Footer() {
  const { t, bi } = useLang();
  return (
    <footer className="bg-ash text-bone">

      {/* Map — Istanbul */}
      <div className="relative h-[52vh] overflow-hidden hairline-t border-bone/10" style={{ zIndex: 0, isolation: "isolate" }}>
        <MapEmbed />

        {/* Addresses overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-end">
          <div className="flex flex-col md:flex-row gap-4 m-6 md:m-10">
            {studio.addresses.map((a) => (
              <a
                key={a.city}
                href={a.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto bg-ash/85 backdrop-blur-sm px-5 py-4 hairline border-bone/20 hover:border-clay/60 transition-colors"
              >
                <div className="font-mono-label text-clay text-xs mb-1">{a.city}</div>
                <div className="font-mono-label text-bone/70 text-xs leading-relaxed">
                  {a.lines[0]}<br />{a.lines[1]}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Credits bar */}
      <div
        className="px-6 md:px-10 py-6 font-mono-label text-bone/50"
        style={{ borderTop: "0.5px solid hsl(var(--bone) / 0.1)" }}
      >
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="/hero-logo.png" alt="Metropolitan Architects" className="h-8 opacity-60" />
            <span>© {new Date().getFullYear()} Metropolitan Architects · {t("footer.rights")}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {studio.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="text-bone/50 hover:text-bone transition-colors clay-underline pb-0.5"
              >
                {s.label}
              </a>
            ))}
            <span className="opacity-50">{bi(studio.hours)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
