import { IDay } from './interfaces';
import { TDateStatus } from './types';
declare class Day implements IDay {
    date: Date;
    status: TDateStatus;
    constructor(date: Date, status: TDateStatus);
}
export default Day;
