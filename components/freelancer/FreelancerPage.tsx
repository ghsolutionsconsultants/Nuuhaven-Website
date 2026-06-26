"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HolographicCard from "@/components/ui/HolographicCard";
import { useIsMobile } from "@/hooks/useIsMobile";

const ROLES = [
  {
    icon: "◎",
    title: "Web Designer / Developer",
    desc: "Frontend builders who can craft pixel-perfect, fast, responsive websites. You live in React, Next.js, or similar, and you understand that speed and aesthetics are not trade-offs.",
    skills: ["React / Next.js", "Tailwind CSS / CSS-in-JS", "Figma to code", "Performance optimisation", "Responsive design", "Animation (Framer Motion / GSAP)"],
  },
  {
    icon: "◈",
    title: "Brand & Graphic Designer",
    desc: "Visual thinkers who build identities that command attention. You understand the strategy behind the aesthetics — logos, colour systems, typography, and brand guidelines that hold.",
    skills: ["Logo design", "Brand identity systems", "Typography", "Colour theory", "Adobe Illustrator / Figma", "Brand guideline documentation"],
  },
  {
    icon: "◳",
    title: "Document & Layout Designer",
    desc: "Precision designers who transform business content into professional documentation — company profiles, proposals, pitch decks, and capability statements that win deals.",
    skills: ["InDesign / Publisher", "Company profile design", "Pitch deck design", "Proposal templates", "Layout & typesetting", "PDF production"],
  },
  {
    icon: "◐",
    title: "Marketing & Content Designer",
    desc: "Creative producers who build marketing assets that drive awareness and generate demand. From social media to print, you understand how visuals and copy work together.",
    skills: ["Social media graphics", "Ad creative design", "Email template design", "Print layout (flyers, banners)", "Video thumbnails", "Content calendar execution"],
  },
  {
    icon: "◑",
    title: "Copywriter / Content Strategist",
    desc: "Word-builders who write with commercial intent. You don't just write well — you write to position, persuade, and convert. Strategic thinking meets executional excellence.",
    skills: ["Brand copywriting", "Website copy", "Company profile writing", "Social media content", "SEO content", "Proposal & pitch writing"],
  },
  {
    icon: "◉",
    title: "Digital Marketer / Social Media Manager",
    desc: "Growth-oriented practitioners who manage brand presence and marketing execution. You understand platforms, algorithms, content strategy, and what actually moves the needle.",
    skills: ["Social media management", "Paid ads (Meta / Google)", "Content strategy", "Analytics & reporting", "Community management", "Campaign planning"],
  },
];

const WHY = [
  { icon: "◆", title: "Real Work. Real Clients.", desc: "Every project is for a real business — not spec work, not mockups. You'll build things that go live and that clients use to grow." },
  { icon: "◎", title: "Project-by-Project Freedom", desc: "No full-time commitment required. We bring you in when the work fits your skills. Build your portfolio, earn on your terms." },
  { icon: "◈", title: "Premium Standards, Premium Recognition", desc: "We hold our work to a high bar. The projects you deliver through Nuuhaven reflect that quality — work worth showing off." },
  { icon: "◐", title: "Briefed & Supported", desc: "Every project comes with a clear brief, context on the client, defined deliverables, and a feedback loop that respects your expertise." },
  { icon: "◑", title: "Fair Compensation", desc: "Project rates are agreed upfront. No scope creep, no surprises. Deliver excellence and we'll keep coming back to you." },
  { icon: "◉", title: "Part of Something Growing", desc: "Nuuhaven is scaling. Getting in early means more projects, more variety, and the opportunity to take on more responsibility over time." },
];

