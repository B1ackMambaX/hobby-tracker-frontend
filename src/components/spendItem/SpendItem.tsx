import styles from './spendItem.module.scss';

const SpendItem = () => {
    return <li className={styles.spend}>
        <div className={styles.header}>
            <h3 className={styles.heading}>Покупка палатки</h3>
            <span className={styles.amount}>50000₽</span>
        </div>
        <span className={styles.category}>Другое</span>
    </li>
}

export default SpendItem;