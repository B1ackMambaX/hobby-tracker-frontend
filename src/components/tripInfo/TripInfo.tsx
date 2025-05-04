import styles from './tripInfo.module.scss'
import {Link} from "react-router";
import {useState} from "react";
import CheckList from "@/components/checkList/CheckList.tsx";

enum ActiveTab {
    CHECK_LIST,
    BUDGET
}


const TripInfo = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.CHECK_LIST)
    return <section className={styles.wrapper}>
        <Link to="/">
            <div className={styles.back}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#319795"/>
                </svg>
            </div>
        </Link>
        <h2 className={styles.heading}>Информация о путешествии</h2>

        <section className={styles.inner}>
            <div className={styles.tabs}>
                <div
                    className={`${styles.tab} ${activeTab === ActiveTab.CHECK_LIST ? styles.tab_active : ''}`}
                    onClick={() => setActiveTab(ActiveTab.CHECK_LIST)}
                >Чек-лист</div>
                <div
                    className={`${styles.tab} ${activeTab === ActiveTab.BUDGET ? styles.tab_active : ''}`}
                    onClick={() => setActiveTab(ActiveTab.BUDGET)}
                >Бюджет</div>
            </div>

            <CheckList />
        </section>
    </section>
}

export default TripInfo;