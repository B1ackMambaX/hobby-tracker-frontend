import {
    Button,
    Dialog,
    Field,
    Select,
    Input,
    Portal,
    VStack, createListCollection,
} from "@chakra-ui/react";
import styles from "./addSpend.module.scss";
import {useEffect, useRef, useState} from "react";
import {
    validateNumber,
    validateRequiredField,
} from "@/utils/validators.ts";
import {useParams} from "react-router";
import {useAddSpendMutation} from "@/api/spendsApi.ts";

const categories = createListCollection({
    items: [
        { label: "Транспорт", value: "transport" },
        { label: "Еда", value: "food" },
        { label: "Проживание", value: "residence" },
        { label: "Другое", value: "other" },
    ],
})

const AddSpendModal = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");
    const [category, setCategory] = useState<"transport" | "food" | "residence" | "other">();
    const [categoryError, setCategoryError] = useState("");

    const [addSpend, {isSuccess}] = useAddSpendMutation();


    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            setName("");
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        const nErr = validateRequiredField(name);
        const aErr = validateNumber(parseInt(amount, 10));
        const cErr = validateRequiredField(category);

        setNameError(nErr);
        setAmountError(aErr);
        setCategoryError(cErr);

        if (nErr || aErr || cErr) return;
        addSpend({spend: {name, category: category!, amount: parseInt(amount)}, tripId: id!})
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
                <Dialog.Positioner style={{display: "flex", justifyContent: "center"}}>
                    <Dialog.Content className={styles.modal} ref={contentRef}>
                        <h3 className={styles.heading}>Создание траты</h3>

                        <VStack gap="1.2rem">
                            <Field.Root invalid={!!nameError}>
                                <Field.Label>Имя траты</Field.Label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Введите имя траты"
                                />
                                <Field.ErrorText>{nameError}</Field.ErrorText>
                            </Field.Root>

                            <Field.Root invalid={!!amountError}>
                                <Field.Label>Сумма</Field.Label>
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder={"Введите сумму"}
                                />
                                <Field.ErrorText>{amountError}</Field.ErrorText>
                            </Field.Root>
                            <Field.Root invalid={!!categoryError}>
                                <Select.Root collection={categories} size="sm">
                                    <Select.HiddenSelect onChange={(e) => setCategory(e.target.value)} />
                                    <Select.Label>Категория</Select.Label>
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText placeholder="Выберите категорию" />
                                        </Select.Trigger>
                                        <Select.IndicatorGroup>
                                            <Select.Indicator />
                                        </Select.IndicatorGroup>
                                    </Select.Control>
                                    <Portal container={contentRef}>
                                        <Select.Positioner>
                                            <Select.Content>
                                                {categories.items.map((item) => (
                                                    <Select.Item item={item} key={item.value}>
                                                        {item.label}
                                                    </Select.Item>
                                                ))}
                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                                <Field.ErrorText>{categoryError}</Field.ErrorText>
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
