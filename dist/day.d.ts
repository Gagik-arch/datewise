import { TDateStatus } from './types';
declare class Day {
    date: Date;
    status: TDateStatus;
    constructor(date: Date, status: TDateStatus);
    isWeekend(): boolean;
}
export default Day;
