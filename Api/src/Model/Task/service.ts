import { Task } from "../../../prisma/database/main";
import connection from "../../prisma";
import { errorResponse } from "../../Routes/Middlewares/Error/errorResponse";

export class taskService {
  async create(task: Pick<Task, "title" | "description">): Promise<Task> {
    try {
      const created: Task = await connection.task.create({ data: task });
      return created;
      
    } catch (error: any) {
      console.log(error);
      throw new errorResponse(500, "Internal Server Error");
    }
  }
  async read(id: string): Promise<Task> {
    try {
      const finded: Task = await connection.task.findUniqueOrThrow({
        where: { id },
      });
      return finded;
    } catch (error: any) {
      throw new errorResponse(404, "Task Not Found");
    }
  }
  async readAll(): Promise<Task[]> {
    try {
      const findedAll: Task[] = await connection.task.findMany({orderBy:{created_at:'desc'}});
      return findedAll;
    } catch (error: any) {
      throw new errorResponse(500, "Internal Server Error");
    }
  }
  async update(task: Partial<Omit<Task, "id">> & Pick<Task, "id">) {
    try {

      const updated = await connection.task.update({
        where: { id: task.id },
        data: { ...task },
      });
      return updated;

    } catch (error: any) {
      throw new errorResponse(500,"Internal Server Error");
    }
  }
  async delete(id:string) {
    try {
      const deleted = await connection.task.delete({ where: { id } });
      return deleted;
    } catch (error: any) {
      throw new errorResponse(500, "Internal Server Error");
    }
  }
}
