import { configureStore } from "@reduxjs/toolkit";
import userHandler from "./sliceUser";

export const store = configureStore({
  reducer: { user: userHandler },
});
