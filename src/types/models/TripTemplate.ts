import User from "@/types/models/User.ts";

interface TripTemplate {
    _id?: string;
    name: string;
    budget: number;
    description: string;
    imageUrl?: string;
    checklist: string[];
    daysLength: number;
    createdBy?: Omit<User, "name">;
}

export default TripTemplate;