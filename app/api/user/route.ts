import {
  createRoute,
  auth,
  jsonBody,
  errorBoundary,
} from "@/server/utils/middleware/compose"
import { handleResponse } from "@/server/utils/handle-response"
import {
  updateUser,
  UpdateUserRequestBody,
} from "@/server/services/user-service"

/**
 * @swagger
 * /api/user/{uuid}:
 *   patch:
 *     summary: Обновление данных пользователя
 *     tags:
 *       - News
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
  [errorBoundary(), auth(), jsonBody<UpdateUserRequestBody>()],
  async ({ userUuid, body }) => {
    const updatedUser = await updateUser(
      userUuid as string,
      body as UpdateUserRequestBody,
    )
    return handleResponse(
      "Данные пользователя успешно обновлены",
      200,
      updatedUser,
    )
  },
)
