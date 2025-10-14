import {
  createRoute,
  auth,
  errorBoundary,
  requireRole,
} from "@/server/utils/middleware/compose"
import { handleResponse } from "@/server/utils/handle-response"
import { UserRole } from "@/generated/prisma"
import { togglePinNews } from "@/server/services/news-service"
import { checkEditorAllowedToNews } from "@/server/utils/check-editor-allowed-to-news"

/**
 * @swagger
 * /api/news/{uuid}/toggle-pin:
 *   patch:
 *     summary: Закрепление новости
 *     tags:
 *       - News
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Новость успешно обновлена
 *       400:
 *         description: Некорректные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = createRoute(
  [errorBoundary(), auth(), requireRole([UserRole.ADMIN])],
  async ({ params, userUuid }) => {
    await checkEditorAllowedToNews(userUuid || "", params?.uuid || "")

    const updatedNews = await togglePinNews(params?.uuid as string)
    return handleResponse("Новость успешно обновлена", 200, updatedNews)
  },
)
