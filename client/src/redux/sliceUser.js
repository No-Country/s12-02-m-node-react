import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  names: "",
  lastname: "",
  birthDate: "",
  email: "",
  country: "",
  rol: "",
  location: "",
};

export const userHandler = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNames: (state, action) => {
      state.names = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setRol: (state, action) => {
      state.rol = action.payload;
    },
    setLocation: (state,action) => {
      state.location = action.payload;
    }
  },
});

export const getNames = (state) => state.user.names;
export const getLastname = (state) => state.user.lastname;
export const getBirthDate = (state) => state.user.birthDate;
export const getEmail = (state) => state.user.email;
export const getCountry = (state) => state.user.country;
export const getRol = (state) => state.user.rol;

export const {
  setNames,
  setLastname,
  setBirthDate,
  setEmail,
  setCountry,
  setRol,
  setLocation,
} = userHandler.actions;

export default userHandler.reducer;
