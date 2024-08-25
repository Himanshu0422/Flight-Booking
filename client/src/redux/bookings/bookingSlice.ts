import { createSlice } from "@reduxjs/toolkit"
import { bookings } from "./bookingAction";


interface Booking {
  bookings: []
}

const initialState: Booking = {
  bookings: []
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    retsetBookings: (state, action) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(bookings.fulfilled, (state, action) => {
      state.bookings = action.payload
    });
    builder.addCase(bookings.rejected, (state, action) => {
      console.log("rejected");
    });
  }
})

export const {
  retsetBookings
} = bookingSlice.actions;

export default bookingSlice.reducer;