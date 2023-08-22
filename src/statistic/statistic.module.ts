import { Module } from "@nestjs/common";
import { StatisticService } from "./statistic.service";
import { Employee } from "src/employee/employee.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  providers: [StatisticService],
  exports: [StatisticService],
  imports: [SequelizeModule.forFeature([Employee])],
})
export class StatisticModule {}
