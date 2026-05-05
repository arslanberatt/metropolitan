import { useEffect, useRef } from "react";
import { getLenis } from "@/lib/lenis";

export function useScrollPause(pauseMs = 260) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cooldown = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !cooldown) {
          cooldown = true;
          const lenis = getLenis();
          if (lenis) {
            lenis.stop();
            setTimeout(() => lenis.start(), pauseMs);
          }
          setTimeout(() => { cooldown = false; }, 1800);
        }
      },
      { threshold: 0.12, rootMargin: "-8% 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pauseMs]);
  return ref as React.RefObject<any>;
}
