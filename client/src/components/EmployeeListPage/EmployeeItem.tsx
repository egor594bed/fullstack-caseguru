import { FC } from "react";
import { EmployeeDtoWhithPosition } from "../../types/EmployeeTypes";

type Props = {
  employee: EmployeeDtoWhithPosition;
};

export const EmployeeItem: FC<Props> = ({ employee }) => {
  return <div>EmployeeItem</div>;
};
