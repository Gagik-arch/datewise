# Calendar-npm

This project is intended to be consumed for all of type java script projects.

[![Build Status](https://github.com/Gagik-arch/calendar-npm)](https://github.com/Gagik-arch/calendar-npm)
[![npm version](https://www.npmjs.com/package/calendar-npm)](https://www.npmjs.com/package/calendar-npm)

## Table of contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Arguments](#Arguments)
-   [Methods](#Methods)
-   [Object](#Object)
-   [Built With](#built-with)
-   [Author](#author)

## Installation

```sh
$ npm install calendar-npm
```

## Usage

```sh
 const calendar = new Calendar()
```

#### Arguments

| Type          | Default value | example                                            |
| ------------- | ------------- | -------------------------------------------------- |
| Date {Object} | new Date()    | const calendar = new Calendar(new Date(2022,7,15)) |

#### Methods

| Method      | argument      |
| ----------- | ------------- |
| toDate      | Date {Object} |
| toPrevMonth | none          |
| toNextMonth | none          |
| toNextYear  | none          |
| toPrevYear  | none          |

Example:

```js
const calendar = new Calendar();
const btn = document.getElementByTabName("button")[0];

btn.onclick = () => {
    // calendar.toDate(new Date(2025,5,16));
    // calendar.toPrevMonth();
    // calendar.toNextMonth();
    // calendar.toNextYear();
    // calendar.toPrevYear();
};
```

```ts
import Calendar, { ICalendar, IDay } from "calendar-npm";

const calendar: ICalendar = new Calendar();
```

#### Object

| keys         | values        |
| ------------ | ------------- |
| currentDate  | Date {Object} |
| selectedDate | Date {Object} |
| months       | [string]      |
| weekDays     | [string]      |
| days         | Day{Object}   |

## Built With

-   Gagik-arch

## Author

-   **Gagik** - _Initial work_ - [gagik-arch](https://github.com/Gagik-arch/calendar-npm)
