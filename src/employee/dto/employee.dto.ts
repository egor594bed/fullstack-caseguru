import { Employee } from "../employee.model";

export class CreateEmployeeDto {
  fullname: string;
  birthday: string;
  position: string;
  salary: number;
  dateOfHiring: string;

  constructor(employee: Employee) {
    this.fullname = employee.fullname;
    this.birthday = employee.birthday;
    this.position = employee.position;
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
