import Calendar from '../dist/index.js';

const calendar = new Calendar();

const weekContainer = document.getElementById('datewise_week_container');
const dayContainer = document.getElementById('datewise_day_container');

console.log(calendar);

calendar.days.forEach((day) => {
    const div = document.createElement('div');
    dayContainer.appendChild(div);
    div.classList.add('datewise-day');
    div.innerHTML = day.label;
});

calendar.weekDays.forEach((week) => {
    const div = document.createElement('div');
    weekContainer.appendChild(div);
    div.classList.add('datewise-week');
    div.innerHTML = week;
});
