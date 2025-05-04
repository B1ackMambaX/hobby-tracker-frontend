export const validateEmail = (email: string) => {
    const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (email.length === 0) {
        return 'Введите email';
    }

    if (!emailRegexp.test(email)) {
        return "Введите корректный email";
    }

    return "";
}

export const validatePassword = (password: string) => {
    if (password.length === 0) {
        return "Введите пароль";
    }
    if (password.length < 8) {
        return "Пароль должен быть больше 8 символов";
    }

    return "";
}

export const validateRequiredField = (field: string) => {
    if (field.length === 0) {
        return "Заполните поле";
    }

    return "";
}