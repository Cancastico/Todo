import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";
import { errorResponse } from "./Routes/Middlewares/Error/errorResponse";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000; // Define um valor padrão caso PORT não esteja definido

const CORS_ORIGIN = "https://todo-cancasticos-projects.vercel.app/";

app.use(express.json());

app.use(cors({ origin: CORS_ORIGIN }));

app.use(router);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof errorResponse) {
    return res.status(err.code).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
