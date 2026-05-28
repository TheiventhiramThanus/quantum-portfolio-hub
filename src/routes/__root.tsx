import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect } from "react";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageLoader } from "@/components/page-loader";
import { ScrollSparks } from "@/components/scroll-sparks";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: DEFAULT_TITLE },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { name: "author", content: "Thanus Theiventhiram" },
      { name: "keywords", content: "Thanus Theiventhiram, Theiventhiram Thanus, thanustheiventhiram.tech, Full Stack Developer Jaffna, UI/UX Designer Sri Lanka, WordPress Developer Sri Lanka, Software Engineer Sri Lanka, Software Engineering Graduate, AarasTech Co-Founder, IoT Developer Sri Lanka, Game Developer Sri Lanka" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#0f172a" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: TWITTER_HANDLE },
      { name: "twitter:creator", content: TWITTER_HANDLE },
      { property: "og:title", content: DEFAULT_TITLE },
      { name: "twitter:title", content: DEFAULT_TITLE },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { name: "twitter:description", content: DEFAULT_DESCRIPTION },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: "Thanus Theiventhiram portfolio preview" },
      { name: "twitter:image", content: OG_IMAGE },
      { property: "og:url", content: SITE_URL },
    ],
    links: [
      {
        rel: "canonical",
        href: SITE_URL,
      },
      { rel: "sitemap", type: "application/xml", href: `${SITE_URL}/sitemap.xml` },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      // Speed up paint: warm up the devicon CDN used by hero tech badges
      { rel: "preconnect", href: "https://cdn.jsdelivr.net", crossOrigin: "" },
      { rel: "dns-prefetch", href: "https://cdn.jsdelivr.net" },
      // Prefetch key routes for instant navigation
      { rel: "prefetch", href: "/about", as: "document" },
      { rel: "prefetch", href: "/projects", as: "document" },
      { rel: "prefetch", href: "/services", as: "document" },
      { rel: "prefetch", href: "/contact", as: "document" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Thanus Theiventhiram",
          alternateName: "Theiventhiram Thanus",
          jobTitle: "Full Stack Developer, UI/UX Designer & Software Engineer",
          description: "Completed the Bachelor of Engineering (Hons) in Software Engineering, AarasTech Co-Founder, Full Stack Developer, UI/UX Designer, WordPress Developer, IoT Developer and Game Developer from Jaffna, Sri Lanka.",
          url: SITE_URL,
          image: OG_IMAGE,
          email: "mailto:thanustheiventhiram@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jaffna",
            addressCountry: "Sri Lanka",
          },
          worksFor: { "@type": "Organization", name: "AarasTech" },
          knowsAbout: [
            "Full Stack Development",
            "UI/UX Design",
            "WordPress Development",
            "IoT Development",
            "Game Development",
            "Software Engineering",
            "MERN Stack",
          ],
          sameAs: [
            "https://linkedin.com/in/theiventhiram-thanus",
            "https://github.com/TheiventhiramThanus",
            "https://x.com/thanus1216",
            "https://www.instagram.com/theiventhiram_thanus/",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: "en",
          publisher: {
            "@type": "Person",
            name: SITE_NAME,
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const lenis = new Lenis({
      duration: 1.5, // Increased for a very buttery smooth scroll
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0, 
      touchMultiplier: 2.0, 
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PageLoader />
        <ScrollSparks />
        <Navbar />
        <main className="pt-20 min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

