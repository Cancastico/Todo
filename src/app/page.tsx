'use client'
import TaskTable from "@/components/taskTable/taskTable";
import { useEffect, useState } from "react";
import { Task } from "@/dto/task/task";
import { AxiosNode } from "@/service/axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateTaskForm, { taskCreate } from "@/components/forms/createTask";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  function getTasks() {
    AxiosNode.get<Task[]>('/task').then((response) => {
      setTasks(response.data);
    })
  }
  async function completeTask(id: string) {
    await AxiosNode.patch<boolean>(`/task/${id}`).then(() => {
      getTasks();
    })
  }
  async function DeleteTask(id: string) {
    await AxiosNode.delete<boolean>(`/task/${id}`).then(() => {
      getTasks();
    });
  }
  async function createTask(data: taskCreate) {
    try {
      await AxiosNode.post<Task>('/task', data).then((response) => {
        getTasks();
      })
    } catch (error: any) {
      console.log('deu ruim', error.message)
    }
  }

  //Pega Tasks
  useEffect(() => {
    getTasks()
  }, [])

  //Atualiza Tasks
  useEffect(() => {
    if (isOpenForm === false) {
      getTasks()
    }
  }, [isOpenForm])


  return (
    <main>
      <div className="w-full flex flex-row justify-between px-[4rem] py-[2rem]">
        <h1 className="font-bold text-2xl">Task Manager</h1>

        {/* CreateTask Button */}
        <Dialog open={isOpenForm} onOpenChange={(e) => { setIsOpenForm(e) }}>
          <DialogTrigger asChild>
            <Button variant="outline">New Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
              <DialogDescription>
                Create your New Task
              </DialogDescription>
            </DialogHeader>
            <CreateTaskForm
              onSubmit={(e) => { createTask(e), setIsOpenForm(false) }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <TaskTable
        complete={completeTask}
        exclude={DeleteTask}
        tasks={tasks}
      />
    </main>
  );
}
