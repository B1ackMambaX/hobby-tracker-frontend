function escapeText(str: string): string {
    return str.replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

// Новый форматтер дат без времени
function formatDateOnly(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return (
        date.getFullYear().toString() +
        pad(date.getMonth() + 1) +
        pad(date.getDate())
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
    const dtstamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0,15) + 'Z';

    // По спецификации iCalendar DTEND для all-day – это НЕ включительно,
    // поэтому обычно к дате окончания прибавляют один день:
    const endPlusOne = new Date(trip.endDate);
    endPlusOne.setDate(endPlusOne.getDate() + 1);

    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//TravelTracker//EN',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtstamp}`,
        // вот тут меняем на date-only
        `DTSTART;VALUE=DATE:${formatDateOnly(trip.startDate)}`,
        `DTEND;VALUE=DATE:${formatDateOnly(endPlusOne)}`,
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
