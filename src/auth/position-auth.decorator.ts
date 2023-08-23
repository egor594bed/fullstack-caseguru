import { SetMetadata } from "@nestjs/common";

export const POSITION_KEY = "position";

export const PositionDecorator = (...positions: string[]) =>
  SetMetadata(POSITION_KEY, positions);
