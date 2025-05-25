import styles from './tripInfo.module.scss'
import {Link, useParams} from "react-router";
import {useState} from "react";
import CheckList from "@/components/checkList/CheckList.tsx";
import {useGetTripsQuery} from "@/api/tripsApi.ts";
import {Button} from "@chakra-ui/react";
import {downloadIcsFile} from "@/utils/ics.ts";
import Budget from "@/components/budget/Budget.tsx";
import ShareTripModal from "@/components/shareTripModal/ShareTripModal.tsx";

enum ActiveTab {
    CHECK_LIST,
    BUDGET
}


const TripInfo = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.CHECK_LIST)
    const {id} = useParams();
    const {data: trips} = useGetTripsQuery();

    const handleAddToCalendar = () => {
        if (!trips) return;
        const trip = trips.filter(trip => trip._id === id)[0];
        downloadIcsFile({
            id: trip._id!,
            name: trip.name,
            startDate: new Date(trip.startDate),
            endDate: new Date(trip.endDate)
        })
    }

    return <section className={styles.wrapper}>
        <Link to="/">
            <div className={styles.back}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#319795"/>
                </svg>
            </div>
        </Link>

        <h2 className={styles.heading}>{trips && trips.filter(trip => trip._id === id)[0].name}</h2>
        <Button
            onClick={handleAddToCalendar}
            className={styles.addToCalendar}>Добавить в календарь</Button>
        <ShareTripModal/>
        <section className={styles.inner}>
            <div className={styles.tabs}>
                <div
                    className={`${styles.tab} ${activeTab === ActiveTab.CHECK_LIST ? styles.tab_active : ''}`}
                    onClick={() => setActiveTab(ActiveTab.CHECK_LIST)}
                >Чек-лист
                </div>
                <div
                    className={`${styles.tab} ${activeTab === ActiveTab.BUDGET ? styles.tab_active : ''}`}
                    onClick={() => setActiveTab(ActiveTab.BUDGET)}
                >Бюджет
                </div>
            </div>

            {activeTab === ActiveTab.CHECK_LIST && <CheckList/>}
            {activeTab === ActiveTab.BUDGET && <Budget/>}
        </section>
    </section>
}

export default TripInfo;