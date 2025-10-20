import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Location } from "@/generated/prisma"

type InitialState = {
  locations: Location[]
  offset: number
  limit: number
  searchQuery: string
  total: number
}

const initialState: InitialState = {
  locations: [],
  offset: 0,
  limit: 10,
  searchQuery: "",
  total: -1,
}

export const locationTableSlice = createSlice({
  name: "locationTableSlice",
  initialState,
  reducers: {
    setLocationsToTable: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload
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
    deleteLocationFromTable: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(
        (location) => location.uuid !== action.payload,
      )
      state.total = state.total - 1
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      state.locations = state.locations.map((location) =>
        location.uuid === action.payload.uuid ? action.payload : location,
      )
    },
    createLocation: (state, action: PayloadAction<Location>) => {
      state.locations = [...state.locations, action.payload]
      state.total = state.total + 1
    },
  },
})

export const {
  setLocationsToTable,
  deleteLocationFromTable,
  updateLocation,
  setTotalToTable,
  setSearchQueryToTable,
  setOffsetToTable,
  createLocation,
} = locationTableSlice.actions
export default locationTableSlice.reducer
