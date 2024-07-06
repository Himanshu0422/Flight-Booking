import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReturnFlightState {
  returnFlight: string | null;  // Adjust the type as necessary
}

const initialState: ReturnFlightState = {
  returnFlight: null
};

const returnFlightSlice = createSlice({
  name: 'returnflight',
  initialState,
  reducers: {
    setReturnFlight: (state, action: PayloadAction<string | null>) => {
      state.returnFlight = action.payload;
    },
    resetReturnFlightState: (state) => {
      state.returnFlight = null;
    }
  }
});

export const {
  setReturnFlight,
  resetReturnFlightState
} = returnFlightSlice.actions;

export default returnFlightSlice.reducer;
