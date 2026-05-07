import { HeroParallax } from "@/components/ui/hero-parallax";

const products = [
  { title: "Kadıköy House",        link: "/portfolio/kadikoy-house",        thumbnail: "/1.webp" },
  { title: "Brera Atelier",        link: "/portfolio/brera-atelier",        thumbnail: "/2.webp" },
  { title: "Bebek Pavilion",       link: "/portfolio/bebek-pavilion",       thumbnail: "/3.webp" },
  { title: "Como Villa",           link: "/portfolio/como-villa",           thumbnail: "/4.webp" },
  { title: "Arnavutköy Warehouse", link: "/portfolio/arnavutkoy-warehouse", thumbnail: "/5.webp" },
  { title: "Cihangir Apartment",   link: "/portfolio/cihangir-apartment",   thumbnail: "/6.webp" },
  { title: "Sarıyer Pavilion",     link: "/portfolio/sariyer-pavilion",     thumbnail: "/7.webp" },
  { title: "Beyoğlu Bookshop",     link: "/portfolio/beyoglu-bookshop",     thumbnail: "/1.webp" },
  { title: "Maggiore Boathouse",   link: "/portfolio/maggiore-boathouse",   thumbnail: "/2.webp" },
  { title: "Milano Loft",          link: "/portfolio/milano-loft",          thumbnail: "/3.webp" },
  { title: "Kadıköy School",       link: "/portfolio/kadikoy-school",       thumbnail: "/4.webp" },
  { title: "Bosphorus Bath",       link: "/portfolio/bosphorus-bath",       thumbnail: "/5.webp" },
  { title: "Kadıköy House",        link: "/portfolio/kadikoy-house",        thumbnail: "/6.webp" },
  { title: "Brera Atelier",        link: "/portfolio/brera-atelier",        thumbnail: "/7.webp" },
  { title: "Como Villa",           link: "/portfolio/como-villa",           thumbnail: "/1.webp" },
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
