import {
    Button,
    Dialog,
    Portal,
    Textarea,
    Field
} from "@chakra-ui/react";
import styles from "./shareTrip.module.scss";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {validateRequiredField} from "@/utils/validators.ts";
import {useAddTemplateMutation} from "@/api/tripTemplateApi.ts";
import {useGetTasksQuery} from "@/api/taskApi.ts";
import {skipToken} from "@reduxjs/toolkit/query/react";
import {useGetTripsQuery} from "@/api/tripsApi.ts";
import getDaysLength from "@/utils/getDaysLength.ts";

const AddSpendModal = () => {
    const {id} = useParams();
    const {data: tasks} = useGetTasksQuery(id || skipToken);
    const {data: trips} = useGetTripsQuery();
    const [addTemplate, {isSuccess}] = useAddTemplateMutation();

    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState("");
    const [descrError, setDescrError] = useState("");

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        const dErr = validateRequiredField(description);
        setDescrError(dErr);
        if (dErr) return;

        const trip = trips?.find((trip) => trip._id === id);
        const tasksTitles = tasks?.map((task) => task.name);
        if (!trip || !tasksTitles) return;

        addTemplate({
            name: trip.name,
            budget: trip.budget,
            checklist: tasksTitles,
            imageUrl: 'test',
            description,
            daysLength: getDaysLength(trip.startDate, trip.endDate)
        })
    };

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
                <Button onClick={() => setIsOpen(true)} className={styles.add}>
                    Поделиться путешествием
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop/>
                <Dialog.Positioner style={{display: "flex", alignItems: "center"}}>
                    <Dialog.Content className={styles.modal}>
                        <h3 className={styles.heading}>Поделиться путешествием</h3>
                        <Field.Root invalid={!!descrError}>
                            <Field.Label>
                                Описание
                            </Field.Label>
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)}
                                      resize={"none"} className={styles.textarea} placeholder="Введите описание"/>
                            <Field.ErrorText>{descrError}</Field.ErrorText>
                        </Field.Root>
                        <div className={styles.buttons}>
                            <Button onClick={handleSubmit} className={styles.button} size="lg">
                                Добавить
                            </Button>

                            <Button
                                className={`${styles.button} ${styles.button_cancel}`}
                                onClick={() => setIsOpen(false)}
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
