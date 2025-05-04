import {Button, Field, Input, VStack} from "@chakra-ui/react";
import {Link} from "react-router";
import styles from "./loginForm.module.scss";
import {useState} from "react";
import {validateEmail, validatePassword} from "@/utils/validators.ts";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const submitHandler = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        setEmailError(emailError);
        setPasswordError(passwordError);
        if (emailError || passwordError) {
            return;
        }

        console.log(email);
        console.log(password);
    }


    return <form className={styles.form}>
        <img className={styles.logo} src="/public/logo.svg" alt="Логотип"/>
        <VStack className={styles.inner} gap={"1.25rem"} width='full'>
            <h1 className={styles.heading}>Войти</h1>
            <Field.Root invalid={emailError !== ''}>
                <Field.Label>Email</Field.Label>
                <Input value={email} type={"email"} onChange={e => setEmail(e.target.value)}
                       className={styles.input} size={"md"} placeholder="Введите email"/>
                <Field.ErrorText>{emailError}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={passwordError !== ''}>
                <Field.Label>Пароль</Field.Label>
                <Input type={"password"} value={password} onChange={e => setPassword(e.target.value)}
                       className={styles.input} size={"md"} placeholder="Введите пароль"/>
                <Field.ErrorText>{passwordError}</Field.ErrorText>
            </Field.Root>
            <p className={styles.link}>Нет аккаунта? <Link className={styles.link__inner}
                                                           to={'/signup'}>Зарегистрируйтесь</Link></p>
            <Button onClick={submitHandler} className={styles.button} size={"lg"} width='full'>Войти</Button>
        </VStack>
    </form>
}

export default LoginForm;