import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/api/index"
import { ApiResponse } from "@/types/api-response"
import { UserDTO } from "@/types/dto/user"
import {
  SignInUserRequestBody,
  SignUpRequestBody,
} from "@/server/services/user-service"

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery("auth"),
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
  }),
})

export default userApi
export const { useSignUpUserMutation, useSignInUserMutation } = userApi
