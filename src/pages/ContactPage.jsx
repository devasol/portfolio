import { useEffect, useRef, useState } from "react";

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
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      formRef.current?.reset();
    }, 900);
  };

  return (
    <main className="w-full flex justify-center">
      <section className="relative isolate py-12 sm:py-24" id="contact">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
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
                      : "Send message"}
                  </button>
                  {status === "sent" && (
                    <span className="text-sm text-ink/70">
                      Thanks! I'll reply soon.
                    </span>
                  )}
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div>
              <div className="rounded-2xl border border-white/10 p-4">
                <h2 className="text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                  Capabilities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {["Web Apps", "Design Systems", "APIs", "SEO", "E2E"].map(
                    (c) => (
                      <Chip key={c}>{c}</Chip>
                    )
                  )}
                </div>
                <h2 className="mt-6 text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                  Preferred tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Tailwind", "Node", "GraphQL"].map(
                    (t) => (
                      <Chip key={t}>{t}</Chip>
                    )
                  )}
                </div>
                <h2 className="mt-6 text-sm font-semibold tracking-widest uppercase text-ink/70 mb-3">
                  Availability
                </h2>
                <p className="text-sm text-ink/80">
                  Taking new projects starting next month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
