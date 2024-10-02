import Calendar from '../dist/index.js';

const calendar = new Calendar();

const weekContainer = document.getElementById('datewise_week_container');
const dayContainer = document.getElementById('datewise_day_container');
const date = document.getElementById('datewise_date');

console.log(calendar);

calendar.weekDays.forEach((week) => {
    const div = document.createElement('div');
    weekContainer.appendChild(div);
    div.classList.add('datewise_week');
    div.innerHTML = week.slice(0, 3);
});

const renderDays = () => {
    calendar.days.forEach((day) => {
        const div = document.createElement('div');
        dayContainer.appendChild(div);
        div.classList.add('datewise_day');
        if (day.status === 'selected-day') {
            div.classList.add('datewise_selected_day');
        }
        div.innerHTML = day.label;
    });
};
renderDays();

const dateTimeFormat = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
});

date.innerHTML = dateTimeFormat.format(calendar.value);
