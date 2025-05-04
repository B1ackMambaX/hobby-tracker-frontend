import {
    Button,
    Dialog,
    Field,
    Input,
    Portal,
    VStack,
} from "@chakra-ui/react";
import styles from "./addTask.module.scss";
import {useEffect, useState} from "react";
import {
    validateRequiredField,
    validateStartDate,
} from "@/utils/validators.ts";
import {useAddTaskMutation} from "@/api/taskApi.ts";
import {useParams} from "react-router";

const AddTaskModal = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [nameError, setNameError] = useState("");
    const [startDateError, setStartDateError] = useState("");

    const [addTask, {isSuccess}] = useAddTaskMutation();


    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            setName("");
            setStartDate("");
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        const sdErr = validateStartDate(new Date(startDate));
        const nErr = validateRequiredField(name);

        setStartDateError(sdErr);
        setNameError(nErr);

        if (sdErr || nErr) return;
        addTask({task: {name, date: new Date(startDate), status: 'inProgress'}, tripId: id!})
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
                <Button className={styles.add}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M16.5 16.5V7.5H19.5V16.5H28.5V19.5H19.5V28.5H16.5V19.5H7.5V16.5H16.5Z"
                              fill="white"/>
                    </svg>
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner style={{display: "flex", alignItems: "center"}}>
                    <Dialog.Content className={styles.modal}>
                        <h3 className={styles.heading}>Создание задачи</h3>

                        <VStack gap="1.2rem">
                            <Field.Root invalid={!!nameError}>
                                <Field.Label>Задача</Field.Label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Введите имя задачи"
                                />
                                <Field.ErrorText>{nameError}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root invalid={!!startDateError}>
                                <Field.Label>Дата</Field.Label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <Field.ErrorText>{startDateError}</Field.ErrorText>
                            </Field.Root>
                        </VStack>

                        <div className={styles.buttons}>
                            <Button onClick={handleSubmit} className={styles.button} size="lg">
                                Добавить
                            </Button>

                            <Button
                                onClick={() => setIsOpen(false)}
                                className={`${styles.button} ${styles.button_cancel}`}
                                size="lg"
                            >
                                Отмена
                            </Button>
                        </div>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default AddTaskModal;
