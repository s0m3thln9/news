import {
  createRoute,
  auth,
  jsonBody,
  errorBoundary,
  requireRole,
} from "@/server/utils/middleware/compose"
import { handleResponse } from "@/server/utils/handle-response"
import { UserRole } from "@prisma/client"
import {
  deleteNews,
  updateNews,
  UpdateLocationRequestBodyy,
} from "@/server/services/news-service"
import { checkEditorAllowedToNews } from "@/server/utils/check-editor-allowed-to-news"

/**
 * @swagger
 * /api/news/{uuid}:
 *   patch:
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
export const PATCH = createRoute(
  [
    errorBoundary(),
    auth(),
    jsonBody<UpdateLocationRequestBodyy>(),
    requireRole([UserRole.ADMIN, UserRole.EDITOR]),
  ],
  async ({ params, userUuid, body }) => {
    await checkEditorAllowedToNews(userUuid || "", params?.uuid || "")

    const createdNews = await updateNews(
      params?.uuid as string,
      body as UpdateLocationRequestBodyy,
    )
    return handleResponse("Новость успешно обновлена", 200, createdNews)
  },
)

/**
 * @swagger
 * /api/news/{uuid}:
 *   patch:
 *     summary: Удаление новости
 *     tags:
 *       - News
 *     responses:
 *       200:
 *         description: Новость успешно удалена
 *       400:
 *         description: Некорректные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const DELETE = createRoute(
  [errorBoundary(), auth(), requireRole([UserRole.ADMIN, UserRole.EDITOR])],
  async ({ params, userUuid }) => {
    await checkEditorAllowedToNews(userUuid || "", params?.uuid || "")

    const createdNews = await deleteNews(params?.uuid || "")
    return handleResponse("Новость успешно удалена", 200, createdNews)
  },
)
