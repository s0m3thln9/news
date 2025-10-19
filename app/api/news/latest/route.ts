import { createRoute, errorBoundary } from "@/server/utils/middleware/compose"
import { getLatestNewsUuid } from "@/server/services/news-service"
import { handleResponse } from "@/server/utils/handle-response"

export const GET = createRoute([errorBoundary()], async () => {
  const uuid = await getLatestNewsUuid()
  return handleResponse("Uuid последней новости успешно получено", 200, uuid)
})
