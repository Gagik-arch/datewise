import Calendar from '../dist/index.js';

const btn = document.getElementsByTagName('button')[0];
const btn2 = document.getElementsByTagName('button')[1];

const c = new Calendar();
btn.addEventListener('click', () => {
    c.toNextMonth();
    console.log(c);
});

btn2.addEventListener('click', () => {
    c.toDate(new Date('2024-10-12'));
    console.log(c);
});
