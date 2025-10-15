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
      const existingIds = new Set(state.news.map((item) => item.uuid))
      const uniqueNewNews = action.payload.filter(
        (item) => !existingIds.has(item.uuid),
      )

      state.news = [...state.news, ...uniqueNewNews]
    },
  },
})

export const { setNews, loadMoreNews } = newsSlice.actions
export default newsSlice.reducer
