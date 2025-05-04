import {Button, Field, Input, VStack} from "@chakra-ui/react";
import {Link, useNavigate} from "react-router";
import styles from "./registerForm.module.scss";
import {useCallback, useEffect, useState} from "react";
import {validateEmail, validatePassword, validateRequiredField} from "@/utils/validators.ts";
import {useRegisterUserMutation} from "@/api/authApi.ts";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [register, {isSuccess, isError, error}] = useRegisterUserMutation();


    useEffect(() => {
        if (isSuccess) {
            navigate("/");
        }
    }, [isSuccess]);


    const handleSubmit = () => {
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const nameError = validateRequiredField(name);
        setEmailError(emailError);
        setPasswordError(passwordError);
        setNameError(nameError);
        if (emailError || passwordError || nameError) {
            return;
        }

        register({name, email, password});
    }

    const processError = useCallback(() => {
        const fetchError = error as {data: object};
        if (isError) {
            if ('message' in fetchError.data && fetchError.data.message === 'User already exists') {
                return <p className={styles.error}>Пользователь уже существует</p>;
            }
            return <p className={styles.error}>Непридвиденная ошибка, попробуйте позже</p>;
        }
    }, [isError, error]);


    return <form className={styles.form}>
        <img className={styles.logo} src="/public/logo.svg" alt="Логотип"/>
        <VStack className={styles.inner} gap={"1.25rem"} width='full'>
            <h1 className={styles.heading}>Регистрация</h1>
            <Field.Root invalid={nameError !== ''}>
                <Field.Label>Имя</Field.Label>
                <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={styles.input}
                    size={"md"}
                    placeholder="Введите имя"
                />
                <Field.ErrorText>{nameError}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={emailError !== ''}>
                <Field.Label>Email</Field.Label>
                <Input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={styles.input}
                    size={"md"}
                    placeholder="Введите email"
                />
                <Field.ErrorText>{emailError}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={passwordError !== ''}>
                <Field.Label>Пароль</Field.Label>
                <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={styles.input}
                    size={"md"}
                    placeholder="Введите пароль"
                />
                <Field.ErrorText>{passwordError}</Field.ErrorText>
            </Field.Root>
            <p className={styles.link}>Есть аккаунт? <Link className={styles.link__inner}
                                                           to={'/login'}>Войдите</Link></p>
            {processError()}
            <Button onClick={handleSubmit} className={styles.button} size={"lg"} width='full'>Зарегистрироваться</Button>
        </VStack>
    </form>
}

export default LoginForm;