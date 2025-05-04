interface Task {
    _id?: string;
    tripId?: string;
    name: string;
    status: 'done' | 'inProgress';
    date: Date;
}

export default Task;