import { FC, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  EmployeeDto,
  EmployeeDtoWhithPosition,
} from "../../types/EmployeeTypes";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import apiEmployeeService from "../../services/api-employee-service";
import { useHttp } from "../../hooks/http.hook";
import { positionsRu } from "../../const/positionLocalization";

type Props = {
  employee: EmployeeDtoWhithPosition;
  update: () => void;
};

export const EmployeeEditItem: FC<Props> = ({ employee, update }) => {
  const { request, loading } = useHttp();
  const [expanded, setExpanded] = useState<boolean>(false);
  const employeeId = useSelector((state: RootState) => state.auth.employeeId);
  const [data, setData] = useState<EmployeeDtoWhithPosition>({
    ...employee,
    employeePositionId: employee.position.positionId,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    request(() =>
      apiEmployeeService.editEmployee({
        ...data,
      })
    ).then(() => {
      update();
    });
  };

  const handleDismiss = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    request(() => apiEmployeeService.dismissEmployee(data.employeeId)).then(
      () => {
        update();
      }
    );
  };

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ width: "50%", flexShrink: 0 }}>
          {employee.fullname}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {positionsRu[data.position.positionId]}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={{ marginBottom: 2 }}
              label="ФИО"
              value={data.fullname}
              onChange={(e) => setData({ ...data, fullname: e.target.value })}
              required
            ></TextField>
            <TextField
              label="Зарплата"
              type="number"
              value={data.salary}
              onChange={(e) =>
                setData({ ...data, salary: Number(e.target.value) })
              }
              required
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <DatePicker
              sx={{ marginBottom: 2 }}
              label="Дата рождения"
              value={dayjs(data.birthday)}
              onChange={(newValue) =>
                setData({ ...data, birthday: dayjs(newValue) })
              }
            ></DatePicker>
            <DatePicker
              label="Дата приёма на работу"
              value={dayjs(data.dateOfHiring)}
              onChange={(newValue) =>
                setData({ ...data, dateOfHiring: dayjs(newValue) })
              }
            ></DatePicker>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <FormControl>
              <InputLabel id="position-label">Должность</InputLabel>
              <Select
                labelId="position-label"
                sx={{ marginBottom: 2 }}
                label="Должность"
                value={data.employeePositionId}
                onChange={(e) =>
                  setData({
                    ...data,
                    employeePositionId: Number(e.target.value),
                  })
                }
              >
                <MenuItem value={1}>Работник</MenuItem>
                <MenuItem value={2}>HR</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">
              Сохранить изменения
            </Button>
          </Box>
          <Button
            variant="contained"
            onClick={handleDismiss}
            sx={{
              ":hover": { backgroundColor: "red" },
            }}
            disabled={employeeId === data.employeeId || loading}
          >
            Уволить
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
