import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const logos = [
  { id: "1", name: "Zaha Hadid Architects", src: null },
  { id: "2", name: "BIG", src: null },
  { id: "3", name: "OMA", src: null },
  { id: "4", name: "Snøhetta", src: null },
  { id: "5", name: "Herzog & de Meuron", src: null },
  { id: "6", name: "Foster + Partners", src: null },
  { id: "7", name: "Kengo Kuma", src: null },
  { id: "8", name: "Renzo Piano", src: null },
];

export default function LogosSlider() {
  return (
    <div className="relative h-56 mt-36 w-full overflow-hidden bg-white">
      <InfiniteSlider
        className="flex h-full w-full items-center"
        duration={40}
        gap={64}
      >
        {logos.map((logo) => (
          <div key={logo.id} className="flex items-center justify-center px-4">
            <span className="font-mono-label text-sm text-ink/50 whitespace-nowrap tracking-widest">
              {logo.name}
            </span>
          </div>
        ))}
      </InfiniteSlider>
      <ProgressiveBlur
        className="pointer-events-none absolute top-0 left-0 h-full w-[120px]"
        direction="left"
        blurIntensity={0.8}
      />
      <ProgressiveBlur
        className="pointer-events-none absolute top-0 right-0 h-full w-[120px]"
        direction="right"
        blurIntensity={0.8}
      />
    </div>
  );
}
