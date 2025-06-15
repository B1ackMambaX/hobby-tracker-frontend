import TripProps from "@/components/trip/trip.props.ts";
import styles from './trip.module.scss';
import {Button} from "@chakra-ui/react";
import {NavLink} from "react-router";
import Card from "@/components/ui/card/Card.tsx";

const Trip = ({name, startDate, endDate, budget, status, id}: TripProps) => {
    return <Card>
        <h3 className={styles.heading}>{name}</h3>
        <div className={styles.info}>
            <time className={styles.dates}>{`${startDate} - ${endDate}`}</time>
            <p className={styles.budget}>{`${budget}₽`}</p>
        </div>

        <div className={styles.badges}>
            <p className={`${styles.status} ${status === 'active' ? styles.status_active : styles.status_finished}`}>
                {status === 'active' ? 'Активно' : 'Завершено'}
            </p>
            <NavLink to={`/trip/${id}`}>
                <Button className={styles.button} size={'sm'}>Подробнее</Button>
            </NavLink>
        </div>
    </Card>
}

export default Trip;