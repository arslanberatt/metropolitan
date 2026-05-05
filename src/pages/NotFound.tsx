import { Link } from "react-router-dom";
import { useLang } from "@/lib/useLang";
export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bone text-center px-6">
      <h1 className="font-display text-[30vw] md:text-[18vw] leading-none text-ink">{t("notfound.title")}</h1>
      <p className="font-display-italic text-2xl md:text-4xl text-ink/80 mt-6">{t("notfound.body")}</p>
      <Link to="/" className="mt-10 font-mono-label clay-underline pb-1">{t("notfound.home")} →</Link>
    </div>
  );
}
