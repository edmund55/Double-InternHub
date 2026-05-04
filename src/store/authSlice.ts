import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { demoUsers } from "../data/seed";
import type { User } from "../types";

type AuthState = {
  currentUserId: string | null;
};

const initialState: AuthState = {
  currentUserId: demoUsers[1]?.id ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User["id"]>) => {
      state.currentUserId = action.payload;
    },
    logout: (state) => {
      state.currentUserId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
