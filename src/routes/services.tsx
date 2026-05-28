import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Globe, Image as ImageIcon, GraduationCap, FileText } from "lucide-react";
import { StudentResources } from "@/components/student-resources";
import { FreeCertificateCourses } from "@/components/free-certificate-courses";
import { absoluteUrl, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Web Development & Design - Thanus Theiventhiram" },
      { name: "description", content: "Services by Thanus Theiventhiram - Website development, WordPress, UI/UX design, AI posters, academic project support and CV creation in Jaffna, Sri Lanka." },
      { property: "og:title", content: "Services - Thanus Theiventhiram" },
      { property: "og:description", content: "Web development, WordPress, UI/UX, AI posters, academic support and CV creation." },
      { property: "og:url", content: absoluteUrl("/services") },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: "Services - Thanus Theiventhiram" },
      { name: "twitter:description", content: "Web development, WordPress, UI/UX, AI and academic support." },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/services") }],
  }),
  component: ServicesPage,
});

const WA_NUMBER = "94752920381";
const wa = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Modern, responsive, and professional websites for individuals, students, startups, businesses, and organizations. Clean layouts, mobile-friendly pages, smooth navigation, and a strong online presence.",
    includes: [
      "Personal portfolio websites",
      "Business websites",
      "Service websites",
      "Landing pages",
      "WordPress websites",
      "Student project websites",
      "Responsive frontend designs",
      "Basic full-stack web systems",
    ],
    pricingNote:
      "Price depends on the number of pages, design style, features, and deadline.",
    waMessage:
      "Hi Thanus, I'm interested in your website development service. Please send me the price details.",
  },
  {
    icon: ImageIcon,
    title: "AI Poster Creation",
    description:
      "High-quality AI-powered posters and digital creatives for social media, businesses, events, products, personal branding, and promotions. Modern, attractive designs suitable for online platforms.",
    includes: [
      "AI-generated posters",
      "Social media posts",
      "Business promotion posters",
      "Event posters",
      "Product posters",
      "Instagram story designs",
      "YouTube thumbnails",
      "Facebook and TikTok visuals",
      "Branding creatives",
    ],
    pricingNote:
      "Price depends on the number of designs, design quality, size, and delivery time.",
    waMessage:
      "Hi Thanus, I'm interested in your AI poster creation service. Please send me the price details.",
  },
  {
    icon: GraduationCap,
    title: "College & University Assignment / Project Support",
    description:
      "Paid academic guidance and project support for college and university students - project ideas, documentation structure, report formatting, presentation content, system planning, and final year project concept development.",
    includes: [
      "Assignment guidance",
      "Project idea development",
      "Documentation structure",
      "Report formatting support",
      "Presentation slide content",
      "Research topic suggestions",
      "Final year project ideas",
      "Project proposal guidance",
      "System feature planning",
      "Technology stack suggestions",
      "Viva explanation support",
    ],
    extraGroups: [
      {
        title: "Final Year Project Idea Areas",
        items: [
          "IoT-based projects",
          "AI chatbot systems",
          "AI game development projects",
          "Smart automation systems",
          "Firebase dashboard systems",
          "MERN stack web systems",
          "AI-based web applications",
          "Student support systems",
          "Business management systems",
        ],
      },
      {
        title: "Example Project Ideas",
        items: [
          "IoT-Based Smart Vehicle Rental System",
          "AI Chatbot for Student Support",
          "AI-Powered Career Guidance Platform",
          "AI Game with Intelligent Enemy Behavior",
          "Smart Attendance Management System",
          "IoT-Based Live Tracking System",
          "AI-Based Resume Analyzer",
          "Smart Campus Management System",
        ],
      },
    ],
    importantNote:
      "This service is provided as paid academic support, project guidance, idea development, documentation assistance, and explanation support. Students should use the work for learning, understanding, and improving their own academic submission according to their college or university rules.",
    pricingNote:
      "Price depends on the subject, workload, deadline, documentation length, and project complexity.",
    waMessage:
      "Hi Thanus, I'm interested in assignment/project support. Please send me the price details.",
  },
  {
    icon: FileText,
    title: "CV Creation",
    description:
      "Professional CVs, resumes, LinkedIn profile content, and portfolio summaries for students, interns, developers, designers, and job seekers - clean formatting, strong wording, and recruiter-friendly presentation.",
    includes: [
      "Student CVs",
      "Internship CVs",
      "Developer CVs",
      "Professional resumes",
      "LinkedIn About sections",
      "LinkedIn experience descriptions",
      "Portfolio profile content",
      "Cover letter content",
      "Career summaries",
      "Project descriptions for CVs",
    ],
    pricingNote:
      "Price depends on the CV type, number of pages, content rewriting, and delivery time.",
    waMessage:
      "Hi Thanus, I'm interested in your CV creation service. Please send me the price details.",
  },
];

function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-black">
          What I <span className="text-gradient">Offer</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-3xl">
          Professional digital, creative, and academic support services for students, creators, startups, and businesses.
        </p>
        <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
          These are paid services based on the type of work, project size, deadline, and required support.
        </p>
      </motion.div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.05 }}
              className="glass-card p-6 flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center btn-gradient">
                  <Icon size={20} />
                </div>
                <h2 className="text-lg font-semibold">{s.title}</h2>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{s.description}</p>

              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Services Include</p>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-sm text-muted-foreground list-disc list-inside">
                  {s.includes.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>

              {s.extraGroups?.map((g) => (
                <div key={g.title} className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80">{g.title}</p>
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-sm text-muted-foreground list-disc list-inside">
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {s.importantNote && (
                <p className="mt-4 text-xs text-muted-foreground italic border-l-2 border-primary/40 pl-3">
                  {s.importantNote}
                </p>
              )}

              <p className="mt-4 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/80">Pricing: </span>
                {s.pricingNote}
              </p>

              <a
                href={wa(s.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl btn-gradient text-sm font-semibold hover:scale-[1.02] transition-transform"
              >
                Get Quote on WhatsApp
              </a>
            </motion.div>
          );
        })}
      </div>

      <StudentResources />
      <FreeCertificateCourses />
    </div>
  );
}

