import { IDay, ICalendar } from './interfaces';
import Day from './day.js';

class Calendar implements ICalendar {
    public value: Date;
    public locale: string;
    public days: IDay[];
    public months: string[] = [];
    public weekDays: string[] = [];
    selected: Date;

    constructor(date: Date = new Date(), locale: string = 'en-US') {
        this.locale = locale;

        this.selected = new Date(date.setHours(0, 0, 0, 0));
        this.value = this.selected;

        this.#generateWithLocale();
        this.days = this.#initCalendar();
    }
    public toDate(date: Date): void {
        if (!date) throw new Error('first argument<date> is required');
        this.selected = date;
        this.value = date;
        this.days = this.#initCalendar();
    }

    public toNextMonth(): void {
        this.selected = this.#getNextMonth(this.selected);
        this.days = this.#initCalendar();
    }

    public toPrevMonth(): void {
        this.selected = this.#getPrevMonth(this.selected);
        this.days = this.#initCalendar();
    }

    public toNextYear(): void {
        this.selected = this.#getNextYear(this.selected);
        this.days = this.#initCalendar();
    }

    public toPrevYear(): void {
        this.selected = this.#getPrevYear(this.selected);
        this.days = this.#initCalendar();
    }

    public changeLocale(locale: string): void {
        this.locale = locale;
    }

    #initCalendar(): IDay[] {
        const year: number = this.selected.getFullYear();
        const month: number = this.selected.getMonth();
        const dates: IDay[] = [];
        const _firstDayOfWeek: number = this.#getFirstDayOfWeek(
            month + 1,
            year
        );

        const _prevMonthDaysCount: number = this.#daysInMonth(month, year);
        const _currentMonthDaysCount: number = this.#daysInMonth(
            month + 1,
            year
        );

        if (_firstDayOfWeek > 0) {
            for (let p: number = _prevMonthDaysCount - _firstDayOfWeek + 1; p <= _prevMonthDaysCount; p++) {
                dates.push(
                    new Day(new Date(year, month - 1, p), 'prev-month')
                );
            }
            for (let c: number = 1; c <= _currentMonthDaysCount; c++) {
                dates.push(
                    new Day(
                        new Date(year, month, c),
                        this.#compareTwoDates(
                            this.value,
                            new Date(year, month, c)
                        )
                            ? 'selected-day'
                            : 'current-month'
                    )
                );
            }
        } else {
            for (let i: number = 1; i <= _currentMonthDaysCount; i++) {
                dates.push(
                    new Day(
                        new Date(year, month, i),
                        this.#compareTwoDates(
                            this.value,
                            new Date(year, month, i)
                        )
                            ? 'selected-day'
                            : 'current-month'
                    )
                );
            }
        }

        const remainder: number = dates.length % this.weekDays.length;
        let end: number = remainder ? this.weekDays.length - remainder : 0;

        if (dates.length <= 42) {
            end = 42 - dates.length; // 7 : 5 block
        }

        for (let i: number = 1; i <= end; i++) {
            dates.push(new Day(new Date(year, month + 1, i), 'next-month'));
        }

        return dates;
    }

    #generateWithLocale(): void {
        this.months = Array.from({ length: 12 }, (_, i: number) =>
            new Date(2024, i, 1).toLocaleString(this.locale, { month: 'long' })
        );

        let date: Date = new Date(2024, 8, 29);
        const sunday: Date = new Date(date.setDate(date.getDate() - date.getDay()));

        this.weekDays = Array.from({ length: 7 }, (_, i: number) => {
            return new Date(
                sunday.getFullYear(),
                sunday.getMonth(),
                sunday.getDate() + i
            ).toLocaleString(this.locale, {
                weekday: 'long',
            });
        });
    }

    #daysInMonth(month: number, year: number) {
        return new Date(year, month, 0).getDate();
    }

    #getFirstDayOfWeek(month: number, year: number) {
        return new Date(`${year}-${month}-01`).getDay();
    }

    #getPrevMonth(date: Date) {
        return new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            date.getDate()
        );
    }

    #getNextMonth(date: Date) {
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        );
    }

    #getPrevYear(date: Date) {
        return new Date(
            date.getFullYear() - 1,
            date.getMonth(),
            date.getDate()
        );
    }
    #getNextYear(date: Date) {
        return new Date(
            date.getFullYear() + 1,
            date.getMonth(),
            date.getDate()
        );
    }
    #compareTwoDates(date1: Date, date2: Date) {
        return date1.getTime() === date2.getTime();
    }
}

export type { ICalendar, IDay };
export default Calendar;
