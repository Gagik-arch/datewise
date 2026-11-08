import Day from './day.js';
class Calendar {
    value;
    locale;
    days;
    months = [];
    weekDays = [];
    cursor;
    constructor(date = new Date(), locale = 'en-US') {
        this.#ValidateDate(date);
        this.locale = locale;
        this.cursor = new Date(date.getFullYear(), date.getMonth(), 1);
        this.value = date;
        this.#GenerateWithLocale();
        this.days = this.#InitCalendar();
    }
    SetValue(date) {
        this.#ValidateDate(date);
        this.value = new Date(date);
        return new Date(this.value);
    }
    SetCursor(date) {
        this.#ValidateDate(date);
        const cursor = this.#NormalizeDate(new Date(date.getFullYear(), date.getMonth(), 1));
        this.cursor = cursor;
        this.#UpdateCalendar();
        return new Date(this.cursor);
    }
    ToNextMonth() {
        this.SetCursor(this.#GetNextMonth(this.cursor));
    }
    ToPrevMonth() {
        this.SetCursor(this.#GetPrevMonth(new Date(this.cursor)));
    }
    ToNextYear() {
        this.SetCursor(this.#GetNextYear(this.cursor));
    }
    ToPrevYear() {
        this.SetCursor(this.#GetPrevYear(this.cursor));
    }
    ChangeLocale(locale) {
        this.locale = locale;
        this.#GenerateWithLocale();
    }
    IsEqual(date1, date2) {
        return date1.getTime() === date2.getTime();
    }
    #UpdateCalendar() {
        this.days = this.#InitCalendar();
    }
    #InitCalendar() {
        const year = this.cursor.getFullYear();
        const month = this.cursor.getMonth();
        const firstDayOfWeek = this.#GetFirstDayOfMonth(month, year);
        const startDate = new Date(year, month, 1 - firstDayOfWeek);
        const dates = [];
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            const isCurrentMonth = date.getFullYear() === year &&
                date.getMonth() === month;
            const isPreviousMonth = date.getFullYear() < year ||
                (date.getFullYear() === year &&
                    date.getMonth() < month);
            dates.push(new Day(date, isCurrentMonth
                ? 'current-month'
                : isPreviousMonth
                    ? 'prev-month'
                    : 'next-month'));
        }
        return dates;
    }
    #GenerateWithLocale() {
        this.months = Array.from({ length: 12 }, (_, i) => new Date(2024, i, 1)
            .toLocaleString(this.locale, {
            month: 'long'
        }));
        const sunday = new Date(2024, 8, 29);
        sunday.setDate(sunday.getDate() - sunday.getDay());
        this.weekDays = Array.from({ length: 7 }, (_, i) => new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + i).toLocaleString(this.locale, {
            weekday: 'long'
        }));
    }
    #NormalizeDate(date) {
        const normalized = new Date(date);
        normalized.setHours(0, 0, 0, 0);
        return normalized;
    }
    #ValidateDate(date) {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
            throw new Error('A valid Date instance is required.');
        }
    }
    #GetFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }
    #GetPrevMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1);
    }
    #GetNextMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
    #GetPrevYear(date) {
        return new Date(date.getFullYear() - 1, date.getMonth(), 1);
    }
    #GetNextYear(date) {
        return new Date(date.getFullYear() + 1, date.getMonth(), 1);
    }
}
export default Calendar;
//# sourceMappingURL=index.js.map