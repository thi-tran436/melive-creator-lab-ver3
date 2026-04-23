import type { MetadataRoute } from "next";
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://creatorlab.melive.co";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
