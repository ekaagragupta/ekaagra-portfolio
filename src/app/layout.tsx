import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ekaagra Gupta - AI/ML Researcher & Engineer",
  description:
    "Portfolio of Ekaagra Gupta - B.Tech (Honors) CSE specialization in Artificial Intelligence and machine learning student at Manipal University Jaipur. Builds runtime safety governors for LLM agents, evidential deep learning systems, and high-throughput RAG architectures.",
  keywords: [
    "Ekaagra Gupta",
    "Edu",
    "AI/ML Researcher",
    "Machine Learning Engineer",
    "Generative AI",
    "Manipal University Jaipur",
  ],
  authors: [{ name: "Ekaagra Gupta" }],
  creator: "Ekaagra Gupta",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#09090b]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#09090b] text-[#fafafa] min-h-screen relative`}
      >
        <SmoothScrollProvider>
          <div className="ambient-bg" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
