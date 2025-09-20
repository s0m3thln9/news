import { PrismaClient, User } from '@/generated/prisma'
import { NextResponse } from 'next/server'

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Создание пользователя
 *     responses:
 *       200:
 *         description: Тест
 */
export const POST = async (request: Request) => {
  const body = await request.json()

  const prismaClient = new PrismaClient()

  const createdUser: User = await prismaClient.user.create({
    data: {
      ...body,
    },
  })

  return NextResponse.json({ createdUser })
}
