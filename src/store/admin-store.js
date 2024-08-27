import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  sortedProducts: [],
  events: [],
  isLoaderActive: false,
  productSotringOptions: {
    sortBy: "Product",
    sortOrder: "asc",
  },
  eventSortingOptions: {
    sortBy: "EventID",
    sortOrder: "desc",
  },
  eventsPagination: {
    currentPage: 1,
    totalEvents: 0,
    pageSize: 10,
  },
  selectedEvent: null,
  selectedPopUp: null,
  selectedOrder: null,
  isPopupStoreModalVisible: false,
};

export const adminStoreSlice = createSlice({
  name: "adminStore",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSortedProducts: (state, action) => {
      state.sortedProducts = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setProductSortingOptions: (state, action) => {
      state.productSotringOptions = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    setEventSortingOptions: (state, action) => {
      state.eventSortingOptions = action.payload;
    },
    setSelectedPopUp: (state, action) => {
      state.selectedPopUp = action.payload;
    },
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    toggleAdminLoader: (state, action) => {
      state.isLoaderActive = action.payload;
    },
    togglePopupStoreModal: (state, action) => {
      state.isPopupStoreModalVisible = action.payload;
    },
    setEventsPagination: (state, action) => {
      state.eventsPagination = action.payload;
    },
    clearAdminStore: (state) => {
      state = { ...initialState };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProducts,
  setSortedProducts,
  setEvents,
  clearAdminStore,
  toggleAdminLoader,
  setProductSortingOptions,
  setSelectedEvent,
  setEventSortingOptions,
  setSelectedPopUp,
  togglePopupStoreModal,
  setSelectedOrder,
  setEventsPagination,
} = adminStoreSlice.actions;

export default adminStoreSlice.reducer;
