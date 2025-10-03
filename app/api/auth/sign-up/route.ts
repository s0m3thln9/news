import { signUpUser, SignUpRequestBody } from "@/server/services/user-service"
import { handleResponse } from "@/server/utils/handle-response"
import {
  createRoute,
  errorBoundary,
  jsonBody,
} from "@/server/utils/middleware/compose"

/**
 * @swagger
 * /api/user/sign-up:
 *   post:
 *     summary: Создание пользователя
 *     tags:
 *       - Auth
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
  [errorBoundary(), jsonBody<SignUpRequestBody>()],
  async ({ body }) => {
    const createdUser = await signUpUser(body as SignUpRequestBody)
    return handleResponse("Пользователь успешно создан", 200, createdUser)
  },
)
