import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/lib/useLang";
import ShapeGrid from "@/components/ShapeGrid/ShapeGrid";

// ── ShapeGrid ayarları ──────────────────────────────────────────
const GRID_SPEED        = 0.5;
const GRID_SQUARE_SIZE  = 40;
const GRID_DIRECTION    = "diagonal";   // up | down | left | right | diagonal
const GRID_BORDER_COLOR = "#e5e5e5";
const GRID_HOVER_COLOR  = "#d1d5db";
const GRID_SHAPE        = "square";     // square | hexagon | circle | triangle
const GRID_TRAIL        = 5;
// ────────────────────────────────────────────────────────────────

export default function Hero() {
  const { t }      = useLang();

  const sectionRef = useRef<HTMLElement>(null);
  const shadeRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const arrowRef   = useRef<HTMLDivElement>(null);


  /* GSAP */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const shade   = shadeRef.current;
    const text    = textRef.current;
    if (!section || !shade || !text) return;

    const ctx = gsap.context(() => {
      /* entrance */
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .from(text, { y: 24, opacity: 0, duration: 1, delay: 0.2 });

      /* scroll — shade brightens, text slides up */
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end:   "bottom top",
          scrub: true,
        },
      })
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
      {/* ShapeGrid arka plan */}
      <div className="absolute inset-0 bg-white">
        <ShapeGrid
          speed={GRID_SPEED}
          squareSize={GRID_SQUARE_SIZE}
          direction={GRID_DIRECTION}
          borderColor={GRID_BORDER_COLOR}
          hoverFillColor={GRID_HOVER_COLOR}
          shape={GRID_SHAPE}
          hoverTrailAmount={GRID_TRAIL}
        />
      </div>

      {/* scroll shade */}
      <div
        ref={shadeRef}
        className="absolute inset-0 bg-white pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* static top gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/60 pointer-events-none" />


      {/* centre text */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6"
      >
        <p className="font-mono-label tracking-[0.3em] text-xs uppercase mb-5" style={{ color: "rgba(0,0,0,0.4)" }}>
          {t("hero.label")}
        </p>
        <h1
          className="font-display leading-[0.9] tracking-[-0.02em] font-black"
          style={{
            fontSize: "clamp(3rem, 9vw, 11rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(0,0,0,0.75)",
          }}
        >
          Metropolitan
        </h1>
        <p
          className="font-display font-black mt-4"
          style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.6rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,0,0,0.45)",
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
          <polygon points="0,0 25,12 50,0 25,28" fill="rgba(0,0,0,0.25)" />
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
