import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import booking from "../../api/services/booking";


export const bookFlight = createAsyncThunk(
  '/bookings',
  async (payload: object, thunkApi: any) => {
    try {
      const response = await booking.bookFlight(payload);
      return {
        data: response.data.data
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
)