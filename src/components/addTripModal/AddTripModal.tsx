import {Field, Input, VStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {
    validateEndDate,
    validateNumber,
    validateRequiredField,
    validateStartDate,
} from "@/utils/validators.ts";
import {useAddTripMutation} from "@/api/tripsApi.ts";
import DialogLayout from "@/components/ui/dialogLayout/DialogLayout.tsx";

const AddTripModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [budget, setBudget] = useState("");
    const [nameError, setNameError] = useState("");
    const [startDateError, setStartDateError] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const [budgetError, setBudgetError] = useState("");

    const [addTrip, {isSuccess}] = useAddTripMutation();

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            setName("");
            setStartDate("");
            setEndDate("");
            setBudget("");
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        const sdErr = validateStartDate(new Date(startDate));
        const edErr = validateEndDate(new Date(startDate), new Date(endDate));
        const nErr = validateRequiredField(name);
        const bErr = validateNumber(parseInt(budget, 10));

        setStartDateError(sdErr);
        setEndDateError(edErr);
        setNameError(nErr);
        setBudgetError(bErr);

        if (sdErr || edErr || nErr || bErr) return;

        addTrip({
            name,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            budget: parseInt(budget, 10),
            status: 'active'
        });
    };

    return <DialogLayout isOpen={isOpen} heading={"Создать путешествие"}
                         setIsOpen={setIsOpen as (details: unknown) => void} handleConfirm={handleSubmit}>
        <VStack gap="1.2rem">
            <Field.Root invalid={!!nameError}>
                <Field.Label>Имя</Field.Label>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя путешествия"
                />
                <Field.ErrorText>{nameError}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!startDateError}>
                <Field.Label>Дата начала</Field.Label>
                <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <Field.ErrorText>{startDateError}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!endDateError}>
                <Field.Label>Дата окончания</Field.Label>
                <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Field.ErrorText>{endDateError}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!budgetError}>
                <Field.Label>Бюджет</Field.Label>
                <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />
                <Field.ErrorText>{budgetError}</Field.ErrorText>
            </Field.Root>
        </VStack>
    </DialogLayout>
};

export default AddTripModal;
