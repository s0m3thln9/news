"use client"

import { useGetResentPostUuidMutation } from "@/api/news"
import { useRouter } from "next/navigation"

export const useGetResentPostUuid = () => {
  const [getResentPostUuid] = useGetResentPostUuidMutation()
  const router = useRouter()

  return async () => {
    try {
      const res = await getResentPostUuid().unwrap()
      if (res && res.data) {
        router.push(`/${res.data}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
