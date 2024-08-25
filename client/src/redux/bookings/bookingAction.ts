import { createAsyncThunk } from "@reduxjs/toolkit";
import booking from "../../api/services/booking";


export const bookings = createAsyncThunk(
  '/bookingsHistory',
  async (payload: object, thunkApi: any) => {
    const response = await booking.bookings(payload);
    return response.data.data
  }
)

export const getBookingById = createAsyncThunk(
  '/getBookingById',
  async (payload: object , thunkApi: any) => {
    const response = await booking.getBookingById(payload);
    return response.data.data
  }
)