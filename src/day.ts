import type { TDayStatus } from './types';

class Day  {
    public date: Date;
    public status: TDayStatus;

    constructor(date: Date, status: TDayStatus) {
        this.date = date;
        this.status = status;
    }
    public isWeekend(): boolean {
        return this.date.getDay() === 0 || this.date.getDay() === 6
    }
}

export default Day;
