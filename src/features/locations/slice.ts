import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LocationWithNews } from "@/types/dto/location-with-news"
import { NewsDTO } from "@/types/dto/news"

type InitialState = {
  locations: LocationWithNews[]
  brothers: LocationWithNews | null
  currentLocation: LocationWithNews | null
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
    setCurrentLocation: (
      state,
      action: PayloadAction<LocationWithNews | null>,
    ) => {
      state.currentLocation = action.payload
    },
    updateLocationWithNews: (
      state,
      action: PayloadAction<LocationWithNews | null>,
    ) => {
      state.locations = state.locations.map((location) =>
        location.uuid === action.payload?.uuid ? action.payload : location,
      )

      if (state.currentLocation?.uuid === action.payload?.uuid) {
        state.currentLocation = action.payload
      }
    },
    addNewsToLocation: (state, action: PayloadAction<NewsDTO[]>) => {
      state.locations = state.locations.map((location) =>
        location.uuid === state.currentLocation?.uuid
          ? { ...location, news: action.payload }
          : location,
      )

      if (state.currentLocation) {
        state.currentLocation.news = action.payload
      }
    },
    loadMoreNewsToLocation: (state, action: PayloadAction<NewsDTO[]>) => {
      if (!state.currentLocation) return

      const existingIds = new Set(
        state.currentLocation.news.map((item) => item.uuid),
      )
      const uniqueNewNews = action.payload.filter(
        (item) => !existingIds.has(item.uuid),
      )

      state.locations = state.locations.map((location) =>
        location.uuid === state.currentLocation?.uuid
          ? { ...location, news: [...location.news, ...uniqueNewNews] }
          : location,
      )

      state.currentLocation.news = [
        ...state.currentLocation.news,
        ...uniqueNewNews,
      ]
    },
  },
})

export const {
  setCurrentLocation,
  updateLocationWithNews,
  addNewsToLocation,
  loadMoreNewsToLocation,
} = locationsSlice.actions
export default locationsSlice.reducer
