import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import eventDetailReducer from "./slices/detailEventSlice";

export const store = configureStore({
  reducer: { user: userReducer, eventDetail: eventDetailReducer },
});
