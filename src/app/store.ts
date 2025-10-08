import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "@/features/user/slice"
import userApi from "@/api/user"
import locationsReducer from "@/features/locations/slice"
import signInReducer from "@/components/sign-in-modal/slice"
import signUpReducer from "@/components/sign-up-modal/slice"

const rootReducer = {
  signInSlice: signInReducer,
  signUpSlice: signUpReducer,
  userSlice: userReducer,
  locationsSlice: locationsReducer,
  [userApi.reducerPath]: userApi.reducer,
}

const mainReducer = combineReducers(rootReducer)

export type RootState = ReturnType<typeof mainReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(userApi.middleware),
    preloadedState,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
