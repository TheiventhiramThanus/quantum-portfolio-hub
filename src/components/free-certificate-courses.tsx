import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, GraduationCap } from "lucide-react";

export type FreeCourse = {
  id: string;
  title: string;
  provider: string;
  description: string;
  skills: string[];
  href: string;
  thumbnailImage: string;
};

export const freeCertificateCourses: FreeCourse[] = [
  {
    id: "saylor",
    title: "Free AI & Computer Science Courses",
    provider: "Saylor Academy",
    description:
      "Explore free online courses in computer science, artificial intelligence, business, professional development, and technology-related subjects through Saylor Academy.",
    skills: [
      "Artificial Intelligence Basics",
      "Computer Science",
      "Problem Solving",
      "Professional Development",
      "Digital Learning",
    ],
    href: "https://learn.saylor.org/",
    thumbnailImage: "/courses/saylor-academy.jpg",
  },
  {
    id: "mindluster",
    title: "Free Web Development & IT Courses",
    provider: "MindLuster",
    description:
      "Access free online courses related to web development, programming, graphic design, marketing, computer science, and IT skills.",
    skills: ["HTML", "CSS", "JavaScript", "Web Design", "Programming", "IT Skills"],
    href: "https://www.mindluster.com/free-online-courses",
    thumbnailImage: "/courses/mindluster.jpg",
  },
  {
    id: "hp-life",
    title: "Free Business & Digital Skills Courses",
    provider: "HP LIFE",
    description:
      "Learn business, entrepreneurship, marketing, professional development, communication, and digital skills through free HP LIFE courses.",
    skills: [
      "Business Skills",
      "Digital Skills",
      "Entrepreneurship",
      "Marketing",
      "Professional Development",
      "Communication",
    ],
    href: "https://www.life-global.org/",
    thumbnailImage: "/courses/hp-life.jpg",
  },
  {
    id: "alison",
    title: "Free Career & Professional Courses",
    provider: "Alison",
    description:
      "Explore free online courses and learning pathways in IT, business, management, marketing, personal development, language, and career-focused skills.",
    skills: [
      "Career Development",
      "IT Skills",
      "Business Management",
      "Marketing",
      "Professional Skills",
      "Personal Development",
    ],
    href: "https://alison.com/",
    thumbnailImage: "/courses/alison.jpg",
  },
  {
    id: "great-learning",
    title: "Free Professional Learning Courses",
    provider: "Great Learning Academy",
    description:
      "Learn professional and career-focused topics such as AI, data science, programming, digital marketing, cloud computing, and business skills.",
    skills: [
      "AI Basics",
      "Data Skills",
      "Programming",
      "Digital Marketing",
      "Cloud Basics",
      "Career Development",
    ],
    href: "https://www.mygreatlearning.com/academy",
    thumbnailImage: "/courses/great-learning.jpg",
  },
];

function CourseCard({ c, index, redirectToServices = false }: { c: FreeCourse; index: number; redirectToServices?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -8, rotateX: 4, rotateY: -4, scale: 1.02 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative glass-card overflow-hidden flex flex-col p-5 transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.4),0_0_60px_rgba(139,92,246,0.3)] hover:border-[#8B5CF6]/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "radial-gradient(circle at top, rgba(139,92,246,0.18), transparent 60%)" }}
      />

      <div className="relative -mx-5 -mt-5 mb-4 overflow-hidden rounded-t-2xl">
        <img
          src={c.thumbnailImage}
          alt={`${c.provider} course banner`}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(10,10,26,0.85))" }}
        />
        <div className="absolute bottom-3 left-4 right-4">
          <p className="text-[11px] uppercase tracking-wider text-white/70">{c.provider}</p>
          <h3 className="text-sm md:text-base font-bold text-white leading-snug truncate">
            {c.title}
          </h3>
        </div>
      </div>

      <div className="relative flex items-start gap-3">
        <div
          className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center text-white"
          style={{ background: "linear-gradient(135deg, #38BDF8, #8B5CF6)" }}
        >
          <GraduationCap size={20} />
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
      </div>

      

      <div className="relative mt-3 flex flex-wrap gap-1.5">
        {c.skills.map((s) => (
          <span
            key={s}
            className="text-[11px] px-2 py-1 rounded-full border border-border/60 bg-background/40 text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      {redirectToServices ? (
      <Link
        to="/services"
        hash="free-certificate-courses"
        className="relative mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
        style={{ background: "linear-gradient(135deg, #38BDF8, #8B5CF6)" }}
      >
        <ExternalLink size={16} />
        Visit Course Website
      </Link>
      ) : (
      <a
        href={c.href}
        target="_blank"
        rel="noreferrer"
        className="relative mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
        style={{ background: "linear-gradient(135deg, #38BDF8, #8B5CF6)" }}
      >
        <ExternalLink size={16} />
        Visit Course Website
      </a>
      )}
    </motion.article>
  );
}

export function FreeCertificateCourses({
  preview = false,
  showHeader = true,
  showViewAll = false,
  redirectToServices = false,
}: {
  preview?: boolean;
  showHeader?: boolean;
  showViewAll?: boolean;
  redirectToServices?: boolean;
}) {
  const items = preview ? freeCertificateCourses.slice(0, 3) : freeCertificateCourses;
  return (
    <section id="free-certificate-courses" className="mt-16 scroll-mt-24">
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Free <span className="text-gradient">Certificate Courses</span>
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Free learning platforms and certificate courses for students to improve digital,
            technical, business, and career skills.
          </p>
        </motion.div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <CourseCard key={c.id} c={c} index={i} redirectToServices={redirectToServices} />
        ))}
      </div>

      {showViewAll && (
        <div className="mt-6 flex justify-center">
          <Link
            to="/services"
            hash="free-certificate-courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card text-sm font-semibold hover:scale-105 transition-transform"
          >
            View All Courses <ExternalLink size={14} />
          </Link>
        </div>
      )}

      <p className="mt-6 text-[11px] text-muted-foreground/80 max-w-3xl">
        Courses and certificates depend on each platform's official availability, rules, and
        eligibility. This section is shared for educational guidance only.
      </p>
    </section>
  );
}