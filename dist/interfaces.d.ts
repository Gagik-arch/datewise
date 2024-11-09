export interface IDay {
    date: Date;
    status: string;
}
export interface ICalendar {
    value: Date;
    locale: string;
    days: IDay[];
    toNextMonth(): void;
    toPrevMonth(): void;
    toNextYear(): void;
    toPrevYear(): void;
    toDate(date: Date): void;
    changeLocale(locale: string): void;
}
