import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Linkedin, Rocket, Crown, Shield, Trophy, ExternalLink, ShieldCheck, BadgeCheck, GraduationCap, FolderOpen, Bot, Laptop, Flag, Cake, User, Globe, Languages, Target, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { aboutQuery, achievementsQuery, technologiesQuery, certificatesQuery } from "@/lib/queries";

import profileHeroImg from "@/assets/profile-hero.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Thanus Theiventhiram | Software Engineer & Co-Founder" },
      { name: "description", content: "Learn about Thanus Theiventhiram — Software Engineering Graduate, AarasTech Co-Founder, Full Stack & UI/UX Developer from Jaffna, Sri Lanka." },
      { property: "og:title", content: "About Thanus Theiventhiram" },
      { property: "og:description", content: "Software Engineering Graduate, AarasTech Co-Founder, Full Stack Developer, UI/UX Designer." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: "https://project--82797ab2-2006-4912-97de-e081757bf83b.lovable.app/og-image.png" },
      { name: "twitter:title", content: "About Thanus Theiventhiram" },
      { name: "twitter:description", content: "Software Engineering Graduate & AarasTech Co-Founder from Jaffna, Sri Lanka." },
      { name: "twitter:image", content: "https://project--82797ab2-2006-4912-97de-e081757bf83b.lovable.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(aboutQuery),
      context.queryClient.ensureQueryData(achievementsQuery),
      context.queryClient.ensureQueryData(technologiesQuery),
      context.queryClient.ensureQueryData(certificatesQuery),
    ]),
  component: AboutPage,
});

