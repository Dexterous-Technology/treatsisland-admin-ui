import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import userReducer from "./user-store";
import orgReducer from "./org-store";
import eventReducer from "./event-store";
import cartReducer from "./cart-store";

import storage from "redux-persist/lib/storage";
import { adminStoreSlice } from "./admin-store";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    org: orgReducer,
    event: eventReducer,
    cart: cartReducer,
    adminStore: adminStoreSlice.reducer,
  },
});
