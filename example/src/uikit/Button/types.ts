import type { ElementPropsType } from '@nuvo-js/core/types';

export type ButtonProps = ElementPropsType<HTMLButtonElement> & {
    variant?: 'default' | 'error' | 'primary';
    onPress?: (e:MouseEvent) => void;
};
