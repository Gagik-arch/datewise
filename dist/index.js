var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Calendar_initCalendar, _Calendar_generateWithLocale, _Calendar_daysInMonth, _Calendar_getFirstDayOfMonth, _Calendar_getPrevMonth, _Calendar_getNextMonth, _Calendar_getPrevYear, _Calendar_getNextYear, _Calendar_compareTwoDates;
import Day from './day.js';
import { DAY_MS } from './constants.js';
class Calendar {
    constructor(date = new Date(), locale = 'en-US') {
        this.months = [];
        this.weekDays = [];
        this.toDate = (date) => {
            if (!date)
                throw new Error('first argument<date> is required');
            this.selected = date;
            this.value = date;
            this.days = __classPrivateFieldGet(this, _Calendar_initCalendar, "f").call(this);
        };
        this.toNextMonth = () => {
            this.selected = __classPrivateFieldGet(this, _Calendar_getNextMonth, "f").call(this, this.selected);
            this.days = __classPrivateFieldGet(this, _Calendar_initCalendar, "f").call(this);
        };
        this.toPrevMonth = () => {
            this.selected = __classPrivateFieldGet(this, _Calendar_getPrevMonth, "f").call(this, this.selected);
            this.days = __classPrivateFieldGet(this, _Calendar_initCalendar, "f").call(this);
        };
        this.toNextYear = () => {
            this.selected = __classPrivateFieldGet(this, _Calendar_getNextYear, "f").call(this, this.selected);
            this.days = __classPrivateFieldGet(this, _Calendar_initCalendar, "f").call(this);
        };
        this.toPrevYear = () => {
            this.selected = __classPrivateFieldGet(this, _Calendar_getPrevYear, "f").call(this, this.selected);
            this.days = __classPrivateFieldGet(this, _Calendar_initCalendar, "f").call(this);
        };
        this.changeLocale = (locale) => {
            this.locale = locale;
        };
        _Calendar_initCalendar.set(this, () => {
            const year = this.selected.getFullYear(), month = this.selected.getMonth(), dates = [], _firstDayOfWeek = __classPrivateFieldGet(this, _Calendar_getFirstDayOfMonth, "f").call(this, month, year), _prevMonthDaysCount = __classPrivateFieldGet(this, _Calendar_daysInMonth, "f").call(this, month, year), startDate = new Date(year, month - 1, _prevMonthDaysCount - _firstDayOfWeek + 1);
            for (let i = 0; i < 42; i++) {
                const date = new Date(startDate.getTime() + DAY_MS * i);
                const isCurrentMonth = date.getMonth() === month;
                const isNextMonth = date.getMonth() === month + 1;
                dates.push(new Day(date, __classPrivateFieldGet(this, _Calendar_compareTwoDates, "f").call(this, new Date(), date)
                    ? 'selected-date' :
                    isCurrentMonth ?
                        'current-month' :
                        isNextMonth ?
                            'next-month' :
                            'prev-month'));
            }
            return dates;
        });
        _Calendar_generateWithLocale.set(this, () => {
            this.months = Array.from({ length: 12 }, (_, i) => new Date(2024, i, 1).toLocaleString(this.locale, { month: 'long' }));
            let date = new Date(2024, 8, 29);
            const sunday = new Date(date.setDate(date.getDate() - date.getDay()));
            this.weekDays = Array.from({ length: 7 }, (_, i) => {
                return new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + i).toLocaleString(this.locale, {
                    weekday: 'long',
                });
            });
        });
        _Calendar_daysInMonth.set(this, (month, year) => {
            return new Date(year, month, 0).getDate();
        });
        _Calendar_getFirstDayOfMonth.set(this, (month, year) => {
            return new Date(year, month, 1).getDay();
        });
        _Calendar_getPrevMonth.set(this, (date) => {
            return new Date(date.getFullYear(), date.getMonth() - 1, 1);
        });
        _Calendar_getNextMonth.set(this, (date) => {
            return new Date(date.getFullYear(), date.getMonth() + 1, 1);
        });
        _Calendar_getPrevYear.set(this, (date) => {
            return new Date(date.getFullYear() - 1, date.getMonth(), 1);
        });
        _Calendar_getNextYear.set(this, (date) => {
            return new Date(date.getFullYear() + 1, date.getMonth(), 1);
        });
        _Calendar_compareTwoDates.set(this, (date1, date2) => {
            return date1.getTime() === date2.getTime();
        });
        this.locale = locale;
        this.selected = new Date(date.setHours(0, 0, 0, 0));
        this.value = this.selected;
        __classPrivateFieldGet(this, _Calendar_generateWithLocale, "f").call(this);
        this.days = __classPrivateFieldGet(this, _Calendar_initCalendar, "f").call(this);
    }
}
_Calendar_initCalendar = new WeakMap(), _Calendar_generateWithLocale = new WeakMap(), _Calendar_daysInMonth = new WeakMap(), _Calendar_getFirstDayOfMonth = new WeakMap(), _Calendar_getPrevMonth = new WeakMap(), _Calendar_getNextMonth = new WeakMap(), _Calendar_getPrevYear = new WeakMap(), _Calendar_getNextYear = new WeakMap(), _Calendar_compareTwoDates = new WeakMap();
export default Calendar;
