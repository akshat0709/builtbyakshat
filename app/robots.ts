import { MetadataRoute } from "next";
import { builderProfile } from "@/data/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${builderProfile.siteUrl}/sitemap.xml`,
  };
}
