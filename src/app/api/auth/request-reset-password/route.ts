import { requestPasswordReset } from "@/server/services/user-service"
import { handleResponse } from "@/server/utils/handle-response"
import {
  auth,
  createRoute,
  errorBoundary,
} from "@/server/utils/middleware/compose"

/**
 * @swagger
 * /api/auth/request-reset-password:
 *   post:
 *     summary: Запрос на сброс пароля
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Запрос на сброс пароля создан
 *       400:
 *         description: Некорректные данные (например, invalid email)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = createRoute(
  [errorBoundary(), auth()],
  async ({ userUuid }) => {
    await requestPasswordReset(userUuid as string)

    return handleResponse("Запрос на сброс пароля создан", 200)
  },
)
