import awards from "@/data/awards.json";
export default function RecognitionMarquee() {
  const items = [...awards, ...awards];
  return (
    <section className="bg-ash text-bone py-10 overflow-hidden marquee-pause">
      <div className="flex gap-10 w-max marquee-track font-display text-3xl md:text-5xl whitespace-nowrap">
        {items.map((a, i) => (<span key={i} className="flex items-center gap-10"><span>{a}</span><span className="text-clay text-2xl">◆</span></span>))}
      </div>
    </section>
  );
}
