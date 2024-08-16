import { createSlice } from "@reduxjs/toolkit";
import { isPending, isFulfilled, isRejected } from '@reduxjs/toolkit';
import { getAirportId, getAllAirports } from "./airports/airportAction";
import { getFlight, getFlightsData } from "./flights/flightsAction";
import { getUser, login, sendOtp, signUp, verifyOtp } from "./user/userAction";
import { bookFlight } from "./flights/bookingAction";

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
      .addMatcher(isPending(getAirportId, getAllAirports, getFlight, getFlightsData, login, signUp, verifyOtp, sendOtp, getUser, bookFlight), (state) => {
        state.loading = true;
      })
      .addMatcher(isFulfilled(getAirportId, getAllAirports, getFlight, getFlightsData, login, signUp, verifyOtp, sendOtp, getUser, bookFlight), (state) => {
        state.loading = false;
      })
      .addMatcher(isRejected(getAirportId, getAllAirports, getFlight, getFlightsData, login, signUp, verifyOtp, sendOtp, getUser, bookFlight), (state) => {
        state.loading = false;
      });
  },
});

const loadingReducer = loadingSlice.reducer

export default loadingReducer;
