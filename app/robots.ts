import { MetadataRoute } from "next"

const SITE_URL = "https://soyuzvestey.by"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/profile", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
