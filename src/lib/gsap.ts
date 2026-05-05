import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, Flip, ScrollToPlugin);
export { gsap, ScrollTrigger, Flip, ScrollToPlugin };
