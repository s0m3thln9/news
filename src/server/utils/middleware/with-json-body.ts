import { ApiError } from '@/types/api-response'
import { handleError } from '@/server/utils/handle-error'

type Handler<T> = (body: T) => Promise<Response>

export const withJsonBody = <T>(handler: Handler<T>) => {
  return async (request: Request) => {
    let body: T
    try {
      body = (await request.json()) as T
    } catch {
      return handleError(
        new ApiError({
          status: 400,
          message: 'Invalid JSON body',
        }),
      )
    }
    return handler(body)
  }
}
