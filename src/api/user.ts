import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/api/index"
import { ApiResponse } from "@/types/api-response"
import { UserDTO } from "@/types/dto/user"
import {
  SignInUserRequestBody,
  SignUpRequestBody,
  UpdateUserRequestBody,
} from "@/server/services/user-service"
import { $Enums } from "@/generated/prisma"
import Language = $Enums.Language

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery("user"),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<ApiResponse<UserDTO>, SignUpRequestBody>({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body,
      }),
    }),
    signInUser: builder.mutation<ApiResponse<UserDTO>, SignInUserRequestBody>({
      query: (body) => ({
        url: "/sign-in",
        method: "POST",
        body,
      }),
    }),
    updateLanguage: builder.mutation<
      ApiResponse<UserDTO>,
      { language: Language }
    >({
      query: (body) => ({
        url: "/update-language",
        method: "POST",
        body,
      }),
    }),
    updateUser: builder.mutation<ApiResponse<UserDTO>, UpdateUserRequestBody>({
      query: (body) => ({
        url: "",
        method: "PATCH",
        body,
      }),
    }),
  }),
})

export default userApi
export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useUpdateLanguageMutation,
  useUpdateUserMutation,
} = userApi
