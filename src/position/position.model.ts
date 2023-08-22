import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IPositionCreationAttributes {
  position: string;
}

@Table({ tableName: "positions" })
export class Position extends Model<Position, IPositionCreationAttributes> {
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
