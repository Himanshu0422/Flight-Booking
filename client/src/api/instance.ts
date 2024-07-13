import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "./api";


export const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL
})