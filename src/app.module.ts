import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

import { EmployeeModule } from "./employee/employee.module";
import { Employee } from "./employee/employee.model";
import { AuthModule } from "./auth/auth.module";
import { StatisticModule } from "./statistic/statistic.module";
import { PositionModule } from "./position/position.module";
import { Position } from "./position/position.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Position, Employee],
      autoLoadModels: true,
    }),
    PositionModule,
    EmployeeModule,
    AuthModule,
    StatisticModule,
  ],
})
export class AppModule {}
