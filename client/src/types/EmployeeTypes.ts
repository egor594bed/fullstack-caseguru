export type CreateEmployeeDto = {
  fullname: string;
  birthday: string;
  salary: number;
  dateOfHiring: string;
  employeePositionId?: number;
};

export type EmployeeDto = CreateEmployeeDto & {
  employeeId: number;
};

export type Position = {
  positionId: number;
  position: string;
};

export type EmployeeDtoWhithPosition = CreateEmployeeDto & {
  position: Position;
};
