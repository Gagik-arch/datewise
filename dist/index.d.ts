import { TDayStatus } from './types.js';

declare class Day {
    date: Date;
    status: TDayStatus;
    constructor(date: Date, status: TDayStatus);
    IsWeekend(): boolean;
    IsToday(): boolean;
}

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

export { Calendar as default };
