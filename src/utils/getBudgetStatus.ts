import Trip from "@/types/models/Trip.ts";
import Spend from "@/types/models/Spend.ts";
import SpendCategory from "@/types/models/SpendCategory.ts";

function calculateSpendStats(
    trip: Trip,
    spends: Spend[]
): SpendCategory[] {
    const sums: Record<'transport' | 'food' | 'residence' | 'other', number> = {
        transport: 0,
        food: 0,
        residence: 0,
        other: 0,
    };

    for (const s of spends) {
        sums[s.category] += s.amount;
    }

    const totalSpent = Object.values(sums).reduce((acc, v) => acc + v, 0);
    const leftover = Math.max(trip.budget - totalSpent, 0);

    return [
        { category: 'transport', amount: sums.transport },
        { category: 'food',      amount: sums.food },
        { category: 'residence', amount: sums.residence },
        { category: 'other',     amount: sums.other },
        { category: 'leftover',  amount: leftover },
    ];
}

export default calculateSpendStats;