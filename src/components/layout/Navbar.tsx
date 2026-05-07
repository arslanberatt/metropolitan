import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLang } from "@/lib/useLang";

const LINKS = (t: (k: string) => string) =>
  [
    ["/", t("nav.home")],
    ["/portfolio", t("nav.portfolio")],
    ["/blog", t("nav.blog")],
    ["/services", t("nav.services")],
    ["/partners", t("nav.partners")],
    ["/contact", t("nav.contact")],
  ] as [string, string][];

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [solid, setSolid] = useState(!isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { yPercent: 0 });

    let lastShown = true;
    const show = () => { if (lastShown) return; lastShown = true; gsap.to(nav, { yPercent: 0, duration: 0.3, ease: "power2.out" }); };
    const hide = () => { if (!lastShown) return; lastShown = false; gsap.to(nav, { yPercent: -100, duration: 0.4, ease: "power2.inOut" }); };
    const trig = ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => {
        if (location.pathname !== "/") { setSolid(true); return; }
        if (self.scroll() < 80) { show(); setSolid(false); return; }
        setSolid(true);
        if (self.direction === 1 && self.scroll() > 200) hide();
        else if (self.direction === -1) show();
      },
    });
    return () => { trig.kill(); };
  }, [location.pathname]);

  useEffect(() => {
    setSolid(location.pathname !== "/" || window.scrollY > 80);
  }, [location.pathname]);
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const links = LINKS(t);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,color,backdrop-filter] duration-[400ms] ${
          solid || menuOpen
            ? "bg-bone text-ink border-b border-ink/10"
            : "bg-transparent text-ink"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-16">
          <Link to="/" aria-label="Metropolitan" className="relative z-10 rounded p-1 bg-black/10">
            <img src="/nav-logo.png" alt="Metropolitan" className="h-9 w-auto object-contain" />
          </Link>

          <ul className="hidden md:flex items-center gap-8 font-mono-label">
            {links.map(([to, label]) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => `clay-underline pb-1 ${isActive ? "active" : ""}`}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 font-mono-label">
              <button onClick={() => setLang("en")} className={`px-2 py-1 transition-opacity ${lang === "en" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}>EN</button>
              <span className="opacity-40">/</span>
              <button onClick={() => setLang("tr")} className={`px-2 py-1 transition-opacity ${lang === "tr" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}>TR</button>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden relative z-10 flex flex-col justify-center items-end w-8 h-8 gap-[5px]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Kapat" : "Menü"}
            >
              <span className={`block h-px bg-current transition-all duration-300 origin-right ${menuOpen ? "w-6 rotate-[-45deg] translate-y-[3px]" : "w-6"}`} />
              <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`} />
              <span className={`block h-px bg-current transition-all duration-300 origin-right ${menuOpen ? "w-6 rotate-[45deg] -translate-y-[3px]" : "w-5"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay — pure CSS, no framer-motion */}
      <div
        className="fixed inset-0 z-40 bg-ash flex flex-col px-6 pt-20 pb-10 md:hidden"
        style={{
          clipPath: menuOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
          transition: "clip-path 0.55s cubic-bezier(0.65,0,0.35,1)",
          pointerEvents: menuOpen ? "all" : "none",
        }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--bone)) 0.5px, transparent 0.5px), linear-gradient(90deg, hsl(var(--bone)) 0.5px, transparent 0.5px)",
            backgroundSize: "33.33% 25%",
          }}
        />

        <nav className="flex-1 flex flex-col justify-center gap-1">
          {links.map(([to, label], i) => (
            <div
              key={to}
              className="hairline-b border-bone/10 py-5 overflow-hidden"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.5s cubic-bezier(0.65,0,0.35,1) ${0.18 + i * 0.07}s, transform 0.5s cubic-bezier(0.65,0,0.35,1) ${0.18 + i * 0.07}s`,
              }}
            >
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `font-display text-[13vw] leading-none text-bone block transition-opacity ${isActive ? "opacity-100" : "opacity-50 active:opacity-100"}`
                }
              >
                {label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div
          className="flex items-center gap-3 font-mono-label text-bone/40"
          style={{
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 0.4s ease 0.55s",
          }}
        >
          <button onClick={() => setLang("en")} className={`transition-opacity ${lang === "en" ? "opacity-100 text-bone" : ""}`}>EN</button>
          <span>/</span>
          <button onClick={() => setLang("tr")} className={`transition-opacity ${lang === "tr" ? "opacity-100 text-bone" : ""}`}>TR</button>
        </div>
      </div>
    </>
  );
}
