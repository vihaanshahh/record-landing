"use client";

import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/interfaces-accordion";
import { motion, type Variants, type Easing } from "framer-motion";
import {
  GitBranch,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Terminal,
  Video,
  GitPullRequest,
  Zap,
  Lock,
  Package,
  DollarSign,
} from "lucide-react";

const easeOut: Easing = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: easeOut },
  }),
};

const features = [
  {
    icon: Package,
    title: "4-line SDK",
    description:
      "Drop the JS SDK into any React, Vue, Next.js, Angular, or Svelte app. No infrastructure to manage.",
  },
  {
    icon: GitPullRequest,
    title: "GitHub-native",
    description:
      "A GitHub Action replays sessions with Playwright, records video, and posts the link directly on your PR.",
  },
  {
    icon: Video,
    title: "Playwright replay",
    description:
      "Sessions are committed as tiny JSON files (~3KB). CI replays them headlessly and captures MP4 video.",
  },
  {
    icon: Zap,
    title: "CI/CD native",
    description:
      "Works in local dev, GitHub Actions, and any CI pipeline. Zero server required — just S3 and git.",
  },
  {
    icon: DollarSign,
    title: "~$0.58 / 1k recordings",
    description:
      "No API server, no CDN, no database to run. Videos served from S3 pre-signed URLs. Pay almost nothing.",
  },
  {
    icon: Lock,
    title: "Privacy by default",
    description:
      "Videos auto-expire in 7 days. No login required to view. Domain-restricted API keys. Your data stays yours.",
  },
];

