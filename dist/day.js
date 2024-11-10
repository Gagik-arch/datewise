class Day {
    constructor(date, status) {
        this.date = date;
        this.status = status;
    }
    isWeekDay() {
        return this.date.getDay() % 1 === 0 && this.date.getDay() % 6 === 0;
    }
}
export default Day;
