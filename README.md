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

**Datewise** is a lightweight, TypeScript-first calendar utility library for JavaScript and TypeScript projects.

It provides a simple API for generating calendar grids, navigating between months and years, working with localized month and weekday names, and handling individual calendar days.

Designed to be simple, predictable, and easy to integrate into any project.

## Features

- 📅 Generate calendar grids with 42 days (6 weeks).
- 🔄 Navigate between months and years.
- 🌍 Locale-aware month and weekday names.
- 📆 Identify days belonging to previous, current, and next months.
- 🗓️ Detect weekends and the current day.
- 💪 Built-in TypeScript support.
- 🪶 Lightweight with no external dependencies.

## Installation

```bash
npm install datewise
```

## Getting Started

```typescript
import Calendar from 'datewise';

// Initialize a calendar
const calendar = new Calendar();

// Access generated calendar days
console.log(calendar.days);

// Access the selected date
console.log(calendar.selected);
```

You can also initialize the calendar with a specific date and locale:

```typescript
const calendar = new Calendar(
    new Date(2026, 10, 7),
    'en-US'
);
```

## API Reference

### Calendar

The `Calendar` class provides the main functionality for managing dates and generating calendar grids.

#### Constructor

```typescript
new Calendar(date?: Date, locale?: string)
```

| Parameter | Type | Default | Description |
|---|---|---|---|
| `date` | `Date` | `new Date()` | Initial calendar date. |
| `locale` | `string` | `'en-US'` | Locale used for month and weekday names. |

#### Properties

| Property | Type | Description |
|---|---|---|
| `value` | `Date` | Current calendar value. |
| `selected` | `Date` | Selected calendar date. |
| `locale` | `string` | Current locale. |
| `days` | `Day[]` | Generated calendar days (42 entries). |
| `months` | `string[]` | Localized month names. |
| `weekDays` | `string[]` | Localized weekday names, starting with Sunday. |

### Methods

#### `toDate(date: Date): Date`

Set a new selected date and regenerate the calendar.

```typescript
calendar.toDate(new Date(2026, 5, 15));
```

#### `toNextMonth(): void`

Navigate to the next month.

```typescript
calendar.toNextMonth();
```

#### `toPrevMonth(): void`

Navigate to the previous month.

```typescript
calendar.toPrevMonth();
```

#### `toNextYear(): void`

Navigate to the next year.

```typescript
calendar.toNextYear();
```

#### `toPrevYear(): void`

Navigate to the previous year.

```typescript
calendar.toPrevYear();
```

#### `changeLocale(locale: string): void`

Change the calendar locale and regenerate localized month and weekday names.

```typescript
calendar.changeLocale('hy-AM');
```

Supported locales depend on the JavaScript runtime's `Intl` implementation.

## Day

Each generated calendar entry is represented by a `Day` instance.

### Properties

| Property | Type | Description |
|---|---|---|
| `date` | `Date` | Date represented by the calendar entry. |
| `status` | `TDayStatus` | Indicates which month the day belongs to. |

### Day Status

A day can have one of three statuses:

| Status | Description |
|---|---|
| `current-month` | Belongs to the currently displayed month. |
| `prev-month` | Belongs to the previous month. |
| `next-month` | Belongs to the next month. |

### Methods

#### `isWeekend(): boolean`

Determine whether the day falls on Saturday or Sunday.

```typescript
const day = calendar.days[0];

console.log(day.isWeekend());
```

#### `isToday(): boolean`

Determine whether the day represents today's date.

```typescript
const day = calendar.days[0];

console.log(day.isToday());
```

## Working with Calendar Days

You can iterate over the generated days and use their properties to build your own calendar UI.

```typescript
calendar.days.forEach((day) => {
    console.log({
        date: day.date,
        status: day.status,
        isWeekend: day.isWeekend(),
        isToday: day.isToday()
    });
});
```

For example, filtering only the days belonging to the current month:

```typescript
const currentMonthDays = calendar.days.filter(
    day => day.status === 'current-month'
);
```

## Localization

Datewise uses the native JavaScript `Intl` API for localized month and weekday names.

```typescript
const calendar = new Calendar(
    new Date(),
    'hy-AM'
);

console.log(calendar.months);
console.log(calendar.weekDays);
```

You can use any locale supported by your JavaScript environment, such as:

- `en-US` — English (United States)
- `en-GB` — English (United Kingdom)
- `hy-AM` — Armenian
- `fr-FR` — French
- `de-DE` — German
- `ru-RU` — Russian

## Browser Compatibility

Datewise relies on standard JavaScript APIs, including:

- `Date`
- `Intl`

Compatibility depends on the JavaScript runtime and its support for these APIs.

## Philosophy

Datewise focuses on simplicity and native JavaScript capabilities.

Instead of introducing unnecessary abstractions or external dependencies, it provides a straightforward API for calendar generation and date navigation.

**Simple dates. Clear APIs. No unnecessary complexity.**

## License

MIT