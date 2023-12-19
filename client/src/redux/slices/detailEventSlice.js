import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  comments: [],
  bookings: [],
  host: {},
};

export const eventDetailSlice = createSlice({
  name: "eventDetail",
  initialState,
  reducers: {
    setEventDetails: (state, action) => {
      state.data = action.payload;
    },
    setEventComments: (state, action) => {
      state.comments = action.payload;
    },
    setEventBookings: (state, action) => {
      state.bookings = action.payload;
    },
    setEventHost: (state, action) => {
      state.host = action.payload;
    },
  },
});

export const {
  setEventDetails,
  setEventComments,
  setEventBookings,
  setEventHost,
} = eventDetailSlice.actions;
export default eventDetailSlice.reducer;
