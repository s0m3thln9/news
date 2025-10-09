import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserDTO } from "@/types/dto/user"

type InitialState = {
  user: UserDTO | null
}

const initialState: InitialState = {
  user: null,
}

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserDTO>) => {
      state.user = action.payload
    },
    logOut: (state) => {
      state.user = null
    },
    updateUser: (state, action: PayloadAction<UserDTO>) => {
      state.user = action.payload
    },
  },
})

export const { signIn, logOut, updateUser } = userSlice.actions
export default userSlice.reducer
