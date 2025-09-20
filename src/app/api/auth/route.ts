import {
  createUser,
  CreateUserRequestBody,
} from '@/server/services/userService'
import { handleResponse } from '@/server/utils/handleResponse'
import { withJsonBody } from '@/server/utils/middleware/parseJson'
import { withErrorHandler } from '@/server/utils/middleware/errorHandle'

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Создание пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Успешное создание пользователя
 *       400:
 *         description: Некорректные данные (например, invalid email)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = withErrorHandler(
  withJsonBody<CreateUserRequestBody>(async (body) => {
    const createdUser = await createUser(body)
    return handleResponse('Пользователь успешно создан', 200, createdUser)
  }),
)
