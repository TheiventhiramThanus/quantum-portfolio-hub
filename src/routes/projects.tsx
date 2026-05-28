import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Github, ExternalLink, Linkedin } from "lucide-react";
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
        {filtered.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 9) * 0.04 }}
            className="glass-card p-5 flex flex-col hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-muted">{p.category}</span>
              {p.featured && <span className="text-xs px-2 py-1 rounded-full btn-gradient">Featured</span>}
            </div>
            <h2 className="mt-3 text-lg font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground flex-1">{p.description}</p>
            {p.technologies?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {p.technologies.slice(0, 5).map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted">{t}</span>
                ))}
              </div>
            )}
            <div className="mt-4 flex items-center gap-3 text-muted-foreground">
              {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground"><Github size={16} /></a>}
              {p.live_url && <a href={p.live_url} target="_blank" rel="noreferrer" aria-label="Live" className="hover:text-foreground"><ExternalLink size={16} /></a>}
              {p.linkedin_url && <a href={p.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin size={16} /></a>}
              {p.behance_url && <a href={p.behance_url} target="_blank" rel="noreferrer" aria-label="Behance" className="hover:text-foreground"><ExternalLink size={16} /></a>}
              {p.portfolio_url && <a href={p.portfolio_url} target="_blank" rel="noreferrer" aria-label="Portfolio" className="hover:text-foreground"><ExternalLink size={16} /></a>}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

