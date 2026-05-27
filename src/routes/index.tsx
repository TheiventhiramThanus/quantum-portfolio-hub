import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import {
  Github, Linkedin, Mail, Twitter, Instagram, Download, ArrowRight,
  MessageSquare, ShieldCheck, Crown, GraduationCap,
} from "lucide-react";
import profileImg from "@/assets/profile-hero.png";
import { lazy, Suspense } from "react";

const StudentResources = lazy(() =>
  import("@/components/student-resources").then((m) => ({ default: m.StudentResources }))
);
const FreeCertificateCourses = lazy(() =>
  import("@/components/free-certificate-courses").then((m) => ({ default: m.FreeCertificateCourses }))
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thanus Theiventhiram | Full Stack Developer & UI/UX Designer" },
      { name: "description", content: "Portfolio of Thanus Theiventhiram — BEng (Hons) Software Engineering Graduate, AarasTech Co-Founder, Full Stack Developer & UI/UX Designer from Sri Lanka." },
      { property: "og:title", content: "Thanus Theiventhiram | Full Stack Developer & UI/UX Designer" },
      { property: "og:description", content: "Software Engineering Graduate, AarasTech Co-Founder, Full Stack, WordPress, IoT and Game Developer from Jaffna, Sri Lanka." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "https://project--82797ab2-2006-4912-97de-e081757bf83b.lovable.app/og-image.png" },
      { name: "twitter:title", content: "Thanus Theiventhiram | Full Stack Developer & UI/UX Designer" },
      { name: "twitter:description", content: "Portfolio of Thanus Theiventhiram — AarasTech Co-Founder, Full Stack, WordPress, IoT & Game Developer." },
      { name: "twitter:image", content: "https://project--82797ab2-2006-4912-97de-e081757bf83b.lovable.app/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      // Preload the LCP hero portrait so it paints earlier
      { rel: "preload", as: "image", href: profileImg, fetchPriority: "high" },
    ],
  }),
  component: Index,
});

type Stat = { value?: string; label: string; icon?: typeof GraduationCap };
const stats: Stat[] = [
  { value: "30+", label: "Projects" },
  { value: "10+", label: "Services" },
  { value: "3K+", label: "LinkedIn Followers" },
  { label: "HND Completed with Distinction", icon: GraduationCap },
];

const socials = [
  { href: "https://linkedin.com/in/theiventhiram-thanus", icon: Linkedin, label: "Thanus Theiventhiram on LinkedIn" },
  { href: "https://github.com/TheiventhiramThanus", icon: Github, label: "Thanus Theiventhiram on GitHub" },
  { href: "https://x.com/thanus1216", icon: Twitter, label: "Thanus Theiventhiram on X (Twitter)" },
  { href: "https://www.instagram.com/theiventhiram_thanus/", icon: Instagram, label: "Thanus Theiventhiram on Instagram" },
  { href: "mailto:thanustheiventhiram@gmail.com", icon: Mail, label: "Email Thanus Theiventhiram" },
];

