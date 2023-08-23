import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { POSITION_KEY } from "./position-auth.decorator";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class PositionGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requairedPosition = this.reflector.getAllAndOverride<string[]>(
        POSITION_KEY,
        [context.getHandler(), context.getClass()]
      );

      if (!requairedPosition) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers.authorization;
      const token = authHeader.split(" ")[1];

      if (!authHeader || !token) {
        throw new UnauthorizedException({
          message: "Пользователь не авторизован",
        });
      }

      const decoded = this.jwtService.verify(token);
      request.employee = decoded;

      return requairedPosition.includes(decoded.position);
    } catch (error) {}
  }
}
