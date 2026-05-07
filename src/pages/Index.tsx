import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import ReverseColumns from "@/components/home/ReverseColumns";
import SelectedWorks from "@/components/home/SelectedWorks";
import ImageWall from "@/components/home/ImageWall";
import Philosophy from "@/components/home/Philosophy";
import StickyTestimonials from "@/components/home/StickyTestimonials";
import RecognitionMarquee from "@/components/home/RecognitionMarquee";
import CTA from "@/components/home/CTA";

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
      <Pillars />
      <ReverseColumns />
      <SelectedWorks />
      <ImageWall />
      <Philosophy />
      <StickyTestimonials />
      <RecognitionMarquee />
      <CTA />
    </div>
  );
}
