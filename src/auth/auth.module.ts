import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { EmployeeModule } from "src/employee/employee.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Employee } from "src/employee/employee.model";
import { JwtModule } from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([Employee]),
    EmployeeModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: "12h",
      },
    }),
  ],
})
export class AuthModule {}
