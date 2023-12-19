import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isLogged: false,
  bookings: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = true
      state.data = action.payload;
    },
    logout: (state) => {
      state.isLogged = false
      state.data = {}
    },
    setUserBookings: (state, action) => {
      state.bookings = action.payload
    }
  },
});

export const getUser = (state) => state.data;

export const {
  login,
  logout,
  setUserBookings
} = userSlice.actions;

export default userSlice.reducer;
