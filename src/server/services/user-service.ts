import bcrypt from 'bcrypt'
import { Prisma, User } from '@/generated/prisma'
import { ApiError } from '@/types/api-response'
import { UserDTO } from '@/types/dto/user'
import z from 'zod'
import { prisma } from '@/server/prisma-client'
import { omit } from '@/server/utils/omit'

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

  const hashedPassword = await bcrypt.hash(
    body.password,
    process.env.BCRYPT_SALT_ROUNDS || 12,
  )

  try {
    return await prisma.user.create({
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
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === 'P2002'
    ) {
      throw new ApiError({
        status: 400,
        message: 'Пользователь с таким email уже есть',
      })
    }
    throw new ApiError({
      status: 500,
      message: 'Неизвестная ошибка',
    })
  }
}

const signInUserSchema = z.object({
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

export type SignInUserRequestBody = z.infer<typeof signInUserSchema>

export const signInUser = async (
  body: SignInUserRequestBody,
): Promise<UserDTO> => {
  signInUserSchema.parse(body)

  const user: User | null = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  })

  if (!user) {
    throw new ApiError({ status: 400, message: 'Неверный email или пароль' })
  }

  const isPasswordValid = await bcrypt.compare(body.password, user.password)

  if (!isPasswordValid) {
    throw new ApiError({ status: 400, message: 'Неверный email или пароль' })
  }

  return omit(user, ['password'])
}

export const getMe = async (uuid: string): Promise<UserDTO> => {
  const user: UserDTO | null = await prisma.user.findFirst({
    where: {
      uuid,
    },
    omit: {
      password: true,
    },
  })

  if (!user) {
    throw new ApiError({ status: 401, message: 'Не авторизован' })
  }

  return user
}
