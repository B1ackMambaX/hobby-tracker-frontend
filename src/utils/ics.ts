function escapeText(str: string): string {
    return str.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}


function toUtcString(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return (
        date.getUTCFullYear() +
        pad(date.getUTCMonth() + 1) +
        pad(date.getUTCDate()) +
        'T' +
        pad(date.getUTCHours()) +
        pad(date.getUTCMinutes()) +
        pad(date.getUTCSeconds()) +
        'Z'
    );
}

function generateIcs(trip: {
    id: string | number;
    name: string;
    startDate: Date;
    endDate: Date;
    description?: string;
}): string {
    const uid = `${trip.id}@traveltracker.local`;
    const dtstamp = toUtcString(new Date());
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//TravelTracker//EN',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART:${toUtcString(trip.startDate)}`,
        `DTEND:${toUtcString(trip.endDate)}`,
        `SUMMARY:${escapeText(trip.name)}`,
        trip.description
            ? `DESCRIPTION:${escapeText(trip.description)}`
            : undefined,
        'END:VEVENT',
        'END:VCALENDAR',
    ].filter(Boolean) as string[];

    return lines.join('\r\n');
}

export function downloadIcsFile(trip: {
    id: string | number;
    name: string;
    startDate: Date;
    endDate: Date;
    description?: string;
}) {
    const icsContent = generateIcs(trip);
    const blob = new Blob([icsContent], {
        type: 'text/calendar;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trip-${trip.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
