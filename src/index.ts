import { IDay, ICalendar } from './interfaces';
import Day from './day.js';
import { type TDateStatus } from './types';
import { DAY_MS } from './constants.js'

class Calendar implements ICalendar {
    public value: Date;
    public locale: string;
    public days: IDay[];
    public months: string[] = [];
    public weekDays: string[] = [];
    public selected: Date;

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
        const year: number = this.selected.getFullYear(),
            month: number = this.selected.getMonth(),
            dates: IDay[] = [],
            _firstDayOfWeek: number = this.#getFirstDayOfMonth(
                month,
                year
            ),
            _prevMonthDaysCount: number = this.#daysInMonth(month, year),
            startDate: Date = new Date(
                year,
                month - 1,
                _prevMonthDaysCount - _firstDayOfWeek + 1
            );

        for (let i: number = 0; i < 42; i++) {
            const date: Date = new Date(startDate.getTime() + DAY_MS * i)
            const isCurrentMonth: boolean = date.getMonth() === month
            const isNextMonth: boolean = date.getMonth() === month + 1

            dates.push(
                new Day(date, this.#compareTwoDates(
                    this.value,
                    date
                )
                    ? 'selected-date' :
                    isCurrentMonth ?
                        'current-month' :
                        isNextMonth ?
                            'next-month' :
                            'prev-month'
                )
            );
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

    #daysInMonth(month: number, year: number): number {
        return new Date(year, month, 0).getDate();
    }

    #getFirstDayOfMonth(month: number, year: number): number {
        return new Date(year, month, 1).getDay();
    }

    #getPrevMonth(date: Date): Date {
        return new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            1
        );
    }

    #getNextMonth(date: Date): Date {
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            1
        );
    }

    #getPrevYear(date: Date): Date {
        return new Date(
            date.getFullYear() - 1,
            date.getMonth(),
            1
        );
    }
    #getNextYear(date: Date): Date {
        return new Date(
            date.getFullYear() + 1,
            date.getMonth(),
            1
        );
    }
    #compareTwoDates(date1: Date, date2: Date): boolean {
        return date1.getTime() === date2.getTime();
    }
}

export type { ICalendar, IDay, TDateStatus };
export default Calendar;
