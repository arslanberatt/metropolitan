import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/lib/useLang";

export default function Hero() {
  const { t }      = useLang();

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const shadeRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const arrowRef   = useRef<HTMLDivElement>(null);


  /* GSAP */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg      = bgRef.current;
    const shade   = shadeRef.current;
    const text    = textRef.current;
    if (!section || !bg || !shade || !text) return;

    const ctx = gsap.context(() => {
      /* entrance */
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(bg,   { scale: 1.08, duration: 1.6, delay: 0.1 })
        .from(text, { y: 24, opacity: 0, duration: 1 }, "-=1");

      /* scroll — bg zooms in, shade darkens, text slides up */
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end:   "bottom top",
          scrub: true,
        },
      })
        .to(bg,    { scale: 1.18, ease: "none" }, 0)
        .to(shade, { opacity: 0.75, ease: "none" }, 0)
        .to(text,  { y: -80, opacity: 0, ease: "none" }, 0);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* background image */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img
          src="/hero.png"
          alt="Metropolitan"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* scroll shade */}
      <div
        ref={shadeRef}
        className="absolute inset-0 bg-ash pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* static top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ash/50 via-transparent to-ash/60 pointer-events-none" />


      {/* centre text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6"
      >
        <p className="font-mono-label text-bone/50 tracking-[0.3em] text-xs uppercase mb-5">
          {t("hero.label")}
        </p>
        <h1
          className="font-display leading-[0.9] tracking-[-0.02em] font-black"
          style={{
            fontSize: "clamp(3rem, 9vw, 11rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.75)",
          }}
        >
          Metropolitan
        </h1>
        <p
          className="font-display font-black mt-4"
          style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.6rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.5)",
            letterSpacing: "0.04em",
          }}
        >
          {t("hero.tagline")}
        </p>
      </div>

      {/* bouncy arrow */}
      <div
        ref={arrowRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ animation: "heroArrow 2.4s infinite cubic-bezier(0.175,0.885,0.32,1.275)" }}
      >
        <svg height="22" width="44" viewBox="0 0 50 28">
          <polygon points="0,0 25,12 50,0 25,28" fill="rgba(255,255,255,0.4)" />
        </svg>
      </div>

      <style>{`
        @keyframes heroArrow {
          0%,36%,100% { transform: translate(-50%,0); }
          11%          { transform: translate(-50%,-18px) scaleX(0.85); }
          20%          { transform: translate(-50%,0) scaleY(0.85); }
          28%          { transform: translate(-50%,-7px); }
        }
      `}</style>
    </section>
  );
}
