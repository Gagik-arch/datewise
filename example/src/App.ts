import { Element, Store } from '@nuvo-js/core';
import { Button, Image, Icon } from './uikit';
import Scroll from './uikit/Scroll';
import Calendar from '../../dist';
import logo from './assets/images/datewise-logo.png'
import { clsx } from './utils/clsx';
import type { TDayStatus } from '../../dist/types';

function App() {
    const calendar = new Calendar()
    const store = new Store<number>(0);

    const dayContainer = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'day_container',
            children: [

            ],
        },
    })

    const year = new Element<HTMLDivElement>({
        tagName: 'div',
        props: {
            id: 'year'
        }
    })

    const update = () => {
        store.SetState(prev => prev + 1)
    }

    const onPressPrevYear = () => {
        calendar.ToPrevYear()
        update()
    }

    const onPressNextYear = () => {
        calendar.ToNextYear();
        update()
    }

    const onPressPrevMonth = () => {
        calendar.ToPrevMonth()
        update()
    }

    const onPressNextMonth = () => {
        calendar.ToNextMonth();
        update()
    }

    const onChangeValue = (day: Date, status: TDayStatus) => {
        switch (status) {
            case 'prev-month':
                onPressPrevMonth()
                break;
            case 'next-month':
                onPressNextMonth()
                break;

            default:
                calendar.SetValue(day);
                update()
                break;
        }
    }

    store.Effect(() => {
        console.log(calendar)
        year.SetProps({
            children: [
                calendar.cursor.toLocaleDateString('en', {
                    month: 'long',
                    year: 'numeric'
                }),
            ]
        })

        dayContainer.SetProps({
            children: calendar.days.map(day => {
                return (
                    new Button({
                        key: day.date.toISOString(),
                        onPress: () => onChangeValue(day.date, day.status),
                        className: clsx(
                            'day',
                            day.status,
                            day.IsWeekend() ? 'is_weekend' : undefined,
                            day.IsToday() ? 'is_today' : undefined,
                            (day.date.toLocaleDateString('us', {
                                weekday: 'short'
                            })).toLowerCase(),
                            day.status,
                            calendar.IsEqual(calendar.value, day.date) ? 'selected' : undefined
                        ),
                        children: [
                            new Element<HTMLSpanElement>({
                                tagName: 'span',
                                props: {
                                    children: [day.date.getDate().toString()]
                                }
                            }).dom
                        ],
                    }).dom
                )
            })
        })
    })

    function navigation() {
        return (
            new Element<HTMLDivElement>({
                tagName: 'div',
                props: {
                    id: 'navigation',
                    children: [
                        new Button({
                            children: [
                                new Icon('ChevronsLeft').dom,
                            ],
                            onPress: onPressPrevYear

                        }).dom,

                        new Button({
                            children: [
                                new Icon('ChevronLeft').dom
                            ],
                            onPress: onPressPrevMonth

                        }).dom,


                        year.dom,

                        new Button({
                            children: [
                                new Icon('ChevronRight').dom
                            ],
                            onPress: onPressNextMonth
                        }).dom,

                        new Button({
                            children: [
                                new Icon('ChevronsRight').dom,
                            ],
                            onPress: onPressNextYear

                        }).dom,
                    ]
                }
            }).dom
        )
    }

    return (
        new Scroll({
            children: [
                new Element<HTMLDivElement>({
                    tagName: 'div',
                    props: {
                        id: 'root',
                        children: [
                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    id: 'image_container',
                                    children: [
                                        new Image({
                                            src: logo,
                                        }).dom,
                                    ]
                                }
                            }).dom,

                            new Element<HTMLDivElement>({
                                tagName: 'div',
                                props: {
                                    className: 'container',
                                    children: [
                                        navigation(),

                                        new Element<HTMLDivElement>({
                                            tagName: 'div',
                                            props: {
                                                id: 'weekday_container',
                                                children: calendar.weekDays.map(weekday => {
                                                    return (
                                                        new Element<HTMLSpanElement>({
                                                            tagName: 'span',
                                                            props: {
                                                                key: weekday,
                                                                className: weekday.substring(0, 3).toLowerCase(),
                                                                children: [weekday.substring(0, 3)],
                                                            },
                                                        }).dom
                                                    )
                                                })
                                            },
                                        }).dom,

                                        dayContainer.dom
                                    ],
                                },
                            }).dom,
                        ],
                    },
                }).dom,
            ]
        }).dom
    );
}

export default App;
