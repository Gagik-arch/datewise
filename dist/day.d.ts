import { IDay } from './interfaces';
declare class Day implements IDay {
    date: Date;
    status: string;
    constructor(date: Date, status: string);
}
export default Day;
