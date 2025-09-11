import Day from './day.js';
declare class Calendar {
    #private;
    value: Date;
    locale: string;
    days: Day[];
    months: string[];
    weekDays: string[];
    selected: Date;
    constructor(date?: Date, locale?: string);
    toDate: (date: Date) => void;
    toNextMonth: () => void;
    toPrevMonth: () => void;
    toNextYear: () => void;
    toPrevYear: () => void;
    changeLocale: (locale: string) => void;
}
export default Calendar;
