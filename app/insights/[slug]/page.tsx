import { getPostBySlug, getAllPosts } from "@/lib/content";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>
      {/* Hero */}
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner max-w-3xl mx-auto">
          <Link
            href="/insights"
            className="label-mono mb-6 inline-flex items-center gap-2 hover:text-white transition-colors"
            style={{ color: "var(--accent)" }}
            data-cursor="BACK"
          >
            ← Back to Insights
          </Link>

          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
            style={{
              background: post.category === "case-study" ? "rgba(223,255,0,0.1)" : "rgba(255,255,255,0.05)",
              color: post.category === "case-study" ? "var(--accent)" : "var(--text-muted)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {post.category === "case-study" ? "Case Study" : "Blog"}
          </div>

          <h1 className="display-lg mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="label-mono">{format(new Date(post.date), "dd MMMM yyyy")}</div>
            {post.author && (
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(223,255,0,0.15)", color: "var(--accent)" }}
                >
                  T
                </div>
                <span className="label-mono">{post.author}</span>
              </div>
            )}
          </div>

          {post.coverImage && (
            <div className="relative rounded-xl overflow-hidden mb-0" style={{ aspectRatio: "16/7" }}>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div
                className="absolute inset-0"
                style={{ background: "rgba(0,0,0,0.2)" }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div
          className="section-inner max-w-3xl mx-auto prose"
          style={{
            color: "var(--text-muted)",
            lineHeight: 1.8,
          }}
        >
          <style>{`
            .prose h2 { color: var(--text); font-size: 1.5rem; font-weight: 700; margin: 2.5rem 0 1rem; letter-spacing: -0.01em; }
            .prose h3 { color: var(--text); font-size: 1.2rem; font-weight: 600; margin: 2rem 0 0.75rem; }
            .prose p { margin-bottom: 1.25rem; }
            .prose strong { color: var(--text); }
            .prose ul { padding-left: 1.5rem; margin-bottom: 1.25rem; }
            .prose li { margin-bottom: 0.5rem; }
            .prose a { color: var(--accent); text-decoration: none; }
            .prose a:hover { text-decoration: underline; }
            .prose blockquote { border-left: 2px solid var(--accent); padding-left: 1rem; opacity: 0.8; margin: 1.5rem 0; }
          `}</style>
          <MDXRemote source={post.content} />
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner text-center max-w-2xl mx-auto">
          <h2 className="display-md mb-4">Ready To Transform Your Business?</h2>
          <p className="text-base mb-8" style={{ color: "var(--text-muted)" }}>
            Let&apos;s build an ecosystem that makes your business look as professional as it operates.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="btn-accent" data-cursor="START">
              Start Your Project →
            </Link>
            <Link href="/insights" className="btn-outline" data-cursor="BACK">
              More Insights
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
