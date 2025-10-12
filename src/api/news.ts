import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/api/index"
import { ApiResponse } from "@/types/api-response"
import { NewsDTO } from "@/types/dto/news"
import { GetNewsQueryParams } from "@/server/services/news-service"

const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: baseQuery("news"),
  endpoints: (builder) => ({
    getNews: builder.mutation<ApiResponse<NewsDTO[]>, GetNewsQueryParams>({
      query: (params) => ({
        url: "",
        method: "GET",
        params,
      }),
    }),
  }),
})

export default newsApi
export const { useGetNewsMutation } = newsApi
