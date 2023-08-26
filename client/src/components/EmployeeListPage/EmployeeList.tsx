import { FC, useCallback } from "react";
import { EmployeeDtoWhithPosition } from "../../types/EmployeeTypes";
import { Typography } from "@mui/material";
import { EmployeeEditItem } from "./EmployeeEditItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { EmployeeItem } from "./EmployeeItem";

type Props = {
  employees: EmployeeDtoWhithPosition[];
  update: () => void;
};

export const EmployeeList: FC<Props> = ({ employees, update }) => {
  const position = useSelector((state: RootState) => state.auth.position);

  return (
    <>
      <Typography sx={{ marginBottom: 2 }} variant="h6">
        Список сотрудников:
      </Typography>
      {employees &&
        employees.map((employee) => {
          if (position === "employee") {
            return (
              <EmployeeItem key={employee.employeeId} employee={employee} />
            );
          }
          return (
            <EmployeeEditItem
              key={employee.employeeId}
              employee={employee}
              update={update}
            />
          );
        })}
    </>
  );
};
