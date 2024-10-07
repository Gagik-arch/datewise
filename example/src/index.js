import Calendar from '../../dist/index.js';

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
    const y = +monthScrollContainer.style.top.replace('px', '');
    const delta = -(e.deltaY / Math.abs(e.deltaY));
    const top = Math.max(-(84 * 11), Math.min(y + 84 * delta, 0));
    const index = Math.abs(top / 84);
    const elements = [
        ...document.getElementsByClassName('datewise_month'),
    ].slice(index - 2, index + 3);

    elements[2];
    console.log(elements);

    monthScrollContainer.style.top = `${top}px`;
});

const renderMonthsAndYear = () => {
    const year = document.getElementById('datewise_year');
    year.innerHTML = calendar.value.getFullYear();

    calendar.months.forEach((month) => {
        const div = document.createElement('div');
        monthScrollContainer.appendChild(div);
        div.classList.add('datewise_month');
        div.innerHTML = month;
    });

    const div = document.createElement('div');
    monthScrollContainer.appendChild(div);
    div.classList.add('month_fake');
};

const update = () => {
    date.innerHTML = dateTimeFormat.format(calendar.value);

    renderDays();
    renderMonthsAndYear(calendar);
};

update();
