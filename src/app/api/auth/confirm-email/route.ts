import {
  confirmEmail,
  ConfirmEmailRequestBody,
} from '@/server/services/user-service'
import { handleResponse } from '@/server/utils/handle-response'
import { withJsonBody } from '@/server/utils/middleware/with-json-body'
import { withErrorHandler } from '@/server/utils/middleware/with-error-handler'
import { withAuth } from '@/server/utils/middleware/with-auth'
import { UserDTO } from '@/types/dto/user'

/**
 * @swagger
 * /api/auth/confirm-email:
 *   post:
 *     summary: Подтверждение email пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *     responses:
 *       200:
 *         description: Почта успешно подтверждена
 *       400:
 *         description: Некорректные данные (например, invalid email)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = withErrorHandler(
  withAuth((uuid, request) =>
    withJsonBody<ConfirmEmailRequestBody>(async (body) => {
      const confirmedUser: UserDTO = await confirmEmail(uuid, body)

      return handleResponse('Почта успешно подтверждена', 200, confirmedUser)
    })(request),
  ),
)
