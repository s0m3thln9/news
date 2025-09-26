import bcrypt from "bcrypt"
import { Prisma, User, UserEmailVerification } from "@/generated/prisma"
import { ApiError } from "@/types/api-response"
import { UserDTO } from "@/types/dto/user"
import z from "zod"
import { prisma } from "@/server/prisma-client"
import { omit } from "@/server/utils/omit"
import { generateVerificationCode } from "@/server/utils/generate-verification-code"
import { sendVerificationEmail } from "@/server/utils/send-verification-email"
import { sendResetPasswordEmail } from "@/server/utils/send-reset-password-email"

const createUserSchema = z.object({
  firstName: z.string().min(1, "Имя обязательно"),
  lastName: z.string().min(1, "Фамилия обязательна"),
  email: z
    .string()
    .min(1, "Email обязателен")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Некорректный email адрес",
    }),
  password: z
    .string()
    .min(8, "Пароль слишком короткий")
    .max(64, "Пароль слишком длинный"),
})

export type CreateUserRequestBody = z.infer<typeof createUserSchema>

export const createUser = async (
  body: CreateUserRequestBody,
): Promise<UserDTO> => {
  createUserSchema.parse(body)

  const hashedPassword = await bcrypt.hash(body.password, 12)

  try {
    const code = generateVerificationCode()

    const user: UserDTO = await prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        password: hashedPassword,
        userEmailVerification: {
          create: {
            code,
          },
        },
      },
      omit: {
        password: true,
      },
    })

    await sendVerificationEmail(user.email, code)

    return user
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      throw new ApiError({
        status: 400,
        message: "Пользователь с таким email уже есть",
      })
    }
    throw new ApiError({
      status: 500,
      message: "Неизвестная ошибка",
    })
  }
}

const signInUserSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Некорректный email адрес",
    }),
  password: z
    .string()
    .min(8, "Пароль слишком короткий")
    .max(64, "Пароль слишком длинный"),
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
    throw new ApiError({ status: 400, message: "Неверный email или пароль" })
  }

  const isPasswordValid = await bcrypt.compare(body.password, user.password)

  if (!isPasswordValid) {
    throw new ApiError({ status: 400, message: "Неверный email или пароль" })
  }

  return omit(user, ["password"])
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
    throw new ApiError({ status: 401, message: "Не авторизован" })
  }

  return user
}

const confirmEmailSchema = z.object({
  code: z
    .string()
    .min(6, "Email обязателен")
    .max(6, "Код должен быть 6-ти значным"),
})

export type ConfirmEmailRequestBody = z.infer<typeof confirmEmailSchema>

export const confirmEmail = async (
  uuid: string,
  { code }: ConfirmEmailRequestBody,
) => {
  confirmEmailSchema.parse({ code })

  const emailVerification: UserEmailVerification | null =
    await prisma.userEmailVerification.findFirst({
      where: {
        userUuid: uuid,
        code,
        status: "PENDING",
      },
    })

  if (!emailVerification) {
    throw new ApiError({ status: 400, message: "Неверный код" })
  }

  await prisma.userEmailVerification.update({
    where: {
      uuid: emailVerification.uuid,
    },
    data: {
      status: "FULLFILLED",
    },
  })
  return prisma.user.update({
    where: {
      uuid,
    },
    data: {
      emailVerificationAt: new Date().toISOString(),
    },
    omit: {
      password: true,
    },
  })
}

export const requestPasswordReset = async (uuid: string) => {
  const code = generateVerificationCode()

  const user: User | null = await prisma.user.findFirst({
    where: {
      uuid,
    },
  })

  if (!user) {
    throw new ApiError({ status: 401, message: "Не авторизован" })
  }

  await prisma.userEmailVerification.create({
    data: {
      code,
      userUuid: uuid,
    },
  })

  await sendResetPasswordEmail(user.email, code)
}

const resetPasswordSchema = z.object({
  code: z
    .string()
    .min(6, "Email обязателен")
    .max(6, "Код должен быть 6-ти значным"),
  password: z
    .string()
    .min(8, "Пароль слишком короткий")
    .max(64, "Пароль слишком длинный"),
})

export type ResetPasswordRequestBody = z.infer<typeof resetPasswordSchema>

export const resetPassword = async (
  body: ResetPasswordRequestBody,
  uuid?: string,
) => {
  resetPasswordSchema.parse(body)

  const emailVerification: UserEmailVerification | null =
    await prisma.userEmailVerification.findFirst({
      where: {
        userUuid: uuid,
        code: body.code,
        status: "PENDING",
      },
    })

  if (!emailVerification) {
    throw new ApiError({ status: 400, message: "Неверный код" })
  }

  await prisma.userEmailVerification.update({
    where: {
      uuid: emailVerification.uuid,
    },
    data: {
      status: "FULLFILLED",
    },
  })
  const hashedPassword = await bcrypt.hash(body.password, 12)

  return prisma.user.update({
    where: {
      uuid,
    },
    data: {
      emailVerificationAt: new Date().toISOString(),
      password: hashedPassword,
    },
    omit: {
      password: true,
    },
  })
}
