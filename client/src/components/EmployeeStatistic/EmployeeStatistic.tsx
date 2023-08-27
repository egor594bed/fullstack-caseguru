import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import apiEmployeeService from "../../services/api-employee-service";
import { Statistic } from "../../types/StatisticTypes";
import { StatisticChart } from "./StatisticChart";
import { BirthdaysTable } from "./BirthdaysTable";
import { DefaultContainer } from "../UI/DefaultContainer/DefaultContainer";
import { Loading } from "../UI/Loading/Loading";

export const EmployeeStatistic = () => {
  const { request, loading, error } = useHttp();
  const [statistic, setStatistic] = useState<Statistic>();
  const ref = useRef();

  useEffect(() => {
    request(apiEmployeeService.getEmployeeStatistics).then((data) => {
      setStatistic(data);
    });
  }, []);

  const salaryPayouts = useMemo(() => {
    if (statistic === undefined) {
      return [];
    }
    return new Array(12).fill(0).map((_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() + index);
      const month = new Date(date).toLocaleString("ru-RU", { month: "long" });

      return {
        x: month,
        y: statistic.expectedSalaryPayouts * (index + 1),
      };
    });
  }, [statistic]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 2,
          color: "error.main",
        }}
      >
        {error}
      </Typography>
    );
  }
  if (statistic === undefined) {
    return <></>;
  }

  return (
    <>
      <DefaultContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h5">Нанято:</Typography>
            <Typography variant="subtitle1">
              За год: {statistic.hiredEmployees.lastYearHiredEmployees}
            </Typography>
            <Typography variant="subtitle1">
              За месяц: {statistic.hiredEmployees.lastMonthHiredEmployees}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">Уволено:</Typography>
            <Typography variant="subtitle1">
              За год: {statistic.dismissedEmployees.lastYearDismissedEmployees}
            </Typography>
            <Typography variant="subtitle1">
              За месяц:{" "}
              {statistic.dismissedEmployees.lastMonthDismissedEmployees}
            </Typography>
          </Box>
        </Box>
      </DefaultContainer>
      <DefaultContainer>
        <StatisticChart salaryPayouts={salaryPayouts} />
      </DefaultContainer>
      <DefaultContainer>
        <BirthdaysTable futureMonthBirthdays={statistic.futureMonthBirthdays} />
      </DefaultContainer>
    </>
  );
};
