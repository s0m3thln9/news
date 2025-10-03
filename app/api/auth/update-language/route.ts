import {
  auth,
  createRoute,
  errorBoundary,
  jsonBody,
} from "@/server/utils/middleware/compose"
import { UserDTO } from "@/types/dto/user"
import {
  updateLanguage,
  UpdateLanguageRequestBody,
} from "@/server/services/user-service"
import { handleResponse } from "@/server/utils/handle-response"

/**
 * @swagger
 * /api/user/update-language:
 *   post:
 *     summary: Обновления языка пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - language
 *     responses:
 *       200:
 *         description: Язык успешно обновлен
 *       400:
 *         description: Некорректные данные (например, invalid email)
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const POST = createRoute(
  [errorBoundary(), auth(), jsonBody<UpdateLanguageRequestBody>()],
  async ({ body, userUuid }) => {
    const confirmedUser: UserDTO = await updateLanguage(
      body as UpdateLanguageRequestBody,
      userUuid as string,
    )
    return handleResponse("Язык успешно обновлен", 200, confirmedUser)
  },
)
