var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Calendar_instances, _Calendar_initCalendar, _Calendar_generateWithLocale, _Calendar_daysInMonth, _Calendar_getFirstDayOfMonth, _Calendar_getPrevMonth, _Calendar_getNextMonth, _Calendar_getPrevYear, _Calendar_getNextYear, _Calendar_compareTwoDates;
import Day from './day.js';
import { DAY_MS } from './constants';
class Calendar {
    constructor(date = new Date(), locale = 'en-US') {
        _Calendar_instances.add(this);
        this.months = [];
        this.weekDays = [];
        this.locale = locale;
        this.selected = new Date(date.setHours(0, 0, 0, 0));
        this.value = this.selected;
        __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_generateWithLocale).call(this);
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
    toDate(date) {
        if (!date)
            throw new Error('first argument<date> is required');
        this.selected = date;
        this.value = date;
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
    toNextMonth() {
        this.selected = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_getNextMonth).call(this, this.selected);
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
    toPrevMonth() {
        this.selected = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_getPrevMonth).call(this, this.selected);
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
    toNextYear() {
        this.selected = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_getNextYear).call(this, this.selected);
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
    toPrevYear() {
        this.selected = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_getPrevYear).call(this, this.selected);
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
    changeLocale(locale) {
        this.locale = locale;
    }
}
_Calendar_instances = new WeakSet(), _Calendar_initCalendar = function _Calendar_initCalendar() {
    const year = this.selected.getFullYear(), month = this.selected.getMonth(), dates = [], _firstDayOfWeek = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_getFirstDayOfMonth).call(this, month, year), _prevMonthDaysCount = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_daysInMonth).call(this, month, year), startDate = new Date(year, month - 1, _prevMonthDaysCount - _firstDayOfWeek + 1);
    for (let i = 0; i < 42; i++) {
        const date = new Date(startDate.getTime() + DAY_MS * i);
        const isCurrentMonth = date.getMonth() === month;
        const isNextMonth = date.getMonth() === month + 1;
        dates.push(new Day(date, __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_compareTwoDates).call(this, this.value, date)
            ? 'selected-date' :
            isCurrentMonth ?
                'current-month' :
                isNextMonth ?
                    'next-month' :
                    'prev-month'));
    }
    return dates;
}, _Calendar_generateWithLocale = function _Calendar_generateWithLocale() {
    this.months = Array.from({ length: 12 }, (_, i) => new Date(2024, i, 1).toLocaleString(this.locale, { month: 'long' }));
    let date = new Date(2024, 8, 29);
    const sunday = new Date(date.setDate(date.getDate() - date.getDay()));
    this.weekDays = Array.from({ length: 7 }, (_, i) => {
        return new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + i).toLocaleString(this.locale, {
            weekday: 'long',
        });
    });
}, _Calendar_daysInMonth = function _Calendar_daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}, _Calendar_getFirstDayOfMonth = function _Calendar_getFirstDayOfMonth(month, year) {
    return new Date(year, month, 1).getDay();
}, _Calendar_getPrevMonth = function _Calendar_getPrevMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}, _Calendar_getNextMonth = function _Calendar_getNextMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}, _Calendar_getPrevYear = function _Calendar_getPrevYear(date) {
    return new Date(date.getFullYear() - 1, date.getMonth(), 1);
}, _Calendar_getNextYear = function _Calendar_getNextYear(date) {
    return new Date(date.getFullYear() + 1, date.getMonth(), 1);
}, _Calendar_compareTwoDates = function _Calendar_compareTwoDates(date1, date2) {
    return date1.getTime() === date2.getTime();
};
export default Calendar;
