import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: [],
  selectedPopupStore: null,
  currentStep: "product-review", // ["product-review", "address-form", "final-checkout"]
  isCartExpanded: false,
  userDetails: {
    name: "",
    email: "",
    address: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    deliveryCost: "",
  },
  stripeKey: '',
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: Object.assign({}, initialState),
  reducers: {
    updateProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    setSelectedPopupStore: (state, action) => {
      state.selectedPopupStore = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setCartCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setCartExpandedState: (state, action) => {
      state.isCartExpanded = action.payload;
    },
    setStripeKey: (state, action) => {
      state.stripeKey = action.payload;
    },
    clearCart: (state) => {
      console.log('initialState', initialState)
      state = Object.assign({}, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateProducts,
  setSelectedPopupStore,
  setUserDetails,
  setCartCurrentStep,
  setCartExpandedState,
  clearCart,
  setStripeKey
} = cartSlice.actions;

export default cartSlice.reducer;
