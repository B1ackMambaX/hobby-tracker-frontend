import TripProps from "@/components/trip/trip.props.ts";
import styles from './trip.module.scss';
import {Button} from "@chakra-ui/react";

const Trip = ({name, startDate, endDate, budget, status}: TripProps) => {
    return <article className={styles.wrapper}>
        <h3 className={styles.heading}>{name}</h3>
        <div className={styles.info}>
            <time className={styles.dates}>{`${startDate} - ${endDate}`}</time>
            <p className={styles.budget}>{`${budget}₽`}</p>
        </div>

        <div className={styles.badges}>
            <p className={`${styles.status} ${styles.status_active}`}>{status}</p>
            <Button className={styles.button} size={'sm'}>Подробнее</Button>
        </div>
    </article>
}

export default Trip;