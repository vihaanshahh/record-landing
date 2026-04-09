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
import { useState } from "react";
import {
  GitBranch,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Video,
  GitPullRequest,
  Zap,
  DollarSign,
  Brain,
  Sparkles,
  GitMerge,
  Globe,
  ShieldCheck,
  Copy,
  Check,
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
    icon: Zap,
    title: "12-line install",
    description:
      "One workflow file, one secret. `uses: vihaanshahh/recordloop@v1` and you're done. No JS SDK, no bridge server, nothing to commit.",
  },
  {
    icon: Brain,
    title: "AI reads your diff",
    description:
      "An agent loop reads your PR's changed files with tools (read_file, read_diff, list_files) and generates realistic Playwright flows that exercise exactly what changed.",
  },
  {
    icon: Globe,
    title: "30+ frameworks",
    description:
      "Universal file filter covers React, Vue, Svelte, Angular, Astro, Nuxt, Blazor, Razor, Rails ERB, Phoenix, Django, HTMX, plain HTML — anything that ships markup.",
  },
  {
    icon: DollarSign,
    title: "Bounded cost",
    description:
      "$0.001–$0.005 per PR on gpt-5.4. Agent is hard-capped at 10 iterations, 30 files, 50K input tokens — worst case ~$0.10 even on reasoning models.",
  },
  {
    icon: ShieldCheck,
    title: "Open source (MIT)",
    description:
      "Every line of the analyzer, the action, and the agent prompts is auditable on GitHub. MIT licensed. Fork it, self-host it, read it.",
  },
  {
    icon: GitMerge,
    title: "Zero infra",
    description:
      "Everything runs on the GitHub runner. No JS SDK in your bundle. No bridge server. No S3 bucket. No committed session files. Supports OpenAI and Azure OpenAI.",
  },
];

const steps = [
  {
    number: "01",
    title: "Add the workflow file",
    description: "Drop this 12-line YAML into .github/workflows/recordloop.yml. That's the entire install — no pip, no npm, no bridge server. The action handles its own dependencies on the runner.",
    code: `# .github/workflows/recordloop.yml
name: RecordLoop
on:
  pull_request:
    types: [opened, synchronize, reopened]
permissions:
  pull-requests: write
jobs:
  recordloop:
    runs-on: ubuntu-latest
    if: github.event.pull_request.head.repo.full_name == github.repository
    steps:
      - uses: vihaanshahh/recordloop@v1
        with:
          openai-api-key: \${{ secrets.OPENAI_API_KEY }}`,
  },
  {
    number: "02",
    title: "Add your OpenAI key as a secret",
    description: "One secret. That's it. Use the gh CLI or Settings → Secrets and variables → Actions. Azure OpenAI works too if you need compliance-friendly routing.",
    code: `# one-liner via the gh CLI
gh secret set OPENAI_API_KEY

# or, for a free smoke test with no key:
# set env RECORDLOOP_DRY_RUN=1 on the action`,
  },
  {
    number: "03",
    title: "Open a PR — get a video comment",
    description: "On every PR, the agent reads your diff, generates Playwright flows targeted at the changed components, replays them against your preview URL, and posts the MP4s as a comment.",
    code: `## RecordLoop · PR #42

The agent read 4 changed files and generated 2 flows:

  1. Submit checkout form with new coupon field
  2. Tab through the redesigned settings modal

[watch 01-checkout.mp4] · [watch 02-settings.mp4]

Cost: $0.0024 · Model: gpt-5.4 · 7 iterations`,
  },
];

const pricingTiers = [
  {
    name: "Free · MIT · BYO LLM key",
    price: "$0",
    period: "forever",
    features: [
      "$0.001–$0.005 per PR (your OpenAI cost)",
      "MIT licensed — fork, audit, self-host",
      "No quotas, no rate limits, no seats",
      "Worst-case ~$0.10 per PR via agent caps",
      "OpenAI or Azure OpenAI",
      "Free dry-run mode for CI smoke tests",
    ],
    cta: "Install in 30 seconds",
    highlighted: true,
  },
];