const AI_TOOLS = [
  { id: "chatgpt", label: "ChatGPT (OpenAI)" },
  { id: "claude", label: "Claude (Anthropic)" },
  { id: "midjourney", label: "Midjourney" },
  { id: "firefly", label: "Adobe Firefly" },
  { id: "copilot", label: "GitHub Copilot" },
  { id: "gemini", label: "Google Gemini" },
  { id: "perplexity", label: "Perplexity AI" },
  { id: "elevenlabs", label: "ElevenLabs" },
  { id: "runway", label: "Runway ML" },
  { id: "canva-ai", label: "Canva AI" },
  { id: "notion-ai", label: "Notion AI" },
  { id: "framer-ai", label: "Framer AI" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  padding: "0.875rem 1rem",
  color: "var(--text)",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.62rem",
  color: "rgba(255,255,255,0.35)",
  fontFamily: "var(--font-geist-mono)",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
};

const sectionLabel: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono)",
  fontSize: "0.6rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "var(--accent)",
  marginBottom: "1.25rem",
  paddingBottom: "0.75rem",
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

export default function FreelancerPage() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", portfolioUrl: "", linkedin: "",
    role: "", experience: "", availability: "", rate: "",
    laptopModel: "", message: "",
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAiTools, setSelectedAiTools] = useState<string[]>([]);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [openRole, setOpenRole] = useState<string | null>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const portfolioRef = useRef<HTMLInputElement>(null);

  const currentRoleSkills = ROLES.find(r => r.title === form.role)?.skills || [];

  const toggleSkill = (skill: string) =>
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);

  const toggleAiTool = (id: string) =>
    setSelectedAiTools(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portfolioFile) {
      alert("Please attach your portfolio PDF before submitting.");
      return;
    }
    setStatus("sending");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("skills", selectedSkills.join(", "));
      fd.append("aiTools", selectedAiTools.map(id => AI_TOOLS.find(t => t.id === id)?.label || id).join(", "));
      if (cvFile) fd.append("cv", cvFile);
      if (portfolioFile) fd.append("portfolioFile", portfolioFile);

      const res = await fetch("https://formspree.io/f/xpqgdzwy", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      const json = await res.json();
      if (json.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>

      {/* ── Hero ── */}
      <section className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "5rem", alignItems: "center" }}>
            <div>
              <div className="accent-line">
                <span className="label-mono">Join The Network</span>
              </div>
              <h1 className="display-xl" style={{ marginBottom: "1.5rem" }}>
                Build With<br />Nuuhaven.<br />
                <span style={{ color: "var(--accent)" }}>Your Skills,<br />Our Clients.</span>
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.9, marginBottom: "1.25rem", maxWidth: "34rem" }}>
                We&apos;re building a network of elite freelancers — designers, developers, writers, and marketers — who deliver premium work on a project-by-project basis.
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.9, marginBottom: "2.5rem", maxWidth: "34rem" }}>
                No retainers. No long-term commitments. Just well-briefed projects, fair pay, and work that belongs in your portfolio.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
                <a href="#apply" className="btn-accent">Apply to Join →</a>
                <a href="#roles" className="btn-outline">See Open Roles</a>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { value: "5+", label: "Active Clients" },
                { value: "4", label: "Industries Served" },
                { value: "100+", label: "Assets Delivered" },
                { value: "Growing", label: "Project Pipeline" },
              ].map(stat => (
                <HolographicCard key={stat.label} style={{ padding: "1.75rem", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--accent)", fontFamily: "var(--font-geist-mono)", marginBottom: "0.5rem" }}>{stat.value}</div>
                  <div className="label-mono" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                </HolographicCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Work With Us ── */}
      <section className="section">
        <div className="section-inner">
          <div className="accent-line"><span className="label-mono">Why Nuuhaven</span></div>
          <h2 className="display-xl" style={{ maxWidth: "18ch", marginBottom: "3rem" }}>
            Why The Best<br />Freelancers<br />Work With Us.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.5rem" }}>
            {WHY.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                <HolographicCard style={{ padding: isMobile ? "1.25rem" : "2rem", height: "100%" }}>
                  <div style={{ fontSize: "1.5rem", color: "var(--accent)", marginBottom: "1.25rem" }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem" }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.85 }}>{item.desc}</p>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="roles" className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line"><span className="label-mono">Open Roles</span></div>
          <h2 className="display-xl" style={{ maxWidth: "18ch", marginBottom: "1rem" }}>The Roles We&apos;re<br />Building For.</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: "38rem", marginBottom: "3rem" }}>
            We don&apos;t just need generalists. We need specialists who are exceptional at their craft.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {ROLES.map((role, i) => {
              const isOpen = openRole === role.title;
              return (
                <motion.div key={role.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                  style={{ background: "rgba(17,17,17,0.85)", border: isOpen ? "1px solid rgba(223,255,0,0.35)" : "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden", transition: "border-color 0.25s" }}>
                  <button onClick={() => setOpenRole(isOpen ? null : role.title)} style={{ width: "100%", textAlign: "left", padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem", background: "none", border: "none", cursor: "pointer" }}>
                    <span style={{ color: "var(--accent)", fontSize: "1.25rem", flexShrink: 0 }}>{role.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.2rem" }}>{role.title}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{role.skills.slice(0, 3).join(" · ")}</div>
                    </div>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s", display: "inline-block" }}>▾</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                        <div style={{ padding: "0 2rem 2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem", paddingTop: "1.5rem" }}>
                            <div>
                              <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>About This Role</div>
                              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", lineHeight: 1.8 }}>{role.desc}</p>
                            </div>
                            <div>
                              <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>Skills We Need</div>
                              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                {role.skills.map(skill => (
                                  <div key={skill} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.7)" }}>
                                    <span style={{ color: "var(--accent)", fontSize: "0.6rem" }}>◆</span> {skill}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div style={{ marginTop: "1.5rem" }}>
                            <a href="#apply" onClick={() => setForm(f => ({ ...f, role: role.title }))} className="btn-accent" style={{ fontSize: "0.72rem", padding: "0.65rem 1.4rem" }}>
                              Apply for This Role →
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Standards ── */}
      <section className="section">
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "5rem", alignItems: "center" }}>
            <div>
              <div className="accent-line"><span className="label-mono">Our Standards</span></div>
              <h2 className="display-xl" style={{ maxWidth: "16ch", marginBottom: "1.5rem" }}>What We<br />Expect From<br />Everyone.</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.85 }}>
                We don&apos;t chase volume — we build a curated network of people who take quality seriously. If you apply, be ready to back it up.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                ["◎", "Portfolio-backed excellence", "Show us work you're proud of. Not what you can do — what you've done."],
                ["◈", "Clear communication", "Projects move fast. We need people who communicate proactively, not reactively."],
                ["◐", "Deadline respect", "Agreed timelines are commitments. We build our reputation on delivery, so do you."],
                ["◑", "Attention to detail", "The difference between good and great is usually invisible to most — and obvious to us."],
                ["◉", "Commercial awareness", "We serve businesses. Your work should reflect an understanding of the client's goals."],
              ].map(([icon, title, desc]) => (
                <div key={title as string} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", padding: "1.125rem 1.375rem", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "var(--accent)", fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.3rem" }}>{title}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.7 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section id="apply" className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="accent-line" style={{ justifyContent: "center" }}>
                <span className="label-mono">Apply Now</span>
              </div>
              <h2 className="display-xl" style={{ marginBottom: "1rem" }}>Ready To Work<br />With Us?</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: "38rem", margin: "0 auto" }}>
                Tell us who you are, what you do, and show us your work. We review every application personally and reach out to those who are a strong fit.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: "center", padding: "5rem 2rem", background: "rgba(10,10,10,0.98)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontSize: "3rem", color: "var(--accent)", marginBottom: "1.5rem" }}>◆</div>
                  <h3 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "1rem" }}>Application Received.</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.85, maxWidth: "30rem", margin: "0 auto 2.5rem" }}>
                    Thank you. We review every submission personally and will be in touch if you&apos;re a strong fit for our current or upcoming projects.
                  </p>
                  <Link href="/" className="btn-accent">Back to Home →</Link>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit}
                  style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: isMobile ? "1.5rem" : "3rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>

                  {/* 01 Personal Details */}
                  <div>
                    <div style={sectionLabel}>01 — Personal Details</div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                      {[
                        { id: "name", label: "Full Name *", type: "text", required: true, placeholder: "Jane Smith" },
                        { id: "email", label: "Email Address *", type: "email", required: true, placeholder: "jane@studio.co.za" },
                        { id: "phone", label: "Phone Number", type: "tel", required: false, placeholder: "+27 82 000 0000" },
                        { id: "portfolioUrl", label: "Portfolio URL", type: "url", required: false, placeholder: "https://yourportfolio.com" },
                        { id: "linkedin", label: "LinkedIn URL", type: "url", required: false, placeholder: "https://linkedin.com/in/yourname" },
                      ].map(f => (
                        <div key={f.id}>
                          <label style={labelStyle}>{f.label}</label>
                          <input type={f.type} required={f.required} placeholder={f.placeholder}
                            value={(form as Record<string, string>)[f.id]}
                            onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                            style={inputStyle}
                            onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.45)"}
                            onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 02 Role */}
                  <div>
                    <div style={sectionLabel}>02 — Role You&apos;re Applying For</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "0.75rem" }}>
                      {ROLES.map(role => {
                        const sel = form.role === role.title;
                        return (
                          <button key={role.title} type="button" onClick={() => { setForm(f => ({ ...f, role: role.title })); setSelectedSkills([]); }}
                            style={{ padding: "0.875rem 1rem", textAlign: "left", borderRadius: 10, background: sel ? "rgba(223,255,0,0.08)" : "rgba(255,255,255,0.03)", border: sel ? "1px solid rgba(223,255,0,0.4)" : "1px solid rgba(255,255,255,0.08)", color: sel ? "var(--accent)" : "rgba(255,255,255,0.65)", fontSize: "0.82rem", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "0.625rem" }}>
                            <span>{role.icon}</span> {role.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 03 Skills */}
                  {currentRoleSkills.length > 0 && (
                    <div>
                      <div style={sectionLabel}>03 — Your Skills <span style={{ color: "rgba(255,255,255,0.25)", textTransform: "none", letterSpacing: 0 }}>(select all that apply)</span></div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {currentRoleSkills.map(skill => {
                          const sel = selectedSkills.includes(skill);
                          return (
                            <button key={skill} type="button" onClick={() => toggleSkill(skill)}
                              style={{ padding: "0.45rem 1rem", borderRadius: 999, fontSize: "0.78rem", background: sel ? "rgba(223,255,0,0.1)" : "rgba(255,255,255,0.04)", border: sel ? "1px solid rgba(223,255,0,0.4)" : "1px solid rgba(255,255,255,0.1)", color: sel ? "var(--accent)" : "rgba(255,255,255,0.6)", cursor: "pointer", transition: "all 0.2s" }}>
                              {sel ? "✓ " : ""}{skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 04 Experience & Availability */}
                  <div>
                    <div style={sectionLabel}>04 — Experience &amp; Availability</div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={labelStyle}>Years of Experience</label>
                        <select value={form.experience} onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
                          style={{ ...inputStyle, appearance: "none" as const }}>
                          <option value="" style={{ background: "#111" }}>Select…</option>
                          <option value="Less than 1 year" style={{ background: "#111" }}>Less than 1 year</option>
                          <option value="1–2 years" style={{ background: "#111" }}>1–2 years</option>
                          <option value="3–5 years" style={{ background: "#111" }}>3–5 years</option>
                          <option value="5+ years" style={{ background: "#111" }}>5+ years</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Availability</label>
                        <select value={form.availability} onChange={e => setForm(f => ({ ...f, availability: e.target.value }))}
                          style={{ ...inputStyle, appearance: "none" as const }}>
                          <option value="" style={{ background: "#111" }}>Select…</option>
                          <option value="Available immediately" style={{ background: "#111" }}>Available immediately</option>
                          <option value="Within 2 weeks" style={{ background: "#111" }}>Within 2 weeks</option>
                          <option value="Within a month" style={{ background: "#111" }}>Within a month</option>
                          <option value="Project-by-project" style={{ background: "#111" }}>Project by project</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Expected Rate (optional)</label>
                        <input type="text" placeholder="e.g. R 500/hr or R 3,000/project" value={form.rate}
                          onChange={e => setForm(f => ({ ...f, rate: e.target.value }))} style={inputStyle}
                          onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.45)"}
                          onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                      </div>
                    </div>
                  </div>

                  {/* 05 Tech Stack */}
                  <div>
                    <div style={sectionLabel}>05 — Tech Stack &amp; Tools</div>

                    {/* AI Tools Disclaimer */}
                    <div style={{ background: "rgba(255,200,0,0.04)", border: "1px solid rgba(255,200,0,0.2)", borderRadius: 10, padding: "1.125rem 1.375rem", marginBottom: "1.5rem", display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                      <span style={{ color: "#ffc800", fontSize: "0.72rem", fontWeight: 900, flexShrink: 0, marginTop: "0.1rem" }}>!</span>
                      <div>
                        <div style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.58rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#ffc800", marginBottom: "0.4rem", fontWeight: 700 }}>
                          Important Notice — AI Subscriptions &amp; Hardware
                        </div>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", lineHeight: 1.8, margin: 0 }}>
                          <strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>Nuuhaven does not provide access to AI subscriptions.</strong> You are expected to have your own active subscriptions to the tools required for your role. Not having the required AI tools will directly impact delivery timelines and may affect your eligibility for certain projects.{" "}
                          <strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>Nuuhaven does not provide or lend hardware to freelancers.</strong> You must have your own equipment that is capable of handling professional design, development, and production work.
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: "1.5rem" }}>
                      <label style={labelStyle}>Which AI tools do you currently have active subscriptions for?</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                        {AI_TOOLS.map(tool => {
                          const sel = selectedAiTools.includes(tool.id);
                          return (
                            <button key={tool.id} type="button" onClick={() => toggleAiTool(tool.id)}
                              style={{ padding: "0.45rem 1rem", borderRadius: 999, fontSize: "0.78rem", background: sel ? "rgba(223,255,0,0.1)" : "rgba(255,255,255,0.04)", border: sel ? "1px solid rgba(223,255,0,0.4)" : "1px solid rgba(255,255,255,0.1)", color: sel ? "var(--accent)" : "rgba(255,255,255,0.6)", cursor: "pointer", transition: "all 0.2s" }}>
                              {sel ? "✓ " : ""}{tool.label}
                            </button>
                          );
                        })}
                      </div>
                      {selectedAiTools.length === 0 && (
                        <p style={{ fontSize: "0.72rem", color: "rgba(255,200,0,0.6)", marginTop: "0.625rem", fontStyle: "italic" }}>
                          No AI tools selected. Please note this may limit the projects you are eligible for.
                        </p>
                      )}
                    </div>

                    <div>
                      <label style={labelStyle}>Laptop / Hardware You Use *</label>
                      <input type="text" required placeholder="e.g. MacBook Pro M3 14&quot;, Dell XPS 15 (i7, 32GB RAM), etc."
                        value={form.laptopModel}
                        onChange={e => setForm(f => ({ ...f, laptopModel: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.45)"}
                        onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
                      <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", marginTop: "0.4rem", lineHeight: 1.6 }}>
                        Nuuhaven does not provide or lend hardware. All freelancers must have their own capable equipment.
                      </p>
                    </div>
                  </div>

                  {/* 06 CV & Portfolio Upload */}
                  <div>
                    <div style={sectionLabel}>06 — CV &amp; Portfolio Upload</div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
                      {/* CV */}
                      <div>
                        <label style={labelStyle}>CV / Resume (PDF) — optional</label>
                        <div
                          onClick={() => cvRef.current?.click()}
                          style={{ border: "1px dashed rgba(255,255,255,0.15)", borderRadius: 10, padding: "1.5rem", textAlign: "center", cursor: "pointer", background: cvFile ? "rgba(223,255,0,0.04)" : "rgba(255,255,255,0.02)", borderColor: cvFile ? "rgba(223,255,0,0.35)" : "rgba(255,255,255,0.15)", transition: "all 0.2s" }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
                          onMouseLeave={e => (e.currentTarget.style.borderColor = cvFile ? "rgba(223,255,0,0.35)" : "rgba(255,255,255,0.15)")}
                        >
                          <div style={{ fontSize: "1.5rem", color: cvFile ? "var(--accent)" : "rgba(255,255,255,0.25)", marginBottom: "0.5rem" }}>◳</div>
                          {cvFile ? (
                            <div>
                              <div style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600, marginBottom: "0.25rem" }}>{cvFile.name}</div>
                              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>{(cvFile.size / 1024).toFixed(0)} KB</div>
                            </div>
                          ) : (
                            <div>
                              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.25rem" }}>Click to upload CV</div>
                              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)" }}>PDF, max 10MB</div>
                            </div>
                          )}
                        </div>
                        <input ref={cvRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => setCvFile(e.target.files?.[0] || null)} />
                      </div>

                      {/* Portfolio PDF */}
                      <div>
                        <label style={labelStyle}>Portfolio PDF *</label>
                        <div
                          onClick={() => portfolioRef.current?.click()}
                          style={{ border: "1px dashed rgba(255,255,255,0.15)", borderRadius: 10, padding: "1.5rem", textAlign: "center", cursor: "pointer", background: portfolioFile ? "rgba(223,255,0,0.04)" : "rgba(255,255,255,0.02)", borderColor: portfolioFile ? "rgba(223,255,0,0.35)" : "rgba(255,255,255,0.15)", transition: "all 0.2s" }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
                          onMouseLeave={e => (e.currentTarget.style.borderColor = portfolioFile ? "rgba(223,255,0,0.35)" : "rgba(255,255,255,0.15)")}
                        >
                          <div style={{ fontSize: "1.5rem", color: portfolioFile ? "var(--accent)" : "rgba(255,255,255,0.25)", marginBottom: "0.5rem" }}>◈</div>
                          {portfolioFile ? (
                            <div>
                              <div style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 600, marginBottom: "0.25rem" }}>{portfolioFile.name}</div>
                              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>{(portfolioFile.size / 1024).toFixed(0)} KB</div>
                            </div>
                          ) : (
                            <div>
                              <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", marginBottom: "0.25rem" }}>Click to upload portfolio</div>
                              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)" }}>PDF, max 20MB</div>
                            </div>
                          )}
                        </div>
                        <input ref={portfolioRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={e => setPortfolioFile(e.target.files?.[0] || null)} />
                      </div>
                    </div>
                  </div>

                  {/* 07 About Yourself */}
                  <div>
                    <div style={sectionLabel}>07 — Tell Us About Yourself</div>
                    <textarea rows={5} required
                      placeholder="Introduce yourself, your background, your best work, why you want to work with Nuuhaven, and anything else we should know. Link to specific projects if you have them."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.75 }}
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.45)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>

                  {status === "error" && (
                    <div style={{ color: "#ff6b6b", fontSize: "0.85rem", padding: "0.875rem 1.125rem", background: "rgba(255,107,107,0.07)", borderRadius: 8, border: "1px solid rgba(255,107,107,0.2)" }}>
                      Something went wrong. Please try again or email us at tshepang@nuuhaven.com
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
                    <button type="submit" disabled={status === "sending"} className="btn-accent"
                      style={{ padding: "1rem 2.5rem", fontSize: "0.875rem", opacity: status === "sending" ? 0.7 : 1 }}>
                      {status === "sending" ? "Submitting…" : "Submit Application →"}
                    </button>
                    <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.72rem", lineHeight: 1.6 }}>
                      Reviewed personally · We respond to strong fits only
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section" style={{ textAlign: "center" }}>
        <div className="section-inner" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 className="display-xl" style={{ maxWidth: "18ch", marginBottom: "1.5rem" }}>
            Not A Freelancer?<br />
            <span style={{ color: "var(--accent)" }}>Let&apos;s Build<br />Your Business.</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: "32rem", marginBottom: "2.5rem" }}>
            If you&apos;re a business owner looking to work with Nuuhaven, head over to our contact page to book a discovery session.
          </p>
          <Link href="/contact" className="btn-accent">Start A Project →</Link>
        </div>
      </section>
    </div>
  );
}
