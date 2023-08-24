import { EmployeeDto } from "./EmployeeTypes";

export type Statistic = {
  dismissedEmployees: {
    lastMonthDismissedEmployees: number;
    lastYearDismissedEmployees: number;
  };
  hiredEmployees: {
    lastMonthHiredEmployees: number;
    lastYearHiredEmployees: number;
  };
  expectedSalaryPayouts: number;
  futureMonthBirthdays: EmployeeDto[];
};
