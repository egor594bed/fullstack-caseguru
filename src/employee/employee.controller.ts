import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { CreateEmployeeDto, EmployeeDto } from "./dto/employee.dto";
import { EmployeeService } from "./employee.service";

@Controller("employee")
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post("createEmployee")
  createEmployee(@Body() employeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(employeeDto);
  }

  @Patch("editEmployee")
  editEmployee(@Body() employeeDto: EmployeeDto) {
    return this.employeeService.editEmployee(employeeDto);
  }

  @Get("getEmployees")
  getEmployees() {
    return this.employeeService.getEmployees();
  }

  @Get("dismissEmployee")
  dismissEmployee(@Query("employeeId") employeeId: string) {
    return this.employeeService.dismissEmployee(employeeId);
  }

  @Get("getEmployeeStatistics")
  getEmployeeStatistics() {
    return this.employeeService.getEmployeeStatistics();
  }
}
