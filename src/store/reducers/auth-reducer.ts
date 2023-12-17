import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { AuthState, IUser } from "../../types/Auth";
import { RootState } from "../store";


const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  emailFor2Factor: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state = initialState;
      return state;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      return state;
    },
    setEmailFor2Factor(state, action: PayloadAction<string>) {
      state.emailFor2Factor = action.payload;
      return state;
    },
  },
});

export default authSlice.reducer;
export const { logout, setUser, setEmailFor2Factor } = authSlice.actions;
export const selectAuthentication = (state: RootState) => state.auth; // use this const in useSelecter in the componnent to select this slice
