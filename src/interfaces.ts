export interface IDay {
    date: Date;
    label: number | string;
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
    toDate(date: Date, selectedRange?: Date): void;
    changeLocale(locale: string): void;
}
