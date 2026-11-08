import { Element } from '@nuvo-js/core';
import type {
    ImageProps
} from './types';
import styles from './style.module.css';

class Image extends Element<HTMLImageElement> {
    public constructor({
        alt = 'image',
        ...props
    }: ImageProps) {

        super({
            tagName: 'img',
            props: {
                className: styles.root,
                alt,
                ...props,
            },
        });
    }
}

export default Image;
