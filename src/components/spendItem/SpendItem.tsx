import styles from './spendItem.module.scss';
import SpendItemProps from "@/components/spendItem/spendItem.props.ts";
import {getCategoryName} from "@/utils/getCategoryName.ts";
import {Button} from "@chakra-ui/react";
import {useDeleteSpendMutation} from "@/api/spendsApi.ts";


const SpendItem = ({spend}: SpendItemProps) => {
    const [deleteSpend] = useDeleteSpendMutation();

    return <li className={styles.spend}>
        <div className={styles.header}>
            <h3 className={styles.heading}>{spend.name}</h3>
            <span className={styles.amount}>{`${spend.amount}₽`}</span>
        </div>
        <div className={styles.footer}>
            <span className={styles.category}>{getCategoryName(spend.category)}</span>
            <span className={styles.date}>{new Date(spend.createdAt!).toLocaleDateString()}</span>
        </div>

        <Button onClick={() => deleteSpend(spend._id!)} colorPalette="red" variant="surface"
                className={styles.button}>Удалить</Button>
    </li>
}

export default SpendItem;