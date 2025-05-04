import styles from './tripsList.module.scss';
import {Button, VStack} from "@chakra-ui/react";
import Trip from "@/components/trip/Trip.tsx";
import Logo from "@/components/logo/Logo.tsx";
import NavBar from "@/components/navBar/NavBar.tsx";
import {ActivePage} from "@/components/navBar/navBar.props.ts";

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
            <Button className={styles.add}>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M16.5 16.5V7.5H19.5V16.5H28.5V19.5H19.5V28.5H16.5V19.5H7.5V16.5H16.5Z" fill="white"/>
                </svg>
            </Button>
        </VStack>

    </section>
}

export default TripsList;