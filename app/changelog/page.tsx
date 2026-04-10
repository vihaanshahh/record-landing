"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, type Variants, type Easing } from "framer-motion";
import { GitBranch, ArrowLeft, Tag } from "lucide-react";

const easeOut: Easing = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: easeOut },
  }),
};

const releases = [
  {
    version: "v0.2.0",
    date: "April 7, 2026",
    latest: true,
    changes: [
      "Agentic flow generation now supports multi-page navigation sequences",
      "Added Azure OpenAI provider support with tenant-scoped routing",
      "New `max-flows` input to cap the number of generated Playwright scripts per PR",
      "Reduced average agent loop iterations from 6.2 to 3.8 via smarter diff triage",
      "Video artifacts now include a lightweight HTML summary with inline thumbnails",
    ],
  },
  {
    version: "v0.1.9",
    date: "March 22, 2026",
    latest: false,
    changes: [
      "Fixed race condition when multiple Playwright flows write to the same artifact directory",
      "Improved file filter to correctly detect Astro `.astro` and Svelte `.svelte` components",
      "Agent now respects `RECORDLOOP_DRY_RUN` env var for cost-free CI smoke tests",
      "Bumped Playwright dependency to 1.48 for improved WebKit recording stability",
    ],
  },
  {
    version: "v0.1.8",
    date: "March 10, 2026",
    latest: false,
    changes: [
      "Added support for custom preview URL patterns via `preview-url` input",
      "Agent tool calls are now logged in debug mode for easier troubleshooting",
      "Fixed token counting bug that caused premature loop termination on large diffs",
      "PR comment now includes cost breakdown and model info",
    ],
  },
  {
    version: "v0.1.7",
    date: "February 28, 2026",
    latest: false,
    changes: [
      "Introduced hard caps: MAX_ITERATIONS=10, MAX_FILES_READ=30, MAX_TOTAL_INPUT_TOKENS=50K",
      "Added `gpt-4o-mini` as a supported model for budget-conscious teams",
      "Playwright flows are now sandboxed to same-origin navigation only",
      "Fork PRs are automatically skipped to prevent secret exfiltration",
    ],
  },
  {
    version: "v0.1.0",
    date: "February 1, 2026",
    latest: false,
    changes: [
      "Initial public release under MIT license",
      "Agentic analyzer with tool-using loop: read_diff, list_files, read_file, submit_flows",
      "Composite GitHub Action with auto-installed Playwright and ffmpeg",
      "MP4 recordings uploaded as workflow artifacts and posted as PR comments",
      "Universal file filter supporting 30+ web frameworks",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="w-full overflow-x-hidden bg-[#F9F9F9] text-[#000000] min-h-screen flex flex-col">
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
            <a href="/#faq" className="hover:text-black transition-colors">FAQ</a>
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

      {/* ── PAGE HEADER ── */}
      <section className="max-w-3xl mx-auto w-full px-6 pt-20 pb-12 md:px-16">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#646464] hover:text-black transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to home
          </a>
        </motion.div>

        <motion.h1
          data-testid="changelog-title"
          className="text-4xl md:text-5xl font-light tracking-tight text-[#000000] mb-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Changelog
        </motion.h1>

        <motion.p
          className="text-lg text-[#646464] font-light max-w-xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          New updates and improvements to RecordLoop. Follow along as we ship.
        </motion.p>
      </section>

      {/* ── RELEASE ENTRIES ── */}
      <section className="max-w-3xl mx-auto w-full px-6 pb-24 md:px-16 flex flex-col gap-8">
        {releases.map((release, index) => (
          <motion.div
            key={release.version}
            data-testid={`release-${release.version}`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={index}
          >
            <MagicCard className="bg-white border-[#e8e8e8]">
              <div className="p-6 md:p-8 w-full">
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-[#E85002]" />
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                      {release.version}
                    </h2>
                  </div>
                  {release.latest && (
                    <span
                      data-testid="latest-badge"
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E85002] text-white"
                    >
                      Latest
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#646464] font-light mb-5">
                  {release.date}
                </p>

                <ul className="space-y-2.5">
                  {release.changes.map((change, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[15px] text-[#646464] font-light leading-relaxed"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#E85002] flex-shrink-0" />
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </section>

      {/* ── FOOTER ── */}
      <footer className="mt-auto border-t border-[#e8e8e8] bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto w-full px-6 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#E85002] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight">RecordLoop</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#646464]">
            <a href="/" className="hover:text-black transition-colors">Home</a>
            <a href="/docs" className="hover:text-black transition-colors">Docs</a>
            <a
              href="https://github.com/vihaanshahh/recordloop"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              GitHub
            </a>
          </div>
          <p className="text-xs text-[#646464] font-light">
            MIT License &middot; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}
