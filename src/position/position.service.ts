import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Position } from "./position.model";

@Injectable()
export class PositionService {
  constructor(
    @InjectModel(Position) private positionRepository: typeof Position
  ) {}

  async createPosition(position: string) {
    await this.positionRepository.create({
      position,
    });
  }

  async getPosition(positionId: number) {
    return this.positionRepository.findByPk(positionId);
  }

  async getPositionByValue(position: number): Promise<Position> {
    return this.positionRepository.findOne({ where: { position: position } });
  }
}
