<p align="center">
  <a href="https://datewise-khaki.vercel.app" target="_blank">
    <img
      src="https://raw.githubusercontent.com/Gagik-arch/datewise/main/datewise-logo.png"
      alt="Datewise"
      title="Try Datewise Demo"
    />
  </a>
</p>

<p align="center">
  <a href="https://datewise-khaki.vercel.app">Live Demo</a>
</p>

**A lightweight, TypeScript-first calendar utility for JavaScript applications.**

Datewise is a lightweight calendar utility that provides date navigation, calendar generation, and locale-aware month and weekday names.

It generates a consistent 6-week calendar grid (42 days), including dates from adjacent months, making it easy to build custom calendar interfaces.

## Features

- **42-day calendar grid** — Always generates 6 weeks.
- **Date navigation** — Navigate between months and years.
- **Locale support** — Generate localized month and weekday names using the native JavaScript `Intl` API.
- **Month classification** — Identify previous-month, current-month, and next-month dates.
- **Date validation** — Validates date inputs before updating calendar state.
- **TypeScript support** — Written in TypeScript with type definitions.
- **Zero runtime dependencies** — Uses native JavaScript date and internationalization APIs.

## Installation

```bash
npm install datewise
```

## Quick Start

```ts
import Calendar from 'datewise';

const calendar = new Calendar();

console.log(calendar.months);
console.log(calendar.weekDays);
console.log(calendar.days);
```

You can also initialize the calendar with a specific date and locale:

```ts
const calendar = new Calendar(
    new Date(2026, 10, 8),
    'en-US'
);
```

## API Reference

### Constructor

```ts
new Calendar(date?: Date, locale?: string)
```

Creates a new calendar instance.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `date` | `Date` | `new Date()` | Initial selected date and calendar month |
| `locale` | `string` | `'en-US'` | Locale used for month and weekday names |

```ts
const calendar = new Calendar(
    new Date(2026, 10, 8),
    'en-US'
);
```

### Properties

| Property | Type | Description |
|---|---|---|
| `value` | `Date` | Currently selected date |
| `cursor` | `Date` | Currently displayed month |
| `locale` | `string` | Active locale |
| `days` | `Day[]` | Generated 42-day calendar grid |
| `months` | `string[]` | Localized month names (12 items) |
| `weekDays` | `string[]` | Localized weekday names (7 items, Sunday first) |

### SetValue

```ts
SetValue(date: Date): Date
```

Updates the selected date without changing the displayed calendar month.

```ts
calendar.SetValue(new Date(2026, 10, 15));

console.log(calendar.value);
```

Returns a copy of the updated date.

### SetCursor

```ts
SetCursor(date: Date): Date
```

Changes the currently displayed month and regenerates the calendar grid.

The cursor is normalized to the first day of the specified month at midnight.

```ts
calendar.SetCursor(new Date(2026, 11, 15));

console.log(calendar.cursor);
console.log(calendar.days);
```

### ToNextMonth

```ts
ToNextMonth(): void
```

Navigates to the next month.

```ts
calendar.ToNextMonth();
```

### ToPrevMonth

```ts
ToPrevMonth(): void
```

Navigates to the previous month.

```ts
calendar.ToPrevMonth();
```

### ToNextYear

```ts
ToNextYear(): void
```

Navigates to the same month in the following year.

```ts
calendar.ToNextYear();
```

### ToPrevYear

```ts
ToPrevYear(): void
```

Navigates to the same month in the previous year.

```ts
calendar.ToPrevYear();
```

### ChangeLocale

```ts
ChangeLocale(locale: string): void
```

Changes the calendar locale and regenerates month and weekday names.

```ts
calendar.ChangeLocale('fr-FR');

console.log(calendar.months);
// ['janvier', 'février', ...]

console.log(calendar.weekDays);
// ['dimanche', 'lundi', ...]
```

Date values and the generated calendar grid remain unchanged.

### IsEqual

```ts
IsEqual(date1: Date, date2: Date): boolean
```

Checks whether two dates represent the exact same timestamp.

```ts
const first = new Date(2026, 10, 8);
const second = new Date(2026, 10, 8);

console.log(calendar.IsEqual(first, second));
// true
```

Note: This compares timestamps, including time components. It does not compare only calendar days.

## Day Class

Each item in `calendar.days` is an instance of the `Day` class.

### Properties

| Property | Type | Description |
|---|---|---|
| `date` | `Date` | Date represented by this calendar cell |
| `status` | `TDayStatus` | Indicates which month the date belongs to |

### Day Status

The `status` property can have one of three values:

```ts
type TDayStatus =
    | 'prev-month'
    | 'current-month'
    | 'next-month';
```

Example:

```ts
calendar.days.forEach(day => {
    console.log(day.date, day.status);
});
```

### IsWeekend

```ts
IsWeekend(): boolean
```

Returns `true` if the date falls on Saturday or Sunday.

```ts
const day = calendar.days[0];

console.log(day.IsWeekend());
```

### IsToday

```ts
IsToday(): boolean
```

Checks whether the date represents the current local calendar day.

```ts
const day = calendar.days[0];

console.log(day.IsToday());
```

## Building a Calendar Interface

Datewise provides the calendar data, allowing you to build your own UI with any framework or rendering approach.

For example, using plain JavaScript:

```ts
import Calendar from 'datewise';

const calendar = new Calendar(
    new Date(),
    'en-US'
);

const container = document.getElementById('calendar');

function renderCalendar() {
    if (!container) return;

    container.innerHTML = '';

    calendar.days.forEach(day => {
        const element = document.createElement('button');

        element.textContent = String(day.date.getDate());
        element.className = day.status;

        if (day.IsToday()) {
            element.classList.add('today');
        }

        if (day.IsWeekend()) {
            element.classList.add('weekend');
        }

        container.appendChild(element);
    });
}

renderCalendar();

// Navigate to the next month
calendar.ToNextMonth();
renderCalendar();
```

## Browser and Runtime Compatibility

Datewise relies on native JavaScript APIs:

- `Date`
- `Intl.DateTimeFormat` (through `toLocaleString`)

It has no runtime dependencies and can be used in modern JavaScript environments that support these APIs.

## License

ISC License.