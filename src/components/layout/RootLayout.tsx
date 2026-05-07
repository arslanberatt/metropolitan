import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Footer7 } from "@/components/ui/footer-7";
import ScrollProgress from "./ScrollProgress";
import PageTransition from "./PageTransition";
import { initLenis, getLenis } from "@/lib/lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    initLenis();
  }, []);

  useLayoutEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [location.pathname]);

  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer7 />
      <PageTransition />
    </>
  );
}
