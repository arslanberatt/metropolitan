import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/lib/useLang";
import LazyImage from "@/components/ui-extras/LazyImage";

const COL = [
  ["/1.png", "/2.png", "/3.png", "/4.png"],
  ["/5.png", "/6.png", "/7.png", "/1.png"],
  ["/2.png", "/3.png", "/4.png", "/5.png"],
];

function Column({ srcs, speed }: { srcs: string[]; speed: number }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap  = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const ctx = gsap.context(() => {
      gsap.to(inner, {
        yPercent: speed * -40,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top bottom",
          end:   "bottom top",
          scrub: true,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={wrapRef} className="overflow-hidden h-full">
      <div ref={innerRef} className="flex flex-col gap-4">
        {[...srcs, ...srcs].map((s, i) => (
          <div key={i} className="aspect-[3/4] overflow-hidden">
            <LazyImage src={s} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReverseColumns() {
  const { t } = useLang();
  return (
    <section className="relative bg-bone py-20 px-6 md:px-10 overflow-hidden">
      <div className="grid grid-cols-3 gap-4 h-[120vh] relative">
        <Column srcs={COL[0]} speed={1.0} />
        <Column srcs={COL[1]} speed={-1.0} />
        <Column srcs={COL[2]} speed={0.6} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-bone/85 backdrop-blur-sm px-8 py-10 hairline max-w-2xl text-center">
            <p className="font-display text-3xl md:text-5xl text-ink leading-tight">{t("stats")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
