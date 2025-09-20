import { requestPasswordReset } from '@/server/services/user-service'
import { handleResponse } from '@/server/utils/handle-response'
import { withErrorHandler } from '@/server/utils/middleware/with-error-handler'
import { withAuth } from '@/server/utils/middleware/with-auth'

/**
 * @swagger
 * /api/auth/request-reset-password:
 *   post:
 *     summary: Запрос на сброс пароля
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

const requestResetPasswordHandler = async (uuid: string) => {
  await requestPasswordReset(uuid)

  return handleResponse('Запрос на сброс пароля создан', 200)
}

export const POST = withErrorHandler(withAuth(requestResetPasswordHandler))
