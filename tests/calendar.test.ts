
import { describe, expect, it } from 'vitest';
import Calendar from '../src/index.js';

describe('Calendar', () => {
    describe('constructor', () => {
        it('should initialize with the current date by default', () => {
            const calendar = new Calendar();
            const today = new Date();

            expect(calendar.value.getFullYear()).toBe(today.getFullYear());
            expect(calendar.value.getMonth()).toBe(today.getMonth());
            expect(calendar.value.getDate()).toBe(today.getDate());
        });

        it('should initialize with the provided date', () => {
            const date = new Date(2024, 5, 15);
            const calendar = new Calendar(date);

            expect(calendar.value).toEqual(date);
            expect(calendar.cursor).toEqual(new Date(2024, 5, 1));
        });

        it('should initialize locale data', () => {
            const calendar = new Calendar(
                new Date(2024, 0, 1),
                'en-US'
            );

            expect(calendar.months).toHaveLength(12);
            expect(calendar.weekDays).toHaveLength(7);
            expect(calendar.months[0]).toBe('January');
            expect(calendar.weekDays[0]).toBe('Sunday');
        });

        it('should reject an invalid date', () => {
            expect(() => new Calendar(new Date(NaN))).toThrow(
                'A valid Date instance is required.'
            );
        });

        it('should reject non-Date values', () => {
            expect(() => new Calendar(null as unknown as Date)).toThrow(
                'A valid Date instance is required.'
            );
        });
    });

    describe('calendar generation', () => {
        it('should generate exactly 42 days', () => {
            const calendar = new Calendar(new Date(2024, 0, 15));

            expect(calendar.days).toHaveLength(42);
        });

        it('should start the calendar on Sunday', () => {
            const calendar = new Calendar(new Date(2024, 1, 15));

            expect(calendar.days[0].date.getDay()).toBe(0);
        });

        it('should generate correct dates for February 2024', () => {
            const calendar = new Calendar(new Date(2024, 1, 15));

            const currentMonthDays = calendar.days.filter(
                day => day.status === 'current-month'
            );

            expect(currentMonthDays).toHaveLength(29);
            expect(currentMonthDays[0].date.getDate()).toBe(1);
            expect(currentMonthDays[28].date.getDate()).toBe(29);
        });

        it('should identify previous and next month days', () => {
            const calendar = new Calendar(new Date(2024, 1, 15));

            expect(
                calendar.days.some(day => day.status === 'prev-month')
            ).toBe(true);

            expect(
                calendar.days.some(day => day.status === 'next-month')
            ).toBe(true);
        });

        it('should generate consecutive dates', () => {
            const calendar = new Calendar(new Date(2024, 5, 15));

            for (let i = 1; i < calendar.days.length; i++) {
                const previous = calendar.days[i - 1].date;
                const current = calendar.days[i].date;

                const expected = new Date(previous);
                expected.setDate(expected.getDate() + 1);

                expect(current).toEqual(expected);
            }
        });
    });

    describe('SetValue', () => {
        it('should update the selected date', () => {
            const calendar = new Calendar(new Date(2024, 0, 1));
            const date = new Date(2024, 5, 20);

            calendar.SetValue(date);

            expect(calendar.value).toEqual(date);
        });

        it('should return a copy of the updated date', () => {
            const calendar = new Calendar(new Date(2024, 0, 1));
            const date = new Date(2024, 5, 20);

            const result = calendar.SetValue(date);

            expect(result).toEqual(date);
            expect(result).not.toBe(calendar.value);
        });

        it('should reject an invalid date without changing the value', () => {
            const calendar = new Calendar(new Date(2024, 0, 1));
            const previousValue = new Date(calendar.value);

            expect(() => calendar.SetValue(new Date(NaN))).toThrow();

            expect(calendar.value).toEqual(previousValue);
        });
    });

    describe('SetCursor', () => {
        it('should update the calendar cursor', () => {
            const calendar = new Calendar(new Date(2024, 0, 1));

            calendar.SetCursor(new Date(2024, 5, 20));

            expect(calendar.cursor).toEqual(new Date(2024, 5, 1));
        });

        it('should normalize cursor time to midnight', () => {
            const calendar = new Calendar();
            const date = new Date(2024, 5, 20, 15, 30, 45);

            calendar.SetCursor(date);

            expect(calendar.cursor.getHours()).toBe(0);
            expect(calendar.cursor.getMinutes()).toBe(0);
            expect(calendar.cursor.getSeconds()).toBe(0);
        });

        it('should regenerate calendar days', () => {
            const calendar = new Calendar(new Date(2024, 0, 1));

            const previousDays = calendar.days;

            calendar.SetCursor(new Date(2024, 5, 1));

            expect(calendar.days).not.toBe(previousDays);
            expect(calendar.days[0].date).toEqual(new Date(2024, 4, 26));
        });

        it('should not mutate the provided date', () => {
            const calendar = new Calendar();
            const date = new Date(2024, 5, 20, 15, 30);

            const originalDate = new Date(date);

            calendar.SetCursor(date);

            expect(date).toEqual(originalDate);
        });
    });

    describe('month navigation', () => {
        it('should navigate to the next month', () => {
            const calendar = new Calendar(new Date(2024, 0, 15));

            calendar.ToNextMonth();

            expect(calendar.cursor).toEqual(new Date(2024, 1, 1));
        });

        it('should navigate to the previous month', () => {
            const calendar = new Calendar(new Date(2024, 1, 15));

            calendar.ToPrevMonth();

            expect(calendar.cursor).toEqual(new Date(2024, 0, 1));
        });

        it('should navigate from December to January of the next year', () => {
            const calendar = new Calendar(new Date(2024, 11, 15));

            calendar.ToNextMonth();

            expect(calendar.cursor).toEqual(new Date(2025, 0, 1));
        });

        it('should navigate from January to December of the previous year', () => {
            const calendar = new Calendar(new Date(2024, 0, 15));

            calendar.ToPrevMonth();

            expect(calendar.cursor).toEqual(new Date(2023, 11, 1));
        });
    });

    describe('year navigation', () => {
        it('should navigate to the next year', () => {
            const calendar = new Calendar(new Date(2024, 5, 15));

            calendar.ToNextYear();

            expect(calendar.cursor).toEqual(new Date(2025, 5, 1));
        });

        it('should navigate to the previous year', () => {
            const calendar = new Calendar(new Date(2024, 5, 15));

            calendar.ToPrevYear();

            expect(calendar.cursor).toEqual(new Date(2023, 5, 1));
        });
    });

    describe('ChangeLocale', () => {
        it('should update month and weekday names', () => {
            const calendar = new Calendar(
                new Date(2024, 0, 1),
                'en-US'
            );

            calendar.ChangeLocale('fr-FR');

            expect(calendar.locale).toBe('fr-FR');
            expect(calendar.months[0]).toBe('janvier');
            expect(calendar.weekDays[0]).toBe('dimanche');
        });

        it('should preserve the number of months and weekdays', () => {
            const calendar = new Calendar();

            calendar.ChangeLocale('de-DE');

            expect(calendar.months).toHaveLength(12);
            expect(calendar.weekDays).toHaveLength(7);
        });
    });

    describe('IsEqual', () => {
        it('should return true for identical timestamps', () => {
            const calendar = new Calendar();

            expect(
                calendar.IsEqual(
                    new Date(2024, 0, 1),
                    new Date(2024, 0, 1)
                )
            ).toBe(true);
        });

        it('should return false for different timestamps', () => {
            const calendar = new Calendar();

            expect(
                calendar.IsEqual(
                    new Date(2024, 0, 1),
                    new Date(2024, 0, 2)
                )
            ).toBe(false);
        });
    });

    describe('Day methods', () => {
        it('should identify weekend days', () => {
            const calendar = new Calendar(new Date(2024, 5, 15));

            const saturday = calendar.days.find(
                day => day.date.getDay() === 6
            );

            const monday = calendar.days.find(
                day => day.date.getDay() === 1
            );

            expect(saturday?.IsWeekend()).toBe(true);
            expect(monday?.IsWeekend()).toBe(false);
        });

        it('should identify today', () => {
            const today = new Date();
            const calendar = new Calendar(today);

            const todayDay = calendar.days.find(
                day =>
                    day.date.getFullYear() === today.getFullYear() &&
                    day.date.getMonth() === today.getMonth() &&
                    day.date.getDate() === today.getDate()
            );

            expect(todayDay?.IsToday()).toBe(true);
        });
    });
});
