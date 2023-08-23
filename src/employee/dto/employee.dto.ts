import { Position } from "src/position/position.model";
import { Employee } from "../employee.model";

export class CreateEmployeeDto {
  fullname: string;
  birthday: string;
  salary: number;
  dateOfHiring: string;
  employeePositionId?: number;

  constructor(employee: Employee) {
    this.fullname = employee.fullname;
    this.birthday = employee.birthday;
    this.salary = employee.salary;
    this.dateOfHiring = employee.dateOfHiring;
  }
}

export class EmployeeDto extends CreateEmployeeDto {
  employeeId: number;

  constructor(employee: Employee) {
    super(employee);
    this.employeeId = employee.employeeId;
  }
}

export class EmployeeDtoWhithPosition extends CreateEmployeeDto {
  position: Position;

  constructor(employee: Employee & { position: Position }) {
    super(employee);
    this.position = employee.position;
  }
}
