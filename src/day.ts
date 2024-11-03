import { IDay } from './interfaces';

class Day implements IDay {
    public date: Date;
    public status: string;

    constructor(date: Date, status: string) {
        this.date = date;
        this.status = status;
    }
}

export default Day;
