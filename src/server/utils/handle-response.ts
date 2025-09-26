import { NextResponse } from "next/server"

export const handleResponse = (
  message: string,
  status: number,
  data?: unknown,
  headers?: {
    "Set-Cookie": string
    "Content-Type": "application/json"
  },
) => {
  return NextResponse.json(
    {
      status,
      message,
      data,
    },
    { status, headers },
  )
}
