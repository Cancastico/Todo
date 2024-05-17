import axios from "axios";

export const AxiosNode = axios.create({
  baseURL: 'https://todo-api-green.vercel.app/production',
  headers: {
    "Content-Type": "application/json",
  },
});
