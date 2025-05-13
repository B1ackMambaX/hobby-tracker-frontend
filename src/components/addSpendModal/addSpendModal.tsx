import {
    Button,
    Dialog,
    Field,
    Input,
    Portal,
    VStack,
} from "@chakra-ui/react";
import styles from "./addSpend.module.scss";
import {useEffect, useState} from "react";
import {
    validateRequiredField,
} from "@/utils/validators.ts";
import {useParams} from "react-router";
import {useAddSpendMutation} from "@/api/spendsApi.ts";

const AddSpendModal = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");

    const [addSpend, {isSuccess}] = useAddSpendMutation();


    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            setName("");
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        const nErr = validateRequiredField(name);

        setNameError(nErr);

        if (nErr) return;
        addSpend({spend: {name, category: 'residence', amount: 10000}, tripId: id!})
    };

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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
                        <h3 className={styles.heading}>Создание траты</h3>

                        <VStack gap="1.2rem">
                            <Field.Root invalid={!!nameError}>
                                <Field.Label>Имя траты</Field.Label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Введите имя задачи"
                                />
                                <Field.ErrorText>{nameError}</Field.ErrorText>
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

export default AddSpendModal;
