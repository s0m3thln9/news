import jwt from "jsonwebtoken"
import { serialize } from "cookie"

const generateJwtToken = (uuid: string) => {
  return jwt.sign(uuid, process.env.JWT_SECRET!)
}

export const generateJwtCookie = (uuid: string) => {
  return serialize("jwt", generateJwtToken(uuid), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  })
}
