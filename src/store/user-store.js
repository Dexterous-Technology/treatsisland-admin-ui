import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearUser: (state) => {
      state.token = "";
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, clearUser } = userSlice.actions;

export default userSlice.reducer;
