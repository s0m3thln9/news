import { parse } from 'cookie'
import { ApiError } from '@/types/api-response'
import jwt from 'jsonwebtoken'

type Handler = (payload: string, request: Request) => Promise<Response>

export const withAuth = (handler: Handler) => {
  return async (request: Request) => {
    const cookieHeader = request.headers.get('cookie') || ''

    const cookies = parse(cookieHeader)
    const token = cookies.token

    if (!token) {
      throw new ApiError({ status: 401, message: 'Не авторизован' })
    }

    let payload: string
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!) as string
    } catch {
      throw new ApiError({ status: 401, message: 'Неверный токен' })
    }

    return handler(payload, request)
  }
}
