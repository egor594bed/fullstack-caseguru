import { EmployeeService } from "./../employee/employee.service";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Employee } from "src/employee/employee.model";

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee
  ) {}

  async getDissmissed() {
    const dismissedEmployees = await this.employeeRepository.findAll({
      where: { dismissed: true },
    });

    const dateNow = new Date();
    const dateLastMonth = new Date(dateNow);
    dateLastMonth.setMonth(dateLastMonth.getMonth() - 1);
    const dateLastYear = new Date(dateNow);
    dateLastYear.setFullYear(dateLastYear.getFullYear() - 1);

    const lastMonthDismissedEmployees = [];
    const lastYearDismissedEmployees = dismissedEmployees.filter((employee) => {
      const dismissDate = new Date(employee.dateOfDismissal);

      if (dateLastYear.getTime() <= dismissDate.getTime()) {
        if (dateLastMonth.getTime() <= dismissDate.getTime()) {
          lastMonthDismissedEmployees.push(employee);
        }

        return true;
      }

      return false;
    });

    return {
      lastMonthDismissedEmployees: lastMonthDismissedEmployees.length,
      lastYearDismissedEmployees: lastYearDismissedEmployees.length,
    };
  }

  async getHiredEmployees() {
    const hiredEmployees = await this.getNonDismissedEmployees();

    const dateNow = new Date();
    const dateLastMonth = new Date(dateNow);
    dateLastMonth.setMonth(dateLastMonth.getMonth() - 1);
    const dateLastYear = new Date(dateNow);
    dateLastYear.setFullYear(dateLastYear.getFullYear() - 1);

    const lastMonthHiredEmployees = [];
    const lastYearHiredEmployees = hiredEmployees.filter((employee) => {
      const hiringDate = new Date(employee.dateOfHiring);

      if (dateLastYear.getTime() <= hiringDate.getTime()) {
        if (dateLastMonth.getTime() <= hiringDate.getTime()) {
          lastMonthHiredEmployees.push(employee);
        }

        return true;
      }

      return false;
    });

    return {
      lastMonthHiredEmployees: lastMonthHiredEmployees.length,
      lastYearHiredEmployees: lastYearHiredEmployees.length,
    };
  }

  async getExpectedSalaryPayouts() {
    const employeers = await this.getNonDismissedEmployees();

    return employeers.reduce((acc, employee) => {
      return acc + employee.salary;
    }, 0);
  }

  async getFutureMonthBirthdays() {
    const employees = await this.getNonDismissedEmployees();

    const dateNow = new Date();
    const dateFutureMonth = new Date(dateNow);
    dateFutureMonth.setMonth(dateFutureMonth.getMonth() + 1);

    const futureMonthBirthdays = employees.filter((employee) => {
      const birthday = new Date(employee.birthday);

      if (
        dateNow.getTime() <= birthday.getTime() &&
        birthday.getTime() <= dateFutureMonth.getTime()
      ) {
        return true;
      }

      return false;
    });

    return futureMonthBirthdays;
  }

  private async getNonDismissedEmployees() {
    return await this.employeeRepository.findAll({
      where: { dismissed: false },
    });
  }
}
