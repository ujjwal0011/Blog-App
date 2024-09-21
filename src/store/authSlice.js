import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    }
  },
});

export const isLoggedIn = (state) => state.auth.status;
// Exporting the actions
export const { login, logout } = authSlice.actions;

// Exporting the reducer as default
export default authSlice.reducer;
