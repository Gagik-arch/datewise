class Day {
    date;
    status;
    constructor(date, status) {
        this.date = date;
        this.status = status;
    }
    isWeekend() {
        return this.date.getDay() === 0 || this.date.getDay() === 6;
    }
}
export default Day;
//# sourceMappingURL=day.js.map