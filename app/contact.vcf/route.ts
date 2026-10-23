import { NextResponse } from "next/server";
import { builderProfile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

export function GET() {
  const { name, contact } = builderProfile;

  const vcardLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    "N:Gupta;Akshat;;;",
    `EMAIL;TYPE=INTERNET,HOME:${contact.email}`,
    `URL;TYPE=WORK:${SITE_URL}`,
    `X-SOCIALPROFILE;TYPE=github:${contact.github.url}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${contact.linkedin.url}`,
    "TITLE:Full-Stack Developer",
    "ORG:BMS College of Engineering",
    "NOTE:Builder of Orange Taxi and real-world systems.",
  ];

  // Only include phone number if explicitly configured
  if (builderProfile.includePhone && (contact as { phone?: string }).phone) {
    vcardLines.push(`TEL;TYPE=CELL:${(contact as { phone?: string }).phone}`);
  }

  vcardLines.push("END:VCARD");

  const vcardContent = vcardLines.join("\r\n");

  return new NextResponse(vcardContent, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Akshat_Gupta.vcf"',
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
