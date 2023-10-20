import dayjs from "dayjs";

export const dateFormat = "YYYY-MM-DD";
export const timeFormat = "HH:mm";

export interface TimeRecord {
    date: string | null;
    from: string | null;
    to: string | null;
    task: string | null;
}

export interface SortableTimeRecord extends TimeRecord {
    key: number;
}

export interface CompleteTimeRecord extends SortableTimeRecord {
    time: string | null;
}

export function toCompleteRecord(timerecord: TimeRecord): CompleteTimeRecord {
    return {
        ...timerecord,
        time: getTime(timerecord),
        key: getKey(timerecord),
    };
}

export function getTime(record: TimeRecord): string {
    return m2HHmm(dayjs(record.to, timeFormat).diff(dayjs(record.from, timeFormat), "m"));
}

export function m2HHmm(minutes: number): string {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;

    return (h < 10 ? "0" + h.toString() : h.toString()) + ":" + (m < 10 ? "0" + m.toString() : m.toString());
}

export function getKey(record: TimeRecord): number {
    if (record.from != null) {
        return dayjs((record.date ?? "9999-12-31") + record.from, dateFormat + timeFormat).unix();
    } else if (record.date != null) {
        return dayjs(record.date, dateFormat).add(1, "day").unix();
    }

    return 0;
}