const faqs = [
  {
    value: "different",
    title: "How is this different from Loom or Cypress recordings?",
    content:
      "Loom is a human pressing record — someone has to remember, and the output is someone's voice describing a bug. Cypress recordings are assertions a human already wrote. RecordLoop is neither: an AI agent reads the diff of your pull request, decides what flows matter, generates Playwright code on the fly, and posts the videos as a PR comment. Nobody records anything. Nobody writes tests. The agent does both every time you push.",
  },
  {
    value: "agent",
    title: "What does the AI actually do?",
    content:
      "It's a tool-using agent loop. On each PR, it gets a system prompt and four tools: read_diff, list_files, read_file, and submit_flows. It starts by triaging the cheap diff summary, then drills into whichever changed components look load-bearing, then emits a list of Playwright flows targeted at exactly those changes. A separate Playwright worker on the runner replays the flows against your preview URL and uploads MP4s. The whole loop is hard-capped at 10 iterations and 50K input tokens.",
  },
  {
    value: "cost",
    title: "How much does it cost?",
    content:
      "$0.001 to $0.005 per PR on the default gpt-5.4 model — OpenAI passthrough, you pay your own bill, we don't mark anything up. Override `model` to `gpt-4o-mini` and it gets even cheaper. The agent loop is bounded by MAX_ITERATIONS=10, MAX_FILES_READ=30, and MAX_TOTAL_INPUT_TOKENS=50_000, so worst-case is around $0.10 per PR even on expensive reasoning models. There are no seats, no quotas, no minimums.",
  },
  {
    value: "frameworks",
    title: "Which frameworks are supported?",
    content:
      "Anything that ships HTML. The analyzer uses a universal file filter, so the list is long: React, Vue, Next.js, Angular, Svelte, Astro, Solid, Qwik, Nuxt, SvelteKit, Remix, Blazor, Razor / ASP.NET, Ruby on Rails (ERB), Phoenix LiveView, Django (Jinja), Twig, Handlebars, Liquid, Pug, Nunjucks, PHP, plain HTML, and HTMX. If your framework renders markup, RecordLoop can read it.",
  },
  {
    value: "privacy",
    title: "Is my source code sent to OpenAI?",
    content:
      "Yes — only the files changed in the PR, capped at roughly 50K tokens of input context, are sent to whichever provider you configured. Nothing else in your repo is read. If you need compliance-friendly routing, set `provider: azure` and point at your own Azure OpenAI deployment — in that case your code never leaves your Azure tenant. The entire agent is MIT-licensed, so you can audit exactly which bytes get sent.",
  },
  {
    value: "injection",
    title: "What about prompt injection from PR contributors?",
    content:
      "Honest answer: this is a real risk for any LLM-in-CI product and we treat it seriously. Generated Playwright flows are constrained to same-origin navigation against your preview URL, the action runs under an allowlist of Playwright APIs (no shell, no network exfil), and the `if:` guard on the workflow disables the job entirely on PRs from forks so untrusted contributors can't access your OpenAI key. The whole analyzer is MIT-licensed, so you can audit the prompt, the tool surface, and the sandbox yourself.",
  },
  {
    value: "self-host",
    title: "Can I self-host it on my own runners?",
    content:
      "Yes, fully. RecordLoop is a composite GitHub Action — it runs wherever your workflow runs. Point it at a self-hosted runner via `runs-on: [self-hosted, linux]` and the action installs its own Playwright + ffmpeg dependencies on first run, then re-uses the cached layer on subsequent jobs. You keep your OpenAI key in your own secret store, you control the network egress, and the recordings stay inside your GitHub org as release assets. There is no RecordLoop server, no telemetry, no phone-home — the entire pipeline is the action itself.",
  },
];

const frameworks = ["React", "Vue", "Next.js", "Nuxt", "Angular", "Svelte", "Astro", "Blazor", "Razor", "Phoenix", "Rails", "Django", "HTMX", "Plain HTML"];

const QUICKSTART_YAML = `# .github/workflows/recordloop.yml
name: RecordLoop
on:
  pull_request:
    types: [opened, synchronize, reopened]
permissions:
  pull-requests: write
  contents: write
jobs:
  recordloop:
    runs-on: ubuntu-latest
    steps:
      - uses: vihaanshahh/recordloop@v1
        with:
          openai-api-key: \${{ secrets.OPENAI_API_KEY }}`;

