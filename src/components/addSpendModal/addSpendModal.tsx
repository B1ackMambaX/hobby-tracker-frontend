import {Field, Select, Input, Portal, VStack, createListCollection} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {validateNumber, validateRequiredField} from "@/utils/validators.ts";
import {useParams} from "react-router";
import {useAddSpendMutation} from "@/api/spendsApi.ts";
import DialogLayout from "@/components/ui/dialogLayout/DialogLayout.tsx";

const categories = createListCollection({
    items: [
        {label: "Транспорт", value: "transport"},
        {label: "Еда", value: "food"},
        {label: "Проживание", value: "residence"},
        {label: "Другое", value: "other"},
    ],
})

const AddSpendModal = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const {id} = useParams();
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
        const cErr = validateRequiredField(category!);

        setNameError(nErr);
        setAmountError(aErr);
        setCategoryError(cErr);

        if (nErr || aErr || cErr) return;
        addSpend({spend: {name, category: category!, amount: parseInt(amount)}, tripId: id!})
    };

    return <DialogLayout isOpen={isOpen} heading={"Добавить трату"} contentRef={contentRef}
                         setIsOpen={setIsOpen as (details: unknown) => void}
                         handleConfirm={handleSubmit}>
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
                    <Select.HiddenSelect
                        onChange={(e) => setCategory(e.target.value as "transport" | "food" | "residence" | "other")}/>
                    <Select.Label>Категория</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Выберите категорию"/>
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator/>
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
    </DialogLayout>;
};

export default AddSpendModal;
