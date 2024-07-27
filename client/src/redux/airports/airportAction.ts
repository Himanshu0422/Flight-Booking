import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import flights from "../../api/services/flights";

export const getAirportId = createAsyncThunk(
  "/airports",
  async (
    data: { city: string },
    thunkApi: any
  ) => {
    try {
      const response = await flights.getAirportData(data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
);
