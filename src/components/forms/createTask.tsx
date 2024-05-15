'use client'
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { AxiosNode } from '../../service/axios';
import { Task } from "@/dto/task/task";

interface Props{
    onSubmit:()=>void;
}

export default function CreateTaskForm({onSubmit}:Props) {

    const toast = useToast()

    const taskSchema = z.object({
        title: z.string().min(3, 'Title is required'),
        description: z.string().min(3, 'Description is required'),
    })

    type taskCreate = z.infer<typeof taskSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<taskCreate>({ resolver: zodResolver(taskSchema) });

    async function createTask(data: taskCreate) {
        try {
            await AxiosNode.post<Task>('/task', data).then((response)=>{
                console.log(response.data);
                onSubmit();
            })
        } catch (error: any) {
            console.log('deu ruim', error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(createTask)} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
                <Label>Title</Label>
                <Input
                    {...register('title')}
                    placeholder="Title"
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
                    className="h-full"
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