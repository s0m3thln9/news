import uploadApi from "@/api/upload"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "@/features/user/slice"
import userApi from "@/api/user"
import locationsReducer from "@/features/locations/slice"
import signInReducer from "@/components/sign-in-modal/slice"
import signUpReducer from "@/components/sign-up-modal/slice"
import newsApi from "@/api/news"
import searchNewsReducer from "@/features/search-news/slice"
import newsReducer from "@/features/news/slice"
import newsTableReducer from "@/components/news-table/slice"
import editNewsModalReducer from "@/components/news-table/update-news-modal/slice"
import locationTableReducer from "@/components/locations-table/slice"
import locationsApi from "@/api/locations"
import editLocationModalReducer from "@/components/locations-table/update-locations-modal/slice"
import createLocationModalReducer from "@/components/locations-table/create-locations-modal/slice"
import usersTableReducer from "@/components/users-table/slice"
import editUserAdminModalReducer from "@/components/users-table/update-user-modal/slice"

const rootReducer = {
  signInSlice: signInReducer,
  signUpSlice: signUpReducer,
  userSlice: userReducer,
  locationsSlice: locationsReducer,
  searchNewsSlice: searchNewsReducer,
  newsSlice: newsReducer,
  newsTableSlice: newsTableReducer,
  editNewsModalSlice: editNewsModalReducer,
  locationTableSlice: locationTableReducer,
  editLocationModalSlice: editLocationModalReducer,
  createLocationModalSlice: createLocationModalReducer,
  usersTableSlice: usersTableReducer,
  editUserAdminModalSlice: editUserAdminModalReducer,
  [userApi.reducerPath]: userApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  [locationsApi.reducerPath]: locationsApi.reducer,
}

const mainReducer = combineReducers(rootReducer)

export type RootState = ReturnType<typeof mainReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(userApi.middleware)
        .concat(newsApi.middleware)
        .concat(uploadApi.middleware)
        .concat(locationsApi.middleware),
    preloadedState,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
