import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import user from "../../api/services/user";
import Cookies from 'js-cookie';

export const signUp = createAsyncThunk(
  '/signup',
  async (payload: object, thunkApi: any) => {
    try {
      const response = await user.signUp(payload);
      return {
        id: response.data.data.id,
        name: response.data.data.name,
        email: response.data.data.email,
        phone: response.data.data.phone,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
)

export const login = createAsyncThunk(
  '/login',
  async (payload: object, thunkApi: any) => {
    try {
      const response = await user.login(payload);
      const { token } = response.data.data;
      Cookies.set('token', token, { expires: 7 });
      return {
        id: response.data.data.user.id,
        name: response.data.data.user.name,
        email: response.data.data.user.email,
        phone: response.data.data.user.phone,
        token
      };
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.otpVerified === false) {
        return thunkApi.rejectWithValue({ ...error, otpVerified: false });
      }
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
)

export const sendOtp = createAsyncThunk(
  '/send-otp',
  async (payload: object, thunkApi: any) => {
    try {
      const response = await user.sendOtp(payload);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
)

export const verifyOtp = createAsyncThunk(
  '/verify-otp',
  async (payload: object, thunkApi: any) => {
    try {
      const response = await user.verifyOtp(payload);
      const { token } = response.data.data;
      return {
        id: response.data.data.user.id,
        name: response.data.data.user.name,
        email: response.data.data.user.email,
        phone: response.data.data.user.phone,
        token
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
)

export const getUser = createAsyncThunk(
  '/user',
  async (token: string, thunkApi: any) => {
    try {
      const response = await user.getUser(token);
      return {
        id: response.data.data.user.id,
        name: response.data.data.user.name,
        email: response.data.data.user.email,
        phone: response.data.data.user.phone,
        token
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
)

export const updateUser = createAsyncThunk(
  '/update-user',
  async (payload: object, thunkApi: any) => {
    try {
      const response = await user.updateUser(payload);
      console.log(response,'res')
      return {
        id: response.data.data.id,
        name: response.data.data.name,
        email: response.data.data.email,
        phone: response.data.data.phone,
        token: response.data.data.token
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error as SerializedError);
    }
  }
)