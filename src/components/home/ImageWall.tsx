import LazyImage from "@/components/ui-extras/LazyImage";
const ROWS = [
  ["/1.webp", "/2.webp", "/logo.png", "/3.webp", "/4.webp", "/5.webp"],
  ["/6.webp", "/7.webp", "/1.webp", "/2.webp","/logo.png", "/3.webp"],
  ["/4.webp", "/5.webp", "/6.webp", "/7.webp", "/logo.png", "/1.webp"],
];
function Row({ srcs, reverse }: { srcs: string[]; reverse?: boolean }) {
  const items = [...srcs, ...srcs];
  return (
    <div className="overflow-hidden h-[28vh]">
      <div className={`flex gap-3 h-full w-max ${reverse ? "marquee-track-reverse" : "marquee-track"}`}>
        {items.map((s, i) => (<div key={i} className="h-full aspect-[4/3] overflow-hidden"><LazyImage src={s} alt="" className="w-full h-full object-cover" /></div>))}
      </div>
    </div>
  );
}
export default function ImageWall() {
  return (
    <section className="bg-bone py-10 flex flex-col gap-3">
      <Row srcs={ROWS[0]} /><Row srcs={ROWS[1]} reverse /><Row srcs={ROWS[2]} />
    </section>
  );
}
