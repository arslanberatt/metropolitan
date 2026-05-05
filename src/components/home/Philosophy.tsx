import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/lib/useLang";

export default function Philosophy() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const items = t("philosophy.items", { returnObjects: true }) as string[];
  const sentences = (t("philosophy.body") as string)
    .split(". ")
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : s + "."));

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.from(".phil-sentence", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bone py-32 px-6 md:px-10 hairline-t">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 max-w-screen-2xl mx-auto">
        <div className="md:col-span-3">
          <div className="font-mono-label text-ink/60 mb-8">{t("common.section")} — 07</div>
          <div className="font-display-italic text-3xl md:text-5xl leading-[1.6] max-w-[18ch] text-ink">
            {sentences.map((s, i) => (
              <span key={i} className="phil-sentence block mb-4">{s}</span>
            ))}
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="md:sticky md:top-32 space-y-6">
            {items.map((item, i) => (
              <div key={i} className="hairline-b pb-4">
                <div className="font-mono-label text-ink/50 mb-2">0{i + 1} /</div>
                <div className="font-display text-2xl md:text-3xl text-ink relative inline-block clay-underline active">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
