import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
import { builderProfile } from "@/data/profile";
import { TaxiDoodle } from "@/components/doodles/TaxiDoodle";
import { RobotDoodle } from "@/components/doodles/RobotDoodle";
import { TrainDoodle } from "@/components/doodles/TrainDoodle";
import { MediaGallery } from "@/components/ui/MediaGallery";

interface ProductPageProps {
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
}: ProductPageProps): Promise<Metadata> {
  const product = PRODUCTS[params.slug];
  if (!product) {
    return {
      title: "Product Not Found | Akshat Gupta",
    };
  }

  const siteUrl = builderProfile.siteUrl;
  const ogImageUrl = `${siteUrl}/api/og?ref=${product.slug}`;

  return {
    title: `${product.name} | Built by Akshat Gupta`,
    description: `${product.name} was built by Akshat Gupta. ${product.ogTagline}`,
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

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product: Product | undefined = PRODUCTS[params.slug];

  if (!product) {
    notFound();
  }

  const formatStatus = (status: Product["status"]) => {
    switch (status) {
      case "live":
        return "Live";
      case "pre-launch":
        return "Pre-launch";
      case "prototype":
        return "Prototype";
      default:
        return status;
    }
  };

  const getStatusBadgeStyle = (status: Product["status"]) => {
    switch (status) {
      case "live":
        return "bg-teal text-white border-ink";
      case "pre-launch":
        return "bg-sunny text-ink border-ink";
      case "prototype":
        return "bg-tomato text-white border-ink";
    }
  };

  const renderDoodle = (slug: string) => {
    switch (slug) {
      case "orange-taxi":
        return <TaxiDoodle className="w-20 h-14" decorative />;
      case "autonomous-rescue-robot":
        return <RobotDoodle className="w-16 h-16" decorative />;
      case "animal-detection":
        return <TrainDoodle className="w-20 h-14" decorative />;
      default:
        return null;
    }
  };

  const hasRealBuilderNote =
    product.builderNote &&
    !product.builderNote.includes("[PLACEHOLDER]") &&
    product.builderNote.trim().length > 0;

  const issueMailto = `mailto:${builderProfile.contact.email}?subject=${encodeURIComponent(
    product.feedbackSubject
  )}&body=${encodeURIComponent(
    `Hi Akshat,\n\nI was looking at ${product.name} and wanted to report an issue or share feedback:\n\n- Feedback/Bug: \n- Steps to reproduce: \n- Browser/Environment: \n\nBest,\n`
  )}`;

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: product.name,
    description: product.oneLiner,
    creator: {
      "@type": "Person",
      name: builderProfile.name,
      url: builderProfile.siteUrl,
    },
    keywords: product.stack.join(", "),
    url: product.productUrl || product.repoUrl || `${builderProfile.siteUrl}/built/${product.slug}`,
  };

  return (
    <main id="main-content" className="py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/built"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-light dark:bg-ink-card border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform"
        >
          <span aria-hidden="true">←</span>
          <span>$ cd built</span>
        </Link>

        <span className="font-mono text-xs text-ink/60 dark:text-cream/60">
          product #{product.slug}
        </span>
      </div>

      {/* Main Canonical Product Card */}
      <article className="relative bg-cream-light dark:bg-ink-card border-ink border-2 rounded-2xl p-6 sm:p-10 shadow-hard-lg dark:shadow-hard-dark-lg">
        {/* Top Header with Doodle and Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-paper dark:bg-ink-deep border-ink border shadow-hard-sm">
              {renderDoodle(product.slug)}
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-1">
                Built by {builderProfile.name}
              </span>
              <h1 className="text-2xl sm:text-4xl font-display font-black text-ink dark:text-cream tracking-tight">
                {product.name}
              </h1>
            </div>
          </div>

          <div
            className={`self-start sm:self-auto px-3.5 py-1 rounded-full border-2 text-xs font-mono font-bold shadow-hard-sm ${getStatusBadgeStyle(
              product.status
            )}`}
          >
            {formatStatus(product.status)}
          </div>
        </div>

        {/* One-Liner */}
        <p className="text-base sm:text-xl font-body text-ink/90 dark:text-cream/90 leading-relaxed mb-6 font-medium">
          {product.oneLiner}
        </p>

        {/* Role Pill */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-ink dark:text-cream bg-paper dark:bg-ink-deep px-3.5 py-1.5 rounded-lg border-ink border mb-8 shadow-hard-sm">
          <span className="font-bold text-teal">Role:</span>
          <span className="font-semibold">{product.role}</span>
        </div>

        {/* Built With (Plain English) Grid */}
        <div className="mb-8 pt-6 border-t border-ink/15 dark:border-cream/15">
          <h2 className="text-xs font-mono uppercase tracking-wider text-ink/60 dark:text-cream/60 font-bold block mb-3">
            Built with (plain-English breakdown)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {product.builtWith.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-paper dark:bg-ink-deep border-ink border text-xs sm:text-sm font-body leading-snug shadow-hard-sm"
              >
                <span className="font-mono font-bold text-ink dark:text-cream block mb-1">
                  {item.tech}
                </span>
                <span className="text-ink/75 dark:text-cream/70 text-xs sm:text-sm leading-relaxed">
                  {item.plainEnglish}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Builder's note */}
        {hasRealBuilderNote ? (
          <div className="mb-8 pt-6 border-t border-ink/15 dark:border-cream/15">
            <h2 className="text-xs font-mono uppercase tracking-wider text-teal font-bold block mb-2">
              Builder&apos;s note
            </h2>
            <div className="text-sm font-body text-ink/85 dark:text-cream/85 leading-relaxed italic bg-[#FFFDE8] dark:bg-ink-deep p-5 rounded-xl border-ink border-2 shadow-hard-sm rotate-[-0.5deg]">
              &ldquo;{product.builderNote}&rdquo;
            </div>
          </div>
        ) : (
          <div className="mb-8 pt-6 border-t border-ink/15 dark:border-cream/15">
            <h2 className="text-xs font-mono uppercase tracking-wider text-ink/40 dark:text-cream/40 font-bold block mb-1">
              Builder&apos;s note
            </h2>
            <p className="text-xs font-mono text-ink/50 dark:text-cream/50 italic">
              [Note pending confirmation from field tests]
            </p>
          </div>
        )}

        {/* Per-Product Changelog Summary: Hidden if empty */}
        {product.changelog && product.changelog.length > 0 && (
          <div className="mb-8 pt-6 border-t border-ink/15 dark:border-cream/15">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-teal font-bold block">
                What&apos;s New
              </h2>
              <Link
                href={`/built/${product.slug}/changelog`}
                className="text-xs font-mono font-bold text-teal underline underline-offset-4 hover:text-ink dark:hover:text-cream"
              >
                Full changelog ({product.changelog.length}) →
              </Link>
            </div>

            <div className="space-y-2.5">
              {[...product.changelog]
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 3)
                .map((entry, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-paper dark:bg-ink-deep border-ink border text-xs sm:text-sm font-body shadow-hard-sm"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-display font-bold text-ink dark:text-cream">
                        {entry.title}
                      </span>
                      <time
                        dateTime={entry.date}
                        className="font-mono text-[10px] text-ink/60 dark:text-cream/60"
                      >
                        {entry.date}
                      </time>
                    </div>
                    {entry.note && (
                      <p className="text-xs text-ink/75 dark:text-cream/70 leading-relaxed">
                        {entry.note}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Real Media Slots & Field Proof */}
        <MediaGallery media={product.media} productName={product.name} />

        {/* Action Buttons Row */}
        <div className="pt-6 border-t border-ink/15 dark:border-cream/15 flex flex-wrap items-center gap-3">
          {product.productUrl && (
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal text-white border-ink border-2 text-xs font-mono font-bold hover:bg-teal/90 shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <span>Visit {product.name}</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          {product.repoUrl && (
            <a
              href={product.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-paper dark:bg-ink-deep border-ink border-2 text-xs font-mono font-bold text-ink dark:text-cream hover:bg-sunny/40 shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <span>View Source on GitHub</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}

          <a
            href={issueMailto}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunny text-ink border-ink border-2 text-xs font-mono font-bold hover:bg-sunny/80 shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <span>Found an issue? Tell me</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </main>
  );
}
