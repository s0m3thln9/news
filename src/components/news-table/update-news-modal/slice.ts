import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { NewsWithLocation } from "@/types/dto/news-with-location"

type InitialState = {
  modalOpen: boolean
  currentNews: null | NewsWithLocation
}

const initialState: InitialState = {
  modalOpen: false,
  currentNews: null,
}

export const editNewsModalSlice = createSlice({
  name: "editNewsModalSlice",
  initialState,
  reducers: {
    setEditNewsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload
    },
    setEditNewsCurrent: (
      state,
      action: PayloadAction<NewsWithLocation | null>,
    ) => {
      state.currentNews = action.payload
    },
  },
})

export const { setEditNewsModalOpen, setEditNewsCurrent } =
  editNewsModalSlice.actions
export default editNewsModalSlice.reducer
