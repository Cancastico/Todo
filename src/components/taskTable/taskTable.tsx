
import { Task } from "@/dto/task/task";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
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
          <Card key={index} className="relative w-[80%] h-[18rem] outline-primary flex flex-col justify-between shadow-primary-foreground shadow-2xl  lg:ml-[4%] my-[2%] lg:w-[20%] ">
            {!task.completed &&
              <Trash2 onClick={() => { exclude(task.id) }} className="absolute right-[1.6rem] top-[1.4rem] hover:text-red-500 transition-transform"/>
            }

            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="w-[90%] truncate" >{task.title}</CardTitle>
              <CardDescription className="w-[90%] h-[7rem] lg:h-[6rem] truncate text-wrap">{task.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm">Created At : {formatDate(task.created_at)}</p>
              {task.completed && <p className="text-sm" >Completed At : {formatDate(task.completed_at)}</p>}
            </CardContent>

            <CardFooter>
              {!task.completed &&
                (
                  <Popover>
                    <PopoverTrigger className="w-full" asChild>
                      <Button >Conclude</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[100%]">
                      <h1>Complete this Task?</h1>
                      <div className="w-full flex flex-row justify-evenly items-center">
                        <Button className="w-[45%]" onClick={() => { complete(task.id) }}>Yes</Button>
                        <Button className="w-[45%]">No</Button>
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
