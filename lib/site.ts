/**
 * Central site configuration and absolute URL builder.
 * All absolute URLs across metadata, sitemaps, OpenGraph, JSON-LD,
 * security.txt, RSS/Atom feeds, and embed badges derive from SITE_URL.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://builtby.akshatgupta.dev"
);

export function absoluteUrl(path: string = ""): string {
  const normalized = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `${SITE_URL}${normalized}`;
}

export function getProductDeepLink(slug: string): string {
  return `${SITE_URL}/built/${slug}?utm_source=${slug}`;
}
