import styles from './spendItem.module.scss';
import SpendItemProps from "@/components/spendItem/spendItem.props.ts";
import {getCategoryName} from "@/utils/getCategoryName.ts";


const SpendItem = ({spend} : SpendItemProps) => {
    return <li className={styles.spend}>
        <div className={styles.header}>
            <h3 className={styles.heading}>{spend.name}</h3>
            <span className={styles.amount}>{`${spend.amount}₽`}</span>
        </div>
        <div className={styles.footer}>
            <span className={styles.category}>{getCategoryName(spend.category)}</span>
            <span className={styles.date}>{new Date(spend.createdAt!).toLocaleDateString()}</span>
        </div>
    </li>
}

export default SpendItem;