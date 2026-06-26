"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HolographicCard from "@/components/ui/HolographicCard";

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
    desc: "Visual thinkers who build identities that command attention. You understand the strategy behind the aesthetics, logos, colour systems, typography, and brand guidelines that hold.",
    skills: ["Logo design", "Brand identity systems", "Typography", "Colour theory", "Adobe Illustrator / Figma", "Brand guideline documentation"],
  },
  {
    icon: "◳",
    title: "Document & Layout Designer",
    desc: "Precision designers who transform business content into professional documentation, company profiles, proposals, pitch decks, and capability statements that win deals.",
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
    desc: "Word-builders who write with commercial intent. You don't just write well, you write to position, persuade, and convert. Strategic thinking meets executional excellence.",
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
  {
    icon: "◆",
    title: "Real Work. Real Clients.",
    desc: "Every project is for a real business, not spec work, not mockups. You'll build things that go live and that clients actually use to grow their businesses.",
  },
  {
    icon: "◎",
    title: "Project-by-Project Freedom",
    desc: "No full-time commitment required. We bring you in when the work fits your skills. Build your portfolio, earn on your terms, and stay in control of your schedule.",
  },
  {
    icon: "◈",
    title: "Premium Standards, Premium Recognition",
    desc: "We hold our work to a high bar, which means the projects you deliver through Nuuhaven reflect that quality. Your name is attached to work worth showing off.",
  },
  {
    icon: "◐",
    title: "Briefed & Supported",
    desc: "You won't be thrown into the deep end. Every project comes with a clear brief, context on the client, defined deliverables, and a feedback loop that respects your expertise.",
  },
  {
    icon: "◑",
    title: "Fair Compensation",
    desc: "We believe in paying well for great work. Project rates are agreed upfront, no scope creep, no surprises. Deliver excellence and we'll keep coming back to you.",
  },
  {
    icon: "◉",
    title: "Part of Something Growing",
    desc: "Nuuhaven is scaling. Getting in early means being part of a growing network, more projects, more variety, and the opportunity to take on more responsibility over time.",
  },
];

type RoleKey = string;

