import { Button, TextField, Typography } from "@mui/material";

export const NewEmployeeAuthForm = () => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: 2, color: "primary.main" }}
      >
        Регистрация в системе
      </Typography>
      <TextField
        label="Логин"
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Пароль"
        // value={password}
        type="password"
        // onChange={(e) => setPassword(e.target.value)}
        required
      />
      <TextField
        label="Подтвердите пароль"
        // value={password}
        type="password"
        // onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        variant="contained"
        type="submit"
        disabled={false}
        sx={{ width: "100%", padding: 1, fontSize: 16 }}
      >
        Зарегистрироваться
      </Button>
      {/* {error && <Typography sx={{ color: "error.main" }}>{error}</Typography>} */}
    </>
  );
};
