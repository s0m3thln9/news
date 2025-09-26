import {
  createUser,
  CreateUserRequestBody,
} from "@/server/services/user-service"
import { handleResponse } from "@/server/utils/handle-response"
import {
  createRoute,
  errorBoundary,
  jsonBody,
} from "@/server/utils/middleware/compose"

/**
 * @swagger
 * /api/auth/sign-up:
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
 *         description: Пользователь успешно создан
 *       400:
 *         description: Некорректные данные (например, invalid email)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = createRoute(
  [errorBoundary(), jsonBody<CreateUserRequestBody>()],
  async ({ body }) => {
    const createdUser = await createUser(body as CreateUserRequestBody)
    return handleResponse("Пользователь успешно создан", 200, createdUser)
  },
)
