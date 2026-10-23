import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { builderProfile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CursorBlob } from "@/components/ui/CursorBlob";
import { PageTransition } from "@/components/ui/PageTransition";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Akshat Gupta | Builder of Orange Taxi and more",
    template: "%s | Akshat Gupta",
  },
  description:
    "Full-stack developer and CS undergrad (IoT, Cybersecurity & Blockchain) at BMS College of Engineering, Bengaluru. Builder of Orange Taxi, autonomous rescue robots, and real-world systems.",
  authors: [{ name: builderProfile.name, url: siteUrl }],
  creator: builderProfile.name,
  keywords: [
    "Akshat Gupta",
    "Builder of Orange Taxi",
    "Full-Stack Developer",
    "BMSCE",
    "Autonomous Search and Rescue Robot",
    "Animal Detection in Locomotive Tracks",
    "Supabase",
    "React",
    "IoT",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Akshat Gupta | Builder of Orange Taxi and more",
    description:
      "Full-stack developer and CS undergrad (IoT, Cybersecurity & Blockchain) at BMS College of Engineering, Bengaluru. Builder of Orange Taxi, autonomous rescue robots, and real-world systems.",
    url: siteUrl,
    siteName: "Akshat Gupta - Built by Akshat",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshat Gupta | Builder of Orange Taxi and more",
    description:
      "Full-stack developer and CS undergrad (IoT, Cybersecurity & Blockchain) at BMS College of Engineering, Bengaluru.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD schema for Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: builderProfile.name,
    jobTitle: "Full-Stack Developer",
    url: siteUrl,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: builderProfile.education.institution,
    },
    knowsAbout: [
      "Full-Stack Development",
      "React",
      "TypeScript",
      "Supabase",
      "Robotics",
      "Computer Vision",
      "Cybersecurity",
      "IoT",
    ],
    sameAs: [
      builderProfile.contact.github.url,
      builderProfile.contact.linkedin.url,
      "https://orange-taxi.com",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="bg-cream text-ink dark:bg-ink-deep dark:text-cream min-h-screen selection:bg-sunny selection:text-ink antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <CursorBlob />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
