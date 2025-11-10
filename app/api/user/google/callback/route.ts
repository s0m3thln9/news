import { createRoute, errorBoundary } from "@/server/utils/middleware/compose"
import { NextResponse } from "next/server"
import { signInUser, signUpUser } from "@/server/services/user-service"
import { generateJwtToken } from "@/server/utils/generate-jwt-cookie"

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

const clientId = process.env.GOOGLE_CLIENT_ID!
const clientSecret = process.env.GOOGLE_CLIENT_SECRET!
const redirectUri = `${process.env.NEXT_PUBLIC_API_URL}/user/google/callback`

/**
 * @swagger
 * /api/user/google/callback:
 *   get:
 *     summary: Получение пользователей
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Пользователи успешно получены
 *       500:
 *         description: Внутренняя ошибка сервера
 */
export const GET = createRoute([errorBoundary()], async ({ request }) => {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code") || ""

  // 1️⃣ Обмен кода на токен
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

  if (!tokenData.access_token) {
    console.error("Token exchange failed", tokenData)
  }

  const userResponse = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })

  const user = await userResponse.json()

  const signupUserRequestBody = {
    firstName: user.given_name,
    lastName: user.family_name,
    email: user.email,
    password: "google_oauth2_password",
  }

  let existingUser
  try {
    existingUser = await signInUser({
      email: user.email,
      password: "google_oauth2_password",
    })
  } catch {
    existingUser = null
  }

  if (existingUser) {
    const response = NextResponse.redirect(new URL("/", request.url))

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

  const response = NextResponse.redirect(new URL("/", request.url))

  response.cookies.set("jwt", generateJwtToken(createdUser.uuid), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  return response
})
