import type nuvojs from './index';

declare global {
    interface Window {
        'datewise': typeof datewise;
    }
}

declare module '*.png';
declare module '*.jpg';
declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.module.css' {
    const content: Record<string, string>;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.jpeg' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}
