import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type InitialState = {
  modalOpen: boolean
}

const initialState: InitialState = {
  modalOpen: false,
}

export const signUpModalSlice = createSlice({
  name: "signUpSlice",
  initialState,
  reducers: {
    setSignUpModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload
    },
  },
})

export const { setSignUpModalOpen } = signUpModalSlice.actions
export default signUpModalSlice.reducer
