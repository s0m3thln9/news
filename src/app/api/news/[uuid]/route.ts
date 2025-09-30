import {
  createRoute,
  auth,
  jsonBody,
  errorBoundary,
  requireRole,
} from "@/server/utils/middleware/compose"
import { handleResponse } from "@/server/utils/handle-response"
import { UserRole } from "@/generated/prisma"
import {
  updateNews,
  UpdateNewsRequestBody,
} from "@/server/services/news-service"
import { checkEditorAllowedToNews } from "@/server/utils/check-editor-allowed-to-news"

/**
 * @swagger
 * /api/news/{uuid}:
 *   post:
 *     summary: Обновление новости
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
  [
    errorBoundary(),
    auth(),
    jsonBody<UpdateNewsRequestBody>(),
    requireRole([UserRole.ADMIN, UserRole.EDITOR]),
  ],
  async ({ params, userUuid, body }) => {
    await checkEditorAllowedToNews(userUuid || "", params?.uuid || "")

    const createdNews = await updateNews(
      userUuid as string,
      body as UpdateNewsRequestBody,
    )
    return handleResponse("Новость успешно обновлена", 200, createdNews)
  },
)
