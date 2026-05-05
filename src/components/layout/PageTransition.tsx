import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";

type Phase = "enter" | "exit" | "idle";

export default function PageTransition() {
  const location = useLocation();
  const [phase, setPhase] = useState<Phase>("enter");
  const [animData, setAnimData] = useState<object | null>(null);
  const lottieRef = useRef<any>(null);
  const prevPath = useRef(location.pathname);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/Iterative%20Design.json")
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setAnimData(d); })
      .catch(() => null);
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const isFirstRun = prevPath.current === location.pathname;
    if (!isFirstRun) prevPath.current = location.pathname;

    timers.current.forEach(clearTimeout);
    timers.current = [];

    setPhase("enter");
    timers.current.push(setTimeout(() => setPhase("exit"), 1000));
    timers.current.push(setTimeout(() => setPhase("idle"), 1600));

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [location.pathname]);

  const visible = phase !== "idle";

  return (
    <div
      aria-hidden={!visible}
      className="fixed inset-0 z-[200] bg-ash flex items-center justify-center"
      style={{
        opacity: phase === "enter" ? 1 : 0,
        transition: phase === "exit" ? "opacity 0.6s ease" : "none",
        pointerEvents: phase === "enter" ? "all" : "none",
        visibility: visible ? "visible" : "hidden",
      }}
    >
      {animData && visible ? (
        <div
          key={location.pathname}
          style={{ animation: "ptZoom 0.55s cubic-bezier(0.65,0,0.35,1) forwards" }}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={animData}
            loop
            autoplay
            onDOMLoaded={() => lottieRef.current?.setSpeed(5)}
            style={{ width: 220, height: 220 }}
          />
          <style>{`@keyframes ptZoom{from{opacity:0;transform:scale(1.1)}to{opacity:1;transform:scale(1)}}`}</style>
        </div>
      ) : visible ? (
        <span className="font-mono-label text-bone/40 tracking-widest text-xs">ATRIA</span>
      ) : null}
    </div>
  );
}
