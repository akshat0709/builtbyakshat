import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export function GET() {
  const content = `# RFC 9116 Security Policy
Contact: mailto:akshat070906@gmail.com
Expires: 2027-10-23T07:00:00.000Z
Preferred-Languages: en
Canonical: ${SITE_URL}/.well-known/security.txt
Policy: ${SITE_URL}/security
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
