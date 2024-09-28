import Calendar from '../dist/index.js';

const btn = document.getElementsByTagName('button')[0];
const btn2 = document.getElementsByTagName('button')[1];

const c = new Calendar();

btn.addEventListener('click', () => {
    console.log(c);
});
