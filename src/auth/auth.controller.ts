import { Body, Controller, Patch, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, AuthRegistrationDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Patch("registration")
  registration(@Body() authRegistrationDto: AuthRegistrationDto) {
    return this.authService.registration(authRegistrationDto);
  }
}
