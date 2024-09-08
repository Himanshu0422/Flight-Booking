import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";
import flights from "../../api/services/flights";

export const getFlightsData = createAsyncThunk(
  "/flights",
  async (
    data: {
      departureAirportId: number;
      arrivalAirportId: number;
      date: Dayjs;
      time: string;
      type: string;
      page: number;
      minPrice?: number;
      maxPrice?: number;
    },
    thunkApi: any
  ) => {
    try {
      const { departureAirportId, arrivalAirportId, date, time, type, page, minPrice, maxPrice } =
        data;
      const response = await flights.getFlightsData({
        departureAirportId,
        arrivalAirportId,
        date,
        time,
        page,
        minPrice,
        maxPrice
      });

      return {
        data: response.data.data.flights,
        type,
        page,
        totalPages: response.data.data.pagination.totalPages,
        totalFlights: response.data.data.pagination.totalFlights
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
);

export const getFlight = createAsyncThunk(
  'flight:id',
  async (id: string, thunkApi: any) => {
    try {
      const response = await flights.getFlight(id);
      return {
        data: response.data.data
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
)

export const getReturnFlight = createAsyncThunk(
  'returnflight:id',
  async (id: string, thunkApi: any) => {
    try {
      const response = await flights.getFlight(id);
      return {
        data: response.data.data
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
)