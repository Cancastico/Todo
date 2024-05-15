'use client'
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Nav() {
    const taskSchema = z.object({
        title: z.string().min(3, 'Title is required'),
        description: z.string().min(3, 'Description is required'),
    })

    type taskCreate = z.infer<typeof taskSchema>;

    const { register,handleSubmit, formState: { errors } } = useForm<taskCreate>({ resolver: zodResolver(taskSchema) });
    return (
        <div className="w-full flex flex-row justify-between p-[2rem]">
            <h1 className="font-bold text-2xl">Task Manager</h1>
            <Dialog>
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
                    <form onSubmit={handleSubmit((data) => console.log(data))} className="flex flex-col gap-3">
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
                </DialogContent>
            </Dialog>
        </div>
    );
}