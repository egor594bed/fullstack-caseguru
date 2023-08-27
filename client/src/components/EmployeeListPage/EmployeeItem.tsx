import { FC, useState } from "react";
import { EmployeeDtoWhithPosition } from "../../types/EmployeeTypes";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import { positionsRu } from "../../const/positionLocalization";

type Props = {
  employee: EmployeeDtoWhithPosition;
};

export const EmployeeItem: FC<Props> = ({ employee }) => {
  return (
    <Accordion expanded={false}>
      <AccordionSummary style={{ cursor: "default" }}>
        <Typography sx={{ width: "50%", flexShrink: 0 }}>
          {employee.fullname}
        </Typography>
        <Typography
          sx={{ color: "text.secondary", textAlign: "end", width: "50%" }}
        >
          {positionsRu[employee.position.positionId]}
        </Typography>
      </AccordionSummary>
    </Accordion>
  );
};
