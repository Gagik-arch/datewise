import Calendar from '../../dist/index.js'
import { changeWheelStyles } from './utils.ts'

const MONTH_BLOCK_HEIGHT = 84;

const calendar = new Calendar()

const weekContainer: HTMLElement | null = document.getElementById('datewise_week_container')
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
        child.classList.add(`datewise_${day.status.replaceAll('-', '_')}`)

        parent.dataset.weekday = day.date.getDay().toString()
        parent.dataset.date = day.date.toString()
        child.innerHTML = day.date.getDate().toString()
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
    year: 'numeric',
})


let //isDowned: boolean = false,
    y: number = -calendar.value.getMonth() * MONTH_BLOCK_HEIGHT;

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

monthContainer?.addEventListener('wheel', (e) => {
    if (!monthScrollContainer) return
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

monthScrollContainer?.addEventListener('click', e => {
    const divTarget: HTMLDivElement = (e.target as HTMLDivElement)
    const target: HTMLDivElement | null = divTarget.closest('.datewise_month')
    if (!target || !date) return
    changeWheelStyles(Number(target.dataset.index))
    y = target.dataset.index ? -target.dataset.index * MONTH_BLOCK_HEIGHT : 0;

    monthScrollContainer.style.transform = `translateY(${y}px)`

    const index = Math.abs(y / MONTH_BLOCK_HEIGHT),
        day = calendar.selected.getDate(),
        year = calendar.selected.getFullYear();
    calendar.toDate(new Date(year, index, day))
    date.innerHTML = dateTimeFormat.format(calendar.value).toString()
    renderDays()
})

// monthContainer?.addEventListener('mousedown', () => {
//     isDowned = true
// })

// window.addEventListener('mouseup', () => {
//     isDowned = false
// })

prevYearBtn?.addEventListener('click', () => {
    calendar.toPrevYear()
    renderDays()
    renderYear()
})

nextYearBtn?.addEventListener('click', () => {
    calendar.toNextYear()
    renderDays()
    renderYear()
})

dayContainer?.addEventListener('click', e => {
    const divTarget: HTMLDivElement = (e.target as HTMLDivElement)
    const target: HTMLDivElement | null = divTarget.closest('.datewise_day')
    if (!target?.dataset.date || !date) return
    calendar.toDate(new Date(target.dataset.date))
    date.innerHTML = dateTimeFormat.format(calendar.value).toString()
    renderDays()
})


const renderYear = () => {
    const year: HTMLElement | null = document.getElementById('datewise_year')
    if (!year) return
    year.innerHTML = calendar.selected.getFullYear().toString()
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
