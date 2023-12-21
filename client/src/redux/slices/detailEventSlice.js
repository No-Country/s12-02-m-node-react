import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  comments: [],
  bookings: [],
  host: {},
  isFull: false
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
    setIsFull: (state, action) => {
      state.isFull = action.payload;
    },
    clearState: ( state ) => {
      state.isFull = false;
      state.host = {};
      state.comments = [];
      state.bookings = [];
      state.data = {};
    }
  },
});

export const {
  setEventDetails,
  setEventComments,
  setEventBookings,
  setEventHost,
  setIsFull,
  clearState
} = eventDetailSlice.actions;
export default eventDetailSlice.reducer;
