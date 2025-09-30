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
  createNews,
  CreateNewsRequestBody,
  createNewsSchema,
  getNews,
} from "@/server/services/news-service"
import { checkEditorAllowedToLocation } from "@/server/utils/check-editor-allowed-to-location"

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Создание новости
 *     tags:
 *       - News
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - images
 *               - title
 *               - content
 *               - location
 *     responses:
 *       200:
 *         description: Новость успешно создана
 *       400:
 *         description: Некорректные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = createRoute(
  [
    errorBoundary(),
    auth(),
    jsonBody<CreateNewsRequestBody>(),
    requireRole([UserRole.ADMIN, UserRole.EDITOR]),
  ],
  async ({ body, userUuid }) => {
    const requestBody = createNewsSchema.parse(body)

    await checkEditorAllowedToLocation(userUuid || "", requestBody.locationUuid)

    const createdNews = await createNews(userUuid as string, requestBody)
    return handleResponse("Новость успешно создана", 200, createdNews)
  },
)

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Получение новости
 *     tags:
 *       - News
 *     responses:
 *       200:
 *         description: Новости успешно получены
 *       400:
 *         description: Некорректные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const GET = createRoute([errorBoundary()], async () => {
  const news = await getNews()
  return handleResponse("Новости успешно получены", 200, news)
})
