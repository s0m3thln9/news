import {
  getMe,
  signInUser,
  SignInUserRequestBody,
} from '@/server/services/user-service'
import { handleResponse } from '@/server/utils/handle-response'
import { withJsonBody } from '@/server/utils/middleware/with-json-body'
import { withErrorHandler } from '@/server/utils/middleware/with-error-handler'
import { generateJwtCookie } from '@/server/utils/generate-jwt-token'
import { withAuth } from '@/server/utils/middleware/with-auth'

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Авторизация пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Пользователь успешно авторизован
 *       400:
 *         description: Некорректные данные (например, invalid email)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = withErrorHandler(
  withJsonBody<SignInUserRequestBody>(async (body) => {
    const signedInUser = await signInUser(body)

    return handleResponse(
      'Пользователь успешно авторизован',
      200,
      signedInUser,
      {
        'Content-Type': 'application/json',
        'Set-Cookie': generateJwtCookie(signedInUser.uuid),
      },
    )
  }),
)

/**
 * @swagger
 * /api/auth/sign-in:
 *   get:
 *     summary: Получение данных пользователя через jwt
 *     responses:
 *       200:
 *         description: Пользователь успешно авторизован
 *       400:
 *         description: Некорректные данные (например, invalid email)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const GET = withErrorHandler(
  withAuth(async (uuid) => {
    const signedInUser = await getMe(uuid)
    return handleResponse('Пользователь успешно авторизован', 200, signedInUser)
  }),
)
