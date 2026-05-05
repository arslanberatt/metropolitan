import { useParams, Link, Navigate } from "react-router-dom";
import projects from "@/data/projects.json";
import { useLang } from "@/lib/useLang";
import LazyImage from "@/components/ui-extras/LazyImage";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t, bi } = useLang();
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx < 0) return <Navigate to="/portfolio" replace />;
  const p = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <div className="bg-bone">
      <section className="relative h-screen overflow-hidden">
        <LazyImage src={p.images[0]} alt={bi(p.title)} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />
        <div className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10 text-bone">
          <div className="font-mono-label opacity-80 mb-3">{p.category} · {p.year}</div>
          <h1 className="font-display text-[12vw] md:text-[8vw] leading-[0.95]">{bi(p.title)}</h1>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-10 py-24">
        <div className="md:col-span-2 max-w-[65ch] text-ink/85 text-lg leading-relaxed">{bi(p.description)}</div>
        <aside className="md:sticky md:top-24 self-start hairline p-6 font-mono-label space-y-3">
          <div><div className="opacity-60">{t("project.client")}</div><div className="text-ink mt-1">{p.client}</div></div>
          <div><div className="opacity-60">{t("project.year")}</div><div className="text-ink mt-1">{p.year}</div></div>
          <div><div className="opacity-60">{t("project.location")}</div><div className="text-ink mt-1">{bi(p.location)}</div></div>
          <div><div className="opacity-60">{t("project.area")}</div><div className="text-ink mt-1">{p.area}</div></div>
          <div><div className="opacity-60">{t("project.photographer")}</div><div className="text-ink mt-1">{p.photographer}</div></div>
        </aside>
      </section>

      <section className="px-6 md:px-10 pb-20 grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[40vh]">
        {p.images.slice(1).map((src, i) => (
          <div key={i} className={i % 3 === 0 ? "md:col-span-12 md:row-span-2" : i % 3 === 1 ? "md:col-span-7" : "md:col-span-5"}>
            <LazyImage src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </section>

      <section className="px-6 md:px-10 py-16 hairline-t grid grid-cols-2 gap-6 font-mono-label">
        <Link to={`/portfolio/${prev.slug}`} className="group"><div className="opacity-60 mb-2">← {t("project.prev")}</div><div className="font-display text-2xl md:text-3xl text-ink clay-underline inline-block">{bi(prev.title)}</div></Link>
        <Link to={`/portfolio/${next.slug}`} className="group text-right"><div className="opacity-60 mb-2">{t("project.next")} →</div><div className="font-display text-2xl md:text-3xl text-ink clay-underline inline-block">{bi(next.title)}</div></Link>
      </section>
    </div>
  );
}
