import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import eventDetailReducer from "./slices/detailEventSlice";
import locations from "./slices/locationsSlice";

export const store = configureStore({
  reducer: { user: userReducer, eventDetail: eventDetailReducer, locations: locations },
});
