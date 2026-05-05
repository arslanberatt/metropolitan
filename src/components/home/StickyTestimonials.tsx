import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import testimonials from "@/data/testimonials.json";
import { useLang } from "@/lib/useLang";
import LazyImage from "@/components/ui-extras/LazyImage";

export default function StickyTestimonials() {
  const { bi } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const slides = section.querySelectorAll<HTMLElement>(".tm-slide");

    const ctx = gsap.context(() => {
      slides.forEach((slide, i) => {
        const start = i / testimonials.length;
        const end   = (i + 1) / testimonials.length;

        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: `${start * 100}% top`,
            end:   `${end   * 100}% top`,
            scrub: true,
          },
        })
          .fromTo(slide, { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", duration: 0.2 })
          .to(slide,                        { autoAlpha: 0, ease: "none", duration: 0.2 }, 0.8);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bone hairline-t"
      style={{ height: "300vh" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">

        {/* sticky image panel — desktop */}
        <div className="hidden md:block sticky top-0 h-screen overflow-hidden">
          {testimonials.map((tm, i) => (
            <div
              key={i}
              className="tm-slide absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <LazyImage src={tm.image} alt={tm.author} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* text cards */}
        <div>
          {testimonials.map((tm, i) => (
            <div key={i} className="relative h-screen flex items-center px-6 md:px-16 py-20">
              {/* mobile: bg image per card */}
              <div
                className="absolute inset-0 md:hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${tm.image})` }}
              >
                <div className="absolute inset-0 bg-ash/65" />
              </div>
              <div className="relative max-w-xl">
                <div className="font-mono-label text-bone/50 md:text-ink/60 mb-6">
                  0{i + 1} / 0{testimonials.length}
                </div>
                <p className="font-display-italic text-3xl md:text-4xl text-bone md:text-ink leading-tight mb-8 font-black">
                  &ldquo;{bi(tm.quote)}&rdquo;
                </p>
                <div className="font-mono-label text-bone md:text-ink">
                  {tm.author} <span className="opacity-60">— {bi(tm.role)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
