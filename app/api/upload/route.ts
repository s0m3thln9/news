import { NextRequest } from "next/server"
import {
  auth,
  createRoute,
  errorBoundary,
} from "@/server/utils/middleware/compose"
import { uploadImage } from "@/server/services/file-service"
import { handleResponse } from "@/server/utils/handle-response"

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Загрузка изображения
 *     description: Загружает изображение в папку public/uploads и возвращает путь к файлу.
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Изображение в формате JPEG, PNG или GIF (максимум 5MB).
 *             required:
 *               - image
 *     responses:
 *       200:
 *         description: Файл успешно загружен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 public_id:
 *                   type: string
 *                   example: uploads/ecyk5mkmgo3jl7cersra.jpg
 *       400:
 *         description: Некорректные данные (отсутствует файл, неверный тип или размер превышен)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid file type
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to upload file
 */
export const POST = createRoute(
  [errorBoundary(), auth()],
  async ({ request }) => {
    const uploadedFileInfo = await uploadImage(request as NextRequest)
    return handleResponse("File uploaded successfully", 200, uploadedFileInfo)
  },
)
