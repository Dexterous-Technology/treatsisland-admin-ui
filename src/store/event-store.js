import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  selectedOrgId: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setSelectedOrgId: (state, action) => {
      state.selectedOrgId = action.payload;
    },
    clearEvents: (state) => {
      state = { ...initialState };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEvents, setSelectedOrgId, clearEvents } = eventSlice.actions;

export default eventSlice.reducer;
