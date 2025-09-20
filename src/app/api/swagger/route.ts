import { swaggerSpec } from '@/libs/swagger'
import { NextResponse } from 'next/server'

export const GET = async () => {
  return NextResponse.json(swaggerSpec)
}
