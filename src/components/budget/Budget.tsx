import styles from "./budget.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import SpendItem from "@/components/spendItem/SpendItem.tsx";
import AddTaskModal from "@/components/addTaskModal/AddTaskModal.tsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    datasets: [
        {
            data: [0, 0, 0, 0, 100],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
        },
    ],
};

const Budget = () => {
    return <section className={styles.budget}>
        <div className={styles.chart}>
            <Doughnut width={"3rem"} data={data} />
        </div>
        <ul className={styles.categories}>
            <li className={`${styles.category} ${styles.category_transport}`}>
                <span>Транспорт</span>
                <span>20000₽</span>
            </li>
            <li className={`${styles.category} ${styles.category_food}`}>
                <span>Еда</span>
                <span>20000₽</span>
            </li>
            <li className={`${styles.category} ${styles.category_live}`}>
                <span>Проживание</span>
                <span>20000₽</span>
            </li>
            <li className={`${styles.category} ${styles.category_other}`}>
                <span>Другое</span>
                <span>20000₽</span>
            </li>
            <li className={`${styles.category} ${styles.category_remaining}`}>
                <span>Осталось</span>
                <span>20000₽</span>
            </li>
        </ul>
        <ul className={styles.spends}>
            <SpendItem/>
            <AddTaskModal/>
        </ul>
    </section>
}

export default Budget