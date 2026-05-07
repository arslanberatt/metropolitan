import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
let lenisInstance: Lenis | null = null;
export function initLenis(): Lenis | null {
  if (lenisInstance) return lenisInstance;
  if (typeof window === "undefined") return null;
  if (window.matchMedia("(hover: none)").matches) return null;
  const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenisInstance = lenis;
  return lenis;
}
export function getLenis(): Lenis | null { return lenisInstance; }
