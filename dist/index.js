import Day from './day.js';
import { DAY_MS } from './constants.js';
class Calendar {
    value;
    locale;
    days;
    months = [];
    weekDays = [];
    selected;
    constructor(date = new Date(), locale = 'en-US') {
        this.locale = locale;
        this.selected = new Date(date.setHours(0, 0, 0, 0));
        this.value = this.selected;
        this.#generateWithLocale();
        this.days = this.#initCalendar();
    }
    toDate = (date) => {
        if (!date)
            throw new Error('first argument<Date> is required');
        this.selected = date;
        this.value = date;
        this.days = this.#initCalendar();
        return this.value;
    };
    toNextMonth = () => {
        this.selected = this.#getNextMonth(this.selected);
        this.days = this.#initCalendar();
    };
    toPrevMonth = () => {
        this.selected = this.#getPrevMonth(this.selected);
        this.days = this.#initCalendar();
    };
    toNextYear = () => {
        this.selected = this.#getNextYear(this.selected);
        this.days = this.#initCalendar();
    };
    toPrevYear = () => {
        this.selected = this.#getPrevYear(this.selected);
        this.days = this.#initCalendar();
    };
    changeLocale(locale) {
        this.locale = locale;
    }
    #initCalendar() {
        const year = this.selected.getFullYear(), month = this.selected.getMonth(), dates = [], _firstDayOfWeek = this.#getFirstDayOfMonth(month, year), _prevMonthDaysCount = this.#daysInMonth(month, year), startDate = new Date(year, month - 1, _prevMonthDaysCount - _firstDayOfWeek + 1);
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate.getTime() + DAY_MS * i);
            const isCurrentMonth = date.getMonth() === month;
            const isNextMonth = date.getMonth() === month + 1;
            dates.push(new Day(date, isCurrentMonth
                ? 'current-month'
                : isNextMonth
                    ? 'next-month'
                    : 'prev-month'));
        }
        return dates;
    }
    #generateWithLocale() {
        this.months = Array.from({ length: 12 }, (_, i) => new Date(2024, i, 1)
            .toLocaleString(this.locale, { month: 'long' }));
        const date = new Date(2024, 8, 29);
        const sunday = new Date(date.setDate(date.getDate() - date.getDay()));
        this.weekDays = Array.from({ length: 7 }, (_, i) => {
            return new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + i)
                .toLocaleString(this.locale, {
                weekday: 'long',
            });
        });
    }
    #daysInMonth(month, year) {
        return new Date(year, month, 0)
            .getDate();
    }
    #getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1)
            .getDay();
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