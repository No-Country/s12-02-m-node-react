import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  comments: [],
};

export const eventDetailSlice = createSlice({
  name: "eventDetail",
  initialState,
  reducers: {
    setEventDetails: (state, action) => {
      state.data = action.payload
    },
    setEventComments: (state, action) => {
      state.comments = action.payload
    }
  },
});

export const { setEventDetails } = eventDetailSlice.actions;
export default eventDetailSlice.reducer;
