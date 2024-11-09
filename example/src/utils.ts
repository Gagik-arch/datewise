
export const filterMonths = (currentIndex: number = 0, elements: HTMLDivElement[]): (HTMLDivElement | null)[] => {
    const result: (HTMLDivElement | null)[] = [];

    for (let i = currentIndex - 2; i < currentIndex + 3; i++) {
        if (i < 0 || i > elements.length - 1) {
            result.push(null);
        } else {
            result.push(elements[i]);
        }
    }

    return result;
};

export const addMonthStyles = (elements: (HTMLDivElement | null)[]): void => {
    elements[0]?.classList.add('datewise_first_step_1');
    elements[0]?.classList.add('datewise_first_step');
    elements[4]?.classList.add('datewise_first_step');
    elements[4]?.classList.add('datewise_first_step_2');

    elements[1]?.classList.add('datewise_second_step_1');
    elements[1]?.classList.add('datewise_second_step');
    elements[3]?.classList.add('datewise_second_step');
    elements[3]?.classList.add('datewise_second_step_2');

    elements[2]?.classList.add('datewise_selected_month');
};

export const changeWheelStyles = (index: number): void => {
    const elements = [...document.getElementsByClassName('datewise_month')] as HTMLDivElement[];
    elements.forEach((element) => (element.className = 'datewise_month'));
    const filteredElements: (HTMLDivElement | null)[] = filterMonths(index, elements);

    addMonthStyles(filteredElements);
};
