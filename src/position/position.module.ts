import { Module } from "@nestjs/common";
import { PositionService } from "./position.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Position } from "./position.model";

@Module({
  providers: [PositionService],
  imports: [SequelizeModule.forFeature([Position])],
  exports: [PositionService],
})
export class PositionModule {}
