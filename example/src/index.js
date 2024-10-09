import Calendar from '../../dist/index.js';
import { filterMonths, changeWheelStyles } from './utils.js';

const calendar = new Calendar();

const weekContainer = document.getElementById('datewise_week_container');
const dayContainer = document.getElementById('datewise_day_container');
const monthContainer = document.getElementById('datewise_month_container');
const monthScrollContainer = document.getElementById(
    'datewise_month_scroll_container'
);
// const yearContainer = document.getElementById('datewise_year_container');
// const arrowLeft = document.getElementById('arrow_left');
// const arrowRight = document.getElementById('arrow_right');

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

const dateTimeFormat = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
});
const date = document.getElementById('datewise_date');

monthContainer.addEventListener('wheel', (e) => {
    const delta = -(e.deltaY / Math.abs(e.deltaY));
    const y = +monthScrollContainer.style.top.replace('px', '');

    const top = Math.max(-(84 * 11), Math.min(y + 84 * delta, 0));
    const index = Math.abs(top / 84);

    changeWheelStyles(index);
    monthScrollContainer.style.top = `${top}px`;
});

const renderMonthsAndYear = () => {
    const year = document.getElementById('datewise_year');
    year.innerHTML = calendar.value.getFullYear();

    calendar.months.forEach((month, index) => {
        const div = document.createElement('div');
        if (index === 0) {
            div.style.marginTop = `${84 * 2}px`;
        } else if (index === calendar.months.length - 1) {
            div.style.marginBottom = `${84 * 2}px`;
        }
        monthScrollContainer.appendChild(div);
        div.classList.add('datewise_month');
        div.innerHTML = month;
    });
};
let isDowned = false,
    elementIndex = 0;

monthContainer.addEventListener('mousedown', (e) => {
    isDowned = true;
});

window.addEventListener('mouseup', (e) => {
    isDowned = false;
    changeWheelStyles(elementIndex);

    monthScrollContainer.style.top = `${-elementIndex * 84}px`;
});

window.addEventListener('mousemove', (e) => {
    if (!isDowned) return;
    const delta = e.movementY < 0 ? -1 : 1;
    const y = +monthScrollContainer.style.top.replace('px', '');
    const top = Math.max(-(84 * 11), Math.min(y + 84 * delta, 0));
    elementIndex = Math.abs(top / 84);
    console.log(elementIndex);
});

const update = () => {
    date.innerHTML = dateTimeFormat.format(calendar.value);

    renderDays();
    renderMonthsAndYear(calendar);
    changeWheelStyles(0);
};

update();
