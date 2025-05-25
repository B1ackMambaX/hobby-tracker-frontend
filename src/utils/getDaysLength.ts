const getDaysLength = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate);
    const end   = new Date(endDate);
    const msPerDay = 1000 * 60 * 60 * 24;

    const diffMs = end.getTime() - start.getTime();
    return Math.ceil(Math.abs(diffMs) / msPerDay);
}

export default getDaysLength;

