import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { contactQuery } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Thanus Theiventhiram | Hire Full Stack Developer" },
      { name: "description", content: "Contact Thanus Theiventhiram for Full Stack development, UI/UX design, WordPress, IoT and Game development projects in Jaffna and across Sri Lanka." },
      { property: "og:title", content: "Contact Thanus Theiventhiram" },
      { property: "og:description", content: "Hire a Full Stack Developer & UI/UX Designer from Jaffna, Sri Lanka." },
      { property: "og:url", content: "/contact" },
      { property: "og:image", content: "https://project--82797ab2-2006-4912-97de-e081757bf83b.lovable.app/og-image.png" },
      { name: "twitter:title", content: "Contact Thanus Theiventhiram" },
      { name: "twitter:description", content: "Hire a Full Stack Developer & UI/UX Designer from Sri Lanka." },
      { name: "twitter:image", content: "https://project--82797ab2-2006-4912-97de-e081757bf83b.lovable.app/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    resource: (search.resource as string) || undefined,
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(contactQuery),
  component: ContactPage,
});

const RESOURCE_PRESETS: Record<string, { label: string; subject: string }> = {
  canva: { label: "Canva Pro Free", subject: "Request: Canva Pro Free Guide" },
  linkedin: { label: "LinkedIn Premium Career Trial", subject: "Request: LinkedIn Premium Referral Link" },
};

function ContactPage() {
  const { data: c } = useSuspenseQuery(contactQuery);
  const { resource } = Route.useSearch();
  const preset = resource ? RESOURCE_PRESETS[resource] : undefined;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (preset) {
      setForm((f) => ({
        ...f,
        subject: f.subject || preset.subject,
        message:
          f.message ||
          `Hi Thanus,\n\nI'd like to request: ${preset.label}.\n\nThank you!`,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const { error } = await supabase.from("messages").insert(form);
    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
    const waText = encodeURIComponent(
      `Hi Thanus,\n\n${preset ? `Request: ${preset.label}\n\n` : ""}Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
    );
    window.open(`https://wa.me/94752920381?text=${waText}`, "_blank", "noreferrer");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const socials = [
    { href: c?.linkedin_url, icon: Linkedin, label: "LinkedIn" },
    { href: c?.github_url, icon: Github, label: "GitHub" },
    { href: c?.twitter_url, icon: Twitter, label: "X" },
    { href: c?.instagram_url, icon: Instagram, label: "Instagram" },
    { href: c?.whatsapp_url, icon: MessageCircle, label: "WhatsApp" },
  ].filter((s) => !!s.href);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl md:text-5xl font-black">
          Let's <span className="text-gradient">Connect</span>
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          Open to freelance projects, collaborations, internships and full-time roles.
        </p>
      </motion.div>

      <div className="mt-10 grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {preset && (
            <div className="glass-card p-5 border-primary/40">
              <div className="text-sm text-muted-foreground">Requesting</div>
              <div className="mt-1 font-semibold text-gradient">{preset.label}</div>
              <p className="mt-2 text-xs text-muted-foreground">
                Fill the form — on submit it will open WhatsApp to 0752920381 with your details auto-filled.
              </p>
            </div>
          )}
          <div className="glass-card p-5">
            <div className="text-sm text-muted-foreground">Email</div>
            <a href={`mailto:${c?.email}`} className="flex items-center gap-2 mt-1 font-medium hover:text-gradient">
              <Mail size={16} /> {c?.email}
            </a>
          </div>
          {c?.phone && (
            <div className="glass-card p-5">
              <div className="text-sm text-muted-foreground">Phone</div>
              <a href={`tel:${c.phone}`} className="flex items-center gap-2 mt-1 font-medium">
                <Phone size={16} /> {c.phone}
              </a>
            </div>
          )}
          {c?.location && (
            <div className="glass-card p-5">
              <div className="text-sm text-muted-foreground">Location</div>
              <div className="flex items-center gap-2 mt-1 font-medium">
                <MapPin size={16} /> {c.location}
              </div>
            </div>
          )}
          <div className="glass-card p-5">
            <div className="text-sm text-muted-foreground mb-3">Find me on</div>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a key={s.label} href={s.href!} target="_blank" rel="noreferrer" aria-label={s.label} className="p-2.5 rounded-full glass-card hover:scale-110 transition-transform">
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-semibold">Send a message</h2>
          <div>
            <label htmlFor="contact-name" className="sr-only">Your name</label>
            <input
              id="contact-name"
              required maxLength={200}
              placeholder="Your name"
              aria-label="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">Email</label>
            <input
              id="contact-email"
              required type="email" maxLength={320}
              placeholder="Email"
              aria-label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className="sr-only">Subject</label>
            <input
              id="contact-subject"
              required maxLength={300}
              placeholder="Subject"
              aria-label="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="sr-only">Message</label>
            <textarea
              id="contact-message"
              required maxLength={5000} rows={5}
              placeholder="Message"
              aria-label="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-gradient w-full py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : status === "sent" ? "Message sent ✓" : "Send message"}
          </button>
          {status === "error" && <p className="text-sm text-destructive">{errorMsg || "Failed to send."}</p>}
        </form>
      </div>
    </div>
  );
}