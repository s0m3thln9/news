import { combineReducers, configureStore } from "@reduxjs/toolkit"
import signInReducer from "@/components/SignInModal/slice"
import signUpReducer from "@/components/SignUpModal/slice"
import userReducer from "@/features/user/slice"
import userApi from "@/api/user"

const rootReducer = {
  signInSlice: signInReducer,
  signUpSlice: signUpReducer,
  userSlice: userReducer,
  [userApi.reducerPath]: userApi.reducer,
}

const mainReducer = combineReducers(rootReducer)

export type RootState = ReturnType<typeof mainReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userApi.middleware),
    preloadedState,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
