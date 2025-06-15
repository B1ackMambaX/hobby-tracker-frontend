import { Spinner as ChakraSpinner } from "@chakra-ui/react";
import styles from "./spinner.module.scss";

const Spinner = () => {
    return <div className={styles.wrapper}>
        <ChakraSpinner size="xl" />
    </div>
}

export default Spinner;