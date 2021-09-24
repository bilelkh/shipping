import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  loading: false,
  hasErrors: false,
  countries: [],
  selectedCountries: []
};

// A slice for countries with our three reducers
const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    getCountries: (state) => {
      state.loading = true;
    },
    getCountriesSuccess: (state, { payload }) => {
      state.countries = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    setSelectedCountries: (state, { payload }) => {
      
      state.selectedCountries = payload;
    },
    getCountriesFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

// Three actions generated from the slice
export const {
  getCountries,
  getCountriesSuccess,
  getCountriesFailure,
  setSelectedCountries
} = countriesSlice.actions;

// A selector
export const countriesSelector = (state) => state.countries;
export const selectedCountriesSelector = (state) => state.selectedCountries;

// The reducer
export default countriesSlice.reducer;

// Asynchronous thunk action
export function fetchCountries(currentLanguage) {
  return async (dispatch) => {
    // dispatch(getCountries());
    axios
      .get(`http://localhost:5000/${currentLanguage}`)
      .then(function (response) {
        // handle success
        console.log(response);
        dispatch(getCountriesSuccess(response.data));
      })
      .catch(function (error) {
        // handle error
        dispatch(getCountriesFailure());
      });
  };
}

export function setSelectedCountriesAction(data) {
  return (dispatch) => dispatch(setSelectedCountries(data));
}
