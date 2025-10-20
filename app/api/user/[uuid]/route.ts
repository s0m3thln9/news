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
  deleteUser,
  updateUser,
  updateUserAdmin,
  UpdateUserProfileRequestBody,
  UpdateUserRequestBody,
} from "@/server/services/user-service"

/**
 * @swagger
 * /api/locations/{uuid}:
 *   delete:
 *     summary: Удаление пользователя
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID пользователя
 *     responses:
 *       200:
 *         description: Пользователь успешно удален
 *       400:
 *         description: Некорректные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const DELETE = createRoute(
  [errorBoundary(), auth(), requireRole(UserRole.ADMIN)],
  async ({ params }) => {
    const deletedUser = await deleteUser(params?.uuid || "")
    return handleResponse("Пользователь успешно удален", 200, deletedUser)
  },
)

/**
 * @swagger
 * /api/user/{uuid}:
 *   patch:
 *     summary: Обновление данных пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Данные пользователя успешно обновлены
 *       400:
 *         description: Некорректные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const PATCH = createRoute(
  [
    errorBoundary(),
    auth(),
    requireRole(UserRole.ADMIN),
    jsonBody<UpdateUserRequestBody>(),
  ],
  async ({ body, params }) => {
    const updatedUser = await updateUserAdmin(
      params?.uuid as string,
      body as UpdateUserRequestBody,
    )
    return handleResponse(
      "Данные пользователя успешно обновлены",
      200,
      updatedUser,
    )
  },
)
