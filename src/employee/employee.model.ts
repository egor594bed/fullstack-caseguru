import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IUserCreationAttributes {
  fullname: string;
  birthday: string;
  position: string;
  salary: number;
  dateOfHiring: string;
}

@Table({ tableName: "employees" })
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

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: "employee" })
  position: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  salary: number;

  @Column({ type: DataType.STRING, allowNull: false })
  dateOfHiring: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  dismissed: boolean;

  @Column({ type: DataType.STRING })
  dateOfDismissal: string;
}
