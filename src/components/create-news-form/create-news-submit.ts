"use client"

import { useCreateNewsMutation } from "@/api/news"
import type { CreateNewsFormData } from "@/components/create-news-form/schema"

export const useCreateNewsSubmit = () => {
  const [createNews] = useCreateNewsMutation()

  return async (data: CreateNewsFormData) => {
    try {
      const res = await createNews(data).unwrap()
      if (res && res.data) {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
