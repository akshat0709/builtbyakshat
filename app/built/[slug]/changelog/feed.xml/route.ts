import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";
import { SITE_URL } from "@/lib/site";

interface RouteParams {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.keys(PRODUCTS).map((slug) => ({
    slug,
  }));
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const product = PRODUCTS[params.slug];
  if (!product) {
    return new NextResponse("Product not found", { status: 404 });
  }

  const changelog = product.changelog || [];
  const sortedEntries = [...changelog].sort((a, b) => b.date.localeCompare(a.date));

  const updatedDate =
    sortedEntries.length > 0
      ? new Date(sortedEntries[0].date).toISOString()
      : new Date().toISOString();

  const entriesXml = sortedEntries
    .map((entry) => {
      const entryId = `${SITE_URL}/built/${product.slug}/changelog#${entry.date}`;
      const entryDate = new Date(entry.date).toISOString();
      return `  <entry>
    <title>${escapeXml(entry.title)}</title>
    <link href="${SITE_URL}/built/${product.slug}/changelog" />
    <id>${entryId}</id>
    <updated>${entryDate}</updated>
    <summary>${escapeXml(entry.note || entry.title)}</summary>
    <content type="html"><![CDATA[<p>${escapeXml(entry.note || entry.title)}</p>]]></content>
  </entry>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(product.name)} Changelog - Built by Akshat Gupta</title>
  <subtitle>${escapeXml(product.oneLiner)}</subtitle>
  <link href="${SITE_URL}/built/${product.slug}/changelog" rel="alternate"/>
  <link href="${SITE_URL}/built/${product.slug}/changelog/feed.xml" rel="self"/>
  <id>${SITE_URL}/built/${product.slug}/changelog</id>
  <updated>${updatedDate}</updated>
  <author>
    <name>Akshat Gupta</name>
    <email>akshat070906@gmail.com</email>
    <uri>${SITE_URL}</uri>
  </author>
${entriesXml}
</feed>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
