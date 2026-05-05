import { useTranslation } from "react-i18next";
import { bi, type Lang } from "./i18n";
export function useLang() {
  const { i18n, t } = useTranslation();
  const lang = (i18n.language?.startsWith("tr") ? "tr" : "en") as Lang;
  return {
    lang, t,
    bi: <T,>(f: { en: T; tr: T } | T) => bi<T>(f as { en: T; tr: T }, lang),
    setLang: (l: Lang) => i18n.changeLanguage(l),
  };
}
