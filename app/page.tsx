import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/ui/Hero";
import { AboutProductBlock } from "@/components/ui/AboutProductBlock";
import { ExperienceTimeline } from "@/components/ui/ExperienceTimeline";
import { ThingsIveBuilt } from "@/components/ui/ThingsIveBuilt";
import { SkillsIndex } from "@/components/ui/SkillsIndex";
import { EducationRecognition } from "@/components/ui/EducationRecognition";
import { ContactFooter } from "@/components/ui/ContactFooter";
import { Reveal } from "@/components/ui/Reveal";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { getProductByRef } from "@/data/products";
import { builderProfile } from "@/data/profile";

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const ref = typeof searchParams?.ref === "string" ? searchParams.ref : undefined;
  const product = getProductByRef(ref);

  const siteUrl = builderProfile.siteUrl;
  // Canonical URL stays base URL without ?ref to avoid duplicate-content indexing issues
  const canonicalUrl = "/";

  if (product) {
    const title = `${product.name} | Built by Akshat Gupta`;
    const description = `${product.name} was built by Akshat Gupta. ${product.ogTagline}`;
    const ogImageUrl = `${siteUrl}/api/og?ref=${product.slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        title: `${product.name} was built by Akshat Gupta.`,
        description: product.ogTagline,
        url: `${siteUrl}/?ref=${product.slug}`,
        siteName: "Built by Akshat Gupta",
        type: "website",
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${product.name} was built by Akshat Gupta`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${product.name} was built by Akshat Gupta.`,
        description: product.ogTagline,
        images: [ogImageUrl],
      },
    };
  }

  // Fallback default metadata
  return {
    title: "Akshat Gupta | Builder of Orange Taxi and more",
    description: builderProfile.tagline,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Akshat Gupta | Builder of Orange Taxi and more",
      description: builderProfile.tagline,
      url: siteUrl,
      siteName: "Built by Akshat Gupta",
      type: "website",
      images: [
        {
          url: `${siteUrl}/api/og`,
          width: 1200,
          height: 630,
          alt: "Akshat Gupta | Builder of Orange Taxi and more",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Akshat Gupta | Builder of Orange Taxi and more",
      description: builderProfile.tagline,
      images: [`${siteUrl}/api/og`],
    },
  };
}

export default function HomePage({ searchParams }: PageProps) {
  const ref = typeof searchParams?.ref === "string" ? searchParams.ref : undefined;
  const currentProduct = getProductByRef(ref);

  return (
    <main id="main-content" className="min-h-screen">
      <AnalyticsTracker refSlug={currentProduct ? currentProduct.slug : "none"} />
      <Hero />

      {currentProduct && (
        <Reveal delay={0.04}>
          <AboutProductBlock product={currentProduct} />
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <ExperienceTimeline />
      </Reveal>

      <Reveal delay={0.08}>
        <ThingsIveBuilt />
      </Reveal>

      <Reveal delay={0.1}>
        <SkillsIndex />
      </Reveal>

      <Reveal delay={0.12}>
        <EducationRecognition />
      </Reveal>

      <Reveal delay={0.14}>
        <ContactFooter currentProduct={currentProduct} />
      </Reveal>
    </main>
  );
}
