import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Briefcase, Calendar, Clock, Sparkles, Rocket, Crown, Globe, Megaphone, Palette, Shield } from "lucide-react";
import { useRef } from "react";
import { experienceQuery } from "@/lib/queries";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience | Thanus Theiventhiram — AarasTech Co-Founder" },
      { name: "description", content: "Professional experience of Thanus Theiventhiram — AarasTech Co-Founder, Student Council President, WordPress Developer, UI/UX Designer and Social Media Executive." },
      { property: "og:title", content: "Experience — Thanus Theiventhiram" },
      { property: "og:description", content: "AarasTech Co-Founder, WordPress Developer, UI/UX Designer and more." },
      { property: "og:url", content: "/experience" },
      { property: "og:image", content: "https://project--82797ab2-2006-4912-97de-e081757bf83b.lovable.app/og-image.png" },
      { name: "twitter:title", content: "Experience — Thanus Theiventhiram" },
      { name: "twitter:description", content: "Professional experience timeline." },
      { name: "twitter:image", content: "https://project--82797ab2-2006-4912-97de-e081757bf83b.lovable.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(experienceQuery),
  component: ExperiencePage,
});

function fallbackIcon(title: string, organization: string) {
  const t = (title + " " + organization).toLowerCase();
  if (t.includes("co-founder") || t.includes("founder")) return Rocket;
  if (t.includes("president") || t.includes("council")) return Crown;
  if (t.includes("wordpress")) return Globe;
  if (t.includes("advertis") || t.includes("marketing")) return Megaphone;
  if (t.includes("ui") || t.includes("ux") || t.includes("design")) return Palette;
  if (t.includes("prefect")) return Shield;
  return Briefcase;
}

function ExperiencePage() {
  const { data } = useSuspenseQuery(experienceQuery);
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
          Career Journey
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          <span className="text-gradient">Experience</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          A timeline of the roles, projects, and leadership that shaped my path.
        </p>
      </motion.div>

      <div ref={timelineRef} className="relative">
        {/* Spine */}
        <div
          aria-hidden
          className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent"
        />
        {/* Animated progress spine */}
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
          {data.map((e) => {
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid sm:grid-cols-2 sm:gap-10 items-start"
              >
                {/* Node */}
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

                {/* Card slot */}
                <div className="pl-12 sm:pl-12 sm:col-span-2">
                  <ExperienceCard exp={e} alignRight={false} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({
  exp,
  alignRight,
}: {
  exp: {
    id: string;
    title: string;
    organization: string;
    period: string;
    duration?: string | null;
    description?: string | null;
    skills?: string[] | null;
    logo_url?: string | null;
  };
  alignRight: boolean;
}) {
  const reduce = useReducedMotion();
  const FallbackIcon = fallbackIcon(exp.title, exp.organization);
  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6, rotateX: 2, rotateY: alignRight ? -2 : 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="group relative glass-card p-5 sm:p-6 overflow-hidden"
    >
      {/* Neon glow border */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(139,92,246,0.18))",
          maskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: 1,
        }}
      />
      {/* Corner orb */}
      <div
        aria-hidden
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
        style={{ background: "radial-gradient(circle, #8B5CF6, transparent 70%)" }}
      />

      <div className={alignRight ? "sm:text-right" : ""}>
        <div
          className={[
            "flex flex-wrap items-center gap-2 text-xs",
            alignRight ? "sm:justify-end" : "",
          ].join(" ")}
        >
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/60">
            <Calendar size={12} className="text-gradient" />
            <span className="text-foreground/80">{exp.period}</span>
          </span>
          {exp.duration && (
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/60">
              <Clock size={12} className="text-gradient" />
              <span className="text-foreground/80">{exp.duration}</span>
            </span>
          )}
        </div>

        <div
          className={[
            "mt-3 flex items-start gap-3",
            alignRight ? "sm:flex-row-reverse sm:text-right" : "",
          ].join(" ")}
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
                filter: "blur(6px)",
                opacity: 0.7,
              }}
            />
            <div
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-background border-2"
              style={{
                borderColor: "transparent",
                backgroundImage:
                  "linear-gradient(var(--background), var(--background)), linear-gradient(135deg, #38BDF8, #8B5CF6)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                boxShadow: "0 0 18px rgba(56,189,248,0.45), 0 0 36px rgba(139,92,246,0.35)",
              }}
            >
              {exp.logo_url ? (
                <img
                  src={exp.logo_url}
                  alt={`${exp.organization} logo`}
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-full"
                  loading="lazy"
                />
              ) : (
                <FallbackIcon size={22} className="text-gradient" />
              )}
            </div>
          </motion.div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold leading-tight">{exp.title}</h2>
            <div className="text-sm text-gradient font-semibold mt-1">{exp.organization}</div>
          </div>
        </div>

        {exp.description && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {exp.description}
          </p>
        )}

        {exp.skills && exp.skills.length > 0 && (
          <div
            className={[
              "mt-4 flex flex-wrap gap-1.5",
              alignRight ? "sm:justify-end" : "",
            ].join(" ")}
          >
            {exp.skills.map((s) => (
              <span
                key={s}
                className="text-[11px] px-2 py-1 rounded-full border border-[var(--glass-border)] bg-background/40 backdrop-blur-sm hover:scale-105 transition-transform"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}