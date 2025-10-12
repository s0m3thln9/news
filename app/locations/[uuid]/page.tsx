import { LocationNewsPage } from "@/components/location-news-page"
import { getLocationWithNews } from "@/server/services/locations-service"
import { LocationWithNews } from "@/types/dto/location-with-news"
import { notFound } from "next/navigation"
import { GetNewsQueryParams } from "@/server/services/news-service"

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

  const location: LocationWithNews | null = await getLocationWithNews(uuid, {
    offset: offsetValue,
    limit: limitValue,
    search,
    locationUuid,
  })

  if (!location) {
    notFound()
  }

  return <LocationNewsPage location={location} />
}
