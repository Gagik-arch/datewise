<a href="#">
    <img src="./datewise.png" width="auto" title="demo">
</a>
This project is intended to be consumed for all of type java script projects.

[![Build Status](https://github.com/Gagik-arch/datewise)](https://github.com/Gagik-arch/datewise)
[![npm version](https://www.npmjs.com/package/datewise)](https://www.npmjs.com/package/datewise)

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
$ npm install datewise
```

## Usage

```sh
 const calendar:ICalendar = new Calendar()
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
| changeLocale| locale:string |

Example:

```js
const calendar = new Calendar();
const btn = document.getElementByTabName('button')[0];

btn.onclick = () => {
    calendar.toDate(new Date(2025, 5, 16), (locale = 'en'));
//  calendar.toPrevMonth();
//  calendar.toNextMonth();
//  calendar.toNextYear();
//  calendar.toPrevYear();
//  calendar.changeLocale('en');
};
```

```ts
import Calendar, { ICalendar, IDay } from 'datewise';

const calendar: ICalendar = new Calendar();
```

#### Object

| keys     | values        |
| -------- | ------------- |
| locale   | string 'en'   |
| value    | Date {Object} |
| months   | [string]      |
| weekDays | [string]      |
| days     | Day{Object}   |

## Built With

-   Gagik-arch

## Author

-   **Gagik** - _Initial work_ - [gagik-arch](https://github.com/Gagik-arch/datewise)
