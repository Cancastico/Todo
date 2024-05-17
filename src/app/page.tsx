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
import Loading from "@/components/loading/loading";
import { set } from "react-hook-form";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [pendingOpen, setPendingOpen] = useState<boolean>(true);
  const [isLoading,setIsLoading] = useState<boolean>(true);

// Utilize async/await de forma consistente para melhor legibilidade
async function getTasks() {
  try {
    setIsLoading(true);
    const response = await AxiosNode.get<Task[]>('/task');
    setTasks(response.data);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
  } finally {
    setIsLoading(false);
  }
}

// Simplifique as funções para reutilizar getTasks e reduzir repetição
async function completeTask(id: string) {
  await updateTaskStatus(id, 'complete');
}

async function deleteTask(id: string) {
  await updateTaskStatus(id, 'delete');
}

// Crie uma função genérica para lidar com atualizações e deleções
async function updateTaskStatus(id: string, action: 'complete' | 'delete') {
  try {
    setIsLoading(true);
    if (action === 'complete') {
      await AxiosNode.patch<boolean>(`/task/${id}`);
    } else if (action === 'delete') {
      await AxiosNode.delete<boolean>(`/task/${id}`);
    }
    await getTasks();
  } catch (error) {
    console.error(`Erro ao ${action === 'complete' ? 'completar' : 'deletar'} tarefa:`, error);
  } finally {
    setIsLoading(false);
  }
}

// Mantenha a consistência no tratamento de erros
async function createTask(data: taskCreate) {
  try {
    setIsLoading(true);
    await AxiosNode.post<Task>('/task', data);
    await getTasks();
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
  } finally {
    setIsLoading(false);
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
    <div className="flex flex-col justify-between h-full">
      <main className="bg-background">
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
            <DialogContent className="max-w-[85%] lg:w-[40%] outline-none ring-1 ring-ring rounded-md">
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

        {!isLoading ? (
        <Tabs defaultValue="Pending" activationMode="manual" className="w-full flex flex-col justify-center items-center">
          <TabsList className="grid grid-cols-2 w-[80%] lg:max-w-[350px]">
            <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-background data-[state=active]:shadow" data-state={pendingOpen ? "active" : "inactive"} onClick={() => { setPendingOpen(true) }} value="Pending" >Pending</TabsTrigger>
            <TabsTrigger className="data-[state=active]:bg-primary data-[state=active]:text-background data-[state=active]:shadow" data-state={!pendingOpen ? "active" : "inactive"} onClick={() => { setPendingOpen(false) }} value="Completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent className="w-full" value="Pending">
            <TaskTable
              complete={completeTask}
              exclude={deleteTask}
              tasks={tasks.filter((task) => { return task.completed === false })}
            />
          </TabsContent>
          <TabsContent className="w-full" value="Completed">
            <TaskTable
              complete={completeTask}
              exclude={deleteTask}
              tasks={tasks.filter((task) => { return task.completed === true })}
            />
          </TabsContent>
        </Tabs>):<Loading label="Carregando..."/>}


      </main>
      <footer className="fixed bottom-0 bg-primary w-full flex justify-end">
        <span className="bg-primary mr-[3rem] px-[2rem] hover:bg-green-600 transition-colors font-light"><a href="https://github.com/Cancastico" target="_blank">By Cancastico</a></span>
      </footer>
    </div>
  );
}
