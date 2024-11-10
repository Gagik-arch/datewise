import { IDay } from './interfaces';
import { TDateStatus } from './types';

class Day implements IDay {
    public date: Date;
    public status: TDateStatus;

    constructor(date: Date, status: TDateStatus) {
        this.date = date;
        this.status = status;
    }
}

export default Day;
