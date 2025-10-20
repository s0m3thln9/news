import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/api/index"
import { ApiResponse } from "@/types/api-response"
import { Pagination } from "@/types/dto/pagination"
import { Location } from "@/generated/prisma"
import {
  CreateLocationRequestBody,
  GetLocationsQueryParams,
  UpdateLocationRequestBody,
} from "@/server/services/locations-service"

const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: baseQuery("locations"),
  endpoints: (builder) => ({
    getLocations: builder.query<
      ApiResponse<Pagination<Location[]>>,
      GetLocationsQueryParams
    >({
      query: (params) => ({
        url: "",
        method: "GET",
        params,
      }),
    }),
    deleteLocation: builder.mutation<ApiResponse<Location>, string>({
      query: (uuid) => ({
        url: `${uuid}`,
        method: "DELETE",
      }),
    }),
    updateLocation: builder.mutation<
      ApiResponse<Location>,
      { uuid: string; body: UpdateLocationRequestBody }
    >({
      query: ({ uuid, body }) => ({
        url: `${uuid}`,
        method: "PATCH",
        body,
      }),
    }),
    createLocation: builder.mutation<
      ApiResponse<Location>,
      CreateLocationRequestBody
    >({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
    }),
  }),
})

export default locationsApi
export const {
  useGetLocationsQuery,
  useDeleteLocationMutation,
  useUpdateLocationMutation,
  useCreateLocationMutation,
} = locationsApi
