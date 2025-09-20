import { handleError } from '@/server/utils/handle-error'

type Handler = (request: Request) => Promise<Response>

export const withErrorHandler = (handler: Handler) => {
  return async (request: Request) => {
    try {
      return await handler(request)
    } catch (error) {
      return handleError(error)
    }
  }
}
