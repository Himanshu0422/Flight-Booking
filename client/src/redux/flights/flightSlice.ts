import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFlightsData } from "./flightsAction";

interface Airplane {
  modelNumber: string;
  capacity: number;
}

interface Airport {
  name: string;
  city: string;
}

export interface Flight {
  id: number;
  flightNumber: string;
  flight: Airplane;
  arrivalAirport: Airport;
  arrivalTime: string;
  departureAirport: Airport;
  departureTime: string;
  price: number;
  nextDay: number;
  flightTime: string;
}


interface FlightState {
  departureFlight: Flight[] | null;
  returnFlight: Flight[] | null;
}

const initialState: FlightState = {
  departureFlight: null,
  returnFlight: null,
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setDepartureFlight: (state, action: PayloadAction<Flight[] | null>) => {
      state.departureFlight = action.payload;
    },
    resetDepartureFlightState: (state) => {
      state.departureFlight = null;
    },
    setReturnFlight: (state, action: PayloadAction<Flight[] | null>) => {
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
