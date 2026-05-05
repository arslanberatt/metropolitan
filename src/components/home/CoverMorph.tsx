import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function CoverMorph() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      }).to(card, { width: "100%", height: "100vh", borderRadius: 0, ease: "none" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen relative bg-bone overflow-hidden">
      <div className="h-full flex items-center justify-center">
        <div
          ref={cardRef}
          className="relative overflow-hidden mx-auto"
          style={{ width: "70%", height: "70vh", borderRadius: "24px" }}
        >
          <img src="/3.png" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
