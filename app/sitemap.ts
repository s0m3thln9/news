import { MetadataRoute } from "next"
import { getNews } from "@/server/services/news-service"
import { getLocations } from "@/server/services/locations-service"
import { NewsDTO } from "@/types/dto/news"
import { Location } from "@prisma/client"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsDataPromise = getNews({ limit: 200, offset: 0 })

  const locationsPromise = getLocations({ offset: 0, limit: 200 })

  const [newsResult, locationsResult] = await Promise.all([
    newsDataPromise,
    locationsPromise,
  ])

  const newsRoutes: MetadataRoute.Sitemap = newsResult.data.map(
    (news: NewsDTO) => ({
      url: `${process.env.NEXT_PUBLIC_HOME_URL}/${news.uuid}`,
      lastModified: new Date(news.updatedAt || news.createdAt || new Date()),
      changeFrequency: "daily",
      priority: 0.8,
    }),
  )

  const locationRoutes: MetadataRoute.Sitemap = locationsResult.data.map(
    (location: Location) => ({
      url: `${process.env.NEXT_PUBLIC_HOME_URL}/locations/${location.uuid}`,
      lastModified: new Date(
        location.updatedAt || location.createdAt || new Date(),
      ),
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  )

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: process.env.NEXT_PUBLIC_HOME_URL || "http://localhost:3000",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ]

  return [...staticRoutes, ...locationRoutes, ...newsRoutes]
}
