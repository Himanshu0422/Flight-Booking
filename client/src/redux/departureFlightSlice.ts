import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DepartureFlightState {
  departureFlight: string | null;  // Adjust the type as necessary
}

const initialState: DepartureFlightState = {
  departureFlight: null
};

const departureFlightSlice = createSlice({
  name: 'departureflight',
  initialState,
  reducers: {
    setDepartureFlight: (state, action: PayloadAction<string | null>) => {
      state.departureFlight = action.payload;
    },
    resetDepartureFlightState: (state) => {
      state.departureFlight = null;
    }
  }
});

export const {
  setDepartureFlight,
  resetDepartureFlightState
} = departureFlightSlice.actions;

export default departureFlightSlice.reducer;
