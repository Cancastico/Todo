import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import { errorResponse } from "./errorResponse";

export class erroMiddleware {
  public handle = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof errorResponse)
      return res.status(err.code).json({ message: err.message });

    return res.status(500).json({ erro: "Internal Server Error" });
  };
  public handleAsync =
    (fn: RequestHandler) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await Promise.resolve(fn(req, res, next));
        next();
      } catch (err) {
        return next(err);
      }
    };
}
