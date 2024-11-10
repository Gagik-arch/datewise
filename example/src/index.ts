import Calendar from '../../dist/index.js'
import { changeWheelStyles } from './utils.ts'

const MONTH_BLOCK_HEIGHT: number = 84;

const calendar = new Calendar()

const weekContainer: HTMLElement | null = document.getElementById('datewise_week_container')
const dayContainer: HTMLElement | null = document.getElementById('datewise_day_container')
const monthContainer: HTMLElement | null = document.getElementById('datewise_month_container')
const monthScrollContainer: HTMLElement | null = document.getElementById(
    'datewise_month_scroll_container'
)
const yearContainer: HTMLElement | null = document.getElementById('datewise_year')
const date: HTMLElement | null = document.getElementById('datewise_date')
const nextYearBtn: HTMLElement | null = document.getElementById('arrow_right');
const prevYearBtn: HTMLElement | null = document.getElementById('arrow_left');

calendar.weekDays.forEach((week, i) => {
    const div = document.createElement('div')
    weekContainer?.appendChild(div)
    div.classList.add('datewise_week')
    div.dataset.weekday = i.toString()
    div.innerHTML = week.slice(0, 3)

    div.onmouseenter = (e: MouseEvent) => {
        const target: HTMLDivElement = (e.target as HTMLDivElement)

        const weekdays = [
            ...document.querySelectorAll(
                `[data-weekday='${target?.dataset.weekday}']`
            ),
        ]
        target.classList.add('datewise_week_hover')
        weekdays.forEach((day) => {
            day.classList.add('datewise_week_hover')
        })
        weekdays.at(-1)?.classList.add('datewise_week_hover_last')
    }

    div.onmouseleave = (e: MouseEvent) => {
        const target: HTMLDivElement = (e.target as HTMLDivElement)
        const weekdays = [
            ...document.querySelectorAll(
                `[data-weekday='${target.dataset.weekday}']`
            ),
        ]
        weekdays.forEach((day) => {
            day.classList.remove('datewise_week_hover')
        });
        weekdays.at(-1)?.classList.remove('datewise_week_hover_last')
    }
})

const renderDays = () => {
    if (!dayContainer) return
    dayContainer.innerHTML = ''

    calendar.days.forEach((day) => {
        const parent = document.createElement('div')
        const child = document.createElement('div')
        dayContainer.appendChild(parent)
        parent.appendChild(child)
        parent.classList.add('datewise_day')
        if (day.status === "selected-date") {
            child.classList.add(`datewise_${day.status.replaceAll('-', '_')}`)
        } else {
            child.classList.add(`datewise_${day.status.replaceAll('-', '_')}`)
        }

        parent.dataset.weekday = day.date.getDay().toString()
        parent.dataset.date = day.date.toString()
        child.innerHTML = day.date.getDate().toString()
        const today = new Date(new Date().setHours(0, 0, 0, 0))

        if (today.getTime() === day.date.getTime()) {
            child.classList.add('datewise_today')
        }
    })
}

const dateTimeFormat = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    year: 'numeric',
})

const renderMonths = () => {
    calendar.months.forEach((month, index) => {
        const div = document.createElement('div')
        if (index === 0) {
            div.style.marginTop = `${MONTH_BLOCK_HEIGHT * 2}px`
        } else if (index === calendar.months.length - 1) {
            div.style.marginBottom = `${MONTH_BLOCK_HEIGHT * 2}px`
        }
        monthScrollContainer?.appendChild(div)
        div.classList.add('datewise_month')
        div.innerHTML = month
        div.dataset.index = index.toString()
    })
}

let y: number = -calendar.value.getMonth() * MONTH_BLOCK_HEIGHT;

monthContainer?.addEventListener('wheel', (e) => {
    if (!monthScrollContainer || !date) return
    const delta = -(e.deltaY / Math.abs(e.deltaY))
    const top = Math.max(-(MONTH_BLOCK_HEIGHT * 11), Math.min(y + MONTH_BLOCK_HEIGHT * delta, 0))
    const index = Math.abs(top / MONTH_BLOCK_HEIGHT)

    changeWheelStyles(index)

    monthScrollContainer.style.transform = `translateY(${top}px)`
    y = top
    const month = calendar.selected.getMonth()
    const diff = index - month
    if (diff > 0) {
        calendar.toNextMonth()
    } else if (diff < 0) {
        calendar.toPrevMonth()
    }
    renderYear()
})
console.log(calendar);

monthScrollContainer?.addEventListener('click', e => {
    const divTarget: HTMLDivElement = (e.target as HTMLDivElement)
    const target: HTMLDivElement | null = divTarget.closest('.datewise_month')
    if (!target || !date) return

    y = target.dataset.index ? -target.dataset.index * MONTH_BLOCK_HEIGHT : 0;
    monthScrollContainer.style.transform = `translateY(${y}px)`

    const index: number = Number(target.dataset.index),
        month: number = calendar.selected.getMonth(),
        diff: number = index - month;
    changeWheelStyles(index)

    for (let i: number = 0; i < Math.abs(diff); i++) {
        if (diff > 0) {
            calendar.toNextMonth()
        } else if (diff < 0) {
            calendar.toPrevMonth()
        }
    }
    renderDays()
})

prevYearBtn?.addEventListener('click', () => {
    calendar.toPrevYear()
    renderDays()
    renderYear()
})

nextYearBtn?.addEventListener('click', () => {
    calendar.toNextMonth()
    renderDays()
    renderYear()
})

dayContainer?.addEventListener('click', e => {
    const divTarget: HTMLDivElement = (e.target as HTMLDivElement)
    const target: HTMLDivElement | null = divTarget.closest('.datewise_day')
    if (!target?.dataset.date || !date || !monthScrollContainer || !yearContainer) return

    calendar.toDate(new Date(target.dataset.date))
    date.innerHTML = dateTimeFormat.format(calendar.value).toString()
    renderDays()
    y = -calendar.value.getMonth() * MONTH_BLOCK_HEIGHT
    monthScrollContainer.style.transform = `translateY(${y}px)`
    changeWheelStyles(calendar.value.getMonth())
    yearContainer.innerHTML = calendar.selected.getFullYear().toString()
})


const renderYear = () => {
    if (!yearContainer) return
    yearContainer.innerHTML = calendar.selected.getFullYear().toString()
    renderDays()
}

const update = () => {
    if (!date || !monthScrollContainer) return

    date.innerHTML = dateTimeFormat.format(calendar.value).toString()

    renderDays()
    renderMonths()
    changeWheelStyles(Math.abs(y / MONTH_BLOCK_HEIGHT))
    monthScrollContainer.style.transform = `translateY(${y}px)`
    renderYear()
}

update()
window.addEventListener('click', () => { })
