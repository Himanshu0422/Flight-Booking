import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setLoading } from "../loadingSlice";
import { getFlightsData } from "./flightsAction";

interface FlightState {
  departureFlight: string | null;
  returnFlight: string | null;
}

const initialState: FlightState = {
  departureFlight: null,
  returnFlight: null,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setDepartureFlight: (state, action: PayloadAction<string | null>) => {
      state.departureFlight = action.payload;
    },
    resetDepartureFlightState: (state) => {
      state.departureFlight = null;
    },
    setReturnFlight: (state, action: PayloadAction<string | null>) => {
      state.returnFlight = action.payload;
    },
    resetReturnFlightState: (state) => {
      state.returnFlight = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFlightsData.fulfilled, (state, action) => {
      if (action.payload.type === "Departure") {
        state.departureFlight = action.payload.data;
      } else if (action.payload.type === "Return") {
        state.returnFlight = action.payload.data;
      }
    });
    builder.addCase(getFlightsData.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});

export const {
  setDepartureFlight,
  resetDepartureFlightState,
  setReturnFlight,
  resetReturnFlightState,
} = flightSlice.actions;

export default flightSlice.reducer;
