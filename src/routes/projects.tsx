import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Car,
  Clapperboard,
  Code2,
  ExternalLink,
  Figma,
  FileText,
  Gamepad2,
  Github,
  GraduationCap,
  HeartPulse,
  Home,
  Image,
  Linkedin,
  MonitorSmartphone,
  Palette,
  RadioTower,
  ScrollText,
  ServerCog,
  ShoppingCart,
  Smartphone,
  Stethoscope,
  Trees,
  type LucideIcon,
} from "lucide-react";
import { useState, useMemo } from "react";
import { projectsQuery } from "@/lib/queries";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | Thanus Theiventhiram - Portfolio" },
      { name: "description", content: "Explore 30+ projects by Thanus Theiventhiram across Full Stack development (MERN), IoT, Unity Game Development, UI/UX Design, WordPress and AI." },
      { property: "og:title", content: "Projects - Thanus Theiventhiram" },
      { property: "og:description", content: "30+ Full Stack, IoT, Game, UI/UX and WordPress projects." },
      { property: "og:url", content: absoluteUrl("/projects") },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: "Projects - Thanus Theiventhiram" },
      { name: "twitter:description", content: "Full Stack, IoT, Game, UI/UX and WordPress portfolio." },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/projects") }],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: ProjectsPage,
});

type ProjectIconConfig = {
  icon: LucideIcon;
  gradient: string;
  glow: string;
};

const PROJECT_ICON_RULES: Array<{ match: string[]; config: ProjectIconConfig }> = [
  { match: ["ai", "chatbot", "machine learning", "ml", "resume analyzer", "career guidance"], config: { icon: BrainCircuit, gradient: "linear-gradient(135deg, #22d3ee, #6366f1)", glow: "rgba(34, 211, 238, 0.42)" } },
  { match: ["iot", "smart", "sensor", "automation", "tracking", "attendance"], config: { icon: RadioTower, gradient: "linear-gradient(135deg, #34d399, #0ea5e9)", glow: "rgba(52, 211, 153, 0.42)" } },
  { match: ["game", "unity", "enemy", "2d", "3d"], config: { icon: Gamepad2, gradient: "linear-gradient(135deg, #f97316, #ec4899)", glow: "rgba(249, 115, 22, 0.44)" } },
  { match: ["ui", "ux", "figma", "prototype", "design", "mockup"], config: { icon: Figma, gradient: "linear-gradient(135deg, #a855f7, #f43f5e)", glow: "rgba(168, 85, 247, 0.45)" } },
  { match: ["wordpress", "cms", "blog"], config: { icon: Palette, gradient: "linear-gradient(135deg, #38bdf8, #2563eb)", glow: "rgba(56, 189, 248, 0.42)" } },
  { match: ["ecommerce", "e-commerce", "shop", "store", "cart"], config: { icon: ShoppingCart, gradient: "linear-gradient(135deg, #f59e0b, #ef4444)", glow: "rgba(245, 158, 11, 0.42)" } },
  { match: ["portfolio", "personal", "profile"], config: { icon: MonitorSmartphone, gradient: "linear-gradient(135deg, #06b6d4, #8b5cf6)", glow: "rgba(6, 182, 212, 0.42)" } },
  { match: ["dashboard", "admin", "management", "system", "mern", "full stack"], config: { icon: ServerCog, gradient: "linear-gradient(135deg, #10b981, #6366f1)", glow: "rgba(16, 185, 129, 0.42)" } },
  { match: ["student", "college", "school", "campus", "education", "learning"], config: { icon: GraduationCap, gradient: "linear-gradient(135deg, #facc15, #22c55e)", glow: "rgba(250, 204, 21, 0.4)" } },
  { match: ["hospital", "health", "medical", "doctor", "patient"], config: { icon: Stethoscope, gradient: "linear-gradient(135deg, #14b8a6, #ef4444)", glow: "rgba(20, 184, 166, 0.42)" } },
  { match: ["vehicle", "rental", "car", "transport"], config: { icon: Car, gradient: "linear-gradient(135deg, #f97316, #0ea5e9)", glow: "rgba(249, 115, 22, 0.42)" } },
  { match: ["real estate", "house", "home", "property"], config: { icon: Home, gradient: "linear-gradient(135deg, #84cc16, #06b6d4)", glow: "rgba(132, 204, 22, 0.42)" } },
  { match: ["cv", "resume", "document", "report"], config: { icon: FileText, gradient: "linear-gradient(135deg, #3b82f6, #f97316)", glow: "rgba(59, 130, 246, 0.42)" } },
  { match: ["poster", "social media", "content", "creative", "image"], config: { icon: Image, gradient: "linear-gradient(135deg, #ec4899, #facc15)", glow: "rgba(236, 72, 153, 0.42)" } },
  { match: ["movie", "video", "media", "stream"], config: { icon: Clapperboard, gradient: "linear-gradient(135deg, #ef4444, #8b5cf6)", glow: "rgba(239, 68, 68, 0.42)" } },
  { match: ["ngo", "green", "environment", "nature"], config: { icon: Trees, gradient: "linear-gradient(135deg, #22c55e, #65a30d)", glow: "rgba(34, 197, 94, 0.42)" } },
  { match: ["mobile", "app", "android", "ios"], config: { icon: Smartphone, gradient: "linear-gradient(135deg, #06b6d4, #f43f5e)", glow: "rgba(6, 182, 212, 0.42)" } },
  { match: ["business", "company", "crm"], config: { icon: BriefcaseBusiness, gradient: "linear-gradient(135deg, #64748b, #22c55e)", glow: "rgba(100, 116, 139, 0.42)" } },
];

