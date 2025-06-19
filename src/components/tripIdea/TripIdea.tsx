import styles from './tripIdea.module.scss';
import TripTemplate from "@/types/models/TripTemplate.ts";
import ApplyTemplateModal from "@/components/applyTemplateModal/ApplyTemplateModal.tsx";
import Card from "@/components/ui/card/Card.tsx";

const TripIdea = (template: TripTemplate) => {
    return <Card>
        <h3 className={styles.heading}>{template.name}</h3>
        <div className={styles.info}>
            <p className={styles.dates}>{`Количество дней: ${template.daysLength}`}</p>
            <p className={styles.budget}>{`Бюджет: ${template.budget}₽`}</p>
        </div>
        <p className={styles.created}>{`Создал: ${template.createdBy ? template.createdBy?.email : 'TravelTracker'}`}</p>
        <pre className={styles.description}><span>Описание: </span>{template.description}</pre>
        {template.checklist.length > 0 && <><p className={`${styles.checkList} bold`}>Чеклист:</p>
            <ul className={styles.list}>
                {template.checklist.map((task, i) => (<li key={i}>{task}</li>))}
            </ul>
        </>}
        <ApplyTemplateModal id={template._id!} length={template.daysLength}/>
    </Card>
}

export default TripIdea;