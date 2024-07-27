import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import flights from "../../api/services/flights";

export const getFlightsData = createAsyncThunk(
  "/flights",
  async (
    data: { departureAirportId: number; arrivalAirportId: number; time: string, type:string },
    thunkApi: any
  ) => {
    try {
      const {departureAirportId, arrivalAirportId, time, type} = data;
      const response = await flights.getFlightsData({departureAirportId, arrivalAirportId, time});
      return { data: response.data.data, type };
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
);
