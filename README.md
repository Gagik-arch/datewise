<a href="https://datewise-3not01ag0-gagikarchs-projects.vercel.app" target="_blank">
    <img src="./datewise-logo.png" width="auto" title="demo">
</a>

This calendar is intended to be consumed for all of type javascript projects.

<span>
    <a href="https://github.com/Gagik-arch/datewise" title="Build Status">
        <img src="./github-logo.png" width="auto" height="20px">
    </a>
    <a href="https://www.npmjs.com/package/datewise" title="npm version">
        <img src="./npm-logo.png" width="auto" height="20px">
    </a>
</span>

## Table of contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Arguments](#Arguments)
-   [Methods](#Methods)
-   [Object](#Object)
-   [Author](#author)

## Installation

```sh
$ npm install datewise

coming soon in cdnjs
```

## Usage

```sh
import Calendar, { ICalendar, IDay,TDateStatus } from 'datewise';

const calendar: ICalendar = new Calendar();
```

#### Arguments

| Type          | Default value                |      
| ------------- | --------------------------   |
| Date {Object} | new Date()                   |
| Intl locales  | 'en-US'                      |

#### Calendar Methods

| Method      | argument      | return type  |
| ----------- | ------------- | ------------ |
| toDate      | Date {Object} |     void     |
| toPrevMonth | none          |     void     |
| toNextMonth | none          |     void     |
| toNextYear  | none          |     void     |
| toPrevYear  | none          |     void     |
| changeLocale| locale:string |     void     |

#### Day Methods

| Method      | argument      | return type  |
| ----------- | ------------- | ------------ |
| isWeekDay   | none          |   boolean    |

Example:
```js

const calendar = new Calendar();
const btn = document.getElementByTabName('button')[0];

btn.onclick = () => {
    calendar.toDate(new Date(2025, 5, 16), locale = 'en');
//  calendar.toPrevMonth();
//  calendar.toNextMonth();
//  calendar.toNextYear();
//  calendar.toPrevYear();
//  calendar.changeLocale('en');

    calendar.days[0].isWeekDay() // boolean
};
```

#### Calendar Object

| keys     | values        |     example      |
| -------- | ------------- |     --------     |
| locale   | string        |     'en-US'      |
| value    | Date {Object} |    new Date()    |
| selected | Date {Object} |    new Date()    |
| months   | string[]      | ["January",...]  |
| weekDays | string[]      | ["Saturday",...] |
| days     | Day[]         |     new Day()    |
 
#### Day Object

| keys     | values        |     example      |
| -------- | ------------- |     --------     |
| date     | Date {Object} |    new Date()    |
| status   | TDateStatus   | 'current-month'  |

 

## Author

-   **Gagik** - _Initial work_ - [Gagik-arch](https://github.com/Gagik-arch)
