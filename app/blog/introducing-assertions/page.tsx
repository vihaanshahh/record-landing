"use client";

import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, type Variants, type Easing } from "framer-motion";
import { useState } from "react";
import {
  GitBranch,
  ArrowLeft,
  Clock,
  User,
  Calendar,
  ChevronDown,
  XCircle,
  CheckCircle2,
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

const tocItems = [
  { id: "section-problem", label: "The problem with demo recorders" },
  { id: "section-assertions", label: "What assertions look like" },
  { id: "section-passfail", label: "Pass/fail on every PR" },
  { id: "section-next", label: "What's next" },
];

export default function BlogAssertionsPost() {
  const [tocOpen, setTocOpen] = useState(false);

  return (
    <div className="min-h-full flex flex-col bg-[#F9F9F9]">
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

      {/* ── BLOG CONTENT ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* ── TABLE OF CONTENTS (sidebar on desktop, collapsible on mobile) ── */}
          <aside data-testid="toc" className="lg:w-56 shrink-0 order-2 lg:order-1">
            {/* Mobile TOC */}
            <div className="lg:hidden mb-8">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="flex items-center gap-2 text-sm font-medium text-black"
              >
                Table of contents
                <ChevronDown
                  size={16}
                  className={`transition-transform ${tocOpen ? "rotate-180" : ""}`}
                />
              </button>
              {tocOpen && (
                <nav className="mt-3 flex flex-col gap-2">
                  {tocItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-sm text-[#646464] hover:text-[#E85002] transition-colors font-light"
                      onClick={() => setTocOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              )}
            </div>

            {/* Desktop TOC */}
            <div className="hidden lg:block sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#646464] mb-4">
                On this page
              </p>
              <nav className="flex flex-col gap-3">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="text-sm text-[#646464] hover:text-[#E85002] transition-colors font-light"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── ARTICLE ── */}
          <article className="flex-1 min-w-0 order-1 lg:order-2">

            {/* Header */}
            <motion.header
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-12"
            >
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-[#646464] hover:text-[#E85002] transition-colors mb-6"
              >
                <ArrowLeft size={14} />
                Back to home
              </a>

              <h1
                data-testid="blog-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight mb-4"
              >
                Introducing Assertions: RecordLoop is now a real test, not a screensaver
              </h1>

              <div
                data-testid="blog-author"
                className="flex flex-wrap items-center gap-4 text-sm text-[#646464] font-light"
              >
                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  Vihaan Shah
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  April 9, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  4 min read
                </span>
              </div>
            </motion.header>

            {/* ── SECTION: The problem with demo recorders ── */}
            <motion.section
              id="section-problem"
              data-testid="section-problem"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={1}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
                The problem with demo recorders
              </h2>
              <div className="space-y-5 text-[#646464] font-light leading-relaxed text-base">
                <p>
                  Until today, RecordLoop did one thing: it watched an AI agent click through your
                  app after every PR, then posted the video as a comment. Reviewers loved it. They
                  could see the flow without pulling the branch. But there was a glaring gap: the
                  video was a GIF, not a test. If the button led to a 404 or the form silently
                  swallowed an error, the recording still looked green. A passing Loom, not a
                  passing test.
                </p>
                <p>
                  Demo recorders are useful for documentation. They are terrible for catching
                  regressions. A screen recording of a checkout flow tells you the page loaded. It
                  does not tell you the total was calculated correctly, the success toast appeared,
                  or the URL changed to <code className="bg-[#f0f0f0] px-1.5 py-0.5 rounded text-sm text-black">/order/confirmed</code>.
                  Without assertions, every recording is a silent pass. The reviewer has to squint
                  at the video and decide for themselves whether it looks right.
                </p>
                <p>
                  We heard this from teams over and over: "We love the recordings, but we need
                  them to actually fail." So we built assertions directly into the agent loop.
                  RecordLoop is now a real test runner that happens to produce a video as a side
                  effect.
                </p>
              </div>
            </motion.section>

            {/* ── SECTION: What assertions look like ── */}
            <motion.section
              id="section-assertions"
              data-testid="section-assertions"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={1}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
                What assertions look like
              </h2>
              <p className="text-[#646464] font-light leading-relaxed mb-6">
                The agent now emits four assertion types as part of its generated Playwright
                flows. Each one maps to a Playwright <code className="bg-[#f0f0f0] px-1.5 py-0.5 rounded text-sm text-black">expect()</code> call
                under the hood. If any assertion fails, the entire flow is marked red and the PR
                check fails.
              </p>

              <div className="space-y-4">
                {/* assert_text */}
                <div className="rounded-lg border border-[#e8e8e8] bg-white overflow-hidden">
                  <div className="px-4 py-2 bg-[#f0f0f0] border-b border-[#e8e8e8] text-xs font-medium text-[#646464]">
                    assert_text &mdash; check visible text content
                  </div>
                  <pre className="px-4 py-3 text-sm overflow-x-auto text-black">
                    <code>{`# After submitting the checkout form,
# verify the confirmation message appears
assert_text:
  selector: "[data-testid='order-status']"
  expected: "Order confirmed"
  timeout: 5000`}</code>
                  </pre>
                </div>

                {/* assert_attribute */}
                <div className="rounded-lg border border-[#e8e8e8] bg-white overflow-hidden">
                  <div className="px-4 py-2 bg-[#f0f0f0] border-b border-[#e8e8e8] text-xs font-medium text-[#646464]">
                    assert_attribute &mdash; verify element attributes
                  </div>
                  <pre className="px-4 py-3 text-sm overflow-x-auto text-black">
                    <code>{`# Ensure the submit button is not disabled
# after filling in all required fields
assert_attribute:
  selector: "button[type='submit']"
  attribute: "disabled"
  expected: null`}</code>
                  </pre>
                </div>

                {/* assert_url */}
                <div className="rounded-lg border border-[#e8e8e8] bg-white overflow-hidden">
                  <div className="px-4 py-2 bg-[#f0f0f0] border-b border-[#e8e8e8] text-xs font-medium text-[#646464]">
                    assert_url &mdash; check navigation happened
                  </div>
                  <pre className="px-4 py-3 text-sm overflow-x-auto text-black">
                    <code>{`# After clicking "Go to dashboard",
# verify the URL changed correctly
assert_url:
  pattern: "/dashboard"
  match: "contains"
  timeout: 3000`}</code>
                  </pre>
                </div>

                {/* assert_visible */}
                <div className="rounded-lg border border-[#e8e8e8] bg-white overflow-hidden">
                  <div className="px-4 py-2 bg-[#f0f0f0] border-b border-[#e8e8e8] text-xs font-medium text-[#646464]">
                    assert_visible &mdash; confirm an element is in the viewport
                  </div>
                  <pre className="px-4 py-3 text-sm overflow-x-auto text-black">
                    <code>{`# After scrolling to the pricing section,
# verify the pricing card is visible
assert_visible:
  selector: "[data-testid='pricing-card']"
  timeout: 5000`}</code>
                  </pre>
                </div>
              </div>
            </motion.section>

            {/* ── SECTION: Pass/fail on every PR ── */}
            <motion.section
              id="section-passfail"
              data-testid="section-passfail"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={1}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
                Pass/fail on every PR
              </h2>
              <div className="space-y-5 text-[#646464] font-light leading-relaxed text-base mb-8">
                <p>
                  Assertions turn RecordLoop from a notification into a gate. When every assertion
                  passes, the PR check stays green and the video comment shows a summary of what
                  was validated. When any assertion fails, the check turns red and the comment
                  includes a detailed failure card showing exactly which assertion broke, what was
                  expected, and what was found instead.
                </p>
                <p>
                  You can configure your branch protection rules to require the RecordLoop check.
                  That means a PR cannot be merged if the agent&rsquo;s assertions fail. No more
                  &ldquo;looks good to me&rdquo; based on a video that happened to not crash.
                </p>
              </div>

              {/* Mock PR comment card */}
              <div className="rounded-lg border border-red-200 bg-white overflow-hidden shadow-sm">
                <div className="px-5 py-3 bg-red-50 border-b border-red-200 flex items-center gap-2">
                  <XCircle size={16} className="text-red-600" />
                  <span className="text-sm font-semibold text-red-800">
                    RecordLoop &middot; PR #87 &mdash; 1 assertion failed
                  </span>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="font-medium text-black">assert_text</span>
                      <span className="text-[#646464] font-light"> &mdash; &quot;Order confirmed&quot; found in </span>
                      <code className="bg-[#f0f0f0] px-1 py-0.5 rounded text-xs">[data-testid=&apos;order-status&apos;]</code>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="font-medium text-black">assert_visible</span>
                      <span className="text-[#646464] font-light"> &mdash; pricing card is visible</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle size={16} className="text-red-600 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <span className="font-medium text-red-800">assert_url</span>
                      <span className="text-[#646464] font-light"> &mdash; expected URL to contain </span>
                      <code className="bg-red-50 border border-red-200 px-1 py-0.5 rounded text-xs text-red-800">/dashboard</code>
                      <span className="text-[#646464] font-light">, got </span>
                      <code className="bg-red-50 border border-red-200 px-1 py-0.5 rounded text-xs text-red-800">/login</code>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#e8e8e8] text-xs text-[#646464] font-light">
                    Cost: $0.0031 &middot; Model: gpt-5.4 &middot; 8 iterations &middot; 3 assertions (2 passed, 1 failed)
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ── SECTION: What's next ── */}
            <motion.section
              id="section-next"
              data-testid="section-next"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              custom={1}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
                What&rsquo;s next
              </h2>
              <div className="space-y-5 text-[#646464] font-light leading-relaxed text-base">
                <p>
                  Assertions are live today in <code className="bg-[#f0f0f0] px-1.5 py-0.5 rounded text-sm text-black">recordloop@v1</code>.
                  Update your workflow file and the agent will start generating assertions
                  automatically based on your diff. No configuration needed &mdash; the agent
                  decides which assertions matter based on the components you changed.
                </p>
                <p>
                  Coming soon: custom assertion templates so you can teach the agent your
                  team&rsquo;s patterns, visual regression assertions that compare screenshots
                  across PRs, and a dashboard to track assertion pass rates over time. If you have
                  ideas, open an issue or drop us a note on GitHub.
                </p>
              </div>
            </motion.section>

            {/* ── BACK LINK ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="pt-8 border-t border-[#e8e8e8]"
            >
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-[#646464] hover:text-[#E85002] transition-colors"
              >
                <ArrowLeft size={14} />
                Back to home
              </a>
            </motion.div>
          </article>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#e8e8e8] bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 flex items-center justify-between text-xs text-[#646464] font-light">
          <span>&copy; 2026 RecordLoop</span>
          <a
            href="https://github.com/vihaanshahh/recordloop"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
