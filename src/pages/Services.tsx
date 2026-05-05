import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/lib/gsap";
import services from "@/data/services.json";
import { useLang } from "@/lib/useLang";
import LazyImage from "@/components/ui-extras/LazyImage";

export default function Services() {
  const { t, bi } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const steps = t("services.steps", { returnObjects: true }) as string[];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.to({}, {
        scrollTrigger: {
          trigger: section, start: "top top", end: () => `+=${services.length * 100}%`,
          pin: true, scrub: 0.4,
          onUpdate: (self) => setActive(Math.min(services.length - 1, Math.floor(self.progress * services.length))),
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-bone">
      <section className="pt-40 pb-12 px-6 md:px-10">
        <div className="font-mono-label text-ink/60 mb-6">— {t("services.title")}</div>
        <h1 className="font-display text-[14vw] md:text-[11vw] leading-[0.95] text-ink mb-6">{t("services.title")}</h1>
        <p className="font-mono-label text-ink/70">{t("services.intro")}</p>
      </section>

      {/* ── desktop: sticky scroll ── */}
      <section ref={sectionRef} className="h-screen relative overflow-hidden hidden md:block">
        <div className="grid grid-cols-5 h-full">
          <div className="col-span-2 px-10 flex flex-col justify-center gap-6">
            {services.map((s, i) => (
              <div key={i} className="transition-opacity duration-500" style={{ opacity: active === i ? 1 : 0.25 }}>
                <div className="font-mono-label text-ink/60 mb-1">{s.number}</div>
                <h3 className="font-display text-6xl text-ink leading-none">{bi(s.title)}</h3>
                {active === i && (
                  <div className="mt-4 max-w-md">
                    <p className="text-ink/80 mb-4">{bi(s.description)}</p>
                    <ul className="font-mono-label text-ink/70 space-y-1 mb-4">
                      {(bi(s.deliverables) as string[]).map((d, j) => <li key={j}>· {d}</li>)}
                    </ul>
                    <Link to="/contact" className="font-mono-label clay-underline pb-1 inline-block text-ink">{t("common.discuss")} →</Link>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="col-span-3 relative h-full">
            {services.map((s, i) => (
              <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: active === i ? 1 : 0 }}>
                <LazyImage src={s.image} alt={bi(s.title)} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
              {services.map((_, i) => (<span key={i} className={`block w-1.5 h-1.5 rounded-full ${active === i ? "bg-ink" : "bg-ink/30"}`} />))}
            </div>
          </div>
        </div>
      </section>

      {/* ── mobile: card list ── */}
      <section className="md:hidden px-6 pb-16 flex flex-col gap-10">
        {services.map((s, i) => (
          <div key={i} className="hairline-t pt-8">
            <div className="w-full aspect-[4/3] overflow-hidden rounded-sm mb-6">
              <LazyImage src={s.image} alt={bi(s.title)} className="w-full h-full object-cover" />
            </div>
            <div className="font-mono-label text-ink/60 mb-1">{s.number}</div>
            <h3 className="font-display text-4xl text-ink leading-none mb-4">{bi(s.title)}</h3>
            <p className="text-ink/80 mb-4">{bi(s.description)}</p>
            <ul className="font-mono-label text-ink/70 space-y-1 mb-4">
              {(bi(s.deliverables) as string[]).map((d, j) => <li key={j}>· {d}</li>)}
            </ul>
            <Link to="/contact" className="font-mono-label clay-underline pb-1 inline-block text-ink">{t("common.discuss")} →</Link>
          </div>
        ))}
      </section>

      <section className="px-6 md:px-10 py-32 hairline-t">
        <div className="font-mono-label text-ink/60 mb-8">— {t("services.process")}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="hairline-t pt-6">
              <div className="font-mono-label text-ink/50 mb-3">0{i + 1}</div>
              <div className="font-display text-3xl md:text-4xl text-ink">{s}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
