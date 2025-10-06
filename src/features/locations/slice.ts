import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Location } from "@/generated/prisma"

type InitialState = {
  locations: Location[]
  brothers: Location | null
  currentLocation: Location | null
}

const initialState: InitialState = {
  locations: [],
  brothers: null,
  currentLocation: null,
}

export const locationsSlice = createSlice({
  name: "locationsSlice",
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<Location | null>) => {
      state.currentLocation = action.payload
    },
  },
})

export const { setCurrentLocation } = locationsSlice.actions
export default locationsSlice.reducer
