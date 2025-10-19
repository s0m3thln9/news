import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/api/index"
import { ApiResponse } from "@/types/api-response"

const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: baseQuery("upload"),
  endpoints: (builder) => ({
    upload: builder.mutation<
      ApiResponse<{ public_id: string }>,
      { image: File }
    >({
      query: (body) => {
        const formData = new FormData()
        formData.append("image", body.image)
        return {
          url: "",
          method: "POST",
          body: formData,
        }
      },
    }),
  }),
})

export default uploadApi
export const { useUploadMutation } = uploadApi