export default function FreelancerPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", role: "", portfolio: "", linkedin: "",
    experience: "", availability: "", rate: "", skills: [] as string[], message: "",
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [openRole, setOpenRole] = useState<RoleKey | null>(null);

  const currentRoleSkills = ROLES.find(r => r.title === form.role)?.skills || [];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "freelancer", ...form, skills: selectedSkills }),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ background: "var(--bg-primary)", paddingTop: 64 }}>

      {/* ── Hero ── */}
      <section className="section relative overflow-hidden noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-3/5">
              <div className="accent-line">
                <span className="label-mono">Join The Network</span>
              </div>
              <h1 className="display-xl mb-6" style={{ maxWidth: "14ch" }}>
                Build With<br />Nuuhaven.<br />
                <span style={{ color: "var(--accent)" }}>Your Skills,<br />Our Clients.</span>
              </h1>
              <p className="text-base leading-relaxed mb-5" style={{ color: "var(--text-muted)", maxWidth: "36rem" }}>
                We're building a network of elite freelancers, designers, developers, writers, and marketers, who deliver premium work on a project-by-project basis. As Nuuhaven grows, so does the work. And we want the right people in our corner when it comes.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: "var(--text-muted)", maxWidth: "36rem" }}>
                No retainers. No long-term commitments. Just well-briefed projects, fair pay, and work that belongs in your portfolio.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="#apply" className="btn-accent">Apply to Join →</a>
                <a href="#roles" className="btn-outline">See Open Roles</a>
              </div>
            </div>

            {/* Stats */}
            <div className="lg:w-2/5 grid grid-cols-2 gap-4 self-center">
              {[
                { value: "5+", label: "Active Clients" },
                { value: "4", label: "Industries Served" },
                { value: "100+", label: "Assets Delivered" },
                { value: "Growing", label: "Project Pipeline" },
              ].map((stat) => (
                <HolographicCard key={stat.label} style={{ padding: "1.75rem", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--accent)", fontFamily: "var(--font-geist-mono)", marginBottom: "0.5rem" }}>
                    {stat.value}
                  </div>
                  <div className="label-mono">{stat.label}</div>
                </HolographicCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Work With Us ── */}
      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Why Nuuhaven</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem", marginBottom: "4rem" }}>
            <h2 className="display-xl" style={{ maxWidth: "18ch" }}>
              Why The Best<br />Freelancers<br />Work With Us.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "1.5rem" }}>
            {WHY.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <HolographicCard style={{ padding: "2rem", height: "100%" }}>
                  <div style={{ fontSize: "1.5rem", color: "var(--accent)", marginBottom: "1.25rem" }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem" }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.85 }}>{item.desc}</p>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We're Looking For ── */}
      <section id="roles" className="section noise-overlay" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-inner">
          <div className="accent-line">
            <span className="label-mono">Open Roles</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
            <h2 className="display-xl" style={{ maxWidth: "18ch" }}>
              The Roles We're<br />Building For.
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: "38rem" }}>
              We don't just need generalists. We need specialists who are exceptional at their craft. Here's who we're actively looking for, and exactly what we expect.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {ROLES.map((role, i) => {
              const isOpen = openRole === role.title;
              return (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  style={{
                    background: "rgba(17,17,17,0.85)",
                    border: isOpen ? "1px solid rgba(223,255,0,0.35)" : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 10,
                    backdropFilter: "blur(20px)",
                    overflow: "hidden",
                    transition: "border-color 0.25s",
                  }}
                >
                  <button
                    onClick={() => setOpenRole(isOpen ? null : role.title)}
                    style={{ width: "100%", textAlign: "left", padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}
                  >
                    <span style={{ color: "var(--accent)", fontSize: "1.25rem", flexShrink: 0 }}>{role.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.2rem" }}>{role.title}</div>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {role.skills.slice(0, 3).join(" · ")}
                      </div>
                    </div>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s", display: "inline-block" }}>▾</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ padding: "0 2rem 2rem 2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", paddingTop: "1.5rem" }}>
                            <div>
                              <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "0.75rem" }}>About This Role</div>
                              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", lineHeight: 1.8 }}>{role.desc}</p>
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
                            <a
                              href="#apply"
                              onClick={() => setForm(f => ({ ...f, role: role.title }))}
                              className="btn-accent"
                              style={{ fontSize: "0.72rem", padding: "0.65rem 1.4rem" }}
                            >
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

      {/* ── Our Standards ── */}
      <section className="section" style={{ background: "var(--bg-primary)" }}>
        <div className="section-inner">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <div className="accent-line">
                <span className="label-mono">Our Standards</span>
              </div>
              <h2 className="display-xl mb-6" style={{ maxWidth: "16ch" }}>
                What We<br />Expect From<br />Everyone.
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.85, marginBottom: "1.5rem" }}>
                We don't chase volume, we build a curated network of people who take quality seriously. If you apply, be ready to back it up.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                ["◎", "Portfolio-backed excellence", "Show us work you're proud of. Not what you can do, what you've done."],
                ["◈", "Clear communication", "Projects move fast. We need people who communicate proactively, not reactively."],
                ["◐", "Deadline respect", "Agreed timelines are commitments. We build our reputation on delivery, so do you."],
                ["◑", "Attention to detail", "The difference between good and great is usually invisible to most, and obvious to us."],
                ["◉", "Commercial awareness", "We serve businesses. Your work should reflect an understanding of the client's goals."],
              ].map(([icon, title, desc]) => (
                <div key={title as string} style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--accent)", fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.25rem" }}>{title}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.825rem", lineHeight: 1.7 }}>{desc}</div>
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
          <div className="accent-line">
            <span className="label-mono">Apply Now</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
            <h2 className="display-xl" style={{ maxWidth: "16ch" }}>
              Ready To Work<br />With Us?
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: "38rem" }}>
              Tell us who you are, what you do, and show us your work. We review every application personally and reach out to those who are a strong fit.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === "sent" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: "center", padding: "5rem 2rem" }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>◆</div>
                <h3 className="display-xl mb-4" style={{ maxWidth: "16ch", margin: "0 auto 1rem" }}>Application Received.</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: "30rem", margin: "0 auto 2.5rem" }}>
                  Thank you for your application. We review every submission personally and will be in touch if you're a strong fit for our current or upcoming projects.
                </p>
                <Link href="/" className="btn-accent">Back to Home →</Link>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ maxWidth: "52rem" }}
              >
                {/* Personal details */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}>01, Personal Details</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {[
                      { id: "name", label: "Full Name *", type: "text", required: true },
                      { id: "email", label: "Email Address *", type: "email", required: true },
                      { id: "phone", label: "Phone Number", type: "tel", required: false },
                      { id: "portfolio", label: "Portfolio URL", type: "url", required: false },
                      { id: "linkedin", label: "LinkedIn URL", type: "url", required: false },
                    ].map(field => (
                      <div key={field.id} style={{ gridColumn: field.id === "name" || field.id === "email" ? undefined : undefined }}>
                        <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          required={field.required}
                          value={(form as Record<string, string>)[field.id]}
                          onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                          style={{
                            width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 6, padding: "0.75rem 1rem", color: "var(--text)", fontSize: "0.875rem",
                            outline: "none", transition: "border-color 0.2s",
                          }}
                          onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.5)"}
                          onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Role */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}>02, Role You're Applying For</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
                    {ROLES.map(role => {
                      const sel = form.role === role.title;
                      return (
                        <button
                          key={role.title}
                          type="button"
                          onClick={() => { setForm(f => ({ ...f, role: role.title })); setSelectedSkills([]); }}
                          style={{
                            padding: "0.875rem 1rem", textAlign: "left", borderRadius: 8,
                            background: sel ? "rgba(223,255,0,0.08)" : "rgba(255,255,255,0.03)",
                            border: sel ? "1px solid rgba(223,255,0,0.4)" : "1px solid rgba(255,255,255,0.08)",
                            color: sel ? "var(--accent)" : "rgba(255,255,255,0.65)",
                            fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s",
                            display: "flex", alignItems: "center", gap: "0.5rem",
                          }}
                        >
                          <span>{role.icon}</span> {role.title}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Skills */}
                {currentRoleSkills.length > 0 && (
                  <div style={{ marginBottom: "2.5rem" }}>
                    <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>03, Your Skills (select all that apply)</div>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginBottom: "1rem" }}>Based on your selected role. Pick everything you're confident in.</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {currentRoleSkills.map(skill => {
                        const sel = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            style={{
                              padding: "0.45rem 0.875rem", borderRadius: 999, fontSize: "0.775rem",
                              background: sel ? "rgba(223,255,0,0.1)" : "rgba(255,255,255,0.04)",
                              border: sel ? "1px solid rgba(223,255,0,0.4)" : "1px solid rgba(255,255,255,0.1)",
                              color: sel ? "var(--accent)" : "rgba(255,255,255,0.6)",
                              cursor: "pointer", transition: "all 0.2s",
                            }}
                          >
                            {sel ? "✓ " : ""}{skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Experience & Availability */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}>04, Experience & Availability</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Years of Experience
                      </label>
                      <select
                        value={form.experience}
                        onChange={e => setForm(f => ({ ...f, experience: e.target.value }))}
                        style={{
                          width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 6, padding: "0.75rem 1rem", color: "var(--text)", fontSize: "0.875rem",
                          outline: "none", appearance: "none",
                        }}
                      >
                        <option value="" style={{ background: "#111" }}>Select…</option>
                        <option value="0-1 years" style={{ background: "#111" }}>Less than 1 year</option>
                        <option value="1-2 years" style={{ background: "#111" }}>1–2 years</option>
                        <option value="3-5 years" style={{ background: "#111" }}>3–5 years</option>
                        <option value="5+ years" style={{ background: "#111" }}>5+ years</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Availability
                      </label>
                      <select
                        value={form.availability}
                        onChange={e => setForm(f => ({ ...f, availability: e.target.value }))}
                        style={{
                          width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 6, padding: "0.75rem 1rem", color: "var(--text)", fontSize: "0.875rem",
                          outline: "none", appearance: "none",
                        }}
                      >
                        <option value="" style={{ background: "#111" }}>Select…</option>
                        <option value="Immediately" style={{ background: "#111" }}>Available immediately</option>
                        <option value="Within 2 weeks" style={{ background: "#111" }}>Within 2 weeks</option>
                        <option value="Within a month" style={{ background: "#111" }}>Within a month</option>
                        <option value="Project-by-project" style={{ background: "#111" }}>Project by project basis</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", fontFamily: "var(--font-geist-mono)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                      Expected Rate (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. R 500/hr or R 3,000/project"
                      value={form.rate}
                      onChange={e => setForm(f => ({ ...f, rate: e.target.value }))}
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 6, padding: "0.75rem 1rem", color: "var(--text)", fontSize: "0.875rem", outline: "none",
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.5)"}
                      onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "2.5rem" }}>
                  <div className="label-mono" style={{ color: "var(--text-muted)", marginBottom: "1.25rem" }}>05, Tell Us About Yourself</div>
                  <textarea
                    rows={5}
                    required
                    placeholder="Introduce yourself, your background, your best work, why you want to work with Nuuhaven, and anything else we should know. Link to specific projects if you have them."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{
                      width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 6, padding: "0.875rem 1rem", color: "var(--text)", fontSize: "0.875rem",
                      outline: "none", resize: "vertical", lineHeight: 1.7, transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = "rgba(223,255,0,0.5)"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>

                {status === "error" && (
                  <div style={{ color: "#ff6b6b", fontSize: "0.875rem", marginBottom: "1rem", padding: "0.75rem 1rem", background: "rgba(255,107,107,0.08)", borderRadius: 6, border: "1px solid rgba(255,107,107,0.2)" }}>
                    Something went wrong. Please try again or email us directly at tshepang@nuuhaven.com
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-accent"
                  style={{ padding: "1rem 2.5rem", fontSize: "0.875rem", opacity: status === "sending" ? 0.7 : 1 }}
                >
                  {status === "sending" ? "Submitting…" : "Submit Application →"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="section" style={{ background: "var(--bg-primary)", textAlign: "center" }}>
        <div className="section-inner" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 className="display-xl mb-6" style={{ maxWidth: "18ch" }}>
            Not A Freelancer?<br />
            <span style={{ color: "var(--accent)" }}>Let's Build<br />Your Business.</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.8, maxWidth: "32rem", marginBottom: "2.5rem" }}>
            If you're a business owner looking to work with Nuuhaven, head over to our contact page to book a discovery session.
          </p>
          <Link href="/contact" className="btn-accent">Start A Project →</Link>
        </div>
      </section>

    </div>
  );
}
