import { TDateStatus } from './types';

class Day  {
    public date: Date;
    public status: TDateStatus;

    constructor(date: Date, status: TDateStatus) {
        this.date = date;
        this.status = status;
    }
    public isWeekend(): boolean {
        return this.date.getDay() === 0 || this.date.getDay() === 6
    }
}

export default Day;
