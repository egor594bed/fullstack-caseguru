import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { EmployeeDto } from "../../types/EmployeeTypes";

type Props = {
  futureMonthBirthdays: EmployeeDto[];
};

export const BirthdaysTable: FC<Props> = ({ futureMonthBirthdays }) => {
  return (
    <>
      <Typography variant="h5">Ближайшие дни рождения:</Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>ФИО</TableCell>
            <TableCell align="right">Дата рождения</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {futureMonthBirthdays.map((employee: EmployeeDto, index) => (
            <TableRow
              key={employee.employeeId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {employee.fullname}
              </TableCell>
              <TableCell align="right">{employee.birthday as string}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {futureMonthBirthdays.length === 0 && (
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", marginTop: 2 }}
        >
          В ближайший месяц никто не празднует
        </Typography>
      )}
    </>
  );
};
