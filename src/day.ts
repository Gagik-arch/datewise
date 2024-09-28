import { IDay } from './interfaces';

class Day implements IDay {
    public date: Date;
    public label: string | number;
    public status: string;

    constructor(date: Date, label: string | number, status: string) {
        this.date = date;
        this.label = label;
        this.status = status;
    }
}

export default Day;
