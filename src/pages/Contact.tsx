import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/useLang";
import studio from "@/data/studio.json";

type FormData = { name: string; email: string; type: string; message: string; budget?: number };

export default function Contact() {
  const { t } = useLang();
  const types = t("contact.form.types", { returnObjects: true }) as string[];
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [sent, setSent] = useState(false);
  const onSubmit = async () => { await new Promise((r) => setTimeout(r, 600)); setSent(true); };

  return (
    <div className="bg-bone">
      <section className="pt-40 pb-20 px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <div className="font-mono-label text-ink/60 mb-6">— {t("nav.contact")}</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-ink mb-8">{t("contact.title")}</h1>
          <p className="text-ink/75 max-w-md mb-12">{t("contact.intro")}</p>
          <div className="space-y-8 font-mono-label">
            {studio.addresses.map((a) => (
              <div key={a.city}>
                <div className="text-clay mb-2">{a.city}</div>
                {a.lines.map((l) => <div key={l} className="text-ink/80">{l}</div>)}
                <div className="text-ink/80 mt-1">{a.phone}</div>
                <a href={a.mapUrl} target="_blank" rel="noreferrer" className="clay-underline pb-0.5 inline-block mt-2">{t("common.openMaps")} →</a>
              </div>
            ))}
            <div><a href={`mailto:${studio.email}`} className="clay-underline pb-0.5">{studio.email}</a></div>
          </div>
        </div>

        <div>
          <AnimatePresence mode="sync">
            {!sent ? (
              <motion.form key="form" onSubmit={handleSubmit(onSubmit)} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="space-y-8">
                {[
                  { name: "name", label: t("contact.form.name"), type: "text", required: true },
                  { name: "email", label: t("contact.form.email"), type: "email", required: true },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="font-mono-label text-ink/60 block mb-2">{f.label}</label>
                    <input type={f.type} {...register(f.name as keyof FormData, { required: f.required })} className="w-full bg-transparent border-b border-ink/30 focus:border-ink py-2 outline-none text-ink" />
                    {errors[f.name as keyof FormData] && <span className="font-mono-label text-destructive">required</span>}
                  </div>
                ))}
                <div>
                  <label className="font-mono-label text-ink/60 block mb-2">{t("contact.form.type")}</label>
                  <select {...register("type", { required: true })} className="w-full bg-transparent border-b border-ink/30 focus:border-ink py-2 outline-none text-ink">
                    <option value="">—</option>
                    {types.map((tp) => <option key={tp} value={tp}>{tp}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-mono-label text-ink/60 block mb-2">{t("contact.form.message")}</label>
                  <textarea rows={5} {...register("message", { required: true })} className="w-full bg-transparent border-b border-ink/30 focus:border-ink py-2 outline-none text-ink resize-none" />
                </div>
                <div>
                  <label className="font-mono-label text-ink/60 block mb-2">{t("contact.form.budget")}</label>
                  <input type="range" min="50" max="5000" step="50" {...register("budget")} className="w-full accent-ink" />
                </div>
                <button type="submit" disabled={isSubmitting} className="px-8 py-3 rounded-full bg-ink text-bone font-mono-label hover:bg-moss transition-colors">
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.submit")}
                </button>
              </motion.form>
            ) : (
              <motion.div key="thanks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl md:text-4xl text-ink leading-tight">
                {t("contact.form.thanks")}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 hairline-t">
        <svg viewBox="0 0 1000 300" className="w-full max-w-3xl mx-auto" stroke="currentColor" fill="none">
          <path d="M150 150 Q 200 100 280 130 T 380 160 L 350 200 L 280 220 L 200 200 Z" className="text-ink/30" strokeWidth="1.5" />
          <path d="M620 130 Q 680 100 740 110 L 770 150 L 750 190 L 680 200 L 620 170 Z" className="text-ink/30" strokeWidth="1.5" />
          <path d="M280 160 Q 450 60 700 150" className="text-clay" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="280" cy="160" r="6" fill="hsl(var(--clay))" />
          <circle cx="700" cy="150" r="6" fill="hsl(var(--clay))" />
          <text x="280" y="245" textAnchor="middle" className="fill-ink font-mono text-[12px]">ISTANBUL</text>
          <text x="700" y="245" textAnchor="middle" className="fill-ink font-mono text-[12px]">MILANO</text>
        </svg>
      </section>
    </div>
  );
}
