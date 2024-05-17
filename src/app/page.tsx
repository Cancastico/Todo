'use client'
import TaskTable from "@/components/taskTable/taskTable";
import { useEffect, useState } from "react";
import { Task } from "@/dto/task/task";
import { AxiosNode } from "@/service/axios";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateTaskForm, { taskCreate } from "@/components/forms/createTask";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List } from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [pendingOpen, setPendingOpen] = useState<boolean>(true);

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
    <main >
      <div className="w-full flex flex-row justify-between px-[2rem] py-[2rem]">
        <div className="flex items-center justify-between px-0">
          <List />
          <h1 className="font-bold text-2xl ml-1 flex flex-nowrap ">Task <span className="text-primary">Manager</span></h1>
        </div>

        {/* CreateTask Button */}
        <Dialog open={isOpenForm} onOpenChange={(e) => { setIsOpenForm(e) }}>
          <DialogTrigger asChild>
            <Button>New Task</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[85%] outline-none ring-1 ring-ring rounded-md">
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
      <Tabs defaultValue="Pending" activationMode="manual"  className="w-full flex flex-col justify-center items-center">
        <TabsList className="grid grid-cols-2 w-[80%] lg:max-w-[350px]">
          <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-background data-[state=active]:shadow" data-state={pendingOpen?"active" : "inactive"} onClick={()=>{setPendingOpen(true)}} value="Pending" >Pending</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-background data-[state=active]:shadow" data-state={!pendingOpen?"active" : "inactive"} onClick={()=>{setPendingOpen(false)}} value="Completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="Pending">
          <TaskTable
            complete={completeTask}
            exclude={DeleteTask}
            tasks={tasks.filter((task) => { return task.completed === false })}
          />
        </TabsContent>
        <TabsContent className="w-full" value="Completed">
          <TaskTable
            complete={completeTask}
            exclude={DeleteTask}
            tasks={tasks.filter((task) => { return task.completed === true })}
          />
        </TabsContent>
      </Tabs>


    </main>
  );
}
