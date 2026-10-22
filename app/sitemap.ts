import { MetadataRoute } from "next";
import { builderProfile } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = builderProfile.siteUrl;

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
