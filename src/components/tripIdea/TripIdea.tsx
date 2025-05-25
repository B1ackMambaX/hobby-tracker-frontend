import styles from './tripIdea.module.scss';
import TripTemplate from "@/types/models/TripTemplate.ts";
import ApplyTemplateModal from "@/components/applyTemplateModal/ApplyTemplateModal.tsx";

const TripIdea = (template: TripTemplate) => {
    return <article className={styles.wrapper}>
        <h3 className={styles.heading}>{template.name}</h3>
        <div className={styles.info}>
            <p className={styles.dates}>{`Количество дней: ${template.daysLength}`}</p>
            <p className={styles.budget}>{`Бюджет: ${template.budget}₽`}</p>
        </div>
        <p className={styles.created}>{`Создал: ${template.createdBy ? template.createdBy?.email : 'TravelTracker'}`}</p>
        <p className={styles.description}><span>Описание: </span>{template.description}</p>
        {template.checklist.length > 0 && <><p className="bold">Чеклист:</p>
            <ul className={styles.list}>
                {template.checklist.map((task, i) => (<li key={i}>{task}</li>))}
            </ul>
        </>}
        <ApplyTemplateModal id={template._id!} length={template.daysLength}/>
    </article>
}

export default TripIdea;