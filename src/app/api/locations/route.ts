import { withErrorHandler } from "@/server/utils/middleware/with-error-handler"
import { withJsonBody } from "@/server/utils/middleware/with-json-body"
import {
  createLocation,
  CreateLocationRequestBody,
} from "@/server/services/locations-service"
import { handleResponse } from "@/server/utils/handle-response"
import { withAuth } from "@/server/utils/middleware/with-auth"

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
export const POST = withErrorHandler(
  withAuth((uuid, request) =>
    withJsonBody<CreateLocationRequestBody>(async (body) => {
      const createdLocation = await createLocation(body, uuid)
      return handleResponse("Локация успешно создана", 200, createdLocation)
    })(request),
  ),
)
