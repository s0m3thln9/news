import { handleResponse } from "@/server/utils/handle-response"
import { deleteJwtCookie } from "@/server/utils/generate-jwt-cookie"
import { createRoute, errorBoundary } from "@/server/utils/middleware/compose"

/**
 * @swagger
 * /api/user/sign-out:
 *   post:
 *     summary: Выход пользователя из системы
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Пользователь успешно вышел из системы
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = createRoute([errorBoundary()], async () => {
  return handleResponse("Пользователь успешно вышел из системы", 200, null, {
    "Content-Type": "application/json",
    "Set-Cookie": deleteJwtCookie(),
  })
})
