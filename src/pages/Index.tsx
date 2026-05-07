import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import Hero from "@/components/home/Hero";
import Hero2 from "@/components/home/Hero2";
import Pillars from "@/components/home/Pillars";
import ReverseColumns from "@/components/home/ReverseColumns";
import SelectedWorks from "@/components/home/SelectedWorks";
import ImageWall from "@/components/home/ImageWall";
import Philosophy from "@/components/home/Philosophy";
import StickyTestimonials from "@/components/home/StickyTestimonials";
import RecognitionMarquee from "@/components/home/RecognitionMarquee";
import CTA from "@/components/home/CTA";
import LogosSlider from "@/components/home/LogosSlider";
import BlogPreview from "@/components/home/BlogPreview";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import WorldMap from "@/components/ui/world-map";

export default function Index() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    return () => {
      if (!root) return;
      ScrollTrigger.getAll()
        .filter((st) => {
          const el = st.trigger as Element | null;
          return el ? root.contains(el) : false;
        })
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* <Hero /> */}
      <Hero2 />
      {/* <Pillars /> */}
      {/* <ReverseColumns /> */}
      <LogosSlider />
      <BlogPreview />
      <SelectedWorks />

      {/* FAQ Accordion */}
      <section className="px-6 md:px-10 py-24 max-w-screen-2xl mx-auto">
        <div className="font-mono-label text-ink/40 text-[10px] tracking-widest uppercase mb-10">— FAQ</div>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              q: "Hangi proje türleriyle çalışıyorsunuz?",
              a: "Konut, karma kullanımlı, kültürel ve kurumsal projeler başta olmak üzere her ölçekte mimari tasarım ve proje yönetimi hizmetleri sunuyoruz.",
            },
            {
              q: "Uluslararası projeler alıyor musunuz?",
              a: "Evet. İstanbul merkezli ofisimizin yanı sıra Körfez ve Avrupa'daki ortaklarımızla birlikte uluslararası projeler yürütmekteyiz.",
            },
            {
              q: "Tasarım süreciniz nasıl işliyor?",
              a: "Keşif ve brifing ile başlar; kavramsal tasarım, şematik geliştirme, uygulama projeleri ve şantiye yönetimi aşamalarıyla devam eder. Her aşamada müvekkil ile yakın iletişim önceliğimizdir.",
            },
            {
              q: "Proje süresi ne kadardır?",
              a: "Projenin ölçeği ve karmaşıklığına göre değişir. Küçük ölçekli konut projeleri 6–12 ay, büyük kurumsal projeler 2–4 yıl sürebilir.",
            },
            {
              q: "Nasıl iletişime geçebilirim?",
              a: "İletişim sayfamızdaki formu doldurabilir ya da doğrudan e-posta ile bize ulaşabilirsiniz. Ön görüşmeler ücretsizdir.",
            },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-ink/10">
              <AccordionTrigger className="font-display text-xl md:text-2xl text-ink py-6 hover:text-clay transition-colors hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="font-mono-label text-ink/60 text-sm leading-relaxed pb-6">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* World Map */}
      <section className="px-6 md:px-10 pb-24 max-w-screen-2xl mx-auto">
        <div className="font-mono-label text-ink/40 text-[10px] tracking-widest uppercase mb-6">— Global Reach</div>
        <WorldMap
          lineColor="#b5a090"
          dots={[
            { start: { lat: 41.0082, lng: 28.9784 }, end: { lat: 51.5074, lng: -0.1278 } },
            { start: { lat: 41.0082, lng: 28.9784 }, end: { lat: 25.2048, lng: 55.2708 } },
            { start: { lat: 41.0082, lng: 28.9784 }, end: { lat: 48.8566, lng: 2.3522 } },
            { start: { lat: 41.0082, lng: 28.9784 }, end: { lat: 52.5200, lng: 13.4050 } },
            { start: { lat: 25.2048, lng: 55.2708 }, end: { lat: 24.4539, lng: 54.3773 } },
            { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 40.4168, lng: -3.7038 } },
          ]}
        />
      </section>

      <RecognitionMarquee />
    </div>
  );
}
