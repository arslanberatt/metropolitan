import { Link } from "react-router-dom";
import { posts } from "@/data/posts";
import { useLang } from "@/lib/useLang";

export default function Blog() {
  const { lang } = useLang();
  const bi = (en: string, tr: string) => (lang === "tr" ? tr : en);

  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-white pt-24 pb-32">
      <div className="px-6 md:px-10 mb-16">
        <p className="font-mono-label text-ink/50 mb-3">— {bi("Journal", "Dergi")}</p>
        <h1 className="text-4xl md:text-6xl font-display font-light tracking-tight text-ink leading-none">
          {bi("Notes on architecture,\ncraft, and place.", "Mimarlık, zanaat\nve yer üzerine notlar.")}
        </h1>
      </div>

      {/* Featured */}
      <div className="px-6 md:px-10 mb-16">
        <Link to={`/blog/${featured.slug}`} className="group block">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end">
            <div className="overflow-hidden aspect-[4/3]">
              <img
                src={featured.cover}
                alt={bi(featured.title, featured.titleTr)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="pb-2">
              <p className="font-mono-label text-ink/40 mb-4">
                {bi(featured.category, featured.categoryTr)} · {featured.date} · {featured.readTime} min
              </p>
              <h2 className="text-2xl md:text-4xl font-display font-light tracking-tight text-ink leading-tight mb-5 group-hover:text-clay transition-colors duration-300">
                {bi(featured.title, featured.titleTr)}
              </h2>
              <p className="text-ink/60 font-body text-sm leading-relaxed mb-6 max-w-md">
                {bi(featured.excerpt, featured.excerptTr)}
              </p>
              <span className="font-mono-label text-ink clay-underline pb-0.5">
                {bi("Read essay", "Makaleyi oku")} →
              </span>
            </div>
          </div>
        </Link>
      </div>

      <div className="px-6 md:px-10 hairline-t pt-16">
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-14">
          {rest.map((post) => (
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
              <p className="text-ink/55 font-body text-sm leading-relaxed line-clamp-3">
                {bi(post.excerpt, post.excerptTr)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
