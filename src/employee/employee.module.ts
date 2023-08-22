import { Module } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeController } from "./employee.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Employee } from "./employee.model";
import { StatisticModule } from "src/statistic/statistic.module";

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [SequelizeModule.forFeature([Employee]), StatisticModule],
  exports: [EmployeeService],
})
export class EmployeeModule {}
