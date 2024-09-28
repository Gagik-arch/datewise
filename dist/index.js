var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Calendar_instances, _Calendar_selectedDate, _Calendar_generateWithLocale, _Calendar_initCalendar, _Calendar_daysInMonth, _Calendar_getFirstDayOfWeek, _Calendar_getPrevMonth, _Calendar_getNextMonth, _Calendar_getPrevYear, _Calendar_getNextYear, _Calendar_compareTwoDates;
import Day from './day.js';
class Calendar {
    constructor(date, locale) {
        _Calendar_instances.add(this);
        _Calendar_selectedDate.set(this, void 0);
        this.months = [];
        this.weekDays = [];
        this.value = date || new Date();
        this.locale = locale || 'en-US';
        __classPrivateFieldSet(this, _Calendar_selectedDate, new Date((date || new Date()).setHours(0, 0, 0, 0)), "f");
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
        console.log(this.value);
        __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_generateWithLocale).call(this);
    }
    changeLocale(locale) {
        this.locale = locale;
    }
    toDate(date) {
        if (!date)
            throw new Error('date is required');
        __classPrivateFieldSet(this, _Calendar_selectedDate, date, "f");
        this.value = date;
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
    toNextMonth() {
        __classPrivateFieldSet(this, _Calendar_selectedDate, __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_getNextMonth).call(this, __classPrivateFieldGet(this, _Calendar_selectedDate, "f")), "f");
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
    toPrevMonth() {
        __classPrivateFieldSet(this, _Calendar_selectedDate, __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_getPrevMonth).call(this, __classPrivateFieldGet(this, _Calendar_selectedDate, "f")), "f");
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
    toNextYear() {
        __classPrivateFieldSet(this, _Calendar_selectedDate, __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_getNextYear).call(this, __classPrivateFieldGet(this, _Calendar_selectedDate, "f")), "f");
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
    toPrevYear() {
        __classPrivateFieldSet(this, _Calendar_selectedDate, __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_getPrevYear).call(this, __classPrivateFieldGet(this, _Calendar_selectedDate, "f")), "f");
        this.days = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_initCalendar).call(this);
    }
}
_Calendar_selectedDate = new WeakMap(), _Calendar_instances = new WeakSet(), _Calendar_generateWithLocale = function _Calendar_generateWithLocale() {
    this.months = Array.from({ length: 12 }, (_, i) => {
        return new Date(2024, i, 1).toLocaleString(this.locale, {
            month: 'long',
        });
    });
    let date = new Date(2024, 8, 29);
    var sunday = new Date(date.setDate(date.getDate() - date.getDay()));
    this.weekDays = Array.from({ length: 7 }, (_, i) => {
        return new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + i).toLocaleString(this.locale, {
            weekday: 'long',
        });
    });
}, _Calendar_initCalendar = function _Calendar_initCalendar() {
    const year = __classPrivateFieldGet(this, _Calendar_selectedDate, "f").getFullYear();
    const month = __classPrivateFieldGet(this, _Calendar_selectedDate, "f").getMonth();
    const _firstDayOfWeek = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_getFirstDayOfWeek).call(this, month + 1, year);
    const _prevMonthDaysCount = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_daysInMonth).call(this, month, year);
    const _currentMonthDaysCount = __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_daysInMonth).call(this, month + 1, year);
    const dates = [];
    if (_firstDayOfWeek > 0) {
        let p = _prevMonthDaysCount - _firstDayOfWeek + 1, c = 1;
        while (p <= _prevMonthDaysCount) {
            dates.push(new Day(new Date(year, month - 1, p), p, 'prev-month'));
            p++;
        }
        while (c <= _currentMonthDaysCount) {
            dates.push(new Day(new Date(year, month, c), c, __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_compareTwoDates).call(this, __classPrivateFieldGet(this, _Calendar_selectedDate, "f"), new Date(year, month, c))
                ? 'selected-day'
                : 'current-month'));
            c++;
        }
    }
    else {
        let i = 1;
        while (i <= _currentMonthDaysCount) {
            dates.push(new Day(new Date(year, month, i), i, __classPrivateFieldGet(this, _Calendar_instances, "m", _Calendar_compareTwoDates).call(this, __classPrivateFieldGet(this, _Calendar_selectedDate, "f"), new Date(year, month, i))
                ? 'selected-day'
                : 'current-month'));
            i++;
        }
    }
    const remainder = dates.length % this.weekDays.length;
    let i = 1, end = 0;
    if (dates.length <= 35) {
        // 7 : 5 block
        end = 35 - dates.length;
    }
    if (remainder) {
        end = this.weekDays.length - remainder;
    }
    while (i <= end) {
        dates.push(new Day(new Date(year, month + 1, i), i, 'next-month'));
        i++;
    }
    return dates;
}, _Calendar_daysInMonth = function _Calendar_daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}, _Calendar_getFirstDayOfWeek = function _Calendar_getFirstDayOfWeek(month, year) {
    return new Date(`${year}-${month}-01`).getDay();
}, _Calendar_getPrevMonth = function _Calendar_getPrevMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
}, _Calendar_getNextMonth = function _Calendar_getNextMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
}, _Calendar_getPrevYear = function _Calendar_getPrevYear(date) {
    return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
}, _Calendar_getNextYear = function _Calendar_getNextYear(date) {
    return new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
}, _Calendar_compareTwoDates = function _Calendar_compareTwoDates(date1, date2) {
    return date1.getTime() === date2.getTime();
};
export default Calendar;