const techIcons = [
  { name: "HTML5",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",          x: "12%", y: "2%",  d: "0s" },
  { name: "CSS3",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",            x: "35%", y: "-4%", d: ".4s" },
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",x: "62%", y: "2%",  d: ".8s" },
  { name: "React",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",          x: "84%", y: "18%", d: "1.2s" },
  { name: "MongoDB",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",      x: "-2%", y: "22%", d: ".2s" },
  { name: "Node.js",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",        x: "90%", y: "40%", d: ".6s" },
  { name: "PHP",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",              x: "0%",  y: "46%", d: "1s",  inverse: true },
  { name: "Express",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",      x: "92%", y: "60%", d: "1.4s" },
  { name: "WordPress",  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",     x: "2%",  y: "66%", d: ".3s" },
  { name: "C#",         src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",        x: "82%", y: "76%", d: ".7s" },
  { name: "Figma",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",          x: "22%", y: "84%", d: "1.1s" },
  { name: "Unity",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",          x: "6%",  y: "82%", d: ".5s",  inverse: true },
  { name: "Python",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",        x: "68%", y: "90%", d: ".9s" },
  { name: "Firebase",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",       x: "88%", y: "92%", d: "1.3s" },
];

const achievementsPreview = [
  {
    id: "president",
    icon: Crown,
    logo: "/logos/esoft-emcj.png",
    title: "President (February 2025 – April 2026) | Student Council ESOFT UNI - Jaffna",
    desc: "Led the student council, designing engaging visual content and actively supporting initiatives to enhance collaboration and creativity.",
  },
  {
    id: "prefect",
    icon: ShieldCheck,
    logo: "/logos/chc-prefect.png",
    title: "Prefect (2021 – 2023) | Chavakachcheri Hindu College",
    desc: "Supported student discipline and organized school events, strengthening leadership and communication skills.",
  },
];

function Index() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-4 pb-8 md:pt-10 md:pb-16 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[calc(100vh-5rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <p className="text-sm font-medium text-muted-foreground tracking-wide">Hi, I'm</p>

          <h1 className="mt-0.5 text-2xl sm:text-3xl md:text-4xl lg:text-[2.4rem] font-black tracking-tight text-foreground">
            Thanus Theiventhiram
          </h1>

          <h2 className="mt-1 sm:text-2xl md:text-3xl lg:text-[1.9rem] font-bold leading-[1.2] text-gradient text-lg">
            Completed the Bachelor of Engineering (Hons) in Software Engineering
          </h2>

          {/* Premium badge */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-yellow-500/20">
            <Crown size={16} className="text-[#c9a84c]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#c9a84c] to-[#f0d78c] bg-clip-text text-transparent">AarasTech Co-Founder</span>
          </div>

          {/* Rotating roles */}
          <div className="mt-4 flex justify-center lg:justify-start">
            <div className="role-rotator text-xs sm:text-sm font-medium text-muted-foreground tracking-wide w-full max-w-xs lg:max-w-sm text-center lg:text-left">
              <span>Full Stack Developer</span>
              <span>UI/UX Designer</span>
              <span>WordPress Developer</span>
              <span>IoT Developer</span>
              <span>Game Developer</span>
              <span>Social Media Executive</span>
            </div>
          </div>

          <p className="mt-6 text-sm md:text-[0.95rem] text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-[1.8]">
            I create modern digital solutions by combining software engineering, full-stack development, UI/UX design, IoT, game development, and AI-powered content. My focus is on building responsive websites, practical web applications, creative digital experiences, and real-world technology solutions that are clean, scalable, and user-friendly.
          </p>

          <div className="mt-7 grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 max-w-md mx-auto lg:mx-0">
            <Link to="/projects" className="btn-gradient inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl text-sm font-semibold">
              View Projects
            </Link>
            <Link to="/services" className="glass-card inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 text-sm font-semibold hover:scale-105 transition-transform">
              View Services
            </Link>
            <Link to="/contact" className="glass-card inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 text-sm font-semibold hover:scale-105 transition-transform">
              <MessageSquare size={16} /> Contact Me
            </Link>
            <a href="/Thanus-Theiventhiram-CV.pdf" download="Thanus-Theiventhiram-CV.pdf" className="glass-card inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 text-sm font-semibold hover:scale-105 transition-transform">
              <Download size={16} /> Download CV
            </a>
          </div>

          <div className="mt-7 flex gap-2.5 sm:gap-3 justify-center lg:justify-start flex-wrap">
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="p-2.5 sm:p-3 rounded-full glass-card hover:scale-110 transition-transform">
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Hero visual: portrait + floating tech icons + podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[420px] lg:max-w-[520px] aspect-square mx-auto">
            {/* Soft glow background */}
            <div
              className="absolute inset-[12%] rounded-full blur-3xl opacity-60"
              style={{ background: "var(--gradient-primary)" }}
            />
            {/* Neon rings */}
            <div
              className="absolute inset-[18%] rounded-full border-2 neon-ring neon-ring-blue"
              style={{ borderColor: "var(--neon-blue)", boxShadow: "0 0 40px var(--neon-blue), inset 0 0 40px rgba(56,189,248,0.35)" }}
            />
            <div
              className="absolute inset-[14%] rounded-full border border-dashed neon-ring neon-ring-purple"
              style={{ borderColor: "var(--neon-purple)", opacity: 0.55 }}
            />
            {/* Portrait disc */}
            <div
              className="absolute inset-[22%] rounded-full overflow-hidden glass-card flex items-center justify-center hero-portrait"
            >
              <img
                src={profileImg}
                alt="Theiventhiram Thanus"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={520}
                height={520}
              />
            </div>
            {/* Floating tech badges */}
            {techIcons.map((t, i) => (
              <div
                key={i}
                className={`tech-badge ${i >= 6 ? "tech-badge-extra" : ""}`}
                style={{
                  left: `clamp(0px, ${t.x}, calc(100% - var(--tb-size, 40px)))`,
                  top: `clamp(0px, ${t.y}, calc(100% - var(--tb-size, 40px)))`,
                  animation: `${t.inverse ? "float-y-rev" : "float-y"} ${4 + (i % 4)}s ease-in-out infinite`,
                  animationDelay: t.d,
                }}
                title={t.name}
              >
                <img src={t.src} alt={`${t.name} technology icon`} loading="lazy" decoding="async" width={32} height={32} />
              </div>
            ))}
            {/* Glowing podium */}
            <div className="podium" />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="glass-card p-5 text-center flex flex-col items-center justify-center min-h-[120px] cursor-default group relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "var(--gradient-primary)", filter: "blur(40px)", opacity: 0 }}
              />
              {s.icon ? (
                <>
                  <s.icon size={28} style={{ color: "var(--neon-purple)" }} className="mb-2 transition-transform group-hover:scale-110" />
                  <div className="text-xs font-semibold leading-tight">{s.label}</div>
                </>
              ) : (
                <>
                  <div className="text-3xl font-black text-gradient">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About + Achievements */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid lg:grid-cols-2 gap-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          whileHover={{ y: -4 }}
          className="glass-card p-6 transition-shadow hover:shadow-[0_20px_60px_-20px_rgba(56,189,248,0.45)]"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--neon-blue)", boxShadow: "0 0 12px var(--neon-blue)" }} />
            <h3 className="text-xl font-bold">About Me</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I am a passionate software engineer and Co-Founder from Jaffna, Sri Lanka. I have hands-on experience in full-stack development, MERN stack, WordPress development, UI/UX design, IoT projects, Unity game development, AI tools, SEO, digital marketing, and content creation. I enjoy building clean, modern, user-friendly, and scalable digital solutions.
          </p>
          <Link to="/about" className="btn-gradient mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold">
            Know More About Me <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          whileHover={{ y: -4 }}
          className="glass-card p-6 transition-shadow hover:shadow-[0_20px_60px_-20px_rgba(139,92,246,0.45)]"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Achievements</h3>
            <Link to="/about" hash="achievements" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-3"
          >
            {achievementsPreview.map((a, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ x: 4, scale: 1.01 }}
                className="glass-card p-4 flex gap-3"
              >
                <div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center overflow-hidden p-[2px]"
                  style={{ background: "var(--gradient-primary)", boxShadow: "0 0 18px rgba(139,92,246,0.5)" }}
                >
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                    {a.logo ? (
                      <img
                        src={a.logo}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <a.icon size={18} style={{ color: "var(--neon-purple)" }} />
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gradient">{a.title}</div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Free Student Resources */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <Suspense fallback={<div className="text-center py-12">Loading resources...</div>}>
          <StudentResources showViewAll redirectToServices />
          <FreeCertificateCourses preview showViewAll redirectToServices />
        </Suspense>
      </section>
    </div>
  );
}