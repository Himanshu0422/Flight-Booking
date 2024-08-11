import { createSlice } from "@reduxjs/toolkit";
import { isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import { getAirportId, getAllAirports } from "./airports/airportAction";
import { getFlight, getFlightsData } from "./flights/flightsAction";

interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(getAirportId, getAllAirports, getFlight, getFlightsData), (state) => {
        state.loading = true;
      })
      .addMatcher(isFulfilled(getAirportId, getAllAirports, getFlight, getFlightsData), (state) => {
        state.loading = false;
      })
      .addMatcher(isRejected(getAirportId, getAllAirports, getFlight, getFlightsData), (state) => {
        state.loading = false;
      });
  },
});

const loadingReducer = loadingSlice.reducer

export default loadingReducer;
