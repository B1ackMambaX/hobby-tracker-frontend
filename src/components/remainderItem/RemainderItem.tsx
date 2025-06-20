import RemainderItemProps from "@/components/remainderItem/remainderItem.props.ts";
import styles from "./remainderItem.module.scss";
import {Button} from "@chakra-ui/react";
import {useDoneRemainderMutation, usePostponeRemainderMutation} from "@/api/remaindersApi.ts";
import Card from "@/components/ui/card/Card.tsx";

const RemainderItem = ({remainder}: RemainderItemProps) => {
    const [markAsDone] = useDoneRemainderMutation();
    const [postponeRemainder] = usePostponeRemainderMutation();

    return <Card>
        <div className={styles.header}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M20.625 2.625C20.5359 2.625 20.4445 2.64141 20.3531 2.67891L6.84375 8.10703H3C2.79375 8.10703 2.625 8.28047 2.625 8.49609V15.5039C2.625 15.7195 2.79375 15.893 3 15.893H5.38359C5.29687 16.1648 5.25 16.4531 5.25 16.7461C5.25 18.2906 6.51094 19.5469 8.0625 19.5469C9.36094 19.5469 10.4555 18.6656 10.7789 17.475L20.3555 21.3234C20.4469 21.3586 20.5383 21.3773 20.6273 21.3773C21.0234 21.3773 21.3773 21.0445 21.3773 20.5992V3.40312C21.375 2.95781 21.0234 2.625 20.625 2.625ZM8.0625 17.8664C7.44141 17.8664 6.9375 17.3648 6.9375 16.7461C6.9375 16.4836 7.02891 16.2328 7.19531 16.0336L9.18516 16.8328C9.13828 17.4094 8.65312 17.8664 8.0625 17.8664ZM19.6875 19.2352L7.47187 14.3273L7.16953 14.2055H4.3125V9.79453H7.16953L7.47187 9.67266L19.6875 4.76484V19.2352Z"
                    fill="black"/>
            </svg>
            <h3 className={styles.message}>{remainder.message}</h3>
        </div>

        <p className={styles.date}>{new Date(remainder.taskId.date || remainder.remindAt).toLocaleDateString()}</p>

        <div className={styles.buttons}>
            {remainder.status !== 'postponed' &&
                <Button onClick={() => postponeRemainder(remainder)} className={styles.button}
                        colorPalette="blue">Отложить</Button>
            }
            <Button onClick={() => markAsDone(remainder)} className={styles.button}
                    colorPalette="teal">Выполнено</Button>
        </div>
    </Card>
}

export default RemainderItem;