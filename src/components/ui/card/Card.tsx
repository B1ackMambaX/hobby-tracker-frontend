import styles from './card.module.scss';
import CardProps from "@/components/ui/card/card.props.ts";

const Card = ({children, className}: CardProps) => {
    return <article className={`${className || ''} ${styles.card}`}>
        {children}
    </article>
}

export default Card;