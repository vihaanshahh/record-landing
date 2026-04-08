"use client";

import { ShimmerButton } from "@/components/ui/shimmer-button";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { motion, type Variants, type Easing } from "framer-motion";
import {
  GitBranch,
  ArrowRight,
  FileCode,
  Brain,
  Video,
  TerminalSquare,
  Info,
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

const workflowYaml = `name: RecordLoop
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
          openai-api-key: \${{ secrets.OPENAI_API_KEY }}`;

const quickStartSteps = [
  {
    number: "01",
    title: "Create the workflow file",
    description:
      "Copy the YAML above into .github/workflows/recordloop.yml in your repository.",
  },
  {
    number: "02",
    title: "Add your OpenAI API key",
    description:
      "Go to Settings → Secrets and variables → Actions, then add a new repository secret named OPENAI_API_KEY.",
  },
  {
    number: "03",
    title: "Open a pull request",
    description:
      "RecordLoop analyzes the diff on every PR and posts a comment with AI-generated test flows. No extra config required.",
  },
];

const howItWorks = [
  {
    icon: FileCode,
    title: "PR diff",
    description:
      "RecordLoop fetches the changed files via the GitHub API — no local checkout of the analyzer is required.",
  },
  {
    icon: Brain,
    title: "Agent loop",
    description:
      "An LLM agent uses tools (read_file, read_diff, list_files, submit_flows) to navigate the diff and generate flows. Bounded by MAX_ITERATIONS=10, MAX_FILES_READ=30, MAX_TOTAL_INPUT_TOKENS=50,000.",
  },
  {
    icon: Video,
    title: "Playwright replay",
    description:
      "If a preview-url is configured, the action records each flow as an MP4 and includes the link directly in the PR comment.",
  },
];

type ConfigRow = {
  input: string;
  required: string;
  default: string;
  description: string;
};

const configRows: ConfigRow[] = [
  {
    input: "openai-api-key",
    required: "conditional",
    default: "—",
    description:
      "OpenAI API key. Used by the analyzer agent loop to read the PR diff and generate flows. Required when provider=openai.",
  },
  {
    input: "azure-openai-api-key",
    required: "conditional",
    default: "—",
    description: "Azure OpenAI API key. Required when provider=azure.",
  },
  {
    input: "azure-openai-endpoint",
    required: "conditional",
    default: "—",
    description:
      "Azure OpenAI resource endpoint, e.g. https://my-resource.openai.azure.com.",
  },
  {
    input: "azure-openai-deployment",
    required: "conditional",
    default: "—",
    description:
      "Azure OpenAI deployment name (used as the model identifier).",
  },
  {
    input: "provider",
    required: "no",
    default: "openai",
    description: '"openai" (default) or "azure".',
  },
  {
    input: "model",
    required: "no",
    default: "gpt-5.4",
    description:
      "Model name. Defaults to gpt-5.4. Override to gpt-4o-mini for the cheapest setup.",
  },
  {
    input: "preview-url",
    required: "no",
    default: "—",
    description:
      "PR preview deployment URL. If empty, the action posts planned flows but skips video recording.",
  },
  {
    input: "github-token",
    required: "no",
    default: "${{ github.token }}",
    description:
      "GitHub token with pull-requests:write. Defaults to the workflow GITHUB_TOKEN.",
  },
  {
    input: "python-version",
    required: "no",
    default: "3.12",
    description: "Python version to install on the runner.",
  },
];

const frameworks = [
  "React",
  "Vue",
  "Next.js",
  "Nuxt",
  "Angular",
  "Svelte",
  "SvelteKit",
  "Astro",
  "Solid",
  "Qwik",
  "Remix",
  "Blazor",
  "Razor",
  "ASP.NET MVC",
  "Phoenix LiveView",
  "Rails ERB",
  "Django",
  "Jinja",
  "Twig",
  "Handlebars",
  "Liquid",
  "Pug",
  "Nunjucks",
  "PHP",
  "HTMX",
  "Plain HTML",
];

const costBullets = [
  "Typical PR: $0.001–$0.005 with gpt-5.4 (default)",
  "Worst case: ~$0.10 even on reasoning models (bounded by the agent caps)",
  "1,000 PRs/month: ~$2–$6",
  "GitHub Actions runtime: free for public repos",
  "No subscription, no SaaS markup, no quotas — you bring your own OpenAI key",
];

export default function DocsPage() {
  return (
    <main className="w-full overflow-x-hidden bg-[#F9F9F9] text-[#000000]">
      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-[#F9F9F9]/80 backdrop-blur-md border-b border-[#e8e8e8]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 md:px-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#E85002] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <span className="font-semibold text-base tracking-tight">RecordLoop</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#646464]">
            <a href="/#how" className="hover:text-black transition-colors">How it works</a>
            <a href="/#features" className="hover:text-black transition-colors">Features</a>
            <a href="/#pricing" className="hover:text-black transition-colors">Pricing</a>
            <a href="/docs" className="text-black transition-colors">Docs</a>
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
      <motion.section
        className="relative px-6 md:px-16 pt-24 pb-16 max-w-5xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">
          Documentation
        </p>
        <h1 className="text-5xl md:text-7xl font-light leading-[1.05] tracking-tight text-[#000000]">
          Documentation
        </h1>
        <p className="mt-6 text-lg md:text-xl text-[#646464] max-w-2xl leading-relaxed font-light">
          Everything you need to install RecordLoop, configure it, and understand
          what&apos;s happening under the hood.
        </p>
        <p className="mt-4 text-sm text-[#A7A7A7] font-light">
          Open source, MIT licensed. View source on{" "}
          <a
            href="https://github.com/vihaanshahh/recordloop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#E85002] hover:underline"
          >
            GitHub
          </a>
          .
        </p>
      </motion.section>

      {/* ── QUICK START ── */}
      <motion.section
        className="border-t border-[#e8e8e8] px-6 md:px-16 py-24"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">
            Quick start
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#000000] leading-tight mb-4">
            12 lines. One secret.
          </h2>
          <p className="text-[#646464] font-light max-w-xl mb-10">
            Drop this workflow file into your repo. That&apos;s the entire install.
          </p>

          <div className="relative rounded-2xl border border-[#e8e8e8] bg-[#000000] overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.05)]">
            <BorderBeam colorFrom="#E85002" colorTo="#FBC3AB" duration={10} size={350} />
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-[#A7A7A7] font-light">
                .github/workflows/recordloop.yml
              </span>
            </div>
            <pre className="p-6 text-xs md:text-sm font-light leading-relaxed overflow-x-auto text-[#F9F9F9]/90 whitespace-pre">
              <code>{workflowYaml}</code>
            </pre>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStartSteps.map((step) => (
              <div key={step.number} className="flex flex-col gap-3">
                <div className="text-[48px] font-extralight text-[#e8e8e8] leading-none select-none">
                  {step.number}
                </div>
                <h3 className="text-base font-normal text-[#000000]">{step.title}</h3>
                <p className="text-sm text-[#646464] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── HOW IT WORKS ── */}
      <motion.section
        className="border-t border-[#e8e8e8] px-6 md:px-16 py-24"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#000000] leading-tight mb-12">
            From diff to video<br />in three stages.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {howItWorks.map((item) => (
              <MagicCard
                key={item.title}
                className="p-6 h-full border border-[#e8e8e8] bg-white"
                gradientColor="#FFF0E8"
                gradientOpacity={1}
                gradientSize={160}
              >
                <div className="flex flex-col h-full">
                  <div className="w-9 h-9 rounded-lg border border-[#e8e8e8] flex items-center justify-center mb-5">
                    <item.icon size={15} className="text-[#E85002]" />
                  </div>
                  <h3 className="font-normal text-sm text-[#000000] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#646464] font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CONFIGURATION ── */}
      <motion.section
        className="border-t border-[#e8e8e8] px-6 md:px-16 py-24"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">
            Configuration
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#000000] leading-tight mb-4">
            Action inputs
          </h2>
          <p className="text-[#646464] font-light max-w-xl mb-10">
            Every knob exposed by the RecordLoop GitHub Action. All are optional
            except one of the provider keys.
          </p>

          <div className="rounded-2xl border border-[#e8e8e8] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e8e8e8] bg-[#fafafa] text-left">
                    <th className="px-5 py-3 font-normal text-[#646464] text-xs uppercase tracking-wider">
                      Input
                    </th>
                    <th className="px-5 py-3 font-normal text-[#646464] text-xs uppercase tracking-wider">
                      Required?
                    </th>
                    <th className="px-5 py-3 font-normal text-[#646464] text-xs uppercase tracking-wider">
                      Default
                    </th>
                    <th className="px-5 py-3 font-normal text-[#646464] text-xs uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {configRows.map((row) => (
                    <tr key={row.input} className="border-b border-[#f0f0f0] last:border-b-0 align-top">
                      <td className="px-5 py-4 font-mono text-xs text-[#000000] whitespace-nowrap">
                        {row.input}
                      </td>
                      <td className="px-5 py-4 text-xs text-[#646464] font-light whitespace-nowrap">
                        {row.required}
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-[#646464] whitespace-nowrap">
                        {row.default}
                      </td>
                      <td className="px-5 py-4 text-sm text-[#646464] font-light leading-relaxed">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── FRAMEWORKS ── */}
      <motion.section
        className="border-t border-[#e8e8e8] px-6 md:px-16 py-24"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">
            Frameworks
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#000000] leading-tight mb-4">
            Works with anything<br />that ships markup.
          </h2>
          <p className="text-[#646464] font-light max-w-xl mb-10">
            The universal file filter detects changed UI across 25+ frameworks.
          </p>

          <div className="flex flex-wrap gap-2">
            {frameworks.map((fw) => (
              <span
                key={fw}
                className="text-xs font-light text-[#646464] border border-[#e8e8e8] rounded-full px-3 py-1.5 bg-white"
              >
                {fw}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── COST ── */}
      <motion.section
        className="border-t border-[#e8e8e8] px-6 md:px-16 py-24"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">
            Cost
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#000000] leading-tight mb-4">
            Pay only your<br />OpenAI bill.
          </h2>
          <p className="text-[#646464] font-light max-w-xl mb-10">
            RecordLoop has no billing. You bring your own API key and pay OpenAI directly.
          </p>

          <div className="rounded-2xl border border-[#e8e8e8] bg-white p-8 md:p-10">
            <ul className="flex flex-col gap-4">
              {costBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-[#646464] font-light leading-relaxed">
                  <ArrowRight size={14} className="text-[#E85002] mt-1 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* ── DRY RUN ── */}
      <motion.section
        className="border-t border-[#e8e8e8] px-6 md:px-16 py-24"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-[#E85002] text-xs font-normal uppercase tracking-[0.2em] mb-4">
            Dry run
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-[#000000] leading-tight mb-10">
            CI smoke tests<br />without a secret.
          </h2>

          <div className="relative rounded-2xl border border-[#e8e8e8] bg-white p-6 md:p-8 flex gap-5 items-start">
            <div className="w-10 h-10 rounded-lg border border-[#e8e8e8] flex items-center justify-center flex-shrink-0">
              <TerminalSquare size={16} className="text-[#E85002]" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Info size={14} className="text-[#646464]" />
                <span className="font-mono text-xs text-[#000000] bg-[#fafafa] border border-[#e8e8e8] rounded px-2 py-0.5">
                  RECORDLOOP_DRY_RUN=1
                </span>
              </div>
              <p className="text-sm text-[#646464] font-light leading-relaxed">
                Runs the full pipeline without making an LLM call and returns a
                synthetic flow. Useful for wiring the action into CI as a smoke
                test with no secrets configured — great for forks and public
                preview branches.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

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
