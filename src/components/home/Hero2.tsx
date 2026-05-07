import { HeroParallax } from "@/components/ui/hero-parallax";

const products = [
  { title: "Kadıköy House",        link: "/portfolio/kadikoy-house",        thumbnail: "/hero/1.webp" },
  { title: "Brera Atelier",        link: "/portfolio/brera-atelier",        thumbnail: "/hero/2.webp" },
  { title: "Bebek Pavilion",       link: "/portfolio/bebek-pavilion",       thumbnail: "/hero/3.webp" },
  { title: "Como Villa",           link: "/portfolio/como-villa",           thumbnail: "/hero/4.webp" },
  { title: "Arnavutköy Warehouse", link: "/portfolio/arnavutkoy-warehouse", thumbnail: "/hero/5.webp" },
  { title: "Cihangir Apartment",   link: "/portfolio/cihangir-apartment",   thumbnail: "/hero/6.webp" },
  { title: "Sarıyer Pavilion",     link: "/portfolio/sariyer-pavilion",     thumbnail: "/hero/7.webp" },
  { title: "Beyoğlu Bookshop",     link: "/portfolio/beyoglu-bookshop",     thumbnail: "/hero/1.webp" },
  { title: "Maggiore Boathouse",   link: "/portfolio/maggiore-boathouse",   thumbnail: "/hero/2.webp" },
  { title: "Milano Loft",          link: "/portfolio/milano-loft",          thumbnail: "/hero/3.webp" },
  { title: "Kadıköy School",       link: "/portfolio/kadikoy-school",       thumbnail: "/hero/4.webp" },
  { title: "Bosphorus Bath",       link: "/portfolio/bosphorus-bath",       thumbnail: "/hero/5.webp" },
  { title: "Kadıköy House",        link: "/portfolio/kadikoy-house",        thumbnail: "/hero/6.webp" },
  { title: "Brera Atelier",        link: "/portfolio/brera-atelier",        thumbnail: "/hero/7.webp" },
  { title: "Como Villa",           link: "/portfolio/como-villa",           thumbnail: "/hero/1.webp" },
];

export default function Hero2() {
  return (
    <div className="bg-white">
      <HeroParallax products={products} />
      <style>{`
        .hero2-focus { justify-content: center !important; }
        @media (min-width: 768px) { .hero2-focus { justify-content: flex-start !important; } }
        .hero2-focus .focus-word {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.1rem, 3.5vw, 2.2rem);
          font-weight: 600;
          color: rgba(0,0,0,0.65);
          letter-spacing: 0.01em;
          text-transform: none;
        }
      `}</style>
    </div>
  );
}
