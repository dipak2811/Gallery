import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

export const ImageReducerSlice = createSlice({
  name: "Images",
  initialState,
  reducers: { 
    addImage: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const { addImage } = ImageReducerSlice.actions;

export default ImageReducerSlice.reducer;
