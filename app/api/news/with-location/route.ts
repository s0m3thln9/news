import { createRoute, errorBoundary } from "@/server/utils/middleware/compose"
import { getNewsWithLocation } from "@/server/services/news-service"
import { handleResponse } from "@/server/utils/handle-response"

export const GET = createRoute([errorBoundary()], async ({ queryParams }) => {
  const offset = Number(queryParams?.offset) || undefined
  const limit = Number(queryParams?.limit) || undefined
  const orderBy =
    queryParams?.orderBy === "asc" || queryParams?.orderBy === "desc"
      ? queryParams?.orderBy
      : undefined

  const news = await getNewsWithLocation({
    offset,
    limit,
    search: queryParams?.search,
    locationUuid: queryParams?.locationUuid,
    orderBy,
  })
  return handleResponse("Uuid последней новости успешно получено", 200, news)
})
