import Calendar from '../dist/index.js';

const calendar = new Calendar();

const weekContainer = document.getElementById('datewise_week_container');
const dayContainer = document.getElementById('datewise_day_container');
const date = document.getElementById('datewise_date');

console.log(calendar);

calendar.weekDays.forEach((week, i) => {
    const div = document.createElement('div');
    weekContainer.appendChild(div);
    div.classList.add('datewise_week');
    div.dataset.weekday = i;
    div.innerHTML = week.slice(0, 3);

    div.onmouseenter = (e) => {
        const weekdays = [
            ...document.querySelectorAll(
                `[data-weekday='${e.target.dataset.weekday}']`
            ),
        ];
        e.target.classList.add('datewise_week_hover');
        weekdays.forEach((day) => {
            day.classList.add('datewise_week_hover');
        });
        weekdays.at(-1).classList.add('datewise_week_hover_last');
    };

    div.onmouseleave = (e) => {
        const weekdays = [
            ...document.querySelectorAll(
                `[data-weekday='${e.target.dataset.weekday}']`
            ),
        ];
        weekdays.forEach((day) => {
            day.classList.remove('datewise_week_hover');
        });
        weekdays.at(-1).classList.remove('datewise_week_hover_last');
    };
});

const renderDays = () => {
    calendar.days.forEach((day) => {
        const parent = document.createElement('div');
        const child = document.createElement('div');
        dayContainer.appendChild(parent);
        parent.appendChild(child);
        parent.classList.add('datewise_day');
        child.classList.add(`datewise_${day.status.replaceAll('-', '_')}`);
        parent.dataset.weekday = day.date.getDay();
        child.innerHTML = day.label;
    });
};
renderDays();

const dateTimeFormat = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
});

date.innerHTML = dateTimeFormat.format(calendar.value);
