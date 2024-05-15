import axios from "axios";

const baseURL = "http://localhost:8000"; // AVELINO

export const AxiosNode = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
