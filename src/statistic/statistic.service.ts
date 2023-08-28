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
    const hiredEmployees = await this.employeeRepository.findAll();

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

    const futureMonthBirthdays = employees.filter((employee) => {
      const birthday = new Date(employee.birthday);

      if (
        birthday.getMonth() - dateNow.getMonth() === 0 &&
        birthday.getDate() - dateNow.getDate() >= 0
      ) {
        return true;
      } else if (
        birthday.getMonth() - dateNow.getMonth() === 1 &&
        birthday.getDate() <= dateNow.getDate()
      ) {
        return true;
      }

      return false;
    });

    futureMonthBirthdays.sort((a, b) => {
      const aDate = new Date(a.birthday);
      const bDate = new Date(b.birthday);

      if (aDate.getMonth() - bDate.getMonth() === 0) {
        if (aDate.getDate() - bDate.getDate() === 0) {
          return -1;
        }
        return aDate.getDate() - bDate.getDate();
      } else if (aDate.getMonth() - bDate.getMonth() === 1) {
        return 1;
      }
    });

    return futureMonthBirthdays;
  }

  private async getNonDismissedEmployees() {
    return await this.employeeRepository.findAll({
      where: { dismissed: false },
    });
  }
}
