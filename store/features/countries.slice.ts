import { createSlice } from "@reduxjs/toolkit";

type initialState = { countries: any[]; countryFilter: string };

const initialState = { countries: [], countryFilter: "" } as initialState;

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    changeCountries: (state, action) => {
      state.countries = action.payload;
    },
    countryFilter: (state, action) => {
      state.countryFilter = action.payload;
    },
  },
});

export const { changeCountries, countryFilter } = countriesSlice.actions;
export default countriesSlice.reducer;
