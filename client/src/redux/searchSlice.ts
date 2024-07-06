import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  departureCity: string | null;
  arrivalCity: string | null;
  departureDate: string | null;  // Use appropriate date type if not string
  returnDate: string | null | undefined;     // Use appropriate date type if not string
  passenger: number | null;      // Adjust type based on actual data (e.g., object if more details)
  flightClass: string | null;    // Adjust type based on actual data (e.g., enum for classes)
}

const initialState: SearchState = {
  departureCity: null,
  arrivalCity: null,
  departureDate: null,
  returnDate: null,
  passenger: null,
  flightClass: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setDepartureCity: (state, action: PayloadAction<string | null>) => {
      state.departureCity = action.payload;
    },
    setArrivalCity: (state, action: PayloadAction<string | null>) => {
      state.arrivalCity = action.payload;
    },
    setDepartureDate: (state, action: PayloadAction<string | null>) => {
      state.departureDate = action.payload;
    },
    setReturnDate: (state, action: PayloadAction<string | null>) => {
      state.returnDate = action.payload;
    },
    setPassenger: (state, action: PayloadAction<number | null>) => {
      state.passenger = action.payload;
    },
    setFlightClass: (state, action: PayloadAction<string | null>) => {
      state.flightClass = action.payload;
    },
  },
});

export const {
  setDepartureCity,
  setArrivalCity,
  setDepartureDate,
  setReturnDate,
  setPassenger,
  setFlightClass,
} = searchSlice.actions;

export default searchSlice.reducer;
