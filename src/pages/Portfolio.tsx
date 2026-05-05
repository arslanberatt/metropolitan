import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import projects from "@/data/projects.json";
import { useLang } from "@/lib/useLang";
import LazyImage from "@/components/ui-extras/LazyImage";

const SPANS = ["md:col-span-7 md:row-span-2","md:col-span-5","md:col-span-5","md:col-span-6","md:col-span-6","md:col-span-4","md:col-span-4","md:col-span-4","md:col-span-8 md:row-span-2","md:col-span-4","md:col-span-6","md:col-span-6"];

export default function Portfolio() {
  const { t, bi } = useLang();
  const filters = t("portfolio.filters", { returnObjects: true }) as string[];
  const cats = ["All","Residential","Cultural","Commercial","Adaptive Reuse","Landscape"];
  const [active, setActive] = useState(0);
  const filtered = useMemo(() => active === 0 ? projects : projects.filter((p) => p.category === cats[active]), [active]);

  return (
    <div className="bg-bone">
      <section className="pt-40 pb-16 px-6 md:px-10">
        <div className="font-mono-label text-ink/60 mb-6">— {t("portfolio.title")}</div>
        <h1 className="font-display text-[15vw] md:text-[12vw] leading-[0.95] text-ink mb-8">{t("portfolio.title")}</h1>
        <p className="max-w-xl text-ink/70 text-lg">{t("portfolio.intro")}</p>
      </section>

      <div className="px-6 md:px-10 hairline-t hairline-b py-6 sticky top-16 bg-bone z-30">
        <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono-label">
          {filters.map((f, i) => (
            <button key={i} onClick={() => setActive(i)} className={`pb-1 clay-underline ${active === i ? "active text-ink" : "text-ink/60"}`}>{f}</button>
          ))}
        </div>
      </div>

      <style>{`@keyframes portfolioFade{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <section className="px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[28vh] gap-4">
          {filtered.map((p, i) => (
            <div
              key={p.slug}
              className={`relative overflow-hidden group ${SPANS[i % SPANS.length]}`}
              style={{ animation: `portfolioFade 0.7s cubic-bezier(0.65,0,0.35,1) ${(i % 6) * 0.05}s both` }}
            >
              <Link to={`/portfolio/${p.slug}`} className="block w-full h-full">
                <LazyImage src={p.images[0]} alt={bi(p.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-bone translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="font-mono-label opacity-90 mb-1">{p.category} · {p.year}</div>
                  <div className="font-display text-2xl md:text-3xl">{bi(p.title)}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
