import { LocationNewsPage } from "@/components/location-news-page"
import { notFound } from "next/navigation"
import { getNews, GetNewsQueryParams } from "@/server/services/news-service"
import { getLocation } from "@/server/services/locations-service"

export default async function LocationPage({
  params,
  searchParams,
}: {
  params: Promise<{ uuid: string }>
  searchParams: Promise<GetNewsQueryParams>
}) {
  const { uuid } = await params
  const { offset, limit, search, locationUuid } = await searchParams

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuid || !uuidRegex.test(uuid)) {
    notFound()
  }

  const offsetValue = Number(offset) || undefined
  const limitValue = Number(limit) || undefined

  const [location, news] = await Promise.all([
    getLocation(uuid),
    getNews({
      offset: offsetValue,
      limit: limitValue,
      search,
      locationUuid: locationUuid ? locationUuid : uuid,
    }),
  ])

  if (!location) {
    notFound()
  }

  return <LocationNewsPage location={location} news={news} />
}
