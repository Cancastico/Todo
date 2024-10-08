
import { Task } from "@/dto/task/task";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Trash2 } from 'lucide-react';
import { formatDate } from "@/service/utils";

interface Props {
  tasks: Task[];
  complete: any;
  exclude: any;
}

export default function TaskTable({ tasks, complete, exclude }: Props) {

  return (
    <main className="w-full flex-wrap flex flex-row justify-center lg:justify-normal ">
      {tasks.map((task, index) => {
        return (
          <Card key={index} className="relative w-[80%] h-[18rem] outline-primary flex flex-col bg-white justify-between shadow-primary shadow-xl  lg:ml-[4%] my-[2%] lg:w-[20%] ">
            {!task.completed &&
              <Trash2 onClick={() => { exclude(task.id) }} className="absolute transition-colors duration-300 right-[1.6rem] top-[1.4rem] hover:text-red-500 " />
            }

            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="w-[90%] truncate text-black/80" >{task.title}</CardTitle>
              <CardDescription className="w-[90%] h-[7rem] lg:h-[6rem] truncate text-wrap text-black/70">{task.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-black/70">Created At : {formatDate(task.created_at)}</p>
              {task.completed && <p className="text-sm text-black/70" >Completed At : {formatDate(task.completed_at)}</p>}
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
