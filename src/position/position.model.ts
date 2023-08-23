import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Employee } from "src/employee/employee.model";

interface IPositionCreationAttributes {
  position: string;
}

@Table({ tableName: "positions", createdAt: false, updatedAt: false })
export class Position extends Model<Position, IPositionCreationAttributes> {
  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  positionId: number;

  @Column({ type: DataType.STRING, unique: true })
  position: string;
}
