import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { UserDTO } from "@/types/dto/user"

type InitialState = {
  modalOpen: boolean
  currentUser: null | UserDTO
}

const initialState: InitialState = {
  modalOpen: false,
  currentUser: null,
}

export const editUserAdminModalSlice = createSlice({
  name: "editUserAdminModalSlice",
  initialState,
  reducers: {
    setEditUserAdminModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalOpen = action.payload
    },
    setEditUserAdminCurrent: (state, action: PayloadAction<UserDTO | null>) => {
      state.currentUser = action.payload
    },
  },
})

export const { setEditUserAdminModalOpen, setEditUserAdminCurrent } =
  editUserAdminModalSlice.actions
export default editUserAdminModalSlice.reducer
