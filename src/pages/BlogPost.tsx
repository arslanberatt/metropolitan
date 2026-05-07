import { useParams, Link } from "react-router-dom";
import { posts } from "@/data/posts";
import { useLang } from "@/lib/useLang";

export default function BlogPost() {
  const { slug } = useParams();
  const { lang } = useLang();
  const bi = (en: string, tr: string) => (lang === "tr" ? tr : en);

  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <p className="font-mono-label text-ink/40">Post not found.</p>
      </div>
    );
  }

  const idx = posts.indexOf(post);
  const next = posts[idx + 1] ?? posts[0];

  const body = bi(post.body, post.bodyTr);
  const paragraphs = body.split("\n\n");

  return (
    <div className="min-h-screen bg-white pt-24 pb-32">
      {/* Header */}
      <div className="px-6 md:px-10 max-w-3xl mb-10">
        <Link to="/blog" className="font-mono-label text-ink/40 hover:text-ink transition-colors clay-underline pb-0.5 mb-8 inline-block">
          ← {bi("Journal", "Dergi")}
        </Link>
        <p className="font-mono-label text-ink/40 mb-4">
          {bi(post.category, post.categoryTr)} · {post.date} · {post.readTime} min read
        </p>
        <h1 className="text-3xl md:text-5xl font-display font-light tracking-tight text-ink leading-tight">
          {bi(post.title, post.titleTr)}
        </h1>
      </div>

      {/* Cover */}
      <div className="px-6 md:px-10 mb-14">
        <div className="w-full aspect-[16/7] overflow-hidden">
          <img src={post.cover} alt={bi(post.title, post.titleTr)} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Body */}
      <div className="px-6 md:px-10 max-w-2xl">
        <p className="text-base md:text-lg text-ink/70 font-body leading-relaxed mb-8 border-l-2 border-clay pl-5 italic">
          {bi(post.excerpt, post.excerptTr)}
        </p>

        <div className="space-y-6 font-body text-ink/80 leading-relaxed text-[15px]">
          {paragraphs.map((para, i) => {
            if (para.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl font-display font-light tracking-tight text-ink pt-4">
                  {para.replace("## ", "")}
                </h2>
              );
            }
            if (para.startsWith("**") && para.endsWith("**")) {
              return (
                <p key={i} className="font-semibold text-ink">
                  {para.replace(/\*\*/g, "")}
                </p>
              );
            }
            return <p key={i}>{para}</p>;
          })}
        </div>
      </div>

      {/* Next post */}
      <div className="px-6 md:px-10 mt-24 hairline-t pt-12">
        <p className="font-mono-label text-ink/40 mb-4">{bi("Next essay", "Sonraki makale")}</p>
        <Link to={`/blog/${next.slug}`} className="group flex gap-8 items-center">
          <div className="w-28 h-20 overflow-hidden shrink-0">
            <img src={next.cover} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
          </div>
          <div>
            <p className="font-mono-label text-ink/40 mb-1">{bi(next.category, next.categoryTr)}</p>
            <h3 className="font-display font-light text-lg text-ink group-hover:text-clay transition-colors">
              {bi(next.title, next.titleTr)}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
