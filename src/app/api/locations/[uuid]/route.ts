import {
  auth,
  createRoute,
  errorBoundary,
  jsonBody,
  requireRole,
} from "@/server/utils/middleware/compose"
import { UserRole } from "@/generated/prisma"
import { handleResponse } from "@/server/utils/handle-response"
import {
  deleteLocation,
  updateLocation,
  UpdateLocationRequestBody,
} from "@/server/services/locations-service"

/**
 * @swagger
 * /api/locations/{uuid}:
 *   patch:
 *     summary: Обновление локации
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID локации
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Локация успешно обновлена
 *       400:
 *         description: Некорректные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const PATCH = createRoute(
  [
    errorBoundary(),
    auth(),
    requireRole([UserRole.ADMIN, UserRole.EDITOR]),
    jsonBody<UpdateLocationRequestBody>(),
  ],
  async ({ body, params }) => {
    const updatedLocation = await updateLocation(
      params?.uuid || "",
      body as UpdateLocationRequestBody,
    )
    return handleResponse("Локация успешно обновлена", 200, updatedLocation)
  },
)

/**
 * @swagger
 * /api/locations/{uuid}:
 *   delete:
 *     summary: Удаление локации
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID локации
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Локация успешно удалена
 *       400:
 *         description: Некорректные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const DELETE = createRoute(
  [errorBoundary(), auth(), requireRole([UserRole.ADMIN, UserRole.EDITOR])],
  async ({ params }) => {
    const deletedLocation = await deleteLocation(params?.uuid || "")
    return handleResponse("Локация успешно удалена", 200, deletedLocation)
  },
)
