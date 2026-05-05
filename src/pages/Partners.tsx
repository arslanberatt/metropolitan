import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import partners from "@/data/partners.json";
import { useLang } from "@/lib/useLang";

type Partner = (typeof partners)[0];

const CATEGORY_COLORS: Record<string, string> = {
  "Structural Engineering": "bg-clay/20 text-clay",
  "MEP Engineering":        "bg-moss/20 text-moss",
  "Lighting Design":        "bg-amber-100 text-amber-700",
  "Geotechnical":           "bg-stone-200 text-stone-600",
  "Acoustics":              "bg-indigo-100 text-indigo-600",
  "Construction":           "bg-ink/10 text-ink/70",
  "Heritage Conservation":  "bg-rose-100 text-rose-600",
};

function OfficeBlock({ office }: { office: Partner["headOffice"] }) {
  return (
    <div className="space-y-3">
      <div className="font-mono-label text-ink/40 text-[10px] tracking-widest uppercase">
        {office.label}
      </div>
      <div className="font-mono-label text-ink/80 text-xs leading-relaxed space-y-0.5">
        {office.lines.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <div className="font-mono-label text-xs space-y-1 pt-1">
        {office.tel     && <div><span className="text-ink/40">tel  </span><span className="text-ink/80">{office.tel}</span></div>}
        {"fax" in office && office.fax && <div><span className="text-ink/40">fax  </span><span className="text-ink/80">{office.fax}</span></div>}
        {office.email   && <div><span className="text-ink/40">mail </span><a href={`mailto:${office.email}`} className="text-ink/80 clay-underline pb-0.5">{office.email}</a></div>}
        {"website" in office && office.website && <div><span className="text-ink/40">web  </span><a href={`https://${office.website}`} target="_blank" rel="noreferrer" className="text-ink/80 clay-underline pb-0.5">{office.website}</a></div>}
      </div>
    </div>
  );
}

function PartnerRow({ p, index, isOpen, onToggle }: {
  p: Partner; index: number; isOpen: boolean; onToggle: () => void;
}) {
  const { bi } = useLang();
  const colorClass = CATEGORY_COLORS[p.category] ?? "bg-ink/10 text-ink/60";

  return (
    <div className="hairline-b">
      <button
        onClick={onToggle}
        className="w-full text-left grid grid-cols-[3rem_1fr_auto] md:grid-cols-[3rem_1fr_auto_auto_auto] items-center gap-4 py-6 group"
      >
        {/* Index */}
        <span className="font-mono-label text-ink/30 text-xs tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Name */}
        <div>
          <div className="font-display text-2xl md:text-3xl text-ink leading-tight group-hover:text-clay transition-colors duration-300">
            {p.name}
          </div>
          {p.nameLocal !== p.name && (
            <div className="font-mono-label text-ink/40 text-xs mt-0.5">{p.nameLocal}</div>
          )}
        </div>

        {/* Category tag — hidden on mobile, shown md+ */}
        <span className={`hidden md:inline-flex items-center px-2.5 py-1 text-[10px] font-mono-label tracking-wide rounded-sm ${colorClass}`}>
          {p.category}
        </span>

        {/* Region + since */}
        <div className="hidden md:block font-mono-label text-ink/50 text-xs text-right">
          <div>{p.region}</div>
          <div className="mt-0.5">Since {p.since}</div>
        </div>

        {/* Arrow */}
        <span
          className="font-mono-label text-ink/40 text-lg leading-none transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </button>

      {/* Expanded detail */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pt-2">
              {/* Specialty + mobile meta */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className={`inline-flex items-center px-2.5 py-1 text-[10px] font-mono-label tracking-wide rounded-sm ${colorClass}`}>
                  {p.category}
                </span>
                <span className="font-mono-label text-ink/60 text-xs">{bi(p.specialty)}</span>
                <span className="font-mono-label text-ink/40 text-xs ml-auto">Partner since {p.since}</span>
              </div>

              {/* Offices grid */}
              <div className={`grid gap-10 ${p.branchOffice ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-xs"}`}>
                <OfficeBlock office={p.headOffice} />
                {p.branchOffice && <OfficeBlock office={p.branchOffice} />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const REGIONS = ["All", "Turkey", "Europe", "Gulf", "Global"] as const;

export default function Partners() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const [region, setRegion] = useState<string>("All");

  const filtered = region === "All" ? partners : partners.filter((p) => p.region === region);

  return (
    <div className="bg-bone min-h-screen">

      {/* Header */}
      <section className="pt-40 pb-16 px-6 md:px-10 max-w-screen-2xl mx-auto">
        <div className="font-mono-label text-ink/50 mb-6">— {t("nav.partners")}</div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-ink">
            {t("partners.title")}
          </h1>
          <p className="text-ink/60 max-w-sm font-mono-label text-xs leading-relaxed md:text-right">
            {t("partners.intro")}
          </p>
        </div>
      </section>

      {/* Region filter */}
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto pb-6 flex flex-wrap gap-2">
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => { setRegion(r); setOpen(null); }}
            className={`font-mono-label text-xs px-3 py-1.5 rounded-full hairline transition-colors duration-200 ${
              region === r ? "bg-ink text-bone border-ink" : "text-ink/60 hover:text-ink"
            }`}
          >
            {r}
          </button>
        ))}
        <span className="ml-auto font-mono-label text-ink/30 text-xs self-center">
          {filtered.length} {filtered.length === 1 ? "firm" : "firms"}
        </span>
      </div>

      {/* Partner list */}
      <section className="px-6 md:px-10 max-w-screen-2xl mx-auto pb-24">
        {/* Column headers — desktop */}
        <div className="hidden md:grid grid-cols-[3rem_1fr_auto_auto_auto] gap-4 pb-3 hairline-b">
          {["#", "Firm", "Discipline", "Region", ""].map((h) => (
            <span key={h} className="font-mono-label text-ink/30 text-[10px] tracking-widest uppercase">{h}</span>
          ))}
        </div>

        <AnimatePresence mode="sync">
          {filtered.map((p, i) => (
            <motion.div
              key={p.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <PartnerRow
                p={p}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Disciplines legend */}
      <section className="px-6 md:px-10 py-16 hairline-t max-w-screen-2xl mx-auto">
        <div className="font-mono-label text-ink/40 text-[10px] tracking-widest uppercase mb-6">Disciplines</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CATEGORY_COLORS).map(([cat, cls]) => (
            <span key={cat} className={`inline-flex items-center px-2.5 py-1 text-[10px] font-mono-label tracking-wide rounded-sm ${cls}`}>
              {cat}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
