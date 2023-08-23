import { StatisticService } from "./../statistic/statistic.service";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Employee } from "./employee.model";
import {
  CreateEmployeeDto,
  EmployeeDto,
  EmployeeDtoWhithPosition,
} from "./dto/employee.dto";
import { Position } from "src/position/position.model";
import { PositionService } from "src/position/position.service";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
    private statisticService: StatisticService,
    private positionService: PositionService
  ) {}

  async createPosition(position: string) {
    await this.positionService.createPosition(position);

    return;
  }

  async createEmployee(dto: CreateEmployeeDto) {
    const position = await this.positionService.getPositionByValue("employee");
    dto.employeePositionId = position.positionId;
    const employee = await this.employeeRepository.create(dto);

    return { employeeId: employee.employeeId };
  }

  async getEmployees() {
    const employees = await this.getNonDismissedEmployees();

    return employees.map((employee: Employee & { position: Position }) => {
      return new EmployeeDtoWhithPosition(employee);
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

  async getNonDismissedEmployees() {
    return this.employeeRepository.findAll({
      where: { dismissed: false },
      include: Position,
    });
  }
}
