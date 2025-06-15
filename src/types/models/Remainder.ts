interface Remainder {
    _id: string
    message: string
    status: 'pending' | 'done' | 'postponed';
    remindAt: Date;
    postponedUntil?: Date;
}

export default Remainder;