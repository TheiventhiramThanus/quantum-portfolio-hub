import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun, Menu, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import profileImg from "@/assets/profile.webp"; // Using webp version for the small round logo

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/education", label: "Education" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pendingTo, setPendingTo] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isLoading = useRouterState({ select: (s) => s.isLoading || s.isTransitioning });

  useEffect(() => {
    if (!isLoading) setPendingTo(null);
  }, [isLoading, pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      {/* ── Pill container ── */}
      <nav
        className={`navbar-pill w-full max-w-5xl flex items-center justify-between px-5 py-2.5 transition-all duration-300 ${
          scrolled ? "navbar-pill--scrolled" : ""
        }`}
      >
        {/* Logo */}
        <Link to="/" className="navbar-logo shrink-0" aria-label="Thanus Theiventhiram">
          <img 
            src={profileImg} 
            alt="Thanus Theiventhiram" 
            className="w-8 h-8 rounded-full object-cover border border-border"
          />
        </Link>

        {/* Desktop links — centered */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              onClick={() => setPendingTo(l.to)}
              className="navbar-link inline-flex items-center gap-1.5"
            >
              {l.label}
              {pendingTo === l.to && (
                <Loader2 size={12} className="animate-spin text-primary" />
              )}
            </Link>
          ))}
        </div>

        {/* Right side — theme toggle */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="navbar-theme-btn"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile: theme + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="navbar-theme-btn">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="navbar-theme-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="mobile-nav-anim absolute top-[72px] left-4 right-4 max-w-5xl mx-auto rounded-2xl overflow-hidden mobile-dropdown">
          <div className="flex flex-col p-3 gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => { setPendingTo(l.to); setOpen(false); }}
                className="mobile-nav-link"
              >
                <span className="inline-flex items-center gap-2">
                  {l.label}
                  {pendingTo === l.to && (
                    <Loader2 size={12} className="animate-spin text-primary" />
                  )}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}