export class AuthDto {
  username: string;
  password: string;
}

export class AuthRegistrationDto extends AuthDto {
  employeeId: number;
}
