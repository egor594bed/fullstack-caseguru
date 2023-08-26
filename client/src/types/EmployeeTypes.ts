import dayjs from "dayjs";

export type CreateEmployeeDto = {
  fullname: string;
  birthday: string | dayjs.Dayjs;
  salary: number;
  dateOfHiring: string | dayjs.Dayjs;
  employeePositionId?: number;
};

export type EmployeeDto = CreateEmployeeDto & {
  employeeId: number;
};

export type Position = {
  positionId: number;
  position: string;
};

export type EmployeeDtoWhithPosition = EmployeeDto & {
  position: Position;
};
