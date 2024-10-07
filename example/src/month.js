const monthScrollContainer = document.getElementById(
    'datewise_month_scroll_container'
);

const renderMonthsAndYear = (calendar) => {
    const year = document.getElementById('datewise_year');
    year.innerHTML = calendar.value.getFullYear();

    calendar.months.forEach((month, index) => {
        const div = document.createElement('div');
        monthScrollContainer.appendChild(div);
        div.classList.add('datewise_month');
        div.innerHTML = month;
    });
    const div = document.createElement('div');
    monthScrollContainer.appendChild(div);
    div.classList.add('month_fake');
};

export default renderMonthsAndYear;
