import { IDay, ICalendar } from './interfaces';
import { type TDateStatus } from './types';
declare class Calendar implements ICalendar {
    #private;
    value: Date;
    locale: string;
    days: IDay[];
    months: string[];
    weekDays: string[];
    selected: Date;
    constructor(date?: Date, locale?: string);
    toDate(date: Date): void;
    toNextMonth(): void;
    toPrevMonth(): void;
    toNextYear(): void;
    toPrevYear(): void;
    changeLocale(locale: string): void;
}
export type { ICalendar, IDay, TDateStatus };
export default Calendar;
