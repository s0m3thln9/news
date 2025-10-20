import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  modalOpen: boolean
}

const initialState: InitialState = {
  modalOpen: false,
}

export const createLocationModalSlice = createSlice({
  name: "createLocationModalSlice",
  initialState,
  reducers: {
    setCreateLocationModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload
    },
  },
})

export const { setCreateLocationModalOpen } = createLocationModalSlice.actions
export default createLocationModalSlice.reducer
