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

const validateDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cleanedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (isNaN(cleanedDate.getTime())) {
        return "Введите дату";
    }

    if (cleanedDate.getFullYear() > today.getFullYear() + 1 || cleanedDate.getTime() < today.getTime()) {
        return "Некорректный промежуток даты"
    }

    return "";
}

export const validateStartDate = validateDate;

export const validateEndDate = (startDate: Date, endDate: Date) => {
    const basicValidationError = validateDate(endDate);
    if (basicValidationError !== "") {
        return basicValidationError;
    }

    const cleanedStartDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const cleanedEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    if (cleanedEndDate.getTime() <= cleanedStartDate.getTime()) {
        return "Дата конца должна быть позже даты начала";
    }

    return "";
};

export const validateNumber = (number: number) => {
    if (number <= 0 || isNaN(number)) {
        return "Введите корректное значение";
    }
    return "";
}