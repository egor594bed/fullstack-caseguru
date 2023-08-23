import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Position } from "src/position/position.model";

interface IUserCreationAttributes {
  fullname: string;
  birthday: string;
  salary: number;
  dateOfHiring: string;
}

@Table({ tableName: "employees", createdAt: false, updatedAt: false })
export class Employee extends Model<Employee, IUserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  employeeId: number;

  @Column({ type: DataType.STRING, unique: true })
  username: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  fullname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  birthday: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  salary: number;

  @Column({ type: DataType.STRING, allowNull: false })
  dateOfHiring: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  dismissed: boolean;

  @Column({ type: DataType.STRING })
  dateOfDismissal: string;

  @ForeignKey(() => Position)
  @BelongsTo(() => Position, {
    as: "position",
    foreignKey: "employeePositionId",
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  employeePositionId: number;
}
