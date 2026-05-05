import { useEffect, useRef, useState } from "react";
type Props = React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };
export default function LazyImage({ src, alt, className = "", ...rest }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setInView(true)), { rootMargin: "300px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <img ref={ref} src={inView ? src : undefined} alt={alt} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} className={`blur-up ${loaded ? "loaded" : ""} ${className}`} {...rest} />;
}
