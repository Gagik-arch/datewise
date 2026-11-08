import { Element } from '@nuvo-js/core';
import type { ButtonProps } from './types';
import styles from './button.module.css';

class Button extends Element<HTMLButtonElement> {
    public constructor({
        type = 'button',
        className = '',
        onPress,
        events,
        ...props
    }: ButtonProps) {
        super({
            tagName: 'button',
            props: {
                className: [
                    styles.root,
                    className
                ].join(' '),
                type,
                events: {
                    onclick: (e) => {
                        onPress?.(e);
                    },
                    ...events,
                },
                ...props,
            },
        });
    }
}

export default Button;
