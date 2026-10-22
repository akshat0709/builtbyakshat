import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { builderProfile } from "@/data/profile";
import { Analytics } from "@vercel/analytics/react";

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

const siteUrl = builderProfile.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Akshat Gupta | Builder of Orange Taxi and more",
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
    type: "profile",
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
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="bg-cream text-ink dark:bg-ink-deep dark:text-cream min-h-screen selection:bg-sunny selection:text-ink">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
