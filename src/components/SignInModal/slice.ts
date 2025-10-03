import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  modalOpen: boolean
}

const initialState: InitialState = {
  modalOpen: false,
}

export const signInModalSlice = createSlice({
  name: "signInSlice",
  initialState,
  reducers: {
    setSignInModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload
    },
  },
})

export const { setSignInModalOpen } = signInModalSlice.actions
export default signInModalSlice.reducer
