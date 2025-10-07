import { combineReducers, configureStore } from "@reduxjs/toolkit"
import signInReducer from "@/components/SignInModal/slice"
import signUpReducer from "@/components/SignUpModal/slice"
import userReducer from "@/features/user/slice"
import userApi from "@/api/user"
import locationsReducer from "@/features/locations/slice"

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
