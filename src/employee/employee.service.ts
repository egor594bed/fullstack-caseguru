import { StatisticService } from "./../statistic/statistic.service";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Employee } from "./employee.model";
import { CreateEmployeeDto, EmployeeDto } from "./dto/employee.dto";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
    private statisticService: StatisticService
  ) {}

  async createEmployee(dto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.create(dto);

    return { employeeId: employee.employeeId };
  }

  async getEmployees() {
    const employees = await this.getNonDismissedEmployees();

    return employees.map((employee) => {
      return new EmployeeDto(employee);
    });
  }

  async dismissEmployee(employeeId: string) {
    const employee = await this.employeeRepository.findByPk(employeeId);
    employee.dateOfDismissal = String(new Date());
    employee.dismissed = true;

    await employee.save();

    return;
  }

  async editEmployee(dto: EmployeeDto) {
    const employee = await this.employeeRepository.findByPk(dto.employeeId);

    employee.fullname = dto.fullname;
    employee.birthday = dto.birthday;
    employee.position = dto.position;
    employee.salary = dto.salary;
    employee.dateOfHiring = dto.dateOfHiring;

    await employee.save();

    return;
  }

  async getEmployeeStatistics() {
    const dismissedEmployees = await this.statisticService.getDissmissed();
    const hiredEmployees = await this.statisticService.getHiredEmployees();
    const expectedSalaryPayouts =
      await this.statisticService.getExpectedSalaryPayouts();
    const futureMonthBirthdays = (
      await this.statisticService.getFutureMonthBirthdays()
    ).map((employee) => {
      return new EmployeeDto(employee);
    });
    return {
      dismissedEmployees,
      hiredEmployees,
      expectedSalaryPayouts,
      futureMonthBirthdays,
    };
  }

  private async getNonDismissedEmployees() {
    return await this.employeeRepository.findAll({
      where: { dismissed: false },
    });
  }
}
