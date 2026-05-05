import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/data/locales/en.json";
import tr from "@/data/locales/tr.json";

const STORAGE_KEY = "metropolitan-lang";
function detectLang(): "en" | "tr" {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "tr") return stored;
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("tr") ? "tr" : "en";
}
i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, tr: { translation: tr } },
  lng: detectLang(), fallbackLng: "en", interpolation: { escapeValue: false },
});
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, lng);
  if (typeof document !== "undefined") document.documentElement.lang = lng;
});
if (typeof document !== "undefined") document.documentElement.lang = i18n.language;
export default i18n;
export type Lang = "en" | "tr";
export function bi<T = string>(field: { en: T; tr: T } | T, lang: string): T {
  if (field && typeof field === "object" && ("en" in (field as object) || "tr" in (field as object))) {
    const obj = field as { en: T; tr: T };
    return (lang === "tr" ? obj.tr : obj.en) ?? obj.en;
  }
  return field as T;
}
