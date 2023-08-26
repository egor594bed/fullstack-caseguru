import { Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import apiEmployeeService from "../../services/api-employee-service";
import dayjs from "dayjs";
import { domain } from "../../const/config";

//Убрать возможность ставить зп в минус
//Добавить селектор должности employeeId
export const AddNewEmployee = () => {
  const { request, loading, error } = useHttp();
  const [fullname, setFullname] = useState("");
  const [salary, setSalary] = useState(0);
  const [birthday, setBirthday] = useState(dayjs());
  const [dateOfHiring, setDateOfHiring] = useState(dayjs());
  const [newEmployeeId, setNewEmployeeId] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    request(() =>
      apiEmployeeService.createEmployee({
        fullname,
        salary,
        birthday,
        dateOfHiring,
      })
    ).then((data) => {
      if (data.employeeId) {
        setNewEmployeeId(data.employeeId);
      }
    });
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
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="ФИО"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        ></TextField>
        <TextField
          label="Зарплата"
          type="number"
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
        ></TextField>
        <DatePicker
          label="Дата рождения"
          format="DD-MM-YYYY"
          value={birthday}
          onChange={(newValue) => setBirthday(dayjs(newValue))}
        ></DatePicker>
        <DatePicker
          label="Дата приёма на работу"
          format="DD-MM-YYYY"
          value={dateOfHiring}
          onChange={(newValue) => setDateOfHiring(dayjs(newValue))}
        ></DatePicker>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ display: "flex" }}
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
