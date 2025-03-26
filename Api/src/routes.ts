import { Request, Response, Router } from "express";
import taskRouter from "./Routes/task";

const router = Router();

router.use("/task", taskRouter);
router.get('/', (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'Funcionando Corretamente' })
})



export { router };
