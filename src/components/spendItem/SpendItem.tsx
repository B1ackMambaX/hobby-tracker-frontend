import styles from './spendItem.module.scss';
import SpendItemProps from "@/components/spendItem/spendItem.props.ts";
import {getCategoryName} from "@/utils/getCategoryName.ts";


const SpendItem = ({spend} : SpendItemProps) => {
    return <li className={styles.spend}>
        <div className={styles.header}>
            <h3 className={styles.heading}>{spend.name}</h3>
            <span className={styles.amount}>{`${spend.amount}₽`}</span>
        </div>
        <span className={styles.category}>{getCategoryName(spend.category)}</span>
    </li>
}

export default SpendItem;