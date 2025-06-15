import Task from "@/types/models/Task.ts";

interface Remainder {
    _id: string
    message: string
    taskId: Task;
    status: 'pending' | 'done' | 'postponed';
    remindAt: Date;
    postponedUntil?: Date;
}

export default Remainder;