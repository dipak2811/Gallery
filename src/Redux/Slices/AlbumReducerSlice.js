import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  albums: [],
};

export const AlbumReducerSlice = createSlice({
  name: "Albums",
  initialState,
  reducers: {
    addAllAlbums: (state, action) => {
      state.albums = action.payload;
    },
    addAlbum: (state, action) => {
      state.albums = [...state.albums,action.payload];
    },
  },
});

export const { addAllAlbums, addAlbum } = AlbumReducerSlice.actions;

export default AlbumReducerSlice.reducer;
