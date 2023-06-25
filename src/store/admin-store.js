import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  events: [],
  isLoaderActive: false,
};

export const adminStoreSlice = createSlice({
  name: "adminStore",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    toggleAdminLoader: (state, action) => {
      state.isLoaderActive = action.payload;
    },
    clearAdminStore: (state) => {
      state = { ...initialState };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts, setEvents, clearAdminStore, toggleAdminLoader } =
  adminStoreSlice.actions;

export default adminStoreSlice.reducer;
