"use client"

import { useUploadMutation } from "@/api/upload"

export const useUploadFile = () => {
  const [upload] = useUploadMutation()

  return async (data: { image: File }) => {
    try {
      const res = await upload(data).unwrap()
      if (res && res.data) {
        return res.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}
