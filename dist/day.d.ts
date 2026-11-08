import type { TDayStatus } from './types';
declare class Day {
    date: Date;
    status: TDayStatus;
    constructor(date: Date, status: TDayStatus);
    IsWeekend(): boolean;
    IsToday(): boolean;
}
export default Day;
//# sourceMappingURL=day.d.ts.map