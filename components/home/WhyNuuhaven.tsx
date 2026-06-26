"use client";

import { motion } from "framer-motion";
import HolographicCard from "@/components/ui/HolographicCard";
import { useIsMobile } from "@/hooks/useIsMobile";

const values = [
  {
    icon: "01",
    title: "Professional Quality",
    desc: "Every deliverable is produced to an uncompromising professional standard with focus on quality, consistency, and alignment with your objectives.",
  },
  {
    icon: "02",
    title: "Business-Focused Thinking",
    desc: "We approach every project with commercial outcomes in mind. Creative solutions that support your broader business and growth objectives.",
  },
  {
    icon: "03",
    title: "Fast Turnaround",
    desc: "Projects delivered efficiently without compromising quality. You maintain momentum and meet critical deadlines without slowing down.",
  },
  {
    icon: "04",
    title: "Reliable Communication",
    desc: "Clear, responsive, and professional communication maintained throughout every stage of your engagement. No surprises.",
  },
  {
    icon: "05",
    title: "Attention to Detail",
    desc: "A meticulous approach ensures accuracy, consistency, and a polished final product across all deliverables every time.",
  },
  {
    icon: "06",
    title: "Flexible Project Support",
    desc: "Project, retainer, or white-label basis, support that integrates seamlessly into your existing team and workflows.",
  },
];

export default function WhyNuuhaven() {
  const isMobile = useIsMobile();
  return (
    <section className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="section-inner">
        <div className={`flex flex-col lg:flex-row ${isMobile ? "gap-10" : "gap-20"}`}>
          <div className="lg:w-2/5 lg:sticky lg:top-24 lg:self-start">
            <div className="accent-line">
              <span className="label-mono">Why Nuuhaven</span>
            </div>
            <h2 className="display-xl" style={{ maxWidth: "14ch", marginBottom: "2rem" }}>
              The Standard<br />That Sets Us<br />Apart.
            </h2>
            <p className="text-base" style={{ color: "var(--text-muted)", lineHeight: 2 }}>
              Six principles that guide every engagement and ensure every client receives the level of execution their business deserves.
            </p>
          </div>

          <div className={`lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 ${isMobile ? "gap-4" : "gap-8"}`}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <HolographicCard className="h-full" style={{ padding: isMobile ? "1.25rem" : "2.5rem" }}>
                  <div
                    className="font-mono font-bold text-2xl"
                    style={{ color: "rgba(223,255,0,0.35)", marginBottom: "2rem" }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="font-semibold text-base" style={{ lineHeight: 1.5, marginBottom: "1.25rem" }}>{v.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)", lineHeight: 2 }}>
                    {v.desc}
                  </p>
                </HolographicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
