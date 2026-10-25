import type { Metadata, Viewport } from "next";
import { Syne, Outfit } from "next/font/google";
// @ts-ignore Next.js loads this global stylesheet at runtime.
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CustomCursor, Footer, Navbar, PageTransition, ScrollProgress } from "@/components/portfolio";
import { portfolio } from "@/data/portfolio";
import PortfolioLoader from "@/components/loader";

const syne = Syne({ 
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://codewithsky.site"),
  title: { default: portfolio.seoTitle, template: `%s — Akash Dhanwate` },
  description: portfolio.seoDescription,
  keywords: ["Akash Dhanwate", "AI engineer", "data science", "portfolio", "software developer"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: portfolio.seoTitle,
    description: portfolio.seoDescription,
    siteName: "Akash Dhanwate",
    images: [{ url: "/assets/akash-hero.png", width: 2048, height: 768, alt: "Abstract AI and software artwork" }]
  },
  twitter: { card: "summary_large_image", title: portfolio.seoTitle, description: portfolio.seoDescription, images: ["/assets/akash-hero.png"] },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#050505" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${outfit.variable} font-sans antialiased bg-[#121212] text-white selection:bg-white selection:text-black`}>
        <PortfolioLoader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
