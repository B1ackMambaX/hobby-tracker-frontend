interface Spend {
    _id?: string;
    name: string;
    category: 'transport' | 'food' | 'residence' | 'other';
    amount: number;
    createdAt?: Date;
}

export default Spend;