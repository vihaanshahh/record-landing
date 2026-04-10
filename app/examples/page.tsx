"use client";

import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, AnimatePresence, type Variants, type Easing } from "framer-motion";
import { useState } from "react";
import {
  GitBranch,
  ArrowLeft,
  CheckCircle2,
  Video,
  FileCode2,
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

const tabContent: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

type Tab = "nextjs" | "vue" | "svelte" | "rails";

interface Example {
  label: string;
  id: Tab;
  testId: string;
  scenario: string;
  yaml: string;
  prTitle: string;
  prNumber: number;
  filesChanged: number;
  flowsGenerated: number;
  flows: string[];
  cost: string;
}

const examples: Example[] = [
  {
    label: "Next.js",
    id: "nextjs",
    testId: "tab-nextjs",
    scenario: "Checkout form with coupon field",
    yaml: `# .github/workflows/recordloop.yml
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
          openai-api-key: \${{ secrets.OPENAI_API_KEY }}
          app-url: http://localhost:3000/checkout`,
    prTitle: "feat: add coupon code field to checkout form",
    prNumber: 42,
    filesChanged: 4,
    flowsGenerated: 2,
    flows: [
      "Fill checkout form and apply valid coupon code SAVE20",
      "Submit checkout with empty coupon field",
    ],
    cost: "$0.0024",
  },
  {
    label: "Vue",
    id: "vue",
    testId: "tab-vue",
    scenario: "Settings modal redesign",
    yaml: `# .github/workflows/recordloop.yml
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
          openai-api-key: \${{ secrets.OPENAI_API_KEY }}
          app-url: http://localhost:5173/settings`,
    prTitle: "refactor: redesign settings modal with tabbed layout",
    prNumber: 87,
    filesChanged: 6,
    flowsGenerated: 3,
    flows: [
      "Open settings modal and switch between General and Notifications tabs",
      "Toggle dark mode in the Appearance tab",
      "Update display name and save changes",
    ],
    cost: "$0.0031",
  },
  {
    label: "Svelte",
    id: "svelte",
    testId: "tab-svelte",
    scenario: "Dashboard filter dropdown",
    yaml: `# .github/workflows/recordloop.yml
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
          openai-api-key: \${{ secrets.OPENAI_API_KEY }}
          app-url: http://localhost:5173/dashboard`,
    prTitle: "feat: add multi-select filter dropdown to dashboard",
    prNumber: 31,
    filesChanged: 3,
    flowsGenerated: 2,
    flows: [
      "Open filter dropdown and select 'Last 7 days' + 'Active' status",
      "Clear all filters and verify table resets",
    ],
    cost: "$0.0019",
  },
  {
    label: "Rails",
    id: "rails",
    testId: "tab-rails",
    scenario: "User profile edit page",
    yaml: `# .github/workflows/recordloop.yml
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
          openai-api-key: \${{ secrets.OPENAI_API_KEY }}
          app-url: http://localhost:3000/users/1/edit`,
    prTitle: "fix: profile edit form losing avatar on validation error",
    prNumber: 156,
    filesChanged: 5,
    flowsGenerated: 2,
    flows: [
      "Upload new avatar, clear required name field, submit and verify avatar persists",
      "Edit bio with markdown and verify preview renders correctly",
    ],
    cost: "$0.0028",
  },
];

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("nextjs");

  const active = examples.find((e) => e.id === activeTab)!;

  return (
    <main className="min-h-screen bg-[#F9F9F9] flex flex-col">
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
            <a href="/" className="hover:text-black transition-colors">Home</a>
            <a href="/docs" className="hover:text-black transition-colors">Docs</a>
            <a href="/examples" className="text-black font-medium transition-colors">Examples</a>
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

      {/* ── HEADER ── */}
      <section className="pt-20 pb-12 text-center px-6">
        <motion.h1
          data-testid="examples-title"
          className="text-4xl md:text-5xl font-semibold tracking-tight text-black"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Examples
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-[#646464] font-light max-w-xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          See RecordLoop in action across different frameworks
        </motion.p>
      </section>

      {/* ── TAB STRIP ── */}
      <motion.div
        className="flex justify-center px-6"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={2}
      >
        <div className="inline-flex gap-1 p-1 bg-white rounded-xl border border-[#e8e8e8] shadow-sm">
          {examples.map((ex) => (
            <button
              key={ex.id}
              data-testid={ex.testId}
              onClick={() => setActiveTab(ex.id)}
              className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === ex.id
                  ? "bg-black text-white shadow-md"
                  : "text-[#646464] hover:text-black hover:bg-[#f0f0f0]"
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── EXAMPLE CONTENT ── */}
      <div className="max-w-4xl mx-auto w-full px-6 md:px-16 py-12" data-testid="example-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabContent}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Scenario label */}
            <div className="flex items-center gap-2 mb-6">
              <FileCode2 size={18} className="text-[#E85002]" />
              <span className="text-sm font-medium text-[#646464]">
                {active.label} scenario
              </span>
              <span className="text-sm text-[#A7A7A7]">&mdash;</span>
              <span className="text-sm font-light text-black">
                {active.scenario}
              </span>
            </div>

            {/* ── YAML code block ── */}
            <div className="rounded-xl overflow-hidden border border-[#e8e8e8] shadow-sm bg-[#1a1a2e]">
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#151525] border-b border-[#2a2a4a]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-[#8888aa] font-mono">
                  .github/workflows/recordloop.yml
                </span>
              </div>
              <pre className="p-5 text-sm leading-relaxed overflow-x-auto">
                <code className="text-[#d4d4e8] font-mono whitespace-pre">
                  {active.yaml}
                </code>
              </pre>
            </div>

            {/* ── Mock PR Comment Card ── */}
            <div className="mt-8 rounded-xl border border-[#e8e8e8] bg-white shadow-sm overflow-hidden">
              {/* PR comment header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#f0f0f0] bg-[#FAFAFA]">
                <div className="w-8 h-8 rounded-full bg-[#E85002] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-black">
                    recordloop
                  </span>
                  <span className="text-xs text-[#A7A7A7] ml-2">bot</span>
                </div>
                <span className="ml-auto text-xs text-[#A7A7A7]">just now</span>
              </div>

              <div className="p-5 space-y-4">
                {/* PR title */}
                <div className="flex items-start gap-2">
                  <span className="text-sm font-semibold text-black leading-snug">
                    RecordLoop &middot; PR #{active.prNumber}
                  </span>
                </div>

                <p className="text-sm text-[#646464] font-light">
                  The agent read{" "}
                  <span className="font-medium text-black">
                    {active.filesChanged} changed files
                  </span>{" "}
                  and generated{" "}
                  <span className="font-medium text-black">
                    {active.flowsGenerated} flows
                  </span>
                  :
                </p>

                {/* Flow list */}
                <ol className="space-y-2 pl-1">
                  {active.flows.map((flow, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={16}
                        className="text-green-500 mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-black font-light">
                        {flow}
                      </span>
                    </li>
                  ))}
                </ol>

                {/* Video links */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {active.flows.map((_, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-sm text-[#E85002] font-medium cursor-default"
                    >
                      <Video size={14} />
                      watch 0{i + 1}-recording.mp4
                    </span>
                  ))}
                </div>

                {/* Cost line */}
                <div className="pt-3 border-t border-[#f0f0f0] flex items-center gap-4 text-xs text-[#A7A7A7] font-light">
                  <span>
                    Cost:{" "}
                    <span className="text-[#646464] font-medium">
                      {active.cost}
                    </span>
                  </span>
                  <span>Model: gpt-5.4</span>
                  <span>7 iterations</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── FOOTER ── */}
      <footer className="mt-auto border-t border-[#e8e8e8] px-6 md:px-16 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#A7A7A7] font-light">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#E85002] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="font-normal text-[#646464]">RecordLoop</span>
          </div>
          <p>&copy; {new Date().getFullYear()} RecordLoop. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/" className="hover:text-black transition-colors flex items-center gap-1">
              <ArrowLeft size={13} /> Home
            </a>
            <a href="https://github.com/vihaanshahh/recordloop" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center gap-1">
              <GitBranch size={13} /> GitHub
            </a>
            <a href="/docs" className="hover:text-black transition-colors">Docs</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
