import { IDay } from './interfaces';
import { TDateStatus } from './types';

class Day implements IDay {
    public date: Date;
    public status: TDateStatus;

    constructor(date: Date, status: TDateStatus) {
        this.date = date;
        this.status = status;
    }
    isWeekDay(): boolean {
        return this.date.getDay() % 1 === 0 && this.date.getDay() % 6 === 0
    }
}

export default Day;
