import { Module } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { EmployeeController } from "./employee.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Employee } from "./employee.model";
import { StatisticModule } from "src/statistic/statistic.module";
import { Position } from "src/position/position.model";
import { PositionService } from "src/position/position.service";
import { PositionModule } from "src/position/position.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    SequelizeModule.forFeature([Employee]),
    StatisticModule,
    PositionModule,
    AuthModule,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
