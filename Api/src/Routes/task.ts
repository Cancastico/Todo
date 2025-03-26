import { Router } from "express";
import { taskController } from "../Controller/Task/controller";
import { erroMiddleware } from "./Middlewares/Error/middleware";

const taskRouter = Router();
const controller = new taskController();
const errroMiddleware = new erroMiddleware()

taskRouter.get("/", errroMiddleware.handleAsync(controller.findAll));

taskRouter.get("/:id", errroMiddleware.handleAsync(controller.find));

taskRouter.post("/", errroMiddleware.handleAsync(controller.create));

taskRouter.put("/:id", errroMiddleware.handleAsync(controller.update));

taskRouter.patch("/:id", errroMiddleware.handleAsync(controller.complete));

taskRouter.delete("/:id", errroMiddleware.handleAsync(controller.exclude));

export default taskRouter;
