import type Calendar from './index';

declare global {
    interface Window {
        'datewise': typeof Calendar;
    }
}
 
export { }