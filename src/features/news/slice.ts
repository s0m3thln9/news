import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NewsDTO } from "@/types/dto/news"

type InitialState = {
  news: NewsDTO[]
}

const initialState: InitialState = {
  news: [],
}

export const newsSlice = createSlice({
  name: "newsSlice",
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<NewsDTO[]>) => {
      state.news = action.payload
    },
    loadMoreNews: (state, action: PayloadAction<NewsDTO[]>) => {
      state.news = [...state.news, ...action.payload]
    },
  },
})

export const { setNews, loadMoreNews } = newsSlice.actions
export default newsSlice.reducer
