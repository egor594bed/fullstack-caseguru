import { Body, Controller, Patch, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, AuthRegistrationDto } from "./dto/auth.dto";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() authDto: AuthDto
  ) {
    return this.authService.login(authDto, response);
  }

  @Patch("registration")
  registration(@Body() authRegistrationDto: AuthRegistrationDto) {
    return this.authService.registration(authRegistrationDto);
  }
}
