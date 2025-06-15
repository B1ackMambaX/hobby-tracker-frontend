import {Field, Input, VStack,} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {validateRequiredField, validateStartDate,} from "@/utils/validators.ts";
import {useAddTaskMutation} from "@/api/taskApi.ts";
import {useParams} from "react-router";
import DialogLayout from "@/components/ui/dialogLayout/DialogLayout.tsx";

const AddTaskModal = () => {
    const {id} = useParams();
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

        if (sdErr !== 'Введите дату') {
            setStartDateError(sdErr);
        }
        setNameError(nErr);

        if (sdErr && sdErr !== 'Введите дату' || nErr) return;
        addTask({task: {name, date: new Date(startDate), status: 'inProgress'}, tripId: id!})
    };

    return <DialogLayout isOpen={isOpen} heading={"Создать задачу"} setIsOpen={setIsOpen as (details: unknown) => void}
                         handleConfirm={handleSubmit}>
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
    </DialogLayout>
};

export default AddTaskModal;
