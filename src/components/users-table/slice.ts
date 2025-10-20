import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserDTO } from "@/types/dto/user"

type InitialState = {
  users: UserDTO[]
  offset: number
  limit: number
  searchQuery: string
  total: number
}

const initialState: InitialState = {
  users: [],
  offset: 0,
  limit: 10,
  searchQuery: "",
  total: -1,
}

export const usersTableSlice = createSlice({
  name: "usersTableSlice",
  initialState,
  reducers: {
    setUsersToTable: (state, action: PayloadAction<UserDTO[]>) => {
      state.users = action.payload
    },
    setSearchQueryToTable: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setOffsetToTable: (state, action: PayloadAction<number>) => {
      state.offset = action.payload
    },
    setTotalToTable: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
    deleteUserFromTable: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.uuid !== action.payload)
      state.total = state.total - 1
    },
    updateUser: (state, action: PayloadAction<UserDTO>) => {
      state.users = state.users.map((user) =>
        user.uuid === action.payload.uuid ? action.payload : user,
      )
    },
    createUser: (state, action: PayloadAction<UserDTO>) => {
      state.users = [...state.users, action.payload]
      state.total = state.total + 1
    },
  },
})

export const {
  createUser,
  setUsersToTable,
  deleteUserFromTable,
  setTotalToTable,
  updateUser,
  setSearchQueryToTable,
  setOffsetToTable,
} = usersTableSlice.actions
export default usersTableSlice.reducer
