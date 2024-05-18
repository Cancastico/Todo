import axios from "axios";

console.log(process.env.NODE_ENV)
const baseURL = process.env.NODE_ENV === "production" ? 'https://todo-api-green.vercel.app/production' : 'http://localhost:8000/production'

export const AxiosNode = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
