import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/api/index"
import { ApiResponse } from "@/types/api-response"
import { NewsDTO } from "@/types/dto/news"
import { GetNewsQueryParams } from "@/server/services/news-service"
import { Pagination } from "@/types/dto/Pagination"

const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: baseQuery("news"),
  endpoints: (builder) => ({
    getNews: builder.mutation<
      ApiResponse<Pagination<NewsDTO[]>>,
      GetNewsQueryParams
    >({
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
