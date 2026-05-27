import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const staticAbout = {
  id: "static-about",
  title: "Full Stack Developer & UI/UX Designer",
  summary:
    "Software Engineering graduate, AarasTech Co-Founder, and full stack developer focused on clean, modern, useful digital products.",
  intro:
    "I build web applications, WordPress sites, UI/UX designs, IoT concepts, and student-friendly digital solutions with a practical, user-focused mindset.",
  career_goal:
    "To grow as a Software and AI Engineering professional while building scalable products, supporting tech communities, and continuing higher studies.",
  goals: [
    { id: "g1", icon: "bot", title: "Follow", value: "Software / AI Engineering" },
    { id: "g2", icon: "laptop", title: "Practice", value: "Software Development" },
    { id: "g3", icon: "flag", title: "Support", value: "Tech Communities" },
    { id: "g4", icon: "graduation-cap", title: "Complete", value: "Master's Degree" },
  ],
  background_details: [
    { id: "b1", icon: "badge", label: "Name", value: "Theiventhiram Thanus" },
    { id: "b2", icon: "cake", label: "Birthday", value: "December 16" },
    { id: "b3", icon: "user", label: "Gender", value: "Male (He/Him/His)" },
    { id: "b4", icon: "globe", label: "Location", value: "Sri Lanka (GMT+5:30)" },
    { id: "b5", icon: "languages", label: "Communicate", value: "Tamil & English" },
  ],
  background_description:
    "I am based in Sri Lanka and communicate in Tamil and English. My background combines software engineering studies, creative digital work, leadership experience, and a strong interest in AI, web development, and technology communities.",
  updated_at: new Date(0).toISOString(),
};

const staticAchievements = [
  {
    id: "president",
    title: "President",
    organization: "Student Council ESOFT UNI - Jaffna",
    period: "February 2025 - April 2026",
    duration: "1 year 3 months",
    description:
      "Led student council initiatives, supported events, and created engaging visual content to improve collaboration and student participation.",
    contributions: ["Student leadership", "Event support", "Creative content", "Team coordination"],
    events: ["Student council activities", "Campus initiatives"],
    skills: ["Leadership", "Communication", "Design", "Teamwork"],
    highlight: "Student Council President",
    icon: "crown",
    logo_url: "/logos/esoft-emcj.png",
    display_order: 1,
  },
  {
    id: "prefect",
    title: "Prefect",
    organization: "Chavakachcheri Hindu College",
    period: "2021 - 2023",
    duration: "2 years",
    description:
      "Supported school discipline and event organization while developing responsibility, communication, and leadership skills.",
    contributions: ["Discipline support", "School event coordination", "Student guidance"],
    events: ["School events"],
    skills: ["Leadership", "Responsibility", "Communication"],
    highlight: "School Prefect",
    icon: "shield",
    logo_url: "/logos/chc-prefect.png",
    display_order: 2,
  },
];

const staticTechnologies = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB",
  "PHP", "WordPress", "Firebase", "Supabase", "Figma", "Canva", "Unity", "C#", "Python",
].map((name, index) => ({
  id: `tech-${index}`,
  name,
  category: index < 8 ? "Web Development" : index < 13 ? "Backend & Platforms" : "Design & Tools",
  icon_url: null,
  display_order: index + 1,
}));

const staticEducation = [
  {
    id: "beng",
    degree: "Bachelor of Engineering (Hons) in Software Engineering",
    institution: "London Metropolitan University",
    period: "Completed",
    duration: null,
    grade: null,
    description: "Completed BEng (Hons) Software Engineering with a focus on modern software development.",
    skills: ["Software Engineering", "Web Development", "Project Development"],
    logo_url: "/logos/london-met.png",
    display_order: 1,
  },
  {
    id: "hnd",
    degree: "Higher National Diploma in Computing",
    institution: "ESOFT Metro Campus",
    period: "Completed",
    duration: null,
    grade: "Distinction",
    description: "Completed HND in Computing with Distinction.",
    skills: ["Computing", "Programming", "Database Systems"],
    logo_url: "/logos/esoft.png",
    display_order: 2,
  },
  {
    id: "school",
    degree: "G.C.E Advanced Level / Ordinary Level",
    institution: "Chavakachcheri Hindu College",
    period: "School Education",
    duration: null,
    grade: null,
    description: "Completed school education in Sri Lanka.",
    skills: ["Academic Foundation", "Leadership"],
    logo_url: "/logos/chc.png",
    display_order: 3,
  },
];

const staticExperience = [
  {
    id: "aarastech",
    title: "Co-Founder",
    organization: "AarasTech",
    period: "Present",
    duration: null,
    description:
      "Building digital products and services including websites, UI/UX work, and technology solutions for students, individuals, and businesses.",
    skills: ["Leadership", "Full Stack Development", "UI/UX", "Business"],
    logo_url: "/logos/aarastech.png",
    display_order: 1,
  },
  {
    id: "wordpress",
    title: "WordPress Developer",
    organization: "Freelance",
    period: "Present",
    duration: null,
    description:
      "Creating responsive WordPress and portfolio websites with clean layouts and practical user experiences.",
    skills: ["WordPress", "Web Design", "Responsive Design"],
    logo_url: null,
    display_order: 2,
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    organization: "Freelance",
    period: "Present",
    duration: null,
    description: "Designing interfaces, posters, social creatives, and product visuals using modern design tools.",
    skills: ["Figma", "Canva", "Branding", "Visual Design"],
    logo_url: null,
    display_order: 3,
  },
];

