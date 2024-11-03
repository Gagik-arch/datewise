import Calendar from '../../dist/index.js'
import { changeWheelStyles } from './utils.js'

const MONTH_BLOCK_HEIGHT = 84;

const calendar = new Calendar()

const weekContainer = document.getElementById('datewise_week_container')
const dayContainer = document.getElementById('datewise_day_container')
const monthContainer = document.getElementById('datewise_month_container')
const monthScrollContainer = document.getElementById(
    'datewise_month_scroll_container'
)
const date = document.getElementById('datewise_date')
const nextYearBtn = document.getElementById('arrow_right');
const prevYearBtn = document.getElementById('arrow_left');

calendar.weekDays.forEach((week, i) => {
    const div = document.createElement('div')
    weekContainer.appendChild(div)
    div.classList.add('datewise_week')
    div.dataset.weekday = i
    div.innerHTML = week.slice(0, 3)

    div.onmouseenter = (e) => {
        const weekdays = [
            ...document.querySelectorAll(
                `[data-weekday='${e.target.dataset.weekday}']`
            ),
        ]
        e.target.classList.add('datewise_week_hover')
        weekdays.forEach((day) => {
            day.classList.add('datewise_week_hover')
        })
        weekdays.at(-1).classList.add('datewise_week_hover_last')
    }

    div.onmouseleave = (e) => {
        const weekdays = [
            ...document.querySelectorAll(
                `[data-weekday='${e.target.dataset.weekday}']`
            ),
        ]
        weekdays.forEach((day) => {
            day.classList.remove('datewise_week_hover')
        })
        weekdays.at(-1).classList.remove('datewise_week_hover_last')
    }
})

const renderDays = () => {
    dayContainer.innerHTML = ''
    calendar.days.forEach((day) => {
        const parent = document.createElement('div')
        const child = document.createElement('div')
        dayContainer.appendChild(parent)
        parent.appendChild(child)
        parent.classList.add('datewise_day')
        child.classList.add(`datewise_${day.status.replaceAll('-', '_')}`)

        parent.dataset.weekday = day.date.getDay()
        parent.dataset.date = day.date.toString()
        child.innerHTML = day.date.getDate()
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        if (today.getTime() === day.date.getTime()) {
            child.classList.add('datewise_today')
        }
    })
}

const dateTimeFormat = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
})


let isDowned = false,
    y = -calendar.value.getMonth() * MONTH_BLOCK_HEIGHT

const renderMonths = () => {
    calendar.months.forEach((month, index) => {
        const div = document.createElement('div')
        if (index === 0) {
            div.style.marginTop = `${MONTH_BLOCK_HEIGHT * 2}px`
        } else if (index === calendar.months.length - 1) {
            div.style.marginBottom = `${MONTH_BLOCK_HEIGHT * 2}px`
        }
        monthScrollContainer.appendChild(div)
        div.classList.add('datewise_month')
        div.innerHTML = month
        div.dataset.index = index
    })
}

monthContainer.addEventListener('wheel', (e) => {
    const delta = -(e.deltaY / Math.abs(e.deltaY))
    const top = Math.max(-(MONTH_BLOCK_HEIGHT * 11), Math.min(y + MONTH_BLOCK_HEIGHT * delta, 0))
    const index = Math.abs(top / MONTH_BLOCK_HEIGHT)

    changeWheelStyles(index)
    monthScrollContainer.style.transform = `translateY(${top}px)`
    y = top
    const day = calendar.selected.getDate()
    const year = calendar.selected.getFullYear()

    calendar.toDate(new Date(year, index, day))
    renderYear()
})
console.log(calendar);

monthScrollContainer.addEventListener('click', e => {
    const target = e.target.closest('.datewise_month')
    if (!target) return
    changeWheelStyles(target.dataset.index)
    y = -target.dataset.index * MONTH_BLOCK_HEIGHT

    monthScrollContainer.style.transform = `translateY(${y}px)`

    const index = Math.abs(y / MONTH_BLOCK_HEIGHT),
        day = calendar.selected.getDate(),
        year = calendar.selected.getFullYear();
    calendar.toDate(new Date(year, index, day))
    renderDays()
})

monthContainer.addEventListener('mousedown', () => {
    isDowned = true
})

window.addEventListener('mouseup', () => {
    isDowned = false
})

prevYearBtn.addEventListener('click', () => {
    calendar.toPrevYear()
    renderDays()
    renderYear()
})

nextYearBtn.addEventListener('click', () => {
    calendar.toNextYear()
    renderDays()
    renderYear()
})

dayContainer.addEventListener('click', e => {
    const target = e.target.closest('.datewise_day')

    if (!target?.dataset.date) return
    calendar.toDate(new Date(target.dataset.date))
    renderDays()
})


const renderYear = () => {
    const year = document.getElementById('datewise_year')
    year.innerHTML = calendar.selected.getFullYear()
    renderDays()
}

const update = () => {
    date.innerHTML = dateTimeFormat.format(calendar.value)

    renderDays()
    renderMonths(calendar)
    changeWheelStyles(Math.abs(y / MONTH_BLOCK_HEIGHT))
    monthScrollContainer.style.transform = `translateY(${y}px)`
    renderYear()
}

update()
window.addEventListener('click', () => { })
