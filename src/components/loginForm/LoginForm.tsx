import {Button, Field, Input, VStack} from "@chakra-ui/react";
import {Link} from "react-router";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
    return <form className={styles.form}>
        <VStack width='full' gap={6} padding={8}>
            <h1 className={styles.heading}>Войти</h1>
            <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input placeholder="Введите email" />
                <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>

            <Field.Root>
                <Field.Label>Пароль</Field.Label>
                <Input placeholder="Введите пароль" />
                <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>
            <p>Нет аккаунта? <Link className={styles.link} to={'/signup'}>Зарегистрируйтесь</Link></p>
            <Button width='full'>Войти</Button>
        </VStack>
    </form>
}

export default LoginForm;