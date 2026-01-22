import { useEffect, useRef, useState } from "react";
import FadeIn from "../components/common/FadeIn";
import { api } from "../api";
import { useSettings } from "../context/SettingsContext";

function Input({ label, type = "text", name, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm text-ink/80">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] bg-white/5 px-3 py-2 text-sm text-ink placeholder:text-ink/50 outline-none hover:border-[color-mix(in_oklab,var(--color-ink),transparent_65%)] focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/20 transition-colors"
      />
    </label>
  );
}

function Textarea({ label, name, placeholder }) {
  return (
    <label className="block">
      <span className="text-sm text-ink/80">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={6}
        className="mt-1 w-full rounded-xl border border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] bg-white/5 px-3 py-2 text-sm text-ink placeholder:text-ink/50 outline-none hover:border-[color-mix(in_oklab,var(--color-ink),transparent_65%)] focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-400/20 transition-colors"
      />
    </label>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-ink/80">
      {children}
    </span>
  );
}

export default function ContactPage() {
  const { settings, loading } = useSettings();
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const result = await api.submitContact(data);

      if (result.success) {
        setStatus("sent");
        formRef.current?.reset();
      } else {
        setStatus("error");
        console.error("Error result:", result.message);
      }
    } catch (err) {
      setStatus("error");
      console.error("Submission error:", err);
    }
  };

  if (loading || !settings) return null;

  const { contact } = settings;

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn variant="blur">
          <div className="max-w-2xl">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Contact
            </p>
            <h1 className="display-font text-3xl sm:text-4xl lg:text-5xl text-ink">
              Let’s work together
            </h1>
            <p className="mt-4 text-sm sm:text-base text-ink/80 max-w-xl">
              Reach out for collaborations, freelance work, or just to say hi.
            </p>
          </div>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FadeIn className="lg:col-span-2" variant="fade-up" delay={200}>
            <div>
              <form
                ref={formRef}
                onSubmit={onSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <Input label="Name" name="name" placeholder="Your full name" />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                />
                <Input label="Company" name="company" placeholder="Optional" />
                <Input label="Budget" name="budget" placeholder="$2k — $10k" />
                <div className="sm:col-span-2">
                  <Textarea
                    label="Project details"
                    name="message"
                    placeholder="Tell me about your goals, timeline, and scope."
                  />
                </div>
                <div className="sm:col-span-2 mt-2 flex items-center gap-3">
                  <button
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-gray-900 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-70"
                  >
                    {status === "sending"
                      ? "Sending…"
                      : status === "sent"
                      ? "Sent!"
                      : status === "error"
                      ? "Try Again"
                      : "Send message"}
                  </button>
                  {status === "sent" && (
                    <span className="text-sm text-emerald-400 font-medium">
                      Thanks! I'll reply soon.
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-sm text-rose-400 font-medium">
                      Something went wrong. Please try again.
                    </span>
                  )}
                </div>
              </form>
            </div>
          </FadeIn>

          <FadeIn variant="fade-up" delay={400}>
            <div>
              <div className="rounded-2xl border border-white/10 p-4">
                <h2 className="text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                  Capabilities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {contact.capabilities.map((c) => (
                    <Chip key={c}>{c}</Chip>
                  ))}
                </div>
                <h2 className="mt-6 text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                  Preferred tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {contact.tools.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
                <h2 className="mt-6 text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                  Availability
                </h2>
                <p className="text-sm text-ink/80">
                  {contact.availability}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
