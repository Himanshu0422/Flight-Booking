import axios, { AxiosInstance } from "axios";
import { BASE_URL, BOOKING_BASE_URL } from "./api";


export const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL
})

export const bookingInstance: AxiosInstance = axios.create({
  baseURL: BOOKING_BASE_URL
})