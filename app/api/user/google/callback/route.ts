import { createRoute, errorBoundary } from "@/server/utils/middleware/compose"
import { googleAuth } from "@/server/services/user-service"

/**
 * @swagger
 * /api/user/google/callback:
 *   get:
 *     summary: Получение пользователей
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Пользователи успешно получены
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const GET = createRoute([errorBoundary()], async ({ request }) => {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code") || ""
  return googleAuth(code, request.url)
})
