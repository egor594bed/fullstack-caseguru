export type AuthDto = {
  username: string;
  password: string;
};

export type AuthRegistrationDto = AuthDto & {
  employeeId: number;
};
