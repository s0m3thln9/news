"use client"

import { useCreateNewsMutation } from "@/api/news"
import type { CreateNewsFormData } from "@/components/create-news-form/schema"

export const useCreateNewsSubmit = () => {
  const [createNews] = useCreateNewsMutation()

  return async (data: CreateNewsFormData) => {
    try {
      await createNews(data).unwrap()
    } catch (error) {
      console.log(error)
    }
  }
}
