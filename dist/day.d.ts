import { IDay } from './interfaces';
declare class Day implements IDay {
    date: Date;
    label: string | number;
    status: string;
    constructor(date: Date, label: string | number, status: string);
}
export default Day;
