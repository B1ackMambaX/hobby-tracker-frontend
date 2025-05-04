import {Button, Field, Input, VStack} from "@chakra-ui/react";
import {Link} from "react-router";
import styles from "./registerForm.module.scss";

const LoginForm = () => {
    return <form className={styles.form}>
        <img className={styles.logo} src="/public/logo.svg" alt="Логотип"/>
        <VStack className={styles.inner} gap={"1.25rem"} width='full'>
            <h1 className={styles.heading}>Регистрация</h1>
            <Field.Root>
                <Field.Label>Имя</Field.Label>
                <Input className={styles.input} size={"md"} placeholder="Введите имя"/>
                <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>

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
            <p className={styles.link}>Есть аккаунт? <Link className={styles.link__inner}
                                                           to={'/signup'}>Войдите</Link></p>
            <Button className={styles.button} size={"lg"} width='full'>Зарегистрироваться</Button>
        </VStack>
    </form>
}

export default LoginForm;