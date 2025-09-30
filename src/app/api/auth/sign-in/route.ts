import {
  getMe,
  signInUser,
  SignInUserRequestBody,
} from "@/server/services/user-service"
import { handleResponse } from "@/server/utils/handle-response"
import { generateJwtCookie } from "@/server/utils/generate-jwt-cookie"
import {
  auth,
  createRoute,
  errorBoundary,
  jsonBody,
} from "@/server/utils/middleware/compose"

/**
 * @swagger
 * /api/auth/sign-in:
 *   post:
 *     summary: Авторизация пользователя
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
export const POST = createRoute(
  [errorBoundary(), jsonBody<SignInUserRequestBody>()],
  async ({ body }) => {
    const signedInUser = await signInUser(body as SignInUserRequestBody)

    return handleResponse(
      "Пользователь успешно авторизован",
      200,
      signedInUser,
      {
        "Content-Type": "application/json",
        "Set-Cookie": generateJwtCookie(signedInUser.uuid),
      },
    )
  },
)

/**
 * @swagger
 * /api/auth/sign-in:
 *   get:
 *     summary: Получение данных пользователя через jwt
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Пользователь успешно авторизован
 *       400:
 *         description: Некорректные данные (например, invalid email)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const GET = createRoute(
  [errorBoundary(), auth()],
  async ({ userUuid }) => {
    const signedInUser = await getMe(userUuid as string)
    return handleResponse("Пользователь успешно авторизован", 200, signedInUser)
  },
)
