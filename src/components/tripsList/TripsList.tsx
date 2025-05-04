import styles from './tripsList.module.scss';
import {VStack} from "@chakra-ui/react";
import Trip from "@/components/trip/Trip.tsx";
import Logo from "@/components/logo/Logo.tsx";
import NavBar from "@/components/navBar/NavBar.tsx";
import {ActivePage} from "@/components/navBar/navBar.props.ts";
import AddTripModal from "@/components/addTripModal/AddTripModal.tsx";

const TripsList = () => {
    return <section className={styles.wrapper}>
        <NavBar activePage={ActivePage.HOME}/>
        <Logo className={styles.logo} color={'var(--green)'}/>
        <h1 className={styles.heading}>Мои путешествия</h1>
        <VStack className={styles.list} gap={'0.75rem'}>
            <Trip name={"Путешествие на Таганай"} status={"Активно"} budget={50000} startDate={"01.06.2025"}
                  endDate={"08.06.2025"}/>
            <Trip name={"Путешествие на Таганай"} status={"Завершено"} budget={50000} startDate={"01.06.2025"}
                  endDate={"08.06.2025"}/>
            <Trip name={"Путешествие на Таганай"} status={"Завершено"} budget={50000} startDate={"01.06.2025"}
                  endDate={"08.06.2025"}/>

            <AddTripModal/>
        </VStack>

    </section>
}

export default TripsList;