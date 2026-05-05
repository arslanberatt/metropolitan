import LazyImage from "@/components/ui-extras/LazyImage";
const ROWS = [
  ["/1.png", "/2.png", "/logo.png", "/3.png", "/4.png", "/5.png"],
  ["/6.png", "/7.png", "/1.png", "/2.png","/logo.png", "/3.png"],
  ["/4.png", "/5.png", "/6.png", "/7.png", "/logo.png", "/1.png"],
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
