import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orgs: [],
  selectedOrg: null,
};

export const orgSlice = createSlice({
  name: "org",
  initialState,
  reducers: {
    setOrgs: (state, action) => {
      state.orgs = action.payload;
    },
    setSelectedOrg: (state, action) => {
      state.selectedOrg = action.payload;
    },
    clearOrgs: (state) => {
      state = { ...initialState };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOrgs, setSelectedOrg, clearOrgs } = orgSlice.actions;

export default orgSlice.reducer;
