import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },

    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
