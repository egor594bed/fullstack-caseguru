import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/auth";
import { AppDispatch, RootState } from "../../redux/store";

export const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <Box component="form" onSubmit={(e) => submitHandler(e)}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: 2, color: "primary.main" }}
      >
        Авторизация
      </Typography>
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
      <Box sx={{ height: 10, marginBottom: 2, marginTop: -1 }}>
        {error && <Typography sx={{ color: "error.main" }}>{error}</Typography>}
      </Box>
      <Button
        variant="contained"
        type="submit"
        disabled={loading}
        sx={{ width: "100%", padding: 1, fontSize: 16 }}
      >
        Войти
      </Button>
    </Box>
  );
};
