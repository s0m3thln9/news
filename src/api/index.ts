import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseQuery = (url: string) =>
  fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
    credentials: "include",
  })
