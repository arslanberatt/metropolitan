import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function IntroReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img     = imgRef.current;
    if (!section || !img) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end:   "+=250%",
          scrub: 1.5,
          pin:   true,
        },
      })
        .to(img, { scale: 6, ease: "none" });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-ash"
    >
      <div
        ref={imgRef}
        className="absolute inset-0"
        style={{
          backgroundImage:    "url('/hero.png')",
          backgroundSize:     "cover",
          backgroundPosition: "center",
          transformOrigin:    "50% 50%",
        }}
      />
    </section>
  );
}
