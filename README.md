<a href="#">
    <img src="./datewise.png" width="auto" title="demo">
</a>

This calendar is intended to be consumed for all of type java script projects.

<span>
    <a href="https://github.com/Gagik-arch/datewise" title="Build Status">
        <img src="./github-logo.png" width="50px">
    </a>
    <a href="https://www.npmjs.com/package/datewise" title="npm version">
        <img src="./npm-logo.png" width="50" >
    </a>
</span>

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

| Method      | argument      | return type  |
| ----------- | ------------- | ------------ |
| toDate      | Date {Object} |     void     |
| toPrevMonth | none          |     void     |
| toNextMonth | none          |     void     |
| toNextYear  | none          |     void     |
| toPrevYear  | none          |     void     |
| changeLocale| locale:string |     void     |

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

| keys     | values        |     example      |
| -------- | ------------- |     --------     |
| locale   | string        |       'en'       |
| value    | Date {Object} |    new Date()    |
| selected | Date {Object} |    new Date()    |
| months   | string[]      | ["January",...]  |
| weekDays | string[]      | ["Saturday",...] |
| days     | Day[]         |     new Day()    |
 
## Built With 

-   Gagik-arch

## Author

-   **Gagik** - _Initial work_ - [gagik-arch](https://github.com/Gagik-arch/datewise)
