import { LocationNewsPage } from "@/components/LocationNewsPage"
import { getLocationWithNews } from "@/server/services/locations-service"
import { LocationWithNews } from "@/types/dto/location-with-news"

export default async function LocationPage({
  params,
}: {
  params: Promise<{ uuid: string }>
}) {
  const { uuid } = await params
  const location: LocationWithNews | null = await getLocationWithNews(uuid)

  if (!location) {
    return <div>Локация не найдена</div>
  }

  return <LocationNewsPage location={location} />
}
