interface TripTemplate {
    name: string;
    budget: number;
    description: string;
    imageUrl?: string;
    checklist: string[];
    daysLength: number;
    createdBy?: string;
}

export default TripTemplate;