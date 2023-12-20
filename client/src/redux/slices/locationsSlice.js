import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  setLocations,
} = locationsSlice.actions;

export default locationsSlice.reducer;
