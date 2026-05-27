import { Github, Linkedin, Mail, Twitter, Instagram } from "lucide-react";

const socials = [
  { href: "https://linkedin.com/in/theiventhiram-thanus", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/TheiventhiramThanus", icon: Github, label: "GitHub" },
  { href: "https://x.com/thanus1216", icon: Twitter, label: "X" },
  { href: "https://www.instagram.com/theiventhiram_thanus/", icon: Instagram, label: "Instagram" },
  { href: "mailto:thanustheiventhiram@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col items-center gap-5">
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-white"
              style={{
                transitionProperty: "transform, color, box-shadow",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 18px rgba(56,189,248,0.45), 0 0 36px rgba(139,92,246,0.35)";
                e.currentTarget.style.borderColor = "rgba(56,189,248,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "";
              }}
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground tracking-wide">
          © 2026 Theiventhiram Thanus. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
