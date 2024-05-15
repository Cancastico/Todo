import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import CreateTaskForm from "../forms/createTask";

export default function Nav() {

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
                    <CreateTaskForm/>
                </DialogContent>
            </Dialog>
        </div>
    );
}