const steps = [
  {
    number: "01",
    title: "Add the SDK",
    description: "Install the JS SDK into your app. The bridge server runs locally and saves sessions to .recordloop/sessions/ as JSON.",
    code: `import { RecordLoopProvider, useRecordLoop }
  from 'recordloop/react'

function RecordButton() {
  const { recording, start, stop } = useRecordLoop()
  return (
    <button onClick={recording ? stop : start}>
      {recording ? 'Stop' : 'Record'}
    </button>
  )
}`,
  },
  {
    number: "02",
    title: "Commit sessions",
    description: "Commit the JSON session file alongside your code. It's tiny — about 3KB per recording.",
    code: `git add .recordloop/sessions/
git commit -m "Add recording session"
git push`,
  },
  {
    number: "03",
    title: "Get video on your PR",
    description: "The GitHub Action picks up the session, replays it with Playwright, uploads to S3, and posts the link on your PR.",
    code: `# .github/workflows/recordloop.yml
- uses: vihaanshahh/recordloop@main
  with:
    s3-bucket: \${{ secrets.RECORDLOOP_S3_BUCKET }}
    aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}`,
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["30 mins / month", "7-day retention", "100 recordings", "S3 bring your own"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$20",
    period: "/mo",
    features: ["5 hrs / month", "30-day retention", "Unlimited recordings", "InstantDB dashboard"],
    cta: "Start Pro",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$50",
    period: "/mo",
    features: ["15 hrs / month", "90-day retention", "Team management", "Priority support"],
    cta: "Start Team",
    highlighted: false,
  },
];

const faqs = [
  {
    value: "how",
    title: "How is this different from Loom?",
    content:
      "Loom is built for async communication across all teams — it's per-seat, expensive, and has no PR-native integration. RecordLoop targets developers specifically: it integrates with git, runs in CI, and the viewer link goes straight into your GitHub PR comment. No accounts, no plugins, just a link.",
  },
  {
    value: "cost",
    title: "Why is it so cheap?",
    content:
      "There's no API server to run. The JS SDK posts sessions to a local bridge, you commit the JSON, and the GitHub Action does the replay + upload directly to S3 using pre-signed URLs. The only ongoing cost is S3 storage and egress — about $0.58 per 1,000 recordings.",
  },
  {
    value: "frameworks",
    title: "Which frameworks are supported?",
    content:
      "The JS SDK works with React, Vue, Next.js, Angular, Svelte, and plain vanilla JS. For Python, there's a Playwright-native SDK with a @recordloop decorator you can drop onto any test function.",
  },
  {
    value: "sessions",
    title: "What exactly is a session JSON?",
    content:
      "It's a ~3KB file capturing clicks, typing, navigation, and scroll events with stable selectors (data-testid, aria-label, id, etc). Playwright replays these events deterministically to produce an identical video of what you recorded.",
  },
  {
    value: "privacy",
    title: "Who can watch the videos?",
    content:
      "Anyone with the S3 pre-signed URL — no login required. URLs auto-expire after 7 days (or 30/90 days on paid plans). You can delete any recording via the API or dashboard.",
  },
  {
    value: "s3",
    title: "Do I need my own S3 bucket?",
    content:
      "Yes — you bring your own S3 bucket (or Cloudflare R2). This keeps costs near zero and means your videos never touch our servers. Run python -m recordloop setup-s3 and it configures everything for you.",
  },
];

const frameworks = ["React", "Vue", "Next.js", "Angular", "Svelte", "Vanilla JS"];

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-[#F9F9F9] text-[#000000]">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-[#F9F9F9]/80 backdrop-blur-md border-b border-[#e8e8e8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:px-16">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#E85002] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <span className="font-semibold text-base tracking-tight">RecordLoop</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#646464]">
            <a href="#how" className="hover:text-black transition-colors">How it works</a>
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/vihaanshahh/recordloop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#646464] hover:text-black transition-colors"
            >
              <GitBranch size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <ShimmerButton
              shimmerColor="#E85002"
              background="#000000"
              className="text-sm font-normal px-4 py-2 h-9"
            >
              Get started
            </ShimmerButton>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-16 pb-24">
        {/* Subtle glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(ellipse, #E85002 0%, #C10801 40%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <AnimatedGradientText className="mb-8 text-xs font-normal tracking-wide text-[#646464]">
              Open source · works with any web app
              <ChevronRight size={12} className="ml-1 text-[#E85002]" />
            </AnimatedGradientText>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-[84px] font-light leading-[1.05] tracking-tight text-[#000000]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Code review,{" "}
            <span
              className="font-normal"
              style={{
                background: "linear-gradient(90deg, #C10801, #E85002, #F16021)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              but you can see it.
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-[#646464] max-w-xl leading-relaxed font-light"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Drop a JS SDK into your frontend. Commit the session. A GitHub Action
            replays it with Playwright, records video, and posts the link on your PR.
          </motion.p>

          {/* Framework badges */}
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2.5}
          >
            {frameworks.map((fw) => (
              <span
                key={fw}
                className="text-xs font-light text-[#646464] border border-[#e8e8e8] rounded-full px-3 py-1 bg-white"
              >
                {fw}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <ShimmerButton
              shimmerColor="#F16021"
              background="#E85002"
              className="font-normal px-8 py-3.5 text-base"
            >
              <span className="flex items-center gap-2">
                Get started free
                <ArrowRight size={16} />
              </span>
            </ShimmerButton>
            <a
              href="https://github.com/vihaanshahh/recordloop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#646464] hover:text-black text-base font-light transition-colors"
            >
              <GitBranch size={16} />
              View on GitHub
            </a>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-[#A7A7A7] font-light"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            {["~$0.58 / 1k recordings", "No login to view", "MP4 output only"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#E85002]" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Architecture diagram */}
        <motion.div
          className="relative mt-20 w-full max-w-4xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <div className="relative rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.05)]">
            <BorderBeam colorFrom="#E85002" colorTo="#FBC3AB" duration={10} size={350} />
            {/* Terminal header */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#f0f0f0] bg-[#fafafa]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-[#A7A7A7] font-light">recordloop — PR #42</span>
            </div>
            {/* Flow diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#f0f0f0]">
              {[
                { step: "Local dev", label: "JS SDK captures clicks, typing, navigation", icon: Terminal, color: "#E85002" },
                { step: "Git commit", label: ".recordloop/sessions/abc.json (~3KB)", icon: Package, color: "#F16021" },
                { step: "GitHub Action", label: "Playwright replays → records MP4 → uploads to S3", icon: Video, color: "#C10801" },
                { step: "PR comment", label: "\"Watch recording\" link posted automatically", icon: GitPullRequest, color: "#E85002" },
              ].map((col, i) => (
                <div key={col.step} className="flex flex-col items-start p-6 gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${col.color}15` }}>
                    <col.icon size={15} style={{ color: col.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-normal text-[#000000] mb-1">{col.step}</div>
                    <div className="text-xs font-light text-[#646464] leading-relaxed">{col.label}</div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute" style={{ right: 0, top: "50%", transform: "translate(50%, -50%)" }}>
                      <ArrowRight size={12} className="text-[#e8e8e8]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="border-t border-[#e8e8e8] px-6 md:px-16 py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">How it works</p>
            <h2 className="text-4xl md:text-5xl font-light text-[#000000] leading-tight">
              Three steps.<br />No servers.
            </h2>
            <p className="mt-4 text-[#646464] font-light max-w-sm">
              Cost at 1,000 recordings/month: ~$0.58
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.3}
              >
                <div className="flex flex-col gap-3">
                  <div className="text-[64px] font-extralight text-[#e8e8e8] leading-none select-none">{step.number}</div>
                  <h3 className="text-xl font-normal text-[#000000]">{step.title}</h3>
                  <p className="text-[#646464] font-light text-sm leading-relaxed">{step.description}</p>
                </div>
                <div className="relative rounded-xl border border-[#e8e8e8] bg-[#000000] overflow-hidden">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <pre className="p-5 text-xs font-light leading-relaxed overflow-x-auto text-[#F9F9F9]/80 whitespace-pre">
                    <code>{step.code}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="border-t border-[#e8e8e8] px-6 md:px-16 py-28 max-w-7xl mx-auto">
        <motion.div
          className="mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">Features</p>
          <h2 className="text-4xl md:text-5xl font-light text-[#000000] max-w-lg leading-tight">
            Built for developers,<br />not teams.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.3}
              className="h-full"
            >
              <MagicCard
                className="p-6 h-full border border-[#e8e8e8] bg-white"
                gradientColor="#FFF0E8"
                gradientOpacity={1}
                gradientSize={160}
              >
                <div className="flex flex-col h-full">
                  <div className="w-9 h-9 rounded-lg border border-[#e8e8e8] flex items-center justify-center mb-5">
                    <feat.icon size={15} className="text-[#E85002]" />
                  </div>
                  <h3 className="font-normal text-sm text-[#000000] mb-2">{feat.title}</h3>
                  <p className="text-sm text-[#646464] font-light leading-relaxed">{feat.description}</p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="border-t border-[#e8e8e8] px-6 md:px-16 py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-light text-[#000000] leading-tight">
              Per-minute, not per-seat.
            </h2>
            <p className="mt-4 text-[#646464] font-light max-w-md">
              Loom charges $15/user/month. We charge for what you actually use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.2}
                className="h-full"
              >
                <div className={`relative h-full rounded-2xl border p-6 flex flex-col gap-5 ${
                  tier.highlighted
                    ? "border-[#E85002]/30 bg-white shadow-[0_0_40px_rgba(232,80,2,0.06)]"
                    : "border-[#e8e8e8] bg-white"
                }`}>
                  {tier.highlighted && (
                    <BorderBeam colorFrom="#E85002" colorTo="#FBC3AB" duration={8} size={200} borderWidth={1} />
                  )}
                  <div>
                    <div className="text-xs font-normal uppercase tracking-widest text-[#646464] mb-3">{tier.name}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-light text-[#000000]">{tier.price}</span>
                      <span className="text-sm font-light text-[#A7A7A7]">{tier.period}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2.5 flex-1">
                    {tier.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm font-light text-[#646464]">
                        <CheckCircle2 size={13} className="text-[#E85002] flex-shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  {tier.highlighted ? (
                    <ShimmerButton
                      shimmerColor="#F16021"
                      background="#E85002"
                      className="w-full justify-center font-normal text-sm py-2.5"
                    >
                      {tier.cta}
                    </ShimmerButton>
                  ) : (
                    <button className="w-full text-sm font-normal text-[#646464] border border-[#e8e8e8] rounded-full py-2.5 hover:border-[#000000] hover:text-[#000000] transition-colors">
                      {tier.cta}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="mt-6 text-center text-sm font-light text-[#A7A7A7]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Enterprise? Custom retention, SSO, SLA — <a href="mailto:hi@recordloop.io" className="text-[#E85002] hover:underline">get in touch</a>.
          </motion.p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="border-t border-[#e8e8e8] px-6 md:px-16 py-28 max-w-3xl mx-auto">
        <motion.div
          className="mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-light text-[#000000]">Common questions</h2>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value}>
                <AccordionTrigger className="text-left text-[#000000] font-normal text-sm">
                  {faq.title}
                </AccordionTrigger>
                <AccordionContent className="text-[#646464] font-light">{faq.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-[#e8e8e8] px-6 md:px-16 py-28 max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center border border-[#e8e8e8] bg-white"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <BorderBeam colorFrom="#E85002" colorTo="#FBC3AB" duration={10} size={400} />
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-[0.05]"
              style={{ background: "radial-gradient(ellipse, #E85002, transparent 70%)" }}
            />
          </div>
          <div className="relative z-10">
            <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-6">
              Record once. Attach anywhere. Review faster.
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-[#000000] mb-4">
              Stop describing bugs.<br />Show them.
            </h2>
            <p className="text-[#646464] font-light text-lg mb-8 max-w-sm mx-auto">
              python -m recordloop init and you're done.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <ShimmerButton
                shimmerColor="#F16021"
                background="#E85002"
                className="font-normal px-8 py-3.5 text-base"
              >
                Get started free
              </ShimmerButton>
              <a
                href="https://github.com/vihaanshahh/recordloop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#646464] hover:text-black text-base font-light transition-colors"
              >
                <GitBranch size={16} />
                View on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#e8e8e8] px-6 md:px-16 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A7A7A7] font-light">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#E85002] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="font-normal text-[#646464]">RecordLoop</span>
          </div>
          <p>© {new Date().getFullYear()} RecordLoop. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/vihaanshahh/recordloop" className="hover:text-black transition-colors flex items-center gap-1">
              <GitBranch size={13} /> GitHub
            </a>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
