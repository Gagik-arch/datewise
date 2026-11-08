import { Element } from '@nuvo-js/core';
import type {
    ScrollProps
} from './types';
import styles from './style.module.css';
import { clsx } from '../../utils/clsx';

class Scroll extends Element<HTMLDivElement> {
    public constructor({
        className,
        ...props
    }: ScrollProps) {
        let timeout: number | undefined;

        super({
            tagName: 'div',
            props: {
                className: clsx(typeof className !== 'function' ? className : undefined, styles.root),
                events: {
                    onmouseleave: (e) => {
                        const target = e.target as HTMLDivElement;

                        timeout = setTimeout(() => {
                            target.classList.remove(styles.visible);
                        }, 2000);
                    },
                    onmouseenter: (e) => {
                        clearTimeout(timeout);

                        const target = e.currentTarget as HTMLDivElement;

                        target.classList.add(styles.visible);
                    },
                },
                ...props,
            },
        });
    }
}

export default Scroll;
