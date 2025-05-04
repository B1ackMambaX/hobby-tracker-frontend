import {Button, Field, Input, VStack} from "@chakra-ui/react";
import {Link} from "react-router";
import styles from "./loginForm.module.scss";

const LoginForm = () => {
    return <form className={styles.form}>
        <img className={styles.logo} src="/public/logo.svg" alt="Логотип"/>
        <VStack className={styles.inner} gap={"1.25rem"} width='full'>
            <h1 className={styles.heading}>Войти</h1>
            <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input className={styles.input} size={"md"} placeholder="Введите email"/>
                <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>

            <Field.Root>
                <Field.Label>Пароль</Field.Label>
                <Input className={styles.input} size={"md"} placeholder="Введите пароль"/>
                <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>
            <p className={styles.link}>Нет аккаунта? <Link className={styles.link__inner}
                                                           to={'/login'}>Зарегистрируйтесь</Link></p>
            <Button className={styles.button} size={"lg"} width='full'>Войти</Button>
        </VStack>
    </form>
}

export default LoginForm;