"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/lib/content";
import HolographicCard from "@/components/ui/HolographicCard";
import { format } from "date-fns";

type Filter = "all" | "blog" | "case-study";

const LABELS: Record<string, string> = {
  all: "All",
  blog: "Blog",
  "case-study": "Case Studies",
};

export default function InsightsFeed({ posts }: { posts: PostMeta[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Insights & Perspectives</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
            <h1 className="display-xl" style={{ maxWidth: "16ch" }}>
              Ideas That<br />Drive Growth.
            </h1>
            <p className="text-base leading-relaxed max-w-sm" style={{ color: "var(--text-muted)" }}>
              Thought leadership, case studies, and perspectives on brand, digital presence, and business growth.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {(["all", "blog", "case-study"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor="OPEN"
                className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: filter === f ? "var(--accent)" : "rgba(255,255,255,0.05)",
                  color: filter === f ? "#000" : "var(--text-muted)",
                  border: filter === f ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {LABELS[f]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
              <div className="text-4xl" style={{ color: "var(--accent)", opacity: 0.5 }}>◎</div>
              <h2 className="font-bold text-2xl">Coming Soon.</h2>
              <p className="text-sm max-w-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                We&apos;re writing pieces on brand, digital presence, and building businesses that last.
                Check back soon, or reach out to start a conversation now.
              </p>
              <Link href="/contact" className="btn-accent text-xs px-6 py-3" data-cursor="START">
                Start a Conversation →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Link href={`/insights/${post.slug}`} data-cursor="READ">
                    <HolographicCard className="group overflow-hidden h-full">
                      {post.coverImage && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div
                            className="absolute inset-0"
                            style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(17,17,17,1))" }}
                          />
                          <div
                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                            style={{
                              background: post.category === "case-study" ? "rgba(223,255,0,0.2)" : "rgba(255,255,255,0.1)",
                              color: post.category === "case-study" ? "var(--accent)" : "var(--text-muted)",
                              border: `1px solid ${post.category === "case-study" ? "rgba(223,255,0,0.4)" : "rgba(255,255,255,0.1)"}`,
                            }}
                          >
                            {post.category === "case-study" ? "Case Study" : "Blog"}
                          </div>
                        </div>
                      )}
                      <div className="p-6 flex flex-col h-full">
                        <div className="label-mono mb-3">
                          {format(new Date(post.date), "dd MMM yyyy")}
                        </div>
                        <h2 className="font-bold text-base mb-3 leading-snug group-hover:text-accent transition-colors" style={{ flex: "1" }}>
                          {post.title}
                        </h2>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                          {post.excerpt}
                        </p>
                        {post.tags && (
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-muted)" }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </HolographicCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
