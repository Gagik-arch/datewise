import type { ElementPropsType } from '@nuvo-js/core/types';

export type ButtonProps = ElementPropsType<HTMLButtonElement> & {
    onPress?: (e: MouseEvent) => void;
};
