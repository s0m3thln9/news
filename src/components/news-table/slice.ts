import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NewsWithLocation } from "@/types/dto/news-with-location"
import { NewsDTO } from "@/types/dto/news"

type InitialState = {
  news: NewsWithLocation[]
  offset: number
  limit: number
  searchQuery: string
  total: number
  orderBy: "asc" | "desc"
}

const initialState: InitialState = {
  news: [],
  offset: 0,
  limit: 10,
  searchQuery: "",
  total: -1,
  orderBy: "desc",
}

export const newsTableSlice = createSlice({
  name: "newsTableSlice",
  initialState,
  reducers: {
    setNewsToTable: (state, action: PayloadAction<NewsWithLocation[]>) => {
      state.news = action.payload
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
    setOrderBy: (state, action: PayloadAction<"asc" | "desc">) => {
      state.orderBy = action.payload
    },
    deleteNewsFromTable: (state, action: PayloadAction<string>) => {
      state.news = state.news.filter((news) => news.uuid !== action.payload)
      state.total = state.total - 1
    },
    updateNews: (state, action: PayloadAction<NewsDTO>) => {
      state.news = state.news.map((news) =>
        news.uuid === action.payload.uuid
          ? { ...action.payload, locationUuid: news.locationUuid }
          : news,
      )
    },
  },
})

export const {
  setNewsToTable,
  setTotalToTable,
  setSearchQueryToTable,
  setOffsetToTable,
  deleteNewsFromTable,
  setOrderBy,
  updateNews,
} = newsTableSlice.actions
export default newsTableSlice.reducer
