import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import authService from "../../services/auth-service";
import { useParams, useNavigate } from "react-router-dom";

export const NewEmployeeAuthForm = () => {
  const { request, loading, error } = useHttp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const param = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await request(() =>
      authService.register(username, password, Number(param.employeeId))
    );

    if (!error) {
      navigate("../");
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: 2, color: "primary.main" }}
      >
        Регистрация в системе
      </Typography>
      <Box component={"form"} onSubmit={submitHandler}>
        <TextField
          label="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Пароль"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          variant="contained"
          type="submit"
          disabled={loading || username === "" || password === ""}
          sx={{ width: "100%", padding: 1, fontSize: 16 }}
        >
          Зарегистрироваться
        </Button>
        {error && <Typography sx={{ color: "error.main" }}>{error}</Typography>}
      </Box>
    </>
  );
};
