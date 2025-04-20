import {Button, Field, Input, VStack} from "@chakra-ui/react";
import styles from "./registerForm.module.scss";
import {Link} from "react-router";

const RegisterForm = () => {
    return <form className={styles.form}>
        <VStack gap={6} padding={8}>
            <h1 className={styles.heading}>Войти</h1>

            <Field.Root>
                <Field.Label>Имя</Field.Label>
                <Input placeholder="Введите имя" />
                <Field.ErrorText>This field is required</Field.ErrorText>
            </Field.Root>

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
            <p>Есть аккаунт? <Link className={styles.link} to={'/login'}>Войдите</Link></p>
            <Button width='full'>Зарегестрироваться</Button>
        </VStack>
    </form>
}

export default RegisterForm;