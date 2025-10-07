import { LocationNewsPage } from "@/components/LocationNewsPage"
import { getLocationWithNews } from "@/server/services/locations-service"
import { LocationWithNews } from "@/types/dto/location-with-news"
import { notFound } from "next/navigation"

export default async function LocationPage({
  params,
}: {
  params: Promise<{ uuid: string }>
}) {
  const { uuid } = await params
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuid || !uuidRegex.test(uuid)) {
    notFound()
  }
  const location: LocationWithNews | null = await getLocationWithNews(uuid)

  if (!location) {
    notFound()
  }

  return <LocationNewsPage location={location} />
}
