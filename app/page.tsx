import React from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/ui/Hero";
import { HomeTeaserTiles } from "@/components/ui/HomeTeaserTiles";
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

  if (product) {
    const title = `${product.name} | Built by Akshat Gupta`;
    const description = `${product.name} was built by Akshat Gupta. ${product.ogTagline}`;
    const ogImageUrl = `${siteUrl}/api/og?ref=${product.slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: `/built/${product.slug}`,
      },
      openGraph: {
        title: `${product.name} was built by Akshat Gupta.`,
        description: product.ogTagline,
        url: `${siteUrl}/built/${product.slug}`,
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
      canonical: "/",
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

  // If a valid ?ref=<slug> is supplied on the root route, redirect directly to canonical product page /built/<slug>
  if (currentProduct) {
    redirect(`/built/${currentProduct.slug}`);
  }

  return (
    <main id="main-content" className="py-2">
      <AnalyticsTracker refSlug="none" />
      <Hero />
      <HomeTeaserTiles />
    </main>
  );
}
