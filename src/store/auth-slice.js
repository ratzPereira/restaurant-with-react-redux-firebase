import { createSlice } from "@reduxjs/toolkit";

// const gettingToken = localStorage.getItem("token");
// const initialToken = JSON.parse(gettingToken) ? JSON.parse(gettingToken) : null;
// const user = localStorage.getItem("loggedUser");

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
    },

    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    setUser(state, userName) {
      state.value = userName.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
