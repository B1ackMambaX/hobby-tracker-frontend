import {Button, Dialog, Field, Input, Portal, VStack} from "@chakra-ui/react";
import styles from "./addTripModal.module.scss";
import {useState} from "react";
import {validateEndDate, validateNumber, validateRequiredField, validateStartDate} from "@/utils/validators.ts";
import {useAddTripMutation} from "@/api/tripsApi.ts";

const AddTripModal = () => {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget] = useState("");

    const [nameError, setNameError] = useState("");
    const [startDateError, setStartDateError] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const [budgetError, setBudgetError] = useState("");

    const [addTrip] = useAddTripMutation();


    const handleSubmit = () => {
        const startDateError = validateStartDate(new Date(startDate));
        const endDateError = validateEndDate(new Date(startDate), new Date(endDate));
        const nameError =  validateRequiredField(name);
        const budgetError = validateNumber(parseInt(budget));
        setStartDateError(startDateError);
        setEndDateError(endDateError);
        setBudgetError(budgetError);
        setNameError(nameError);

        if (startDateError || endDateError || budgetError || nameError) {
            return;
        }

        addTrip({name, startDate: new Date(startDate), endDate: new Date(endDate), budget: parseInt(budget)});
    }


    return <Dialog.Root>
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
                    <h3 className={styles.heading}>Создание путешествия</h3>
                    <VStack gap={"1.2rem"}>
                        <Field.Root invalid={nameError !== ''}>
                            <Field.Label>Имя</Field.Label>
                            <Input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className={styles.input}
                                size={"md"}
                                placeholder="Введите имя путешествия"
                            />
                            <Field.ErrorText>{nameError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={startDateError !== ''}>
                            <Field.Label>Дата начала</Field.Label>
                            <Input
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                type="date"
                                className={styles.input}
                                size={"md"}
                                placeholder="Введите дату начала"
                            />
                            <Field.ErrorText>{startDateError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={endDateError !== ''}>
                            <Field.Label>Дата окончания</Field.Label>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
                                className={styles.input}
                                size={"md"}
                                placeholder="Введите дату окончания"
                            />
                            <Field.ErrorText>{endDateError}</Field.ErrorText>
                        </Field.Root>

                        <Field.Root invalid={budgetError !== ''}>
                            <Field.Label>Бюджет</Field.Label>
                            <Input
                                value={budget}
                                onChange={e => setBudget(e.target.value)}
                                type="number"
                                className={styles.input}
                                size={"md"}
                                placeholder="Введите бюджет"
                            />
                            <Field.ErrorText>{budgetError}</Field.ErrorText>
                        </Field.Root>
                    </VStack>

                    <div className={styles.buttons}>
                        <Button onClick={handleSubmit} className={styles.button} size={"lg"}>Добавить</Button>
                        <Dialog.ActionTrigger asChild>
                            <Button className={`${styles.button} ${styles.button_cancel}`} size={"lg"}>Отмена</Button>
                        </Dialog.ActionTrigger>
                    </div>
                </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
    </Dialog.Root>
}

export default AddTripModal;