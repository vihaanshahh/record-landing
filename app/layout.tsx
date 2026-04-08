import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://recordloop.dev"),
  title: "RecordLoop — AI-generated UI test recordings on every PR",
  description:
    "An AI agent reads your PR diff, generates realistic Playwright flows, replays them in a headless browser, and posts the videos as a PR comment. 12-line install. No JS SDK. MIT licensed.",
  keywords: [
    "github action",
    "playwright",
    "ai testing",
    "pull request",
    "ci/cd",
    "test automation",
    "openai",
    "next.js",
    "react",
    "vue",
  ],
  authors: [{ name: "Vihaan Shah", url: "https://github.com/vihaanshahh" }],
  creator: "Vihaan Shah",
  openGraph: {
    title: "RecordLoop — AI-generated UI test recordings on every PR",
    description:
      "An AI agent reads your PR diff, generates realistic Playwright flows, replays them in a headless browser, and posts the videos as a PR comment. 12-line install. No JS SDK. MIT licensed.",
    url: "https://recordloop.dev",
    siteName: "RecordLoop",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "RecordLoop — AI test recordings on every PR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecordLoop — AI-generated UI test recordings on every PR",
    description:
      "An AI agent reads your PR diff, generates realistic Playwright flows, replays them in a headless browser, and posts the videos as a PR comment. 12-line install. No JS SDK. MIT licensed.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-open-sans)]">{children}</body>
    </html>
  );
}
