import jwt from "jsonwebtoken"
import { serialize } from "cookie"

export const generateJwtToken = (uuid: string) => {
  return jwt.sign(uuid, process.env.JWT_SECRET!)
}

export const generateJwtCookie = (uuid: string) => {
  const cookieName =
    process.env.NODE_ENV === "production" ? "__Secure-jwt" : "jwt"

  return serialize(cookieName, generateJwtToken(uuid), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  })
}

export const deleteJwtCookie = () => {
  const cookieName =
    process.env.NODE_ENV === "production" ? "__Secure-jwt" : "jwt"

  return serialize(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
}
