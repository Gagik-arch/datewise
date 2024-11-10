import { type TDateStatus } from "./types";
export interface IDay {
    date: Date;
    status: TDateStatus;
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
