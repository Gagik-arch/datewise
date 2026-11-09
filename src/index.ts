
import Day from './day.js';

class Calendar {
    public value: Date;
    public locale: string;
    public days: Day[];
    public months: string[] = [];
    public weekDays: string[] = [];
    public cursor: Date;

    constructor(date: Date = new Date(), locale = 'en-US') {
        this.#ValidateDate(date);

        this.locale = locale;


        this.cursor = new Date(date.getFullYear(), date.getMonth(), 1)
        this.value = date;

        this.#GenerateWithLocale();
        this.days = this.#InitCalendar();
    }

    public SetValue(date: Date): Date {
        this.#ValidateDate(date);

        this.value = new Date(date);

        return new Date(this.value);
    }

    public SetCursor(date: Date): Date {
        this.#ValidateDate(date);

        const cursor = this.#NormalizeDate(new Date(date.getFullYear(), date.getMonth(), 1));

        this.cursor = cursor
        this.#UpdateCalendar();

        return new Date(this.cursor);
    }

    public ToNextMonth(): void {
        this.SetCursor(this.#GetNextMonth(this.cursor));
    }

    public ToPrevMonth(): void {
        this.SetCursor(this.#GetPrevMonth(new Date(this.cursor)));
    }

    public ToNextYear(): void {
        this.SetCursor(this.#GetNextYear(this.cursor));
    }

    public ToPrevYear(): void {
        this.SetCursor(this.#GetPrevYear(this.cursor));
    }

    public ChangeLocale(locale: string): void {
        this.locale = locale;
        this.#GenerateWithLocale();
    }

    public IsEqual(date1: Date, date2: Date) {
        return date1.getTime() === date2.getTime()
    }

    #UpdateCalendar(): void {
        this.days = this.#InitCalendar();
    }

    #InitCalendar(): Day[] {
        const year = this.cursor.getFullYear();
        const month = this.cursor.getMonth();

        const firstDayOfWeek = this.#GetFirstDayOfMonth(month, year);

        const startDate = new Date(
            year,
            month,
            1 - firstDayOfWeek
        );

        const dates: Day[] = [];

        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const isCurrentMonth =
                date.getFullYear() === year &&
                date.getMonth() === month;

            const isPreviousMonth =
                date.getFullYear() < year ||
                (
                    date.getFullYear() === year &&
                    date.getMonth() < month
                );

            dates.push(
                new Day(
                    date,
                    isCurrentMonth
                        ? 'current-month'
                        : isPreviousMonth
                            ? 'prev-month'
                            : 'next-month'
                )
            );
        }

        return dates;
    }

    #GenerateWithLocale(): void {
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

    #NormalizeDate(date: Date): Date {
        const normalized = new Date(date);
        normalized.setHours(0, 0, 0, 0);

        return normalized;
    }

    #ValidateDate(date: Date): void {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
            throw new Error('A valid Date instance is required.');
        }
    }

    #GetFirstDayOfMonth(month: number, year: number): number {
        return new Date(year, month, 1).getDay();
    }

    #GetPrevMonth(date: Date): Date {
        return new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            1
        );
    }

    #GetNextMonth(date: Date): Date {
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            1
        );
    }

    #GetPrevYear(date: Date): Date {
        return new Date(
            date.getFullYear() - 1,
            date.getMonth(),
            1
        );
    }

    #GetNextYear(date: Date): Date {
        return new Date(
            date.getFullYear() + 1,
            date.getMonth(),
            1
        );
    }
}

if (typeof window !== 'undefined') {
    window['datewise'] = Calendar;
}

export default Calendar;
