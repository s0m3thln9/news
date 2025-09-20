import bcrypt from 'bcrypt'
import { Prisma, PrismaClient } from '@/generated/prisma'
import { ApiError } from '@/types/api-response'
import { UserDTO } from '@/types/dto/user'
import z from 'zod'

const createUserSchema = z.object({
  firstName: z.string().min(1, 'Имя обязательно'),
  lastName: z.string().min(1, 'Фамилия обязательна'),
  email: z
    .string()
    .min(1, 'Email обязателен')
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Некорректный email адрес',
    }),
  password: z
    .string()
    .min(8, 'Пароль слишком короткий')
    .max(64, 'Пароль слишком длинный'),
})

export type CreateUserRequestBody = z.infer<typeof createUserSchema>

export const createUser = async (
  body: CreateUserRequestBody,
): Promise<UserDTO> => {
  createUserSchema.parse(body)

  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(body.password, saltRounds)

  const prismaClient = new PrismaClient()

  try {
    return await prismaClient.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: hashedPassword,
      },
      omit: {
        password: true,
      },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        throw new ApiError({
          status: 400,
          message: 'Пользователь с таким email уже есть',
        })
      }
    }
    throw new ApiError({
      status: 500,
      message: 'Неизвестная ошибка',
    })
  } finally {
    await prismaClient.$disconnect()
  }
}
