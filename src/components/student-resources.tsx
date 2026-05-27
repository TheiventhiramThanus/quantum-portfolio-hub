import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Download, ArrowRight } from "lucide-react";
import canvaImg from "@/assets/resource-canva-pro.png";
import figmaImg from "@/assets/resource-figma-edu.png";
import linkedinImg from "@/assets/resource-linkedin-premium.png";

export type Resource = {
  id: string;
  title: string;
  image: string;
  description: string;
  features: string[];
  buttonText: string;
  href: string;
  action: "whatsapp" | "download" | "contact" | "external";
  download?: string;
};

export const studentResources: Resource[] = [
  {
    id: "canva",
    title: "Canva Pro Free",
    image: canvaImg,
    description:
      "Fill the contact form and your request will be sent on WhatsApp automatically.",
    features: [
      "Premium templates",
      "Brand kit and fonts",
      "Millions of photos and videos",
      "Premium elements",
      "Student-friendly guide",
    ],
    buttonText: "Request via Contact Form",
    action: "contact",
    href: "/contact?resource=canva",
  },
  {
    id: "figma",
    title: "Figma Edu Pro Guide PDF",
    image: figmaImg,
    description:
      "Download the complete step-by-step PDF guide to unlock Figma Edu Pro benefits.",
    features: [
      "Student verification guide",
      "Figma Edu benefits",
      "Step-by-step PDF guide",
      "Free access guidance",
      "Design learning support",
    ],
    buttonText: "Download Figma PDF",
    action: "external",
    href: "https://figma-edu-pro-guide-pdf-71.created.app/figma-edu-guide",
  },
  {
    id: "linkedin",
    title: "LinkedIn Premium Career Trial",
    image: linkedinImg,
    description:
      "Fill the contact form and your request will be sent on WhatsApp automatically.",
    features: [
      "Career profile support",
      "LinkedIn Premium trial guidance",
      "Referral method explanation",
      "Career growth support",
      "Networking tips",
    ],
    buttonText: "Request via Contact Form",
    action: "contact",
    href: "/contact?resource=linkedin",
  },
];

function ResourceCard({ r, index, redirectToServices = false }: { r: Resource; index: number; redirectToServices?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -8, rotateX: 4, rotateY: -4, scale: 1.02 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative glass-card overflow-hidden flex flex-col transition-shadow hover:shadow-[0_0_30px_rgba(56,189,248,0.4),0_0_60px_rgba(139,92,246,0.3)] hover:border-[#8B5CF6]/60"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "radial-gradient(circle at top, rgba(139,92,246,0.18), transparent 60%)" }}
      />

      <div className="relative aspect-square overflow-hidden">
        <img
          src={r.image}
          alt={r.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="relative flex flex-col flex-1 p-5">
        <h3 className="text-lg font-bold text-gradient leading-snug">{r.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.description}</p>

        <ul className="mt-3 space-y-1.5">
          {r.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "linear-gradient(135deg, #38BDF8, #8B5CF6)" }}
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {redirectToServices ? (
          <Link
            to="/services"
            hash="student-resources"
            className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
            style={{ background: "linear-gradient(135deg, #38BDF8, #8B5CF6)" }}
          >
            <ArrowRight size={16} />
            {r.buttonText}
          </Link>
        ) : (
        <a
          href={r.href}
          {...(r.action === "download"
            ? { download: r.download }
            : r.action === "whatsapp" || r.action === "external"
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]"
          style={{ background: "linear-gradient(135deg, #38BDF8, #8B5CF6)" }}
        >
          {r.action === "download" || r.action === "external" ? <Download size={16} /> : r.action === "contact" ? <ArrowRight size={16} /> : <MessageCircle size={16} />}
          {r.buttonText}
        </a>
        )}
      </div>
    </motion.article>
  );
}

export function StudentResources({
  compact = false,
  showHeader = true,
  showViewAll = false,
  redirectToServices = false,
}: {
  compact?: boolean;
  showHeader?: boolean;
  showViewAll?: boolean;
  redirectToServices?: boolean;
}) {
  return (
    <section id="student-resources" className="mt-16 scroll-mt-24">
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Free <span className="text-gradient">Student Resources</span>
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Helpful design and career resources for students, creators, and beginners.
          </p>
        </motion.div>
      )}

      <div className={`mt-8 grid gap-5 ${compact ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
        {studentResources.map((r, i) => (
          <ResourceCard key={r.id} r={r} index={i} redirectToServices={redirectToServices} />
        ))}
      </div>

      {showViewAll && (
        <div className="mt-6 flex justify-center">
          <Link
            to="/services"
            hash="student-resources"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-card text-sm font-semibold hover:scale-105 transition-transform"
          >
            View All Resources <ArrowRight size={14} />
          </Link>
        </div>
      )}

      <p className="mt-6 text-[11px] text-muted-foreground/80 max-w-3xl">
        Resources are shared for educational guidance only. Access depends on official
        eligibility, student verification, trials, or referral availability.
      </p>
    </section>
  );
}