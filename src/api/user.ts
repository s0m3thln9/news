import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/api/index"
import { ApiResponse } from "@/types/api-response"
import { UserDTO } from "@/types/dto/user"
import {
  GetUsersQueryParams,
  SignInUserRequestBody,
  SignUpRequestBody,
  UpdateUserProfileRequestBody,
  UpdateUserRequestBody,
} from "@/server/services/user-service"
import { $Enums } from "@/generated/prisma"
import Language = $Enums.Language
import { Pagination } from "@/types/dto/pagination"

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
    updateUser: builder.mutation<
      ApiResponse<UserDTO>,
      UpdateUserProfileRequestBody
    >({
      query: (body) => ({
        url: "",
        method: "PATCH",
        body,
      }),
    }),
    getUsers: builder.query<
      ApiResponse<Pagination<UserDTO[]>>,
      GetUsersQueryParams
    >({
      query: (params) => ({
        url: "",
        method: "GET",
        params,
      }),
    }),
    deleteUser: builder.mutation<ApiResponse<UserDTO>, string>({
      query: (uuid) => ({
        url: `${uuid}`,
        method: "DELETE",
      }),
    }),
    updateUserAdmin: builder.mutation<
      ApiResponse<UserDTO>,
      { uuid: string; body: UpdateUserRequestBody }
    >({
      query: ({ uuid, body }) => ({
        url: `${uuid}`,
        method: "PATCH",
        body,
      }),
    }),
    signOutUser: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/sign-out",
        method: "POST",
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
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserAdminMutation,
  useSignOutUserMutation,
} = userApi
