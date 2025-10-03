import { swaggerSpec } from "@/utils/swagger"
import { NextResponse } from "next/server"

export const GET = async () => NextResponse.json(swaggerSpec)
