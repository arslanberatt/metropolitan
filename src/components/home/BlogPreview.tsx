import { Link } from "react-router-dom";
import { posts } from "@/data/posts";
import { useLang } from "@/lib/useLang";

export default function BlogPreview() {
  const { lang } = useLang();
  const bi = (en: string, tr: string) => (lang === "tr" ? tr : en);
  const preview = posts.slice(0, 3);

  return (
    <section className="px-6 md:px-10 py-36 bg-white ">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="font-mono-label text-ink/40 mb-2">— {bi("Journal", "Dergi")}</p>
          <h2 className="text-3xl md:text-4xl font-display font-light tracking-tight text-ink leading-none">
            {bi("Notes on craft\nand place.", "Zanaat ve yer\nüzerine notlar.")}
          </h2>
        </div>
        <Link to="/blog" className="hidden md:inline-block font-mono-label text-ink/50 hover:text-ink clay-underline pb-0.5 transition-colors">
          {bi("All essays", "Tüm makaleler")} →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
        {preview.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
            <div className="overflow-hidden aspect-[3/2] mb-5">
              <img
                src={post.cover}
                alt={bi(post.title, post.titleTr)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <p className="font-mono-label text-ink/40 mb-2">
              {bi(post.category, post.categoryTr)} · {post.date}
            </p>
            <h3 className="text-lg font-display font-light tracking-tight text-ink leading-snug mb-3 group-hover:text-clay transition-colors duration-300">
              {bi(post.title, post.titleTr)}
            </h3>
            <p className="text-ink/55 font-body text-sm leading-relaxed line-clamp-2">
              {bi(post.excerpt, post.excerptTr)}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 md:hidden">
        <Link to="/blog" className="font-mono-label text-ink/50 hover:text-ink clay-underline pb-0.5">
          {bi("All essays", "Tüm makaleler")} →
        </Link>
      </div>
    </section>
  );
}
