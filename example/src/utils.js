export const filterMonths = (currentIndex = 0, elements) => {
    const result = [];

    for (let i = currentIndex - 2; i < currentIndex + 3; i++) {
        if (i < 0 || i > elements.length - 1) {
            result.push(null);
        } else {
            result.push(elements[i]);
        }
    }

    return result;
};

export const addMonthStyles = (elements) => {
    elements[0]?.classList.add('datewise_first_step_1');
    elements[0]?.classList.add('datewise_first_step');
    elements[4]?.classList.add('datewise_first_step');
    elements[4]?.classList.add('datewise_first_step_2');

    elements[1]?.classList.add('datewise_second_step_1');
    elements[1]?.classList.add('datewise_second_step');
    elements[3]?.classList.add('datewise_second_step');
    elements[3]?.classList.add('datewise_second_step_2');

    elements[2].classList.add('datewise_selected_month');
};
