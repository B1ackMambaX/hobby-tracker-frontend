import {useEffect, useState} from "react";
import { validateStartDate} from "@/utils/validators.ts";
import styles from './applyTemplate.module.scss';
import {Button, Portal, Field, Dialog, VStack, Input} from "@chakra-ui/react";
import ApplyTemplateProps from "@/components/applyTemplateModal/ApplyTemplate.props.ts";
import {useApplyTemplateMutation} from "@/api/tripsApi.ts";
import {useNavigate} from "react-router";

const ApplyTemplateModal = ({id, length}: ApplyTemplateProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startDateError, setStartDateError] = useState("");
    const [applyTemplate, {isSuccess}] = useApplyTemplateMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        const sdErr = validateStartDate(new Date(startDate));
        setStartDateError(sdErr);
        if (sdErr) return;
        applyTemplate({templateId: id, startDate: new Date(startDate), endDate: new Date(endDate) });
    };

    const calculateEndDate = () => {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + length);
        setEndDate(end.toISOString().slice(0, 10));
    }

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
                <Button onClick={() => setIsOpen(true)} className={styles.add}>
                    Добавить к себе
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner style={{display: "flex", alignItems: "center"}}>
                    <Dialog.Content className={styles.modal} >
                        <h3 className={styles.heading}>Создание путешествия</h3>
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
}

export default ApplyTemplateModal;