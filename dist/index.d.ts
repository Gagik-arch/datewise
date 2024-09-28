import { IDay, ICalendar } from './interfaces';
declare class Calendar implements ICalendar {
    #private;
    value: Date;
    locale: string;
    days: IDay[];
    months: string[];
    weekDays: string[];
    constructor(date: Date, locale: string);
    changeLocale(locale: string): void;
    toDate(date: Date): void;
    toNextMonth(): void;
    toPrevMonth(): void;
    toNextYear(): void;
    toPrevYear(): void;
}
export type { ICalendar, IDay };
export default Calendar;
