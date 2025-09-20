import { NextResponse } from 'next/server'

export const handleResponse = (
  message: string,
  status: number,
  data?: unknown,
) => {
  return NextResponse.json(
    {
      status,
      message,
      data,
    },
    { status },
  )
}
