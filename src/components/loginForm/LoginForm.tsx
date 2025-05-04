import {Button, Field, Input, VStack} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router";
import styles from "./loginForm.module.scss";
import {useCallback, useEffect, useState} from "react";
import {validateEmail, validatePassword} from "@/utils/validators.ts";
import {useLoginUserMutation} from "@/api/authApi.ts";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [login, {isSuccess, isError, error}] = useLoginUserMutation();

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess])

    const submitHandler = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        setEmailError(emailError);
        setPasswordError(passwordError);
        if (emailError || passwordError) {
            return;
        }

        login({email, password});
    }

    const processError = useCallback(() => {
        const fetchError = error as {data: object};
        if (isError) {
            if ('message' in fetchError.data && fetchError.data.message === 'User does not exist') {
                return <p className={styles.error}>Пользователь не найден</p>;
            }

            if ('message' in fetchError.data && fetchError.data.message === 'Incorrect password') {
                return <p className={styles.error}>Неверный пароль</p>;
            }
            return <p className={styles.error}>Непридвиденная ошибка, попробуйте позже</p>;
        }
    }, [isError, error]);


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
            {processError()}
            <Button onClick={submitHandler} className={styles.button} size={"lg"} width='full'>Войти</Button>
        </VStack>
    </form>
}

export default LoginForm;