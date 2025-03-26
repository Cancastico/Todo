'use client'
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

interface Props {
  onSubmit: (data: taskCreate) => void;
}
//Zod Form
const taskSchema = z.object({
  title: z.string().min(3, 'Title is required').max(36,'Tamanhoa Maximo do Titulo é 36 caracteres'),
  description: z.string().min(3, 'Description is required'),
})

export type taskCreate = z.infer<typeof taskSchema>;

export default function CreateTaskForm({ onSubmit }: Props) {

  const { register, handleSubmit, formState: { errors } } = useForm<taskCreate>({ resolver: zodResolver(taskSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-[95%] ">
      <div className="flex flex-col gap-1">
        <Label>Title</Label>
        <Input
          {...register('title')}
          placeholder="Title"
          className="text-white"
        ></Input>
        {errors.title && (
          <span className="text-red-300">
            {errors.title.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 h-[30vh]">
        <Label>Description</Label>
        <Textarea
          {...register('description')}
          className="h-full text-white"
          placeholder="Description"
        ></Textarea>
        {errors.description && (
          <span className="text-red-300">
            {errors.description.message}
          </span>
        )}
      </div>
      <DialogFooter>
        <Button type="submit">Create Task</Button>
      </DialogFooter>
    </form>
  )
}
