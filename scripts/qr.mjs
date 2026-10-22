import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "public", "qr");

// Canonical site URL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://builtby.akshatgupta.dev";

// Slugs from the product registry
const slugs = [
  "orange-taxi",
  "autonomous-rescue-robot",
  "animal-detection",
];

async function generateQRCodes() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Generating QR codes for site: ${siteUrl}`);

  for (const slug of slugs) {
    const targetUrl = `${siteUrl}/?ref=qr-${slug}`;
    const filePath = path.join(outputDir, `${slug}.png`);

    await QRCode.toFile(filePath, targetUrl, {
      width: 512,
      margin: 2,
      color: {
        dark: "#1A1A1A",
        light: "#FFFFFF",
      },
      errorCorrectionLevel: "M",
    });

    console.log(`✓ Generated ${slug}.png -> ${targetUrl}`);
  }

  console.log("All QR codes generated in public/qr/");
}

generateQRCodes().catch((err) => {
  console.error("Error generating QR codes:", err);
  process.exit(1);
});
