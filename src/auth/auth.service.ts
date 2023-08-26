import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcryptjs";
import { AuthDto, AuthRegistrationDto } from "./dto/auth.dto";
import { Employee } from "src/employee/employee.model";
import { JwtService } from "@nestjs/jwt";
import { Position } from "src/position/position.model";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
    private jwtService: JwtService
  ) {}

  async login(authDto: AuthDto) {
    const employee = (await this.employeeRepository.findOne({
      where: { username: authDto.username },
      include: Position,
    })) as Employee & { position: Position };

    if (!employee) {
      throw new HttpException(
        "Неверные данные для входа",
        HttpStatus.BAD_REQUEST
      );
    }

    const isPasswordEquals = await bcrypt.compare(
      authDto.password,
      employee.password
    );

    if (!isPasswordEquals) {
      throw new HttpException(
        "Неверные данные для входа",
        HttpStatus.BAD_REQUEST
      );
    }

    const token = await this.generateToken(
      employee.employeeId,
      employee.position.position
    );

    return {
      token: token,
      employeeId: employee.employeeId,
      position: employee.position.position,
    };
  }

  async registration(authRegistrationDto: AuthRegistrationDto) {
    const employee = (await this.employeeRepository.findOne({
      where: { employeeId: authRegistrationDto.employeeId },
      include: Position,
    })) as Employee & { position: Position };

    if (!employee) {
      throw new HttpException(
        "Неверные данные для входа/Испорченная ссылка",
        HttpStatus.BAD_REQUEST
      );
    }

    if (employee.username) {
      throw new HttpException(
        "Данные для входа в систему уже существуют",
        HttpStatus.BAD_REQUEST
      );
    }

    const employeeByUsername = await this.employeeRepository.findOne({
      where: { username: authRegistrationDto.username },
    });

    if (employeeByUsername) {
      throw new HttpException(
        "Имя пользователя уже занято",
        HttpStatus.BAD_REQUEST
      );
    }

    const hashedPassword = await bcrypt.hash(authRegistrationDto.password, 5);

    employee.username = authRegistrationDto.username;
    employee.password = hashedPassword;

    await employee.save();

    const token = await this.generateToken(
      employee.employeeId,
      employee.position.position
    );

    return {
      token: token,
      employeeId: employee.employeeId,
      position: employee.position.position,
    };
  }

  async generateToken(employeeId: number, position: string) {
    const payload = {
      employeeId,
      position,
    };

    return this.jwtService.sign(payload);
  }
}
