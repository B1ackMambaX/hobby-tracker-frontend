import styles from './welcomeGuide.module.scss';

const WelcomeGuide = () => {
    return <section className={styles.wrapper}>
        <h2 className={styles.heading}>О приложении</h2>
        <img className={styles.image} src="/promo_image.jpg" alt="Таганай"/>
        <p>TravelTracker делает планирование поездки по Уралу быстрым, понятным и вдохновляющим, сохраняя полный
            контроль над бюджетом и списком дел. Вы можете:</p>

        <ul className={styles.features}>
            <li className={styles.item}>Создавать собственные путешествия или вдохновиться идеями пользователей</li>
            <li className={styles.item}>Создать чек-лист для сборов или список дел перед поездкой и отслеживать их</li>
            <li className={styles.item}>Гибко вести учет бюджета на путешествие</li>
        </ul>

        <h2 className={styles.heading}>Установка приложения</h2>
        <p className={styles.step}>Шаг 1</p>
        <img className={styles.image} src="/guide_1.jpeg" alt="Первый этап установки приложения"/>
        <p className={styles.step}>Шаг 2</p>
        <img className={styles.image} src="/guide_2.jpeg" alt="Второй этап установки приложения"/>
        <p className={styles.step}>Шаг 3</p>
        <img className={styles.image} src="/guide_3.jpeg" alt="Третий этап установки приложения"/>
    </section>
}

export default WelcomeGuide;