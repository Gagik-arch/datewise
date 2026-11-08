import Day from './day.js';
declare class Calendar {
    #private;
    value: Date;
    locale: string;
    days: Day[];
    months: string[];
    weekDays: string[];
    cursor: Date;
    constructor(date?: Date, locale?: string);
    SetValue(date: Date): Date;
    SetCursor(date: Date): Date;
    ToNextMonth(): void;
    ToPrevMonth(): void;
    ToNextYear(): void;
    ToPrevYear(): void;
    ChangeLocale(locale: string): void;
    IsEqual(date1: Date, date2: Date): boolean;
}
export default Calendar;
//# sourceMappingURL=index.d.ts.map