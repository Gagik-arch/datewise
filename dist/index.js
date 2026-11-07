import Day from './day.js';
class Calendar {
    value;
    locale;
    days;
    months = [];
    weekDays = [];
    selected;
    constructor(date = new Date(), locale = 'en-US') {
        this.#validateDate(date);
        this.locale = locale;
        this.selected = this.#normalizeDate(date);
        this.value = new Date(this.selected);
        this.#generateWithLocale();
        this.days = this.#initCalendar();
    }
    toDate(date) {
        this.#validateDate(date);
        this.selected = this.#normalizeDate(date);
        this.value = new Date(this.selected);
        this.days = this.#initCalendar();
        return new Date(this.value);
    }
    toNextMonth() {
        this.selected = this.#getNextMonth(this.selected);
        this.#updateCalendar();
    }
    toPrevMonth() {
        this.selected = this.#getPrevMonth(this.selected);
        this.#updateCalendar();
    }
    toNextYear() {
        this.selected = this.#getNextYear(this.selected);
        this.#updateCalendar();
    }
    toPrevYear() {
        this.selected = this.#getPrevYear(this.selected);
        this.#updateCalendar();
    }
    changeLocale(locale) {
        this.locale = locale;
        this.#generateWithLocale();
    }
    #updateCalendar() {
        this.value = new Date(this.selected);
        this.days = this.#initCalendar();
    }
    #initCalendar() {
        const year = this.selected.getFullYear();
        const month = this.selected.getMonth();
        const firstDay = this.#getFirstDayOfMonth(month, year);
        const startDate = new Date(year, month, 1 - firstDay);
        const dates = [];
        for (let i = 0; i < 42; i++) {
            const date = new Date(year, month, startDate.getDate() + i);
            const isCurrentMonth = date.getFullYear() === year &&
                date.getMonth() === month;
            const isPreviousMonth = date.getFullYear() < year ||
                (date.getFullYear() === year &&
                    date.getMonth() < month);
            const status = isCurrentMonth
                ? 'current-month'
                : isPreviousMonth
                    ? 'prev-month'
                    : 'next-month';
            dates.push(new Day(date, status));
        }
        return dates;
    }
    #generateWithLocale() {
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
    #normalizeDate(date) {
        const normalized = new Date(date);
        normalized.setHours(0, 0, 0, 0);
        return normalized;
    }
    #validateDate(date) {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
            throw new Error('A valid Date instance is required.');
        }
    }
    #getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }
    #getPrevMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1);
    }
    #getNextMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
    #getPrevYear(date) {
        return new Date(date.getFullYear() - 1, date.getMonth(), 1);
    }
    #getNextYear(date) {
        return new Date(date.getFullYear() + 1, date.getMonth(), 1);
    }
}
export default Calendar;
//# sourceMappingURL=index.js.map