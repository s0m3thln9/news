import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserDTO } from "@/types/dto/user"
import { Language } from "@/generated/prisma"

type InitialState = {
  user: UserDTO | null
  language: Language
}

const initialState: InitialState = {
  user: null,
  language: "RU",
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserDTO>) => {
      state.user = action.payload

      state.language = action.payload.language || state.language
    },
    logOut: (state) => {
      state.user = null
    },
    updateUser: (state, action: PayloadAction<UserDTO>) => {
      state.user = action.payload
    },
    updateLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload
    },
  },
})

export const { signIn, logOut, updateUser, updateLanguage } = userSlice.actions
export default userSlice.reducer
