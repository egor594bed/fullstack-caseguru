import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CreateEmployeeDto, EmployeeDto } from "./dto/employee.dto";
import { EmployeeService } from "./employee.service";
import { PositionDecorator } from "src/auth/position-auth.decorator";
import { PositionGuard } from "src/auth/position.guard";

@Controller("employee")
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @PositionDecorator("hr")
  @UseGuards(PositionGuard)
  @Post("createEmployee")
  createEmployee(@Body() employeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployee(employeeDto);
  }

  @PositionDecorator("hr")
  @UseGuards(PositionGuard)
  @Patch("editEmployee")
  editEmployee(@Body() employeeDto: EmployeeDto) {
    return this.employeeService.editEmployee(employeeDto);
  }

  @Get("getEmployees")
  getEmployees() {
    return this.employeeService.getEmployees();
  }

  @PositionDecorator("hr")
  @UseGuards(PositionGuard)
  @Get("dismissEmployee")
  dismissEmployee(@Query("employeeId") employeeId: string) {
    return this.employeeService.dismissEmployee(employeeId);
  }

  @PositionDecorator("hr")
  @UseGuards(PositionGuard)
  @Get("getEmployeeStatistics")
  getEmployeeStatistics() {
    return this.employeeService.getEmployeeStatistics();
  }

  @Get("createPosition")
  createPosition(@Query("position") position: string) {
    return this.employeeService.createPosition(position);
  }
}
