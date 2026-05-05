import { useLang } from "@/lib/useLang";
import LazyImage from "@/components/ui-extras/LazyImage";
const IMAGES = [
  "/1.png", "/2.png", "/3.png", "/4.png",
  "/5.png", "/6.png", "/7.png", "/1.png",
];
function Marquee({ reverse, offset = 0 }: { reverse?: boolean; offset?: number }) {
  const pool = [...IMAGES.slice(offset), ...IMAGES.slice(0, offset)];
  const items = [...pool, ...pool];
  return (
    <div className="marquee-pause overflow-hidden h-[60vh]">
      <div className={`flex gap-4 h-full w-max ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
        {items.map((src, i) => (<div key={i} className="h-full aspect-[3/4] overflow-hidden"><LazyImage src={src} alt="" className="h-full w-full object-cover" /></div>))}
      </div>
    </div>
  );
}
export default function Pillars() {
  const { t } = useLang();
  const pillars = [
    { title: t("pillars.title1"), body: t("pillars.body1"), reverse: false, offset: 0 },
    { title: t("pillars.title2"), body: t("pillars.body2"), reverse: true, offset: 3 },
    { title: t("pillars.title3"), body: t("pillars.body3"), reverse: false, offset: 5 },
  ];
  return (
    <section className="bg-bone">
      {pillars.map((p, idx) => (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center hairline-t py-20 md:py-28 px-6 md:px-10">
          <div className="md:col-span-2 max-w-md">
            <div className="font-mono-label text-ink/60 mb-6">0{idx + 1} / 03</div>
            <h3 className="font-display text-6xl md:text-7xl mb-6 text-ink">{p.title}</h3>
            <p className="text-ink/80 max-w-sm mb-6">{p.body}</p>
            <a href="/portfolio" className="font-mono-label clay-underline pb-1 inline-block">{t("common.learnMore")} →</a>
          </div>
          <div className="md:col-span-3"><Marquee reverse={p.reverse} offset={p.offset} /></div>
        </div>
      ))}
    </section>
  );
}
