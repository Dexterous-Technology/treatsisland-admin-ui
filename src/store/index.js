import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import userReducer from "./user-store";

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
    adminStore: adminStoreSlice.reducer,
  },
});
