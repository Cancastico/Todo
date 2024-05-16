import axios from "axios";

export const AxiosNode = axios.create({
  baseURL: process.env.NODE_ENV,
  headers: {
    "Content-Type": "application/json",
  },
});
