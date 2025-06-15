import {Textarea, Field, Button} from "@chakra-ui/react";
import styles from "./shareTrip.module.scss";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {validateRequiredField} from "@/utils/validators.ts";
import {useAddTemplateMutation} from "@/api/tripTemplateApi.ts";
import {useGetTasksQuery} from "@/api/taskApi.ts";
import {skipToken} from "@reduxjs/toolkit/query/react";
import {useGetTripsQuery} from "@/api/tripsApi.ts";
import getDaysLength from "@/utils/getDaysLength.ts";
import DialogLayout from "@/components/ui/dialogLayout/DialogLayout.tsx";

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

    return <DialogLayout isOpen={isOpen} heading={"Поделиться путешествием"}
                         setIsOpen={setIsOpen as (details: unknown) => void} handleConfirm={handleSubmit}
                         overridingButton={<Button onClick={() => setIsOpen(true)} className={styles.add}>
                             Поделиться путешествием
                         </Button>}>
        <Field.Root invalid={!!descrError}>
            <Field.Label>
                Описание
            </Field.Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)}
                      resize={"none"} className={styles.textarea} placeholder="Введите описание"/>
            <Field.ErrorText>{descrError}</Field.ErrorText>
        </Field.Root>
    </DialogLayout>
};

export default AddSpendModal;
