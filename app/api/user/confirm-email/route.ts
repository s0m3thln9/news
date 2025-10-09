import {
  confirmEmail,
  ConfirmEmailRequestBody,
} from "@/server/services/user-service"
import { handleResponse } from "@/server/utils/handle-response"
import { UserDTO } from "@/types/dto/user"
import {
  auth,
  createRoute,
  errorBoundary,
  jsonBody,
} from "@/server/utils/middleware/compose"

/**
 * @swagger
 * /api/user/confirm-email:
 *   post:
 *     summary: Подтверждение email пользователя
 *     tags:
 *       - Auth
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
export const POST = createRoute(
  [errorBoundary(), auth(), jsonBody<ConfirmEmailRequestBody>()],
  async ({ body, userUuid }) => {
    const confirmedUser: UserDTO = await confirmEmail(
      userUuid as string,
      body as ConfirmEmailRequestBody,
    )
    return handleResponse("Почта успешно подтверждена", 200, confirmedUser)
  },
)
