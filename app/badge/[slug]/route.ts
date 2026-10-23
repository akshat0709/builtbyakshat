import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = params;
  const searchParams = request.nextUrl.searchParams;

  const theme = searchParams.get("theme") === "dark" ? "dark" : "light";
  const size = searchParams.get("size") === "sm" ? "sm" : "md";

  const product = PRODUCTS[slug];
  const isGeneric = !product;

  const status = product ? product.status : null;
  const statusLabel =
    status === "live"
      ? "LIVE"
      : status === "pre-launch"
      ? "PRE-LAUNCH"
      : status === "prototype"
      ? "PROTOTYPE"
      : null;

  // Colors based on theme
  const colors =
    theme === "dark"
      ? {
          bg: "#1A1A1A",
          border: "#FFF6E5",
          text: "#FFF6E5",
          shadow: "#FFCE47",
          chipLiveBg: "#269389",
          chipLiveText: "#FFFFFF",
          chipPreBg: "#FFCE47",
          chipPreText: "#1A1A1A",
          chipProtoBg: "#E04836",
          chipProtoText: "#FFFFFF",
        }
      : {
          bg: "#FFF6E5",
          border: "#1A1A1A",
          text: "#1A1A1A",
          shadow: "#1A1A1A",
          chipLiveBg: "#269389",
          chipLiveText: "#FFFFFF",
          chipPreBg: "#FFCE47",
          chipPreText: "#1A1A1A",
          chipProtoBg: "#E04836",
          chipProtoText: "#FFFFFF",
        };

  let chipBg = colors.chipLiveBg;
  let chipText = colors.chipLiveText;
  if (status === "pre-launch") {
    chipBg = colors.chipPreBg;
    chipText = colors.chipPreText;
  } else if (status === "prototype") {
    chipBg = colors.chipProtoBg;
    chipText = colors.chipProtoText;
  }

  // Dimensions
  const isSm = size === "sm";
  const height = isSm ? 30 : 38;
  const innerHeight = isSm ? 26 : 34;
  const shadowOffset = 3;

  // Calculate width based on presence of status chip
  let width = isSm ? 190 : 230;
  if (statusLabel) {
    if (statusLabel === "PRE-LAUNCH") {
      width = isSm ? 265 : 315;
    } else {
      width = isSm ? 245 : 290;
    }
  }

  const innerWidth = width - shadowOffset;

  // Icon path
  let iconSvg = "";
  if (slug === "orange-taxi") {
    iconSvg = `
      <rect x="3" y="6" width="14" height="6" rx="2" fill="${colors.shadow}" stroke="${colors.border}" stroke-width="1.2"/>
      <rect x="6" y="3" width="8" height="4" rx="1" fill="${colors.bg}" stroke="${colors.border}" stroke-width="1.2"/>
      <circle cx="6" cy="13" r="2" fill="${colors.border}"/>
      <circle cx="14" cy="13" r="2" fill="${colors.border}"/>
    `;
  } else if (slug === "autonomous-rescue-robot") {
    iconSvg = `
      <rect x="4" y="5" width="12" height="10" rx="2" fill="${colors.bg}" stroke="${colors.border}" stroke-width="1.2"/>
      <line x1="10" y1="2" x2="10" y2="5" stroke="${colors.border}" stroke-width="1.2"/>
      <circle cx="10" cy="2" r="1" fill="${colors.shadow}"/>
      <circle cx="7" cy="8" r="1.2" fill="${colors.border}"/>
      <circle cx="13" cy="8" r="1.2" fill="${colors.border}"/>
      <line x1="7" y1="12" x2="13" y2="12" stroke="${colors.border}" stroke-width="1.2"/>
    `;
  } else if (slug === "animal-detection") {
    iconSvg = `
      <rect x="4" y="4" width="12" height="11" rx="2" fill="${colors.bg}" stroke="${colors.border}" stroke-width="1.2"/>
      <rect x="6" y="6" width="8" height="4" rx="1" fill="${colors.shadow}" stroke="${colors.border}" stroke-width="1"/>
      <circle cx="7" cy="13" r="1" fill="${colors.border}"/>
      <circle cx="13" cy="13" r="1" fill="${colors.border}"/>
    `;
  } else {
    // Generic Wrench / Spark icon
    iconSvg = `
      <path d="M6 3 L10 7 L8 9 L4 5 Z M10 7 L16 13 L14 15 L8 9 Z" fill="${colors.shadow}" stroke="${colors.border}" stroke-width="1.2"/>
      <circle cx="14" cy="5" r="1.5" fill="${colors.border}"/>
    `;
  }

  const fontSize = isSm ? "11px" : "13px";
  const chipFontSize = isSm ? "8.5px" : "10px";
  const textY = isSm ? 17 : 21;
  const chipY = isSm ? 5 : 7;
  const chipHeight = isSm ? 16 : 20;

  const chipWidth = statusLabel === "PRE-LAUNCH" ? (isSm ? 66 : 78) : isSm ? 52 : 62;
  const chipX = innerWidth - chipWidth - (isSm ? 8 : 10);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" role="img" aria-label="Built by Akshat Gupta">
  <defs>
    <style>
      .badge-text {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-weight: 800;
        letter-spacing: -0.2px;
      }
      .badge-chip {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-weight: 900;
        letter-spacing: 0.5px;
      }
    </style>
  </defs>

  <!-- Hard Offset Shadow -->
  <rect x="${shadowOffset}" y="${shadowOffset}" width="${innerWidth}" height="${innerHeight}" rx="6" fill="${colors.shadow}" />

  <!-- Main Badge Pill -->
  <rect x="0.5" y="0.5" width="${innerWidth}" height="${innerHeight}" rx="6" fill="${colors.bg}" stroke="${colors.border}" stroke-width="2" />

  <!-- Doodle Icon -->
  <g transform="translate(${isSm ? 7 : 9}, ${isSm ? 4 : 8}) scale(${isSm ? 0.9 : 1})">
    ${iconSvg}
  </g>

  <!-- Title Text -->
  <text x="${isSm ? 28 : 34}" y="${textY}" fill="${colors.text}" font-size="${fontSize}" class="badge-text">
    Built by Akshat Gupta <tspan font-weight="900">↗</tspan>
  </text>

  <!-- Status Chip (if product matched) -->
  ${
    statusLabel
      ? `
  <rect x="${chipX}" y="${chipY}" width="${chipWidth}" height="${chipHeight}" rx="4" fill="${chipBg}" stroke="${colors.border}" stroke-width="1.2" />
  <text x="${chipX + chipWidth / 2}" y="${chipY + (isSm ? 11 : 14)}" fill="${chipText}" font-size="${chipFontSize}" text-anchor="middle" class="badge-chip">
    ${statusLabel}
  </text>
  `
      : ""
  }
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
