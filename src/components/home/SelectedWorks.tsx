import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/lib/gsap";
import projects from "@/data/projects.json";
import { useLang } from "@/lib/useLang";
import LazyImage from "@/components/ui-extras/LazyImage";
export default function SelectedWorks() {
  const { t, bi } = useLang();
  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);
  useLayoutEffect(() => {
    const section = sectionRef.current; const track = trackRef.current;
    if (!section || !track) return;
    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth + 80;
      gsap.to(track, {
        x: () => -distance(), ease: "none",
        scrollTrigger: {
          trigger: section, start: "top top", end: () => `+=${distance()}`,
          scrub: 0.6, pin: true, invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(featured.length, Math.max(1, Math.ceil(self.progress * featured.length)))),
        },
      });
    }, section);
    return () => ctx.revert();
  }, [featured.length]);
  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-bone">
      <div className="absolute top-8 left-6 md:left-10 z-20 font-mono-label">{t("common.selectedWorks")}</div>
      <div className="absolute top-8 right-6 md:right-10 z-20 font-mono-label tabular-nums">{String(active).padStart(2,"0")} / {String(featured.length).padStart(2,"0")}</div>
      <div className="h-full flex items-center pl-6 md:pl-10">
        <div ref={trackRef} className="flex gap-6 will-change-transform">
          {featured.map((p, i) => (
            <Link to={`/portfolio/${p.slug}`} key={p.slug} className="group relative shrink-0 w-[60vw] md:w-[42vw] h-[80vh] overflow-hidden">
              <LazyImage src={p.images[0]} alt={bi(p.title)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-bone">
                <div className="font-mono-label opacity-80 mb-2">{String(i+1).padStart(2,"0")} / {String(featured.length).padStart(2,"0")} · {p.year}</div>
                <h3 className="font-display text-3xl md:text-5xl mb-2">{bi(p.title)}</h3>
                <div className="flex items-end justify-between">
                  <div className="font-mono-label opacity-80">{bi(p.location)}</div>
                  <span className="font-mono-label clay-underline pb-0.5 text-clay">{t("common.viewProject")} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
