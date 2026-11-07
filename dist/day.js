class Day {
    date;
    status;
    constructor(date, status) {
        this.date = date;
        this.status = status;
    }
    isWeekend() {
        return [0, 6].includes(this.date.getDay());
    }
    isToday() {
        const today = new Date();
        return (this.date.getFullYear() === today.getFullYear() &&
            this.date.getMonth() === today.getMonth() &&
            this.date.getDate() === today.getDate());
    }
}
export default Day;
//# sourceMappingURL=day.js.map