const FALLBACK_PROJECT_ICONS: ProjectIconConfig[] = [
  { icon: Code2, gradient: "linear-gradient(135deg, #38bdf8, #8b5cf6)", glow: "rgba(56, 189, 248, 0.42)" },
  { icon: Bot, gradient: "linear-gradient(135deg, #22c55e, #14b8a6)", glow: "rgba(34, 197, 94, 0.42)" },
  { icon: ScrollText, gradient: "linear-gradient(135deg, #f59e0b, #ec4899)", glow: "rgba(245, 158, 11, 0.42)" },
  { icon: HeartPulse, gradient: "linear-gradient(135deg, #ef4444, #06b6d4)", glow: "rgba(239, 68, 68, 0.42)" },
];

function projectIconFor(
  project: {
    title: string;
    description?: string | null;
    category?: string | null;
    technologies?: string[] | null;
  },
  index: number,
) {
  const searchable = [
    project.title,
    project.description,
    project.category,
    ...(project.technologies ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    PROJECT_ICON_RULES.find((rule) => rule.match.some((word) => searchable.includes(word)))?.config ??
    FALLBACK_PROJECT_ICONS[index % FALLBACK_PROJECT_ICONS.length]
  );
}

function ProjectsPage() {
  const { data } = useSuspenseQuery(projectsQuery);
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(data.map((p) => p.category)))],
    [data]
  );
  const filtered = filter === "All" ? data : data.filter((p) => p.category === filter);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-black">
          My <span className="text-gradient">Projects</span>
        </h1>
        <p className="mt-3 text-muted-foreground">{data.length} projects shipped across full-stack, IoT, game dev, UI/UX and more.</p>
      </motion.div>

      <div className="mt-8 flex flex-wrap gap-2">
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

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p, i) => {
          const iconConfig = projectIconFor(p, i);
          const Icon = iconConfig.icon;

          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 9) * 0.04 }}
              className="glass-card p-5 flex flex-col hover:scale-[1.02] transition-transform relative overflow-hidden group"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl opacity-25 transition-opacity group-hover:opacity-45"
                style={{ background: iconConfig.glow }}
              />
              <div className="relative flex items-start justify-between gap-3">
                <div
                  className="h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center shadow-lg ring-1 ring-white/15 transition-transform group-hover:scale-110"
                  style={{
                    background: iconConfig.gradient,
                    boxShadow: `0 0 28px ${iconConfig.glow}`,
                  }}
                  aria-hidden
                >
                  <Icon size={24} className="text-white drop-shadow-sm" strokeWidth={2.2} />
                </div>
                <div className="flex flex-wrap items-start justify-end gap-2 min-w-0">
                  <span className="text-xs px-2 py-1 rounded-full bg-muted">{p.category}</span>
                  {p.featured && <span className="text-xs px-2 py-1 rounded-full btn-gradient">Featured</span>}
                </div>
              </div>
              <h2 className="relative mt-4 text-lg font-semibold leading-snug">{p.title}</h2>
              <p className="relative mt-2 text-sm text-muted-foreground flex-1">{p.description}</p>
              {p.technologies?.length > 0 && (
                <div className="relative mt-3 flex flex-wrap gap-1">
                  {p.technologies.slice(0, 5).map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted">{t}</span>
                  ))}
                </div>
              )}
              <div className="relative mt-4 flex items-center gap-3 text-muted-foreground">
                {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground"><Github size={16} /></a>}
                {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" aria-label="Live" className="hover:text-foreground"><ExternalLink size={16} /></a>}
                {p.linkedin_url && <a href={p.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin size={16} /></a>}
                {p.behance_url && <a href={p.behance_url} target="_blank" rel="noreferrer" aria-label="Behance" className="hover:text-foreground"><ExternalLink size={16} /></a>}
                {p.portfolio_url && <a href={p.portfolio_url} target="_blank" rel="noreferrer" aria-label="Portfolio" className="hover:text-foreground"><ExternalLink size={16} /></a>}
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

