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
  addEditorToLocation,
  AddEditorToLocationRequestBody,
  deleteLocation,
} from "@/server/services/locations-service"

/**
 * @swagger
 * /api/locations/{uuid}/add-editor:
 *   post:
 *     summary: Добавление редактора для локации
 *     tags:
 *       - Locations
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
 *               editorUuid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Редактор успешно добавлен
 *       400:
 *         description: Некорректные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = createRoute(
  [
    errorBoundary(),
    auth(),
    requireRole(UserRole.ADMIN),
    jsonBody<AddEditorToLocationRequestBody>(),
  ],
  async ({ body, params }) => {
    const updatedLocation = await addEditorToLocation(
      params?.uuid || "",
      body as AddEditorToLocationRequestBody,
    )
    return handleResponse("Редактор успешно добавлен", 200, updatedLocation)
  },
)

/**
 * @swagger
 * /api/locations/{uuid}:
 *   delete:
 *     summary: Удаление локации
 *     tags:
 *       - Locations
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
  [errorBoundary(), auth(), requireRole(UserRole.ADMIN)],
  async ({ params }) => {
    const deletedLocation = await deleteLocation(params?.uuid || "")
    return handleResponse("Локация успешно удалена", 200, deletedLocation)
  },
)
