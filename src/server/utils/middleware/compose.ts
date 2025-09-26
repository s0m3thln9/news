import { handleError } from "@/server/utils/handle-error"
import { prisma } from "@/server/prisma-client"
import { UserRole } from "@/generated/prisma"

export interface Context {
  request: Request
  body?: unknown
  userUuid?: string
  params?: Record<string, string>
}

export type Handler = (ctx: Context) => Promise<Response>
export type Middleware = (next: Handler) => Handler

export const compose = (
  middlewares: Middleware[],
  finalHandler: Handler,
): Handler =>
  middlewares.reduceRight<Handler>((next, mw) => mw(next), finalHandler)

export const createRoute = (
  middlewares: Middleware[],
  finalHandler: Handler,
) => {
  const pipeline = compose(middlewares, finalHandler)
  return async (
    request: Request,
    context?: {
      params?: Record<string, string> | Promise<Record<string, string>>
    },
  ) => {
    const maybeParams = context?.params as
      | Record<string, string>
      | Promise<Record<string, string>>
      | undefined

    const params =
      maybeParams &&
      typeof (maybeParams as Promise<Record<string, string>>).then ===
        "function"
        ? await (maybeParams as Promise<Record<string, string>>)
        : (maybeParams as Record<string, string> | undefined)

    return pipeline({ request, params })
  }
}

export const errorBoundary = (): Middleware => (next) => async (ctx) => {
  try {
    return await next(ctx)
  } catch (error) {
    return handleError(error)
  }
}

export function jsonBody<T = unknown>(): Middleware {
  return (next) => async (ctx) => {
    try {
      const body = (await ctx.request.json()) as T
      return next({ ...ctx, body })
    } catch {
      return handleError({ status: 400, message: "Invalid JSON body" })
    }
  }
}

export const auth = (): Middleware => (next) => async (ctx) => {
  const cookieHeader = ctx.request.headers.get("cookie") || ""
  const { parse } = await import("cookie")
  const jwtModule = await import("jsonwebtoken")
  const cookies = parse(cookieHeader)
  const token = cookies.jwt

  if (!token) {
    return handleError({ status: 401, message: "Не авторизован" })
  }

  try {
    const payload = jwtModule.default.verify(
      token,
      process.env.JWT_SECRET!,
    ) as string
    return next({ ...ctx, userUuid: payload })
  } catch {
    return handleError({ status: 401, message: "Неверный токен" })
  }
}

export const requireRole =
  (role: UserRole | UserRole[]): Middleware =>
  (next) =>
  async (ctx) => {
    const roles = Array.isArray(role) ? role : [role]

    const user = await prisma.user.findFirst({
      where: {
        uuid: ctx.userUuid,
      },
    })

    if (!user) {
      return handleError({ status: 401, message: "Не авторизован" })
    }

    if (!roles.includes(user.role)) {
      return handleError({ status: 403, message: "Нет доступа" })
    }

    return next(ctx)
  }
