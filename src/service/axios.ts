import axios from "axios";
// const baseURL = 'https://todo-api-green.vercel.app/production';
const baseURL = 'http://localhost:8000/production';
export const AxiosNode = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
