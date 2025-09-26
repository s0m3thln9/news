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
import { UserRole } from "@/generated/prisma"

/**
 * @swagger
 * /api/locations:
 *   post:
 *     summary: Создание локации
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
 *     responses:
 *       200:
 *         description: Локации успешно получены
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const GET = createRoute([errorBoundary(), auth()], async () => {
  const createdLocation = await getLocations()
  return handleResponse("Локации успешно получены", 200, createdLocation)
})
