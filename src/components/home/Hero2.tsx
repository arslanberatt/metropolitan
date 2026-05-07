import { HeroParallax } from "@/components/ui/hero-parallax";

const products = [
  { title: "Kadıköy House",        link: "/portfolio/kadikoy-house",        thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&q=65&auto=format" },
  { title: "Brera Atelier",        link: "/portfolio/brera-atelier",        thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=65&auto=format" },
  { title: "Bebek Pavilion",       link: "/portfolio/bebek-pavilion",       thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=65&auto=format" },
  { title: "Como Villa",           link: "/portfolio/como-villa",           thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=65&auto=format" },
  { title: "Arnavutköy Warehouse", link: "/portfolio/arnavutkoy-warehouse", thumbnail: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=500&q=65&auto=format" },
  { title: "Cihangir Apartment",   link: "/portfolio/cihangir-apartment",   thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=65&auto=format" },
  { title: "Sarıyer Pavilion",     link: "/portfolio/sariyer-pavilion",     thumbnail: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=65&auto=format" },
  { title: "Beyoğlu Bookshop",     link: "/portfolio/beyoglu-bookshop",     thumbnail: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&q=65&auto=format" },
  { title: "Maggiore Boathouse",   link: "/portfolio/maggiore-boathouse",   thumbnail: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=500&q=65&auto=format" },
  { title: "Milano Loft",          link: "/portfolio/milano-loft",          thumbnail: "https://images.unsplash.com/photo-1600566753051-6057c1f31d4d?w=500&q=65&auto=format" },
  { title: "Kadıköy School",       link: "/portfolio/kadikoy-school",       thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=65&auto=format" },
  { title: "Bosphorus Bath",       link: "/portfolio/bosphorus-bath",       thumbnail: "https://images.unsplash.com/photo-1564540583246-934409427776?w=500&q=65&auto=format" },
  { title: "Kadıköy House",        link: "/portfolio/kadikoy-house",        thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=500&q=65&auto=format" },
  { title: "Brera Atelier",        link: "/portfolio/brera-atelier",        thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=65&auto=format" },
  { title: "Como Villa",           link: "/portfolio/como-villa",           thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=65&auto=format" },
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
