import { v2 as cloudinary } from "cloudinary"
import { ApiError } from "@/types/api-response"
import { NextRequest } from "next/server"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (request: NextRequest) => {
  const formData = await request.formData()
  const file = formData.get("image")

  if (!file || !(file instanceof File)) {
    throw new ApiError({
      message: "No file uploaded or invalid file",
      status: 400,
    })
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
  if (!allowedTypes.includes(file.type)) {
    throw new ApiError({
      status: 400,
      message: "Invalid file type",
    })
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new ApiError({
      status: 400,
      message: "File too large",
    })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const base64String = `data:${file.type};base64,${buffer.toString("base64")}`

  const uploadResponse = await cloudinary.uploader.upload(base64String, {
    folder: "uploads",
  })

  return {
    public_id: uploadResponse.public_id,
  }
}
