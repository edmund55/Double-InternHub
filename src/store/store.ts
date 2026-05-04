import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import hubReducer from "./hubSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hub: hubReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
