import styles from './tripsList.module.scss';
import {Button, VStack} from "@chakra-ui/react";
import Trip from "@/components/trip/Trip.tsx";

const TripsList = () => {
  return <section className={styles.wrapper}>
      <h1 className={styles.heading}>Мои путешествия</h1>

      <VStack mt={4} gap={4}>
          <Trip name={"Путешествие на Таганай"} status={"Активно"} budget={50000} startDate={"01.06.2025"} endDate={"08.06.2025"}/>
          <Trip name={"Путешествие на Таганай"} status={"Завершено"} budget={50000} startDate={"01.06.2025"} endDate={"08.06.2025"}/>
      </VStack>
      <Button className={styles.button}>Добавить</Button>
  </section>
}

export default TripsList;