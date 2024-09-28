export interface IDay {
    date: Date;
    label: number | string;
    status: string;
}
export interface ICalendar {
    value: Date;
    days: IDay[];
    range: Date[];
    toNextMonth(): void;
    toPrevMonth(): void;
    toNextYear(): void;
    toPrevYear(): void;
    toDate(date: Date, selectedRange?: Date): void;
}
