class Day {
    date;
    status;
    constructor(date, status) {
        this.date = date;
        this.status = status;
    }
    IsWeekend() {
        return [0, 6].includes(this.date.getDay());
    }
    IsToday() {
        const today = new Date();
        return (this.date.getFullYear() === today.getFullYear() &&
            this.date.getMonth() === today.getMonth() &&
            this.date.getDate() === today.getDate());
    }
}
export default Day;
//# sourceMappingURL=day.js.map