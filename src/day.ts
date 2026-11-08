import type { TDayStatus } from './types';

class Day {
    public date: Date;
    public status: TDayStatus;

    constructor(date: Date, status: TDayStatus) {
        this.date = date;
        this.status = status;
    }

    public IsWeekend(): boolean {
        return [0, 6].includes(this.date.getDay());
    }

    public IsToday(): boolean {
        const today = new Date();

        return (
            this.date.getFullYear() === today.getFullYear() &&
            this.date.getMonth() === today.getMonth() &&
            this.date.getDate() === today.getDate()
        );
    }
}

export default Day;
