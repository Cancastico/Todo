
import { Task } from "@/dto/task/task";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Trash2 } from 'lucide-react';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { formatDate } from "@/service/utils";

interface Props {
  tasks: Task[];
  complete: any;
  exclude: any;
}

export default function TaskTable({ tasks, complete, exclude }: Props) {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  return (
    <main className="w-full flex-wrap flex flex-row justify-center lg:justify-normal ">
      {tasks.map((task, index) => {
        return (
          <Card key={index} className="relative w-[80%] lg:ml-[4%] my-[2%] lg:w-[20%] ">
            {!task.completed &&
              <Trash2 onClick={() => { exclude(task.id) }} className="absolute left-[90%] top-[5%] hover:text-red-500 transition-transform"/>
            }

            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
              <CardDescription className="w-[90%]">{task.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <p>Created At : {formatDate(task.created_at)}</p>
              {task.completed && <p>Completed At : {formatDate(task.completed_at)}</p>}
              <p>Status : {task.completed ? 'Complete' : 'Pending'}</p>
            </CardContent>

            <CardFooter>
              {!task.completed &&
                (
                  <Popover>
                    <PopoverTrigger className="w-full" asChild>
                      <Button variant="outline">Concluir</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[100%]">
                      <h1>Concluir essa tarefa?</h1>
                      <div className="w-full flex flex-row justify-evenly items-center">
                        <Button className="w-[45%]" onClick={() => { complete(task.id) }}>Sim</Button>
                        <Button className="w-[45%]">Não</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )
              }





            </CardFooter>

          </Card>
        )
      })}
    </main>
  )
}
