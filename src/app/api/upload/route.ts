import { writeFile } from "fs/promises"
import { join } from "path"
import { NextResponse, NextRequest } from "next/server"
import { mkdir } from "fs/promises"

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
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 filePath:
 *                   type: string
 *                   example: /uploads/1635123456789-image.jpg
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
export async function POST(request: NextRequest) {
  try {
    const uploadDir = join(process.cwd(), "public/uploads")
    await mkdir(uploadDir, { recursive: true })

    const formData = await request.formData()
    const file = formData.get("image")

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded or invalid file" },
        { status: 400 },
      )
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const fileName = `${Date.now()}-${file.name}`
    const filePath = join(uploadDir, fileName)

    await writeFile(filePath, buffer)

    return NextResponse.json({
      message: "File uploaded successfully",
      filePath: `/uploads/${fileName}`,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    )
  }
}
