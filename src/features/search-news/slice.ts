import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  offset: number
  limit: number
  query: string
  debouncedQuery: string
  isLoading: boolean
  touched: boolean
}

const initialState: InitialState = {
  offset: 0,
  limit: 10,
  query: "",
  debouncedQuery: "",
  isLoading: false,
  touched: false,
}

export const searchNewsSlice = createSlice({
  name: "searchNewsSlice",
  initialState,
  reducers: {
    setNewsQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setDebouncedNewsQuery: (state, action: PayloadAction<string>) => {
      state.debouncedQuery = action.payload.trim()
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setTouched: (state, action: PayloadAction<boolean>) => {
      state.touched = action.payload
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload
    },
  },
})

export const {
  setNewsQuery,
  setDebouncedNewsQuery,
  setLoading,
  setTouched,
  setOffset,
} = searchNewsSlice.actions
export default searchNewsSlice.reducer
