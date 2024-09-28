import { IDay, ICalendar } from './interfaces';
declare class Calendar implements ICalendar {
    #private;
    value: Date;
    days: IDay[];
    range: Date[];
    locale: string;
    months: string[];
    weekDays: string[];
    constructor(date?: Date, locale?: string);
    changeLocale(locale: string): void;
    initCalendar(): IDay[];
    toDate(date: Date, selectedRange: Date): void;
    toNextMonth(): void;
    toPrevMonth(): void;
    toNextYear(): void;
    toPrevYear(): void;
    private createRange;
}
export type { ICalendar, IDay };
export default Calendar;
