import { Link } from "react-router-dom";
import { useLang } from "@/lib/useLang";
import studio from "@/data/studio.json";
import Footer from "@/components/layout/Footer";
import RevealWords from "@/components/ui-extras/RevealWords";
export default function CTA() {
  const { t } = useLang();
  return (
    <section className="bg-ash text-bone">
      <div className="min-h-screen flex flex-col justify-between px-6 md:px-10 py-20">
        <h2 className="font-display text-[12vw] md:text-[10vw] leading-[0.95] max-w-[18ch]">
          <RevealWords text={t("cta.headline")} stagger={0.06} />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-end">
          <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-bone text-ink font-mono-label hover:bg-clay transition-colors w-fit">{t("cta.button")} →</Link>
          {studio.addresses.map((a) => (
            <div key={a.city} className="font-mono-label opacity-80">
              <div className="text-clay mb-2">{a.city}</div>
              {a.lines.map((l) => <div key={l}>{l}</div>)}
              <div className="mt-2">{a.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
