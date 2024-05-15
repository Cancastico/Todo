'use client'
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import CreateTaskForm from "../forms/createTask";
import { useEffect, useState } from "react";

interface Props{
  onClose:()=>void;
}
export default function Nav({onClose}:Props) {
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

    useEffect(()=>{
      if(isOpenForm === false){
        onClose()
      }
    },[isOpenForm])
    return (
        <div className="w-full flex flex-row justify-between p-[2rem]">
            <h1 className="font-bold text-2xl">Task Manager</h1>
            <Dialog
            open={isOpenForm}
            onOpenChange={(e)=>{setIsOpenForm(e)}}
            >
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
                        onSubmit={()=>{setIsOpenForm(false)}}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}