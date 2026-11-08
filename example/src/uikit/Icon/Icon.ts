import { Element } from '@nuvo-js/core';
import Icons from './assets/index';
import type { IconProps } from './types';
import styles from './style.module.css';

class Icon extends Element<HTMLSpanElement> {
    public constructor(
        name: keyof typeof Icons,
        props?: IconProps
    ) {
        const {
            size, ..._props
        } = {
            size: 24, ...props,
        };

        super({
            tagName: 'span',
            props: {
                className: [ styles.root, _props.className || '' ].join(' '),
                style: {
                    width: `${size}px`,
                    height: `${size}px`,
                },
                children: [
                    Icons[name]({
                        width: size,
                        height: size,
                        ..._props,
                    })
                ],
            },
        });
    }
}

export default Icon;
