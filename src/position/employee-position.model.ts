import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Employee } from "src/employee/employee.model";
import { Position } from "./position.model";

interface IEmployeePositionCreationAttributes {
  employeeId: number;
  positionId: number;
}

@Table({ tableName: "employeePosition" })
export class EmployeePosition extends Model<
  EmployeePosition,
  IEmployeePositionCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  employeePositionId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: string;

  @ForeignKey(() => Position)
  @Column({ type: DataType.INTEGER })
  positionId: string;
}
