import bcrypt from "bcrypt"
import { Language, Prisma, User, UserRole } from "@prisma/client"
import { ApiError } from "@/types/api-response"
import { UserDTO } from "@/types/dto/user"
import z from "zod"
import { prisma } from "@/server/prisma-client"
import { omit } from "@/server/utils/omit"
import { Pagination } from "@/types/dto/pagination"
import { NextResponse } from "next/server"
import { generateJwtToken } from "@/server/utils/generate-jwt-cookie"

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
          },
        },
        {
          firstName: {
            contains: search,
          },
        },
        {
          lastName: {
            contains: search,
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
            },
          },
          {
            firstName: {
              contains: search,
            },
          },
          {
            lastName: {
              contains: search,
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

export const googleAuth = async (code: string, url: string) => {
  const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
  const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

  const clientId = process.env.GOOGLE_CLIENT_ID!
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!
  const redirectUri = `${process.env.NEXT_PUBLIC_API_URL}/user/google/callback`

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  })

  const tokenData = await tokenResponse.json()

  console.log("response", tokenData)

  if (!tokenData.access_token) {
    console.error("Token exchange failed", tokenData)
  }

  const userResponse = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })

  const user = await userResponse.json()

  console.log("userdata", user)

  const signupUserRequestBody = {
    firstName: user.given_name,
    lastName: user.family_name,
    email: user.email,
    password: "google_oauth2_password",
  }

  let existingUser
  try {
    existingUser = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    })
  } catch {
    existingUser = null
  }

  console.log("existingUser", existingUser)
  console.log("url", new URL("/", url))

  if (existingUser) {
    const response = NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_HOME_URL),
    )

    response.cookies.set("jwt", generateJwtToken(existingUser.uuid), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  }

  const createdUser = await signUpUser(signupUserRequestBody)

  const response = NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_HOME_URL),
  )

  response.cookies.set("jwt", generateJwtToken(createdUser.uuid), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return response
}
