interface Trip {
    _id?: string;
    name: string;
    startDate: Date;
    endDate: Date;
    budget: number;
    status: string;
}

export default Trip;