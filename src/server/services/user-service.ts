import bcrypt from "bcrypt"
import { Language, Prisma, User, UserRole } from "@/generated/prisma"
import { ApiError } from "@/types/api-response"
import { UserDTO } from "@/types/dto/user"
import z from "zod"
import { prisma } from "@/server/prisma-client"
import { omit } from "@/server/utils/omit"
import { Pagination } from "@/types/dto/pagination"

const signUpUserSchema = z.object({
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

export type SignUpRequestBody = z.infer<typeof signUpUserSchema>

export const signUpUser = async (body: SignUpRequestBody): Promise<UserDTO> => {
  signUpUserSchema.parse(body)

  const hashedPassword = await bcrypt.hash(body.password, 12)

  try {
    return prisma.user.create({
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

export const updateLanguageSchema = z.object({
  language: z.enum(Language),
})

export type UpdateLanguageRequestBody = z.infer<typeof updateLanguageSchema>

export const updateLanguage = async (
  body: UpdateLanguageRequestBody,
  uuid?: string,
) => {
  updateLanguageSchema.parse(body)

  const user: UserDTO = await prisma.user.update({
    where: { uuid },
    data: {
      language: body.language,
    },
    omit: { password: true },
  })

  return user
}

const updateUserProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export type UpdateUserProfileRequestBody = z.infer<
  typeof updateUserProfileSchema
>

export const updateUser = async (
  uuid: string,
  body: UpdateUserProfileRequestBody,
) => {
  updateUserProfileSchema.parse(body)

  return prisma.user.update({
    where: {
      uuid,
    },
    data: {
      ...body,
    },
  })
}

export type GetUsersQueryParams = {
  offset?: number
  limit?: number
  search?: string
}

type GetUsers = (
  queryParams: GetUsersQueryParams,
) => Promise<Pagination<UserDTO[]>>

export const getUsersQueryOptions = (
  queryParams: GetUsersQueryParams,
): Prisma.UserFindManyArgs => {
  const search = queryParams.search || ""
  return {
    where: {
      OR: [
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          firstName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          lastName: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    take: queryParams.limit || 10,
    skip: queryParams.offset || 0,
    orderBy: {
      createdAt: "asc",
    },
  }
}

export const getUsers: GetUsers = async (queryParams) => {
  const search = queryParams.search || ""

  return {
    data: await prisma.user.findMany(getUsersQueryOptions(queryParams)),
    limit: queryParams.limit || 10,
    offset: queryParams.offset || 0,
    total: await prisma.user.count({
      where: {
        OR: [
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
    }),
  }
}

export const deleteUser = (uuid: string) =>
  prisma.user.delete({
    where: {
      uuid,
    },
  })

const updateUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.enum(UserRole),
  language: z.enum(Language),
  locationUuid: z.string(),
})

export type UpdateUserRequestBody = z.infer<typeof updateUserSchema>

export const updateUserAdmin = async (
  uuid: string,
  body: UpdateUserRequestBody,
) => {
  updateUserSchema.parse(body)

  return prisma.user.update({
    where: {
      uuid,
    },
    data: {
      ...body,
    },
  })
}
