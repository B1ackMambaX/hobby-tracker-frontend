import styles from "./budget.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import SpendItem from "@/components/spendItem/SpendItem.tsx";
import {useParams} from "react-router";
import {useGetSpendsQuery} from "@/api/spendsApi.ts";
import {skipToken} from "@reduxjs/toolkit/query/react";
import Spinner from "@/components/spinner/Spinner.tsx";
import {useGetTripsQuery} from "@/api/tripsApi.ts";
import Trip from "@/types/models/Trip.ts";
import {useEffect, useState} from "react";
import SpendCategory from "@/types/models/SpendCategory.ts";
import getBudgetStatus from "@/utils/getBudgetStatus.ts";
import {getCategoryName} from "@/utils/getCategoryName.ts";
import getChartData from "@/utils/getChartData.ts";
import AddSpendModal from "@/components/addSpendModal/addSpendModal.tsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const Budget = () => {
    const {id} = useParams();
    const {data: spends, isLoading} = useGetSpendsQuery(id || skipToken);
    const {data: trips} = useGetTripsQuery();

    const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
    const [categories, setCategories] = useState<SpendCategory[]>([]);

    useEffect(() => {
        if (spends && currentTrip) {
            setCategories(getBudgetStatus(currentTrip, spends));
        }
    }, [spends, currentTrip]);

    useEffect(() => {
        if (trips && trips.length > 0) {
            setCurrentTrip(trips.filter(trip => trip._id === id)[0])
        }
    }, [trips])

    const processSpends = () => {
        if (!spends || spends.length === 0) {
            return <p>У вас пока что нет трат</p>;
        }
        return spends.map(spend => <SpendItem key={spend._id!} spend={spend} />)
    }

    return <section className={styles.budget}>
        <div className={styles.chart}>
            <Doughnut width={"3rem"} data={getChartData(categories)} />
        </div>
        <ul className={styles.categories}>
            {categories.map((category, i) => (
                <li key={i} className={`${styles.category} ${styles[`category_${category.category}`]}`}>
                    <span>{getCategoryName(category.category)}</span>
                    <span>{`${category.amount}₽`}</span>
                </li>
            ))}
        </ul>
        <ul className={styles.spends}>
            {isLoading ? <Spinner/> : processSpends()}
            <AddSpendModal/>
        </ul>
    </section>
}

export default Budget