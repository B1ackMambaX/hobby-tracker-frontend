import {VStack, Checkbox} from "@chakra-ui/react";
import styles from "./checkList.module.scss";
import AddTaskModal from "@/components/addTaskModal/AddTaskModal.tsx";
import {useGetTasksQuery, useUpdateTaskMutation} from "@/api/taskApi.ts";
import {useParams} from "react-router";
import Spinner from "@/components/ui/spinner/Spinner.tsx";

const CheckList = () => {
    const {id} = useParams();
    const {data: tasks, isFetching} = useGetTasksQuery(id!);
    const [updateTask] = useUpdateTaskMutation();

    const processTasks = () => {
        return tasks && tasks.length === 0 ? <p>Пока что нет задач</p> : tasks!.map((task) => {
            const checked = task.status === "done";
            return (<Checkbox.Root
                checked={checked}
                key={task._id}
                colorPalette={"teal"}
                className={styles.task}
                onChange={(e) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const status = e.target.checked ? 'done' : 'inProgress';
                    updateTask({...task, status});
                }}
            >
                <Checkbox.HiddenInput/>
                <Checkbox.Control width={'1.5rem'} height={"1.5rem"}/>
                <Checkbox.Label>
                    <p className={styles.label}>{task.name}</p>
                    {task.date && <time className={styles.date}>{new Date(task.date).toLocaleDateString()}</time>}
                </Checkbox.Label>
            </Checkbox.Root>)
        });
    }

    return <VStack align={'start'} gap={"1rem"} className={styles.list}>
        {isFetching ? <Spinner/> : <>{processTasks()}<AddTaskModal/></>}
    </VStack>
}

export default CheckList;