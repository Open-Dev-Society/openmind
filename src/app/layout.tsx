import type { Metadata } from "next";
import "./globals.css";
import SponsorBanner from "@/components/SponsorBanner";
import Navigation from "@/components/Navigation";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "OpenMind — The Case Study Engine",
  description:
    "A specialized epistemic lab for deep causal analysis of business, history, and science. Free, open-source, and AIO-enabled.",
  keywords: ["Case Study", "Causal Analysis", "Open Source", "Epistemic", "Business Strategy", "Historical Narratives"],
  authors: [{ name: "Open Dev Society", url: "https://opendevsociety.vercel.app" }],
  metadataBase: new URL("https://opendevsociety.vercel.app"),
  openGraph: {
    title: "OpenMind — Case Study Engine",
    description: "Deep, topic-specific analysis of the world's most complex narratives.",
    url: "https://opendevsociety.vercel.app",
    siteName: "OpenMind",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "OpenMind Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenMind — Case Study Engine",
    description: "Deep, topic-specific analysis of the world's most complex narratives.",
    creator: "@OpenDevSociety",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@200;300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Analytics />
        <Navigation />
        <SponsorBanner />
        {children}
      </body>
    </html>
  );
}
