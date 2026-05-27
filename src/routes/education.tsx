import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { GraduationCap, Calendar, Clock, Award, BookOpen, School, Building2, Sparkles } from "lucide-react";
import { useRef } from "react";
import { educationQuery } from "@/lib/queries";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education | Thanus Theiventhiram — Software Engineering" },
      { name: "description", content: "Academic background of Thanus Theiventhiram — BEng (Hons) Software Engineering, HND in Computing with Distinction, G.C.E A/L and O/L from Sri Lanka." },
      { property: "og:title", content: "Education — Thanus Theiventhiram" },
      { property: "og:description", content: "BEng (Hons) Software Engineering, HND Distinction and full academic timeline." },
      { property: "og:url", content: "/education" },
      { property: "og:image", content: "https://project--82797ab2-2006-4912-97de-e081757bf83b.lovable.app/og-image.png" },
      { name: "twitter:title", content: "Education — Thanus Theiventhiram" },
      { name: "twitter:description", content: "Software Engineering academic timeline." },
      { name: "twitter:image", content: "https://project--82797ab2-2006-4912-97de-e081757bf83b.lovable.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/education" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(educationQuery),
  component: EducationPage,
});

type Edu = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  duration?: string | null;
  grade?: string | null;
  description?: string | null;
  skills?: string[] | null;
  logo_url?: string | null;
};

function fallbackIcon(degree: string, institution: string) {
  const d = (degree + " " + institution).toLowerCase();
  if (d.includes("ordinary")) return BookOpen;
  if (d.includes("advanced") || d.includes("college") || d.includes("school")) return School;
  if (d.includes("diploma") || d.includes("hnd")) return GraduationCap;
  if (d.includes("bachelor") || d.includes("university") || d.includes("uni")) return Building2;
  return GraduationCap;
}

function EducationPage() {
  const { data } = useSuspenseQuery(educationQuery);
  const reduce = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-14 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs text-muted-foreground mb-4">
          <Sparkles size={12} className="text-gradient" />
          Academic Journey
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          <span className="text-gradient">Education</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          A year-by-year timeline of the schools, programs, and qualifications that shaped my foundation.
        </p>
      </motion.div>

      <div ref={timelineRef} className="relative">
        <div
          aria-hidden
          className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"
        />
        <motion.div
          aria-hidden
          style={{ scaleY: reduce ? 1 : progress, transformOrigin: "top" }}
          className="absolute left-4 top-0 bottom-0 w-[2px] rounded-full"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: "linear-gradient(180deg, #38BDF8, #8B5CF6)",
              boxShadow: "0 0 12px rgba(139,92,246,0.55), 0 0 24px rgba(56,189,248,0.35)",
            }}
          />
        </motion.div>

        <div className="space-y-10 sm:space-y-14">
          {(data as Edu[]).map((e, i) => {
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative items-start"
              >
                <div className="absolute left-4 -translate-x-1/2 top-6 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                    className="relative"
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #38BDF8, #8B5CF6)",
                        boxShadow: "0 0 14px rgba(56,189,248,0.8), 0 0 28px rgba(139,92,246,0.55)",
                      }}
                    />
                    <span className="absolute inset-0 rounded-full animate-ping bg-[#8B5CF6]/40" />
                  </motion.div>
                </div>

                <div className="pl-12">
                  <EducationCard edu={e} alignRight={false} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EducationCard({ edu, alignRight }: { edu: Edu; alignRight: boolean }) {
  const reduce = useReducedMotion();
  const FallbackIcon = fallbackIcon(edu.degree, edu.institution);

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6, rotateX: 2, rotateY: alignRight ? -2 : 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative glass-card p-5 sm:p-6 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
        style={{ background: "radial-gradient(circle, #38BDF8, transparent 70%)" }}
      />

      <div className={["flex items-start gap-4", alignRight ? "sm:flex-row-reverse sm:text-right" : ""].join(" ")}>
        {/* Logo */}
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
              filter: "blur(6px)",
              opacity: 0.7,
            }}
          />
          <div
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-background border-2"
            style={{
              borderColor: "transparent",
              backgroundImage:
                "linear-gradient(var(--background), var(--background)), linear-gradient(135deg, #38BDF8, #8B5CF6)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "0 0 18px rgba(56,189,248,0.45), 0 0 36px rgba(139,92,246,0.35)",
            }}
          >
            {edu.logo_url ? (
              <img
                src={edu.logo_url}
                alt={`${edu.institution} logo`}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full"
                loading="lazy"
              />
            ) : (
              <FallbackIcon size={26} className="text-gradient" />
            )}
          </div>
        </motion.div>

        <div className="flex-1 min-w-0">
          <div className={["flex flex-wrap items-center gap-2 text-xs", alignRight ? "sm:justify-end" : ""].join(" ")}>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/60">
              <Calendar size={12} className="text-gradient" />
              <span className="text-foreground/80">{edu.period}</span>
            </span>
            {edu.duration && (
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/60">
                <Clock size={12} className="text-gradient" />
                <span className="text-foreground/80">{edu.duration}</span>
              </span>
            )}
          </div>

          <h2 className="mt-2 text-lg sm:text-xl font-bold leading-tight break-words hyphens-auto">{edu.degree}</h2>
          <div className="text-sm text-gradient font-semibold mt-1 break-words">{edu.institution}</div>

          {edu.grade && (
            <div className={["mt-3 flex flex-wrap gap-1.5", alignRight ? "sm:justify-end" : ""].join(" ")}>
              <span className="inline-flex items-start gap-1.5 text-xs px-2.5 py-1 rounded-2xl bg-gradient-to-r from-[#38BDF8]/15 to-[#8B5CF6]/15 border border-[var(--glass-border)] max-w-full">
                <Award size={12} className="text-gradient mt-0.5 shrink-0" />
                <span className="font-medium break-words text-left leading-snug">{edu.grade}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {edu.description && (
        <p className={["mt-4 text-sm leading-relaxed text-muted-foreground", alignRight ? "sm:text-right" : ""].join(" ")}>
          {edu.description}
        </p>
      )}

      {edu.skills && edu.skills.length > 0 && (
        <div className={["mt-4 flex flex-wrap gap-1.5", alignRight ? "sm:justify-end" : ""].join(" ")}>
          {edu.skills.map((s) => (
            <span
              key={s}
              className="text-[11px] px-2 py-1 rounded-full border border-[var(--glass-border)] bg-background/40 backdrop-blur-sm hover:scale-105 transition-transform"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}