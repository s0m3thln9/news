import {
  createRoute,
  auth,
  jsonBody,
  errorBoundary,
  requireRole,
} from "@/server/utils/middleware/compose"
import {
  createLocation,
  CreateLocationRequestBody,
  getLocations,
} from "@/server/services/locations-service"
import { handleResponse } from "@/server/utils/handle-response"
import { UserRole } from "@prisma/client"

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Создание локации
 *     tags:
 *       - Locations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *     responses:
 *       200:
 *         description: Локация успешно создана
 *       400:
 *         description: Некорректные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = createRoute(
  [
    errorBoundary(),
    auth(),
    jsonBody<CreateLocationRequestBody>(),
    requireRole([UserRole.ADMIN, UserRole.EDITOR]),
  ],
  async ({ body }) => {
    const createdLocation = await createLocation(
      body as CreateLocationRequestBody,
    )
    return handleResponse("Локация успешно создана", 200, createdLocation)
  },
)

/**
 * @swagger
 * /api/locations:
 *   get:
 *     summary: Получение локаций
 *     tags:
 *       - Locations
 *     responses:
 *       200:
 *         description: Локации успешно получены
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const GET = createRoute([errorBoundary()], async ({ queryParams }) => {
  const offset = Number(queryParams?.offset) || undefined
  const limit = Number(queryParams?.limit) || undefined

  const createdLocation = await getLocations({
    offset,
    limit,
    search: queryParams?.search,
  })
  return handleResponse("Локации успешно получены", 200, createdLocation)
})
