import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { EmployeeModule } from "src/employee/employee.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Employee } from "src/employee/employee.model";
import { JwtModule } from "@nestjs/jwt";
import { Position } from "src/position/position.model";
import { PositionGuard } from "./position.guard";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([Employee]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: "12h",
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