function AboutPage() {
  const { data: about } = useSuspenseQuery(aboutQuery);
  const { data: achievements } = useSuspenseQuery(achievementsQuery);
  const { data: techs } = useSuspenseQuery(technologiesQuery);
  const { data: certificates } = useSuspenseQuery(certificatesQuery);

  const grouped = techs.reduce<Record<string, typeof techs>>((acc, t) => {
    (acc[t.category] ||= []).push(t);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Animated Hero Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Left: Text Content */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            Building Digital
            <br />
            <span className="text-gradient">Solutions.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            {about?.summary || "Clean Code. Scalable Solutions. Real Impact."}
          </p>
          {about?.intro && <p className="mt-4 text-muted-foreground max-w-xl">{about.intro}</p>}
          {about?.career_goal && (
            <div className="mt-8 glass-card p-6 border-l-4 border-l-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <h2 className="font-semibold mb-2 text-foreground flex items-center gap-2">
                <Target size={18} className="text-primary" /> Career Goal
              </h2>
              <p className="text-sm text-muted-foreground relative z-10">{about.career_goal}</p>
            </div>
          )}
        </motion.div>

        {/* Right: Animated Portrait & Cards */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          className="relative flex justify-center items-center h-[500px]"
        >
          {/* Glowing Background Circle (Yellow/Gold glow like the image) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border-[3px] border-[#EAB308]/40 shadow-[0_0_80px_rgba(234,179,8,0.5)] bg-[#EAB308]/10 animate-pulse" />
          
          {/* Code Background Details */}
          <div className="absolute inset-0 font-mono text-[10px] sm:text-xs text-[#EAB308]/20 opacity-70 pointer-events-none overflow-hidden select-none whitespace-pre z-0">
            {`import React from 'react';\nconst Developer = () => {\n  return (\n    <div className="developer">\n      <h1>Building Digital Solutions</h1>\n    </div>\n  );\n};\nexport default Developer;\n\n> npm run dev\nready in 300ms`}
          </div>

          {/* Profile Portrait */}
          <motion.img 
            src={profileHeroImg} 
            alt="Thanus Theiventhiram" 
            className="relative z-10 w-full max-w-[380px] object-contain drop-shadow-2xl"
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
          />

          {/* Floating Glass Cards */}
          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 right-0 sm:-right-8 z-20 glass-card p-3 rounded-xl flex items-center gap-3 border-[#EAB308]/30 shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-background/60 backdrop-blur-md">
            <div className="p-2 rounded-lg bg-[#EAB308]/20 text-[#EAB308]"><Laptop size={20} /></div>
            <span className="text-xs font-bold whitespace-nowrap">Clean Code</span>
          </motion.div>

          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-32 right-[-20px] sm:-right-16 z-20 glass-card p-3 rounded-xl flex items-center gap-3 border-[#EAB308]/30 shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-background/60 backdrop-blur-md">
            <div className="p-2 rounded-lg bg-[#EAB308]/20 text-[#EAB308]"><Sparkles size={20} /></div>
            <span className="text-xs font-bold whitespace-nowrap">Modern Design</span>
          </motion.div>

          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-32 left-0 sm:-left-8 z-20 glass-card p-3 rounded-xl flex items-center gap-3 border-[#EAB308]/30 shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-background/60 backdrop-blur-md">
            <div className="p-2 rounded-lg bg-[#EAB308]/20 text-[#EAB308]"><Rocket size={20} /></div>
            <span className="text-xs font-bold whitespace-nowrap">Scalable Solutions</span>
          </motion.div>

          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-10 left-[-10px] sm:-left-12 z-20 glass-card p-3 rounded-xl flex items-center gap-3 border-[#EAB308]/30 shadow-[0_0_20px_rgba(234,179,8,0.15)] bg-background/60 backdrop-blur-md">
            <div className="p-2 rounded-lg bg-[#EAB308]/20 text-[#EAB308]"><Target size={20} /></div>
            <span className="text-xs font-bold whitespace-nowrap">Real Impact</span>
          </motion.div>
        </motion.div>
      </div>

      <GoalsAndBackground about={about as AboutRecord | null} />

      <AchievementsCard achievements={achievements as Achievement[]} />

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Technologies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="glass-card p-6">
              <h3 className="font-semibold text-gradient mb-3">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <span key={t.id} className="text-xs px-3 py-1.5 rounded-full bg-muted">{t.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CertificatesSection certificates={certificates as Certificate[]} />
    </div>
  );
}

type Achievement = {
  id: string;
  title: string;
  organization?: string | null;
  period?: string | null;
  duration?: string | null;
  description?: string | null;
  contributions?: string[] | null;
  events?: string[] | null;
  skills?: string[] | null;
  highlight?: string | null;
  icon?: string | null;
  logo_url?: string | null;
};

type GoalItem = { id: string; icon?: string | null; title: string; value: string };
type BackgroundItem = { id: string; icon?: string | null; label: string; value: string };
type AboutRecord = {
  goals?: GoalItem[] | null;
  background_details?: BackgroundItem[] | null;
  background_description?: string | null;
  career_goal?: string | null;
};

const DEFAULT_GOALS: GoalItem[] = [
  { id: "g1", icon: "bot", title: "Follow", value: "Software / AI Engineering" },
  { id: "g2", icon: "laptop", title: "Practice", value: "Software Development" },
  { id: "g3", icon: "flag", title: "Support", value: "Tech Communities" },
  { id: "g4", icon: "graduation-cap", title: "Complete", value: "Master's Degree" },
];

const DEFAULT_BACKGROUND: BackgroundItem[] = [
  { id: "b1", icon: "badge", label: "Name", value: "Theiventhiram Thanus" },
  { id: "b2", icon: "cake", label: "Birthday", value: "December 16" },
  { id: "b3", icon: "user", label: "Gender", value: "Male (He/Him/His)" },
  { id: "b4", icon: "globe", label: "Location", value: "Sri Lanka (GMT+5:30)" },
  { id: "b5", icon: "languages", label: "Communicate", value: "Tamil & English" },
];

const DEFAULT_BACKGROUND_DESC =
  "I am based in Sri Lanka and communicate in Tamil and English. My background combines software engineering studies, creative digital work, leadership experience, and a strong interest in AI, web development, and technology communities.";

const GOALS_DESC =
  "My career goals are focused on growing as a Software and AI Engineering professional, improving my software development skills, supporting tech communities, and continuing my academic journey toward a Master's degree.";

function goalBgIcon(name?: string | null) {
  switch ((name ?? "").toLowerCase()) {
    case "bot":
    case "robot":
    case "ai":
      return Bot;
    case "laptop":
    case "code":
      return Laptop;
    case "flag":
      return Flag;
    case "graduation-cap":
    case "graduation":
      return GraduationCap;
    case "cake":
    case "birthday":
      return Cake;
    case "user":
    case "gender":
      return User;
    case "globe":
    case "location":
      return Globe;
    case "languages":
    case "language":
    case "chat":
      return Languages;
    case "badge":
    case "name":
    case "name-tag":
      return BadgeCheck;
    default:
      return Sparkles;
  }
}

function GoalsAndBackground({ about }: { about: AboutRecord | null }) {
  const reduce = useReducedMotion();
  const goals = about?.goals && about.goals.length > 0 ? about.goals : DEFAULT_GOALS;
  const background =
    about?.background_details && about.background_details.length > 0
      ? about.background_details
      : DEFAULT_BACKGROUND;
  const bgDesc = about?.background_description || DEFAULT_BACKGROUND_DESC;

  const hover = reduce ? undefined : { y: -4, rotateX: 4, rotateY: -4, scale: 1.02 };

  return (
    <section id="goals-background" className="mt-14 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Goals &amp; <span className="text-gradient">Background</span>
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          A quick overview of my career goals, personal background, and learning direction.
        </p>
      </motion.div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        {/* Career Goals */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          whileHover={hover}
          style={{ transformStyle: "preserve-3d" }}
          className="relative glass-card p-6 overflow-hidden transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.35),0_0_50px_rgba(139,92,246,0.25)] hover:border-[#8B5CF6]/60"
        >
          <div
            aria-hidden
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, #38BDF8, transparent 70%)" }}
          />
          <div className="relative flex items-center gap-2 mb-4">
            <Target size={18} style={{ color: "var(--neon-blue)" }} />
            <h3 className="text-xl font-bold">Career Goals</h3>
          </div>
          <ul className="relative space-y-3">
            {goals.map((g, i) => {
              const Icon = goalBgIcon(g.icon);
              return (
                <motion.li
                  key={g.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={reduce ? undefined : { x: 4 }}
                  className="group flex items-start gap-3 rounded-xl p-3 border border-[var(--glass-border)] bg-background/30 backdrop-blur-sm hover:border-[#38BDF8]/50 transition-colors"
                >
                  <div className="relative shrink-0">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-lg opacity-60 group-hover:opacity-90 transition-opacity"
                      style={{
                        background: "conic-gradient(from 0deg, #38BDF8, #8B5CF6, #38BDF8)",
                        filter: "blur(5px)",
                      }}
                    />
                    <div
                      className="relative w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #38BDF8, #8B5CF6)",
                        boxShadow: "0 0 12px rgba(56,189,248,0.45)",
                      }}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gradient leading-tight">{g.title}</div>
                    <p className="text-sm text-muted-foreground mt-0.5">{g.value}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
          <p className="relative mt-5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {GOALS_DESC}
          </p>
        </motion.div>

        {/* Personal Background */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          whileHover={hover}
          style={{ transformStyle: "preserve-3d" }}
          className="relative glass-card p-6 overflow-hidden transition-shadow hover:shadow-[0_0_30px_rgba(139,92,246,0.35),0_0_50px_rgba(56,189,248,0.25)] hover:border-[#38BDF8]/60"
        >
          <div
            aria-hidden
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
          />
          <div className="relative flex items-center gap-2 mb-4">
            <User size={18} style={{ color: "var(--neon-purple)" }} />
            <h3 className="text-xl font-bold">Personal Background</h3>
          </div>
          <ul className="relative space-y-3">
            {background.map((b, i) => {
              const Icon = goalBgIcon(b.icon);
              return (
                <motion.li
                  key={b.id}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={reduce ? undefined : { x: -4 }}
                  className="group flex items-start gap-3 rounded-xl p-3 border border-[var(--glass-border)] bg-background/30 backdrop-blur-sm hover:border-[#8B5CF6]/50 transition-colors"
                >
                  <div className="relative shrink-0">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-lg opacity-60 group-hover:opacity-90 transition-opacity"
                      style={{
                        background: "conic-gradient(from 0deg, #8B5CF6, #38BDF8, #8B5CF6)",
                        filter: "blur(5px)",
                      }}
                    />
                    <div
                      className="relative w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #8B5CF6, #38BDF8)",
                        boxShadow: "0 0 12px rgba(139,92,246,0.45)",
                      }}
                    >
                      <Icon size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {b.label}
                    </div>
                    <p className="text-sm font-medium text-foreground mt-0.5">{b.value}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
          <p className="relative mt-5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {bgDesc}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function iconFor(name?: string | null) {
  switch ((name ?? "").toLowerCase()) {
    case "crown": return Crown;
    case "rocket": return Rocket;
    case "linkedin": return Linkedin;
    case "award": return Award;
    case "shield": return Shield;
    default: return Trophy;
  }
}

function AchievementsCard({ achievements }: { achievements: Achievement[] }) {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="achievements" className="mt-12 scroll-mt-24">
      <div className="relative glass-card p-5 sm:p-7 overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
        />
        <div className="relative flex items-center justify-between mb-5">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Achievements</h2>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1 text-sm text-gradient font-medium hover:opacity-80 transition-opacity"
          >
            {showAll ? "Show Less" : "View All"} <ArrowRight size={14} />
          </button>
        </div>

        <div className="relative space-y-3">
          {achievements.map((a, i) => (
            <AchievementRow key={a.id} a={a} index={i} expanded={showAll} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AchievementRow({ a, index, expanded }: { a: Achievement; index: number; expanded: boolean }) {
  const reduce = useReducedMotion();
  const FallbackIcon = iconFor(a.icon);
  const heading = [a.title, a.period && `(${a.period})`].filter(Boolean).join(" ");
  const fullHeading = a.organization ? `${heading} | ${a.organization}` : heading;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -2 }}
      className="group relative flex items-start gap-4 rounded-2xl p-4 border border-[var(--glass-border)] bg-background/30 backdrop-blur-sm hover:border-[#8B5CF6]/50 transition-colors"
    >
      <motion.div
        whileHover={reduce ? undefined : { rotate: 6, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 250, damping: 15 }}
        className="relative shrink-0"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, #38BDF8, #8B5CF6, #38BDF8)",
            filter: "blur(5px)",
            opacity: 0.6,
          }}
        />
        <div
          className="relative w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #38BDF8, #8B5CF6)",
            boxShadow: "0 0 14px rgba(56,189,248,0.45), 0 0 28px rgba(139,92,246,0.35)",
          }}
        >
          {a.logo_url ? (
            <img
              src={a.logo_url}
              alt={`${a.organization ?? a.title} logo`}
              className="w-8 h-8 object-contain rounded-full"
              loading="lazy"
            />
          ) : (
            <FallbackIcon size={20} className="text-white" />
          )}
        </div>
      </motion.div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm sm:text-base font-bold text-gradient leading-snug">
          {fullHeading}
        </h3>
        {a.duration && (
          <p className="mt-0.5 text-[11px] text-muted-foreground/80">Duration: {a.duration}</p>
        )}
        {a.description && (
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {a.description}
          </p>
        )}

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {a.contributions && a.contributions.length > 0 && (
              <div className="mt-3">
                <div className="text-xs font-semibold mb-1.5">Key Contributions</div>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                  {a.contributions.map((c, j) => <li key={j}>{c}</li>)}
                </ul>
              </div>
            )}
            {a.events && a.events.length > 0 && (
              <div className="mt-3">
                <div className="text-xs font-semibold mb-1.5">Events & Activities</div>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                  {a.events.map((e, j) => <li key={j}>{e}</li>)}
                </ul>
              </div>
            )}
            {a.skills && a.skills.length > 0 && (
              <div className="mt-3">
                <div className="text-xs font-semibold mb-1.5">Skills Gained</div>
                <div className="flex flex-wrap gap-1.5">
                  {a.skills.map((s, j) => (
                    <span
                      key={j}
                      className="text-[11px] px-2.5 py-1 rounded-full border border-[var(--glass-border)] bg-background/40"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {a.highlight && (
              <div className="mt-3 text-[11px] text-gradient font-semibold">{a.highlight}</div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

type Certificate = {
  id: string;
  title: string;
  provider: string;
  issued_date?: string | null;
  credential_id?: string | null;
  category: string;
  skills: string[];
  certificate_link?: string | null;
  verification_link?: string | null;
  certificate_image?: string | null;
  provider_logo?: string | null;
  featured: boolean;
};

function CertificatesSection({ certificates }: { certificates: Certificate[] }) {
  const [filter, setFilter] = useState<string>("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(certificates.map((c) => c.category)))],
    [certificates]
  );
  const filtered = filter === "All" ? certificates : certificates.filter((c) => c.category === filter);

  return (
    <section id="certificates" className="mt-16 scroll-mt-24">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Certificates & <span className="text-gradient">Learning</span>
        </h2>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Academic achievements, professional learning, and skill-based certificates.
        </p>
      </motion.div>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === c ? "btn-gradient" : "glass-card hover:scale-105"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c, i) => (
          <CertificateCard key={c.id} c={c} index={i} />
        ))}
      </div>
    </section>
  );
}

function CertificateCard({ c, index }: { c: Certificate; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 9) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6, rotateX: 4, rotateY: -4, scale: 1.02 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative glass-card p-5 flex flex-col overflow-hidden transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.35),0_0_50px_rgba(139,92,246,0.25)] hover:border-[#8B5CF6]/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "radial-gradient(circle at top right, rgba(139,92,246,0.15), transparent 60%)" }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="relative shrink-0">
          <span
            aria-hidden
            className="absolute inset-0 rounded-xl"
            style={{ background: "conic-gradient(from 0deg, #38BDF8, #8B5CF6, #38BDF8)", filter: "blur(6px)", opacity: 0.55 }}
          />
          <div
            className="relative w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #38BDF8, #8B5CF6)" }}
          >
            {c.provider_logo ? (
              <img src={c.provider_logo} alt={`${c.provider} logo`} className="w-9 h-9 object-contain rounded-md" loading="lazy" />
            ) : (
              <GraduationCap size={22} className="text-white" />
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] px-2 py-1 rounded-full bg-muted">{c.category}</span>
          {c.featured && <span className="text-[10px] px-2 py-1 rounded-full btn-gradient">Featured</span>}
        </div>
      </div>

      <h3 className="relative mt-4 text-base font-bold leading-snug text-gradient">{c.title}</h3>
      <p className="relative mt-1 text-sm text-muted-foreground">{c.provider}</p>

      <div className="relative mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground/90">
        {c.issued_date && <span>Issued: {c.issued_date}</span>}
        {c.credential_id && <span className="truncate max-w-[180px]" title={c.credential_id}>ID: {c.credential_id}</span>}
      </div>

      {c.skills?.length > 0 && (
        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {c.skills.slice(0, 5).map((s) => (
            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-[var(--glass-border)] bg-background/40">
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="relative mt-4 flex flex-wrap gap-2">
        {(() => {
          const href = c.certificate_link || "https://drive.google.com/drive/folders/1aPUnRnt3swgJdh8nS7bLgY0_iwYDkFXL?usp=sharing";
          return (
            <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="btn-gradient inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            aria-label={`Open ${c.title} certificate folder`}
          >
            <FolderOpen size={12} /> View Certificate
          </a>
          );
        })()}
        {c.verification_link && (
          <a
            href={c.verification_link}
            target="_blank"
            rel="noreferrer"
            className="glass-card inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:scale-105 transition-transform"
          >
            <ShieldCheck size={12} /> Verify
          </a>
        )}
      </div>
    </motion.article>
  );
}
