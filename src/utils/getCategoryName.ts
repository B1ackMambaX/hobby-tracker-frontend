export const getCategoryName = (category: string) => {
    switch (category) {
        case 'food':
            return 'Еда';
        case 'transport':
            return 'Транспорт';
        case "residence":
            return 'Проживание';
        case 'leftover':
            return 'Осталось';
        default:
            return 'Другое';
    }
}