const staticProjects = [
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    category: "Web Development",
    description:
      "A modern portfolio website showcasing experience, education, services, projects, certificates, and contact details.",
    technologies: ["React", "TanStack Start", "TypeScript", "Tailwind CSS", "Netlify"],
    github_url: "https://github.com/TheiventhiramThanus/quantum-portfolio-hub",
    live_url: "https://thanudev.netlify.app",
    linkedin_url: null,
    behance_url: null,
    portfolio_url: null,
    featured: true,
    display_order: 1,
  },
  {
    id: "aarastech-site",
    title: "AarasTech Digital Services",
    category: "Business",
    description: "Digital service concept for websites, student support, AI posters, and creative technology work.",
    technologies: ["Web Development", "UI/UX", "WordPress"],
    github_url: null,
    live_url: null,
    linkedin_url: null,
    behance_url: null,
    portfolio_url: null,
    featured: true,
    display_order: 2,
  },
  {
    id: "student-projects",
    title: "Student Project Support Concepts",
    category: "Academic Support",
    description: "Project ideas and documentation support for AI, IoT, MERN stack, and smart automation systems.",
    technologies: ["AI", "IoT", "MERN", "Firebase"],
    github_url: null,
    live_url: null,
    linkedin_url: null,
    behance_url: null,
    portfolio_url: null,
    featured: false,
    display_order: 3,
  },
];

const staticContact = {
  id: "static-contact",
  name: "Theiventhiram Thanus",
  email: "thanustheiventhiram@gmail.com",
  phone: "0752920381",
  location: "Jaffna, Sri Lanka",
  linkedin_url: "https://linkedin.com/in/theiventhiram-thanus",
  github_url: "https://github.com/TheiventhiramThanus",
  twitter_url: "https://x.com/thanus1216",
  instagram_url: "https://www.instagram.com/theiventhiram_thanus/",
  whatsapp_url: "https://wa.me/94752920381",
  portfolio_url: "https://thanudev.netlify.app",
  main_portfolio_url: "https://thanudev.netlify.app",
  drive_url: null,
  updated_at: new Date(0).toISOString(),
};

const staticCertificates = [
  {
    id: "hnd-distinction",
    title: "HND in Computing with Distinction",
    provider: "ESOFT Metro Campus",
    category: "Academic",
    issued_date: null,
    credential_id: null,
    certificate_link: null,
    verification_link: null,
    certificate_image: null,
    provider_logo: "/logos/esoft.png",
    skills: ["Computing", "Software Development"],
    featured: true,
    display_order: 1,
  },
  {
    id: "free-courses",
    title: "Professional Learning & Free Certificate Courses",
    provider: "Online Learning Platforms",
    category: "Professional Development",
    issued_date: null,
    credential_id: null,
    certificate_link: null,
    verification_link: null,
    certificate_image: null,
    provider_logo: null,
    skills: ["Self Learning", "Career Development"],
    featured: false,
    display_order: 2,
  },
];

async function withSupabaseFallback<T>(label: string, query: () => Promise<T>, fallback: T) {
  try {
    return await query();
  } catch (error) {
    console.error(`[Supabase] ${label} query failed`, error);
    return fallback;
  }
}

export const aboutQuery = queryOptions({
  queryKey: ["about"],
  queryFn: () => withSupabaseFallback("about", async () => {
    const { data, error } = await supabase.from("about").select("*").limit(1).maybeSingle();
    if (error) throw error;
    return data ?? staticAbout;
  }, staticAbout),
});

export const achievementsQuery = queryOptions({
  queryKey: ["achievements"],
  queryFn: () => withSupabaseFallback("achievements", async () => {
    const { data, error } = await supabase.from("achievements").select("*").order("display_order");
    if (error) throw error;
    return data && data.length > 0 ? data : staticAchievements;
  }, staticAchievements),
});

export const technologiesQuery = queryOptions({
  queryKey: ["technologies"],
  queryFn: () => withSupabaseFallback("technologies", async () => {
    const { data, error } = await supabase.from("technologies").select("*").order("display_order");
    if (error) throw error;
    return data && data.length > 0 ? data : staticTechnologies;
  }, staticTechnologies),
});

export const educationQuery = queryOptions({
  queryKey: ["education"],
  queryFn: () => withSupabaseFallback("education", async () => {
    const { data, error } = await supabase.from("education").select("*").order("display_order");
    if (error) throw error;
    return data && data.length > 0 ? data : staticEducation;
  }, staticEducation),
});

export const experienceQuery = queryOptions({
  queryKey: ["experience"],
  queryFn: () => withSupabaseFallback("experience", async () => {
    const { data, error } = await supabase.from("experience").select("*").order("display_order");
    if (error) throw error;
    return data && data.length > 0 ? data : staticExperience;
  }, staticExperience),
});

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: () => withSupabaseFallback("projects", async () => {
    const { data, error } = await supabase.from("projects").select("*").order("display_order");
    if (error) throw error;
    return data && data.length > 0 ? data : staticProjects;
  }, staticProjects),
});

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: () => withSupabaseFallback("services", async () => {
    const { data, error } = await supabase.from("services").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  }, []),
});

export const contactQuery = queryOptions({
  queryKey: ["contact"],
  queryFn: () => withSupabaseFallback("contact", async () => {
    const { data, error } = await supabase.from("contact_details").select("*").limit(1).maybeSingle();
    if (error) throw error;
    return data ?? staticContact;
  }, staticContact),
});

export const certificatesQuery = queryOptions({
  queryKey: ["certificates"],
  queryFn: () => withSupabaseFallback("certificates", async () => {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("featured", { ascending: false })
      .order("display_order");
    if (error) throw error;
    return data && data.length > 0 ? data : staticCertificates;
  }, staticCertificates),
});
