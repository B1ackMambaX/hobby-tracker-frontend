import {useEffect, useState} from "react";
import {validateStartDate} from "@/utils/validators.ts";
import {Field, VStack, Input, Button} from "@chakra-ui/react";
import ApplyTemplateProps from "@/components/applyTemplateModal/ApplyTemplate.props.ts";
import {useApplyTemplateMutation} from "@/api/tripsApi.ts";
import {useNavigate} from "react-router";
import DialogLayout from "@/components/ui/dialogLayout/DialogLayout.tsx";
import styles from './applyTemplate.module.scss';

const ApplyTemplateModal = ({id, length}: ApplyTemplateProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startDateError, setStartDateError] = useState("");
    const [applyTemplate, {isSuccess}] = useApplyTemplateMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/trips');
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        const sdErr = validateStartDate(new Date(startDate));
        setStartDateError(sdErr);
        if (sdErr) return;
        applyTemplate({templateId: id, startDate: new Date(startDate), endDate: new Date(endDate)});
    };

    const calculateEndDate = () => {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + length);
        setEndDate(end.toISOString().slice(0, 10));
    }

    return <DialogLayout isOpen={isOpen} heading={"Создание путешествия"}
                         setIsOpen={setIsOpen as (details: unknown) => void} handleConfirm={handleSubmit}
                         overridingButton={<Button onClick={() => setIsOpen(true)} className={styles.add}>
                             Добавить к себе
                         </Button>}>
        <VStack gap="1.2rem">
            <Field.Root invalid={!!startDateError}>
                <Field.Label>Дата начала</Field.Label>
                <Input
                    type="date"
                    value={startDate}
                    onBlur={calculateEndDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <Field.ErrorText>{startDateError}</Field.ErrorText>
            </Field.Root>

            <Field.Root readOnly>
                <Field.Label>Дата окончания</Field.Label>
                <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <Field.ErrorText></Field.ErrorText>
            </Field.Root>
        </VStack>
    </DialogLayout>
}

export default ApplyTemplateModal;