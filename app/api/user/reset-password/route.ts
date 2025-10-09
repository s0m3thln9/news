import {
  resetPassword,
  ResetPasswordRequestBody,
} from "@/server/services/user-service"
import {
  auth,
  createRoute,
  errorBoundary,
  jsonBody,
} from "@/server/utils/middleware/compose"
import { UserDTO } from "@/types/dto/user"
import { handleResponse } from "@/server/utils/handle-response"

/**
 * @swagger
 * /api/user/reset-password:
 *   post:
 *     summary: Сброс пароля
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - password
 *     responses:
 *       200:
 *         description: Пароль успешно обновлен
 *       400:
 *         description: Некорректные данные (например, invalid email)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = createRoute(
  [errorBoundary(), auth(), jsonBody<ResetPasswordRequestBody>()],
  async ({ body, userUuid }) => {
    const updatedUser: UserDTO = await resetPassword(
      body as ResetPasswordRequestBody,
      userUuid as string,
    )

    return handleResponse("Пароль успешно обновлен", 200, updatedUser)
  },
)
