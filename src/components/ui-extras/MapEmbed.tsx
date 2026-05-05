import { useEffect, useRef } from "react";

const LAT = 41.0313;
const LNG = 28.9763;

export default function MapEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || el.dataset.init) return;
    el.dataset.init = "1";

    let map: any;

    async function init() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      map = L.map(el!, {
        center: [LAT, LNG],
        zoom: 14,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        attributionControl: false,
      });

      /* CARTO Dark Matter — free, no API key */
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      /* custom clay marker */
      const icon = L.divIcon({
        className: "",
        html: `<span style="
          display:block;width:14px;height:14px;
          border-radius:50%;
          background:#c4956a;
          box-shadow:0 0 0 4px rgba(196,149,106,.25),0 0 0 8px rgba(196,149,106,.1);
        "></span>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      L.marker([LAT, LNG], { icon }).addTo(map);
    }

    init();
    return () => { map?.remove(); };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
