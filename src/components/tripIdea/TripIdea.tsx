import styles from './tripIdea.module.scss';
import TripTemplate from "@/types/models/TripTemplate.ts";
import {Button} from "@chakra-ui/react";

const TripIdea = (template: TripTemplate) => {
    return <article className={styles.wrapper}>
        <h3 className={styles.heading}>{template.name}</h3>
        <div className={styles.info}>
            <p className={styles.dates}>{`Количество дней: ${template.daysLength}`}</p>
            <p className={styles.budget}>{`Бюджет: ${template.budget}₽`}</p>
        </div>
        <p className={styles.created}>{`Создал: ${template.createdBy?.email}`}</p>
        <p className={styles.description}><span>Описание: </span>{template.description}</p>
        <Button size={"xl"} className={styles.button}>Добавить к себе</Button>
    </article>
}

export default TripIdea;