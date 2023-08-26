import { FC } from "react";
import { EmployeeDtoWhithPosition } from "../../types/EmployeeTypes";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { positionsRu } from "../../const/positionLocalization";

type Props = {
  aboutMe: EmployeeDtoWhithPosition;
};

export const EmployeeAboutMe: FC<Props> = ({ aboutMe }) => {
  return (
    <>
      <Typography variant="h6">Обо мне: </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography>ФИО: {aboutMe.fullname}</Typography>
          <Typography>Зарплата: {aboutMe.salary}</Typography>
          <Typography>
            Должность: {positionsRu[aboutMe.position.positionId]}
          </Typography>
        </Box>
        <Box>
          <Typography>
            Дата найма: {dayjs(aboutMe.dateOfHiring).format("DD.MM.YYYY")}
          </Typography>
          <Typography>
            Дата рождения: {dayjs(aboutMe.birthday).format("DD.MM.YYYY")}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
