
import Day from './day.js';

class Calendar {
    public value: Date;
    public locale: string;
    public days: Day[];
    public months: string[] = [];
    public weekDays: string[] = [];
    public selected: Date;

    constructor(date: Date = new Date(), locale = 'en-US') {
        this.#validateDate(date);

        this.locale = locale;
        this.selected = this.#normalizeDate(date);
        this.value = new Date(this.selected);

        this.#generateWithLocale();
        this.days = this.#initCalendar();
    }

    public toDate(date: Date): Date {
        this.#validateDate(date);

        this.selected = this.#normalizeDate(date);
        this.value = new Date(this.selected);
        this.days = this.#initCalendar();

        return new Date(this.value);
    }

    public toNextMonth(): void {
        this.selected = this.#getNextMonth(this.selected);
        this.#updateCalendar();
    }

    public toPrevMonth(): void {
        this.selected = this.#getPrevMonth(this.selected);
        this.#updateCalendar();
    }

    public toNextYear(): void {
        this.selected = this.#getNextYear(this.selected);
        this.#updateCalendar();
    }

    public toPrevYear(): void {
        this.selected = this.#getPrevYear(this.selected);
        this.#updateCalendar();
    }

    public changeLocale(locale: string): void {
        this.locale = locale;
        this.#generateWithLocale();
    }

    #updateCalendar(): void {
        this.value = new Date(this.selected);
        this.days = this.#initCalendar();
    }

    #initCalendar(): Day[] {
        const year = this.selected.getFullYear();
        const month = this.selected.getMonth();

        const firstDay = this.#getFirstDayOfMonth(month, year);

        const startDate = new Date(
            year,
            month,
            1 - firstDay
        );

        const dates: Day[] = [];

        for (let i = 0; i < 42; i++) {
            const date = new Date(
                year,
                month,
                startDate.getDate() + i
            );

            const isCurrentMonth =
                date.getFullYear() === year &&
                date.getMonth() === month;

            const isPreviousMonth =
                date.getFullYear() < year ||
                (
                    date.getFullYear() === year &&
                    date.getMonth() < month
                );

            const status = isCurrentMonth
                ? 'current-month'
                : isPreviousMonth
                    ? 'prev-month'
                    : 'next-month';

            dates.push(new Day(date, status));
        }

        return dates;
    }

    #generateWithLocale(): void {
        this.months = Array.from(
            { length: 12 },
            (_, i) => new Date(2024, i, 1)
                .toLocaleString(this.locale, {
                    month: 'long'
                })
        );

        const sunday = new Date(2024, 8, 29);
        sunday.setDate(sunday.getDate() - sunday.getDay());

        this.weekDays = Array.from(
            { length: 7 },
            (_, i) => new Date(
                sunday.getFullYear(),
                sunday.getMonth(),
                sunday.getDate() + i
            ).toLocaleString(this.locale, {
                weekday: 'long'
            })
        );
    }

    #normalizeDate(date: Date): Date {
        const normalized = new Date(date);
        normalized.setHours(0, 0, 0, 0);

        return normalized;
    }

    #validateDate(date: Date): void {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
            throw new Error('A valid Date instance is required.');
        }
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
}

export default Calendar;
