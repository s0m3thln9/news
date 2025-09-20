import {
  resetPassword,
  ResetPasswordRequestBody,
} from '@/server/services/user-service'
import { handleResponse } from '@/server/utils/handle-response'
import { withErrorHandler } from '@/server/utils/middleware/with-error-handler'
import { withAuth } from '@/server/utils/middleware/with-auth'
import { withJsonBody } from '@/server/utils/middleware/with-json-body'
import { UserDTO } from '@/types/dto/user'

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Сброс пароля
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

export const POST = withErrorHandler(
  withAuth((uuid, request) =>
    withJsonBody<ResetPasswordRequestBody>(async (body) => {
      const updatedUser: UserDTO = await resetPassword(uuid, body)

      return handleResponse('Пароль успешно обновлен', 200, updatedUser)
    })(request),
  ),
)