export default function Home() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(QUICKSTART_YAML).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

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
            <a href="/docs" className="hover:text-black transition-colors">Docs</a>
            <a href="https://github.com/vihaanshahh/recordloop" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GitHub</a>
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
            <a
              href="https://github.com/vihaanshahh/recordloop#quick-start"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="nav-install-cta"
              aria-label="Install RecordLoop in 30 seconds"
            >
              <ShimmerButton
                shimmerColor="#E85002"
                background="#000000"
                className="text-sm font-normal px-4 py-2 h-9"
              >
                Install in 30 seconds
              </ShimmerButton>
            </a>
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
              Open source (MIT) · AI agent · 12-line install
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
            Your PR diff →{" "}
            <span
              className="font-normal"
              style={{
                background: "linear-gradient(90deg, #C10801, #E85002, #F16021)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              an AI agent → Playwright videos.
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-[#646464] max-w-xl leading-relaxed font-light"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            An AI agent reads your changed components, generates realistic
            interaction flows, replays them with Playwright, and posts the videos
            as a PR comment. 12-line install. No JS SDK. No S3. No infrastructure.
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
            className="mt-10 w-full max-w-xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            {/* Inline quickstart snippet */}
            <div className="relative rounded-xl border border-[#e8e8e8] bg-[#000000] overflow-hidden text-left shadow-[0_4px_32px_rgba(0,0,0,0.08)]">
              {/* Terminal chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-[11px] text-white/30 font-light">.github/workflows/recordloop.yml</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[11px] font-light transition-colors px-2 py-1 rounded-md"
                  style={{ color: copied ? "#28c840" : "rgba(255,255,255,0.4)" }}
                  aria-label="Copy YAML"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="p-5 text-xs font-light leading-relaxed overflow-x-auto text-[#F9F9F9]/75 whitespace-pre select-all">
                <code>{QUICKSTART_YAML}</code>
              </pre>
            </div>

            {/* Secondary link */}
            <div className="mt-4 flex justify-center">
              <a
                href="https://github.com/vihaanshahh/recordloop"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#646464] hover:text-black text-sm font-light transition-colors"
              >
                <GitBranch size={14} />
                View on GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm text-[#A7A7A7] font-light"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            {["$0.001–$0.005 per PR", "MIT licensed", "OpenAI or Azure"].map((item) => (
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
                { step: "PR opened", label: "GitHub Action triggers on pull_request events", icon: GitPullRequest, color: "#E85002" },
                { step: "Agent reads diff", label: "LLM uses read_file / read_diff / list_files tools", icon: Brain, color: "#F16021" },
                { step: "Playwright replay", label: "Generated flows run against your preview URL", icon: Video, color: "#C10801" },
                { step: "PR comment", label: "MP4 videos posted back to the PR automatically", icon: Sparkles, color: "#E85002" },
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
              Three steps.<br />Twelve lines.
            </h2>
            <p className="mt-4 text-[#646464] font-light max-w-sm">
              One workflow file, one secret. The agent handles the rest on every PR — $0.001 to $0.005 per run.
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
            An agent that understands<br />your PR diff.
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
              OpenAI cost passthrough.<br />Nothing else.
            </h2>
            <p className="mt-4 text-[#646464] font-light max-w-md">
              RecordLoop is MIT licensed and free forever. You pay your own OpenAI (or Azure OpenAI) bill — roughly $0.001 to $0.005 per PR. No seats, no tiers, no markup.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-md mx-auto">
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
            Need compliance-friendly routing? Point the action at your own Azure OpenAI deployment — your code never leaves your tenant. Read the <a href="/docs" className="text-[#E85002] hover:underline">docs</a> or check the <a href="https://github.com/vihaanshahh/recordloop/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-[#E85002] hover:underline">MIT license</a>.
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
              Twelve lines. One secret. Every PR.
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-[#000000] mb-4">
              Stop writing UI tests.<br />Let the agent do it.
            </h2>
            <p className="text-[#646464] font-light text-lg mb-8 max-w-sm mx-auto">
              Add the workflow file. Set OPENAI_API_KEY. Open a PR. Done.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://github.com/vihaanshahh/recordloop#quick-start" target="_blank" rel="noopener noreferrer">
                <ShimmerButton
                  shimmerColor="#F16021"
                  background="#E85002"
                  className="font-normal px-8 py-3.5 text-base"
                >
                  Install in 30 seconds
                </ShimmerButton>
              </a>
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
            <a href="https://github.com/vihaanshahh/recordloop" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center gap-1">
              <GitBranch size={13} /> GitHub
            </a>
            <a href="/docs" className="hover:text-black transition-colors">Docs</a>
            <a href="https://github.com/vihaanshahh/recordloop/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">MIT License</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
