import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/api/index"
import { ApiResponse } from "@/types/api-response"
import { NewsDTO } from "@/types/dto/news"
import {
  CreateNewsRequestBody,
  GetNewsQueryParams,
  GetNewsWithLocationQueryParams,
  UpdateNewsRequestBody,
} from "@/server/services/news-service"
import { Pagination } from "@/types/dto/Pagination"
import { NewsWithLocation } from "@/types/dto/news-with-location"

const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: baseQuery("news"),
  endpoints: (builder) => ({
    getNews: builder.query<
      ApiResponse<Pagination<NewsDTO[]>>,
      GetNewsQueryParams
    >({
      query: (params) => ({
        url: "",
        method: "GET",
        params,
      }),
    }),
    getNewsWithLocation: builder.query<
      ApiResponse<Pagination<NewsWithLocation[]>>,
      GetNewsWithLocationQueryParams
    >({
      query: (params) => ({
        url: "with-location",
        method: "GET",
        params,
      }),
    }),
    createNews: builder.mutation<ApiResponse<NewsDTO[]>, CreateNewsRequestBody>(
      {
        query: (body) => ({
          url: "",
          method: "POST",
          body,
        }),
      },
    ),
    getResentPostUuid: builder.mutation<ApiResponse<string>, void>({
      query: () => ({
        url: "latest",
        method: "GET",
      }),
    }),
    deleteNews: builder.mutation<ApiResponse<NewsDTO>, string>({
      query: (uuid) => ({
        url: `${uuid}`,
        method: "DELETE",
      }),
    }),
    updateNews: builder.mutation<
      ApiResponse<NewsDTO>,
      { uuid: string; body: UpdateNewsRequestBody }
    >({
      query: ({ uuid, body }) => ({
        url: `${uuid}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
})

export default newsApi
export const {
  useGetNewsQuery,
  useCreateNewsMutation,
  useGetResentPostUuidMutation,
  useGetNewsWithLocationQuery,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
} = newsApi
