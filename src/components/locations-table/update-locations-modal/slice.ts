import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Location } from "@/generated/prisma"

type InitialState = {
  modalOpen: boolean
  currentLocation: null | Location
}

const initialState: InitialState = {
  modalOpen: false,
  currentLocation: null,
}

export const editLocationModalSlice = createSlice({
  name: "editLocationModalSlice",
  initialState,
  reducers: {
    setEditLocationModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload
    },
    setEditLocationCurrent: (state, action: PayloadAction<Location | null>) => {
      state.currentLocation = action.payload
    },
  },
})

export const { setEditLocationModalOpen, setEditLocationCurrent } =
  editLocationModalSlice.actions
export default editLocationModalSlice.reducer
