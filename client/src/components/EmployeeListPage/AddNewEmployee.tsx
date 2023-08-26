import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { FC, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import apiEmployeeService from "../../services/api-employee-service";
import dayjs from "dayjs";
import { domain } from "../../const/config";

//Убрать возможность ставить зп в минус

type Props = {
  update: () => void;
};

export const AddNewEmployee: FC<Props> = ({ update }) => {
  const { request, loading, error } = useHttp();
  const [newEmployee, setNewEmployee] = useState({
    fullname: "",
    salary: 0,
    birthday: dayjs(),
    dateOfHiring: dayjs(),
    employeePositionId: 1,
  });
  const [newEmployeeId, setNewEmployeeId] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await request(() => apiEmployeeService.createEmployee(newEmployee)).then(
      (data) => {
        if (data.employeeId) {
          setNewEmployeeId(data.employeeId);
        }
      }
    );

    update();
  };

  return (
    <>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Добавить сотрудника:
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          gap: 2,
        }}
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            label="ФИО"
            value={newEmployee.fullname}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, fullname: e.target.value })
            }
          ></TextField>
          <TextField
            label="Зарплата"
            type="number"
            value={newEmployee.salary}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, salary: Number(e.target.value) })
            }
          ></TextField>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <DatePicker
            label="Дата рождения"
            format="DD-MM-YYYY"
            value={newEmployee.birthday}
            onChange={(newValue) =>
              setNewEmployee({ ...newEmployee, birthday: dayjs(newValue) })
            }
          ></DatePicker>
          <DatePicker
            label="Дата приёма на работу"
            format="DD-MM-YYYY"
            value={newEmployee.dateOfHiring}
            onChange={(newValue) =>
              setNewEmployee({ ...newEmployee, dateOfHiring: dayjs(newValue) })
            }
          ></DatePicker>
        </Box>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="position-label">Должность</InputLabel>
          <Select
            labelId="position-label"
            sx={{ marginBottom: 2, width: "100%" }}
            label="Должность"
            value={newEmployee.employeePositionId}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                employeePositionId: Number(e.target.value),
              })
            }
          >
            <MenuItem value={1}>Работник</MenuItem>
            <MenuItem value={2}>HR</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ display: "flex", width: "30%" }}
        >
          Добавить
        </Button>
      </Box>
      {error && (
        <Typography sx={{ marginTop: 2 }} color={"error"}>
          {error}
        </Typography>
      )}
      {newEmployeeId && (
        <Typography sx={{ marginTop: 2 }}>
          {`Ссылка для регистрации: ${domain}/registration/${newEmployeeId}`}
        </Typography>
      )}
    </>
  );
};
