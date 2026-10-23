import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
import { builderProfile } from "@/data/profile";
import { absoluteUrl } from "@/lib/site";

interface ChangelogPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ChangelogPageProps): Promise<Metadata> {
  const product = PRODUCTS[params.slug];
  if (!product) {
    return {
      title: "Changelog Not Found | Akshat Gupta",
    };
  }

  return {
    title: `${product.name} Changelog | Akshat Gupta`,
    description: `Release notes, architecture changes, and deployment log for ${product.name}.`,
    alternates: {
      canonical: `/built/${product.slug}/changelog`,
      types: {
        "application/atom+xml": `/built/${product.slug}/changelog/feed.xml`,
      },
    },
    openGraph: {
      title: `${product.name} Changelog | Akshat Gupta`,
      description: `Release notes, architecture changes, and deployment log for ${product.name}.`,
      url: absoluteUrl(`/built/${product.slug}/changelog`),
    },
  };
}

export default function ProductChangelogPage({ params }: ChangelogPageProps) {
  const product: Product | undefined = PRODUCTS[params.slug];

  if (!product) {
    notFound();
  }

  const changelog = product.changelog || [];
  const sortedEntries = [...changelog].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main id="main-content" className="py-6">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href={`/built/${product.slug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform"
        >
          <span aria-hidden="true">←</span>
          <span>Back to {product.name}</span>
        </Link>

        <a
          href={`/built/${product.slug}/changelog/feed.xml`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sunny text-ink border-ink border-2 text-xs font-mono font-bold shadow-hard-sm hover:bg-sunny/80 active:translate-x-0.5 active:translate-y-0.5 transition-transform"
        >
          <span>RSS/Atom Feed</span>
          <span aria-hidden="true">📡</span>
        </a>
      </div>

      {/* Main Header Card */}
      <div className="bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-8 shadow-hard-lg dark:shadow-hard-dark-lg mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
          $ cd built / {product.slug} / changelog
        </span>
        <h1 className="text-2xl sm:text-4xl font-display font-black text-ink dark:text-cream tracking-tight mb-2">
          {product.name} Changelog
        </h1>
        <p className="text-sm sm:text-base font-body text-ink/80 dark:text-cream/80 max-w-2xl leading-relaxed">
          Chronological record of releases, architectural decisions, and production patches for {product.name}.
        </p>
      </div>

      {/* Changelog Entries Timeline */}
      {sortedEntries.length > 0 ? (
        <div className="relative pl-6 sm:pl-8 border-l-[3px] border-ink dark:border-cream/40 space-y-6">
          {sortedEntries.map((entry, idx) => (
            <article
              key={`${entry.date}-${idx}`}
              className="relative bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-5 sm:p-6 shadow-hard"
            >
              {/* Dot on timeline */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-sunny border-2 border-ink shadow-hard-sm"
                aria-hidden="true"
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <h2 className="text-lg sm:text-xl font-display font-black text-ink dark:text-cream">
                  {entry.title}
                </h2>
                <time
                  dateTime={entry.date}
                  className="px-2.5 py-0.5 rounded-full bg-paper dark:bg-ink-deep border border-ink text-xs font-mono font-bold text-ink/80 dark:text-cream/80"
                >
                  {entry.date}
                </time>
              </div>

              {entry.note && (
                <p className="text-xs sm:text-sm font-body text-ink/85 dark:text-cream/85 leading-relaxed mt-2">
                  {entry.note}
                </p>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-paper dark:bg-ink-card border-ink border-2 shadow-hard text-center">
          <span className="font-mono text-2xl block mb-2">📦</span>
          <h2 className="font-display font-bold text-lg text-ink dark:text-cream mb-1">
            No Published Release Notes Yet
          </h2>
          <p className="font-body text-xs sm:text-sm text-ink/75 dark:text-cream/75 max-w-md mx-auto leading-relaxed">
            Changelog entries are added as field tests finish and production patches are deployed.
            Subscribe to the Atom feed to get notified of updates.
          </p>
        </div>
      )}
    </main>
  );
}
