import { ApiError, getApiError } from "@/types/api-response"
import { handleResponse } from "@/server/utils/handle-response"
import { ZodError } from "zod"

export const handleError = (error: unknown) => {
  if (error instanceof ApiError) {
    return handleResponse(error.message, error.status, error.data)
  }

  if (
    error &&
    typeof error === "object" &&
    "issues" in error &&
    Array.isArray(error.issues)
  ) {
    const zodError = error as ZodError
    const messages = zodError.issues.map((e) => e.message)
    return handleResponse(messages.join("; "), 400)
  }

  const apiError = getApiError(error)
  return handleResponse(apiError.message, apiError.status, apiError.data)
}
