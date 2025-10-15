import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  offset: number
  limit: number
  searchQuery: string
  total: number
}

const initialState: InitialState = {
  offset: 0,
  limit: 10,
  searchQuery: "",
  total: -1,
}

export const searchNewsSlice = createSlice({
  name: "searchNewsSlice",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload
    },
  },
})

export const { setSearchQuery, setOffset, setTotal } = searchNewsSlice.actions
export default searchNewsSlice.reducer
