import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import ImageReducerSlice from "./Slices/ImageReducerSlice";
import AlbumReducerSlice from "./Slices/AlbumReducerSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  ImageStore: ImageReducerSlice,
  AlbumStore: AlbumReducerSlice,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
});

export const persistStoreForData = persistStore(store);
