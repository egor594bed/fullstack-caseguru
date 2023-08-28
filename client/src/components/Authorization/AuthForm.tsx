import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/auth";
import { AppDispatch, RootState } from "../../redux/store";
import { useForm } from "react-hook-form";
import { InputWithValidation } from "../UI/InputWithValidation/InputWithValidation";

export type FormValues = {
  username: string;
  password: string;
};

export const AuthForm = () => {
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
  });

  const submitHandler = async (data: FormValues) => {
    dispatch(login({ ...data }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: 2, color: "primary.main" }}
      >
        Авторизация
      </Typography>
      <InputWithValidation
        control={control}
        name="username"
        label="Логин"
        errors={errors.username}
        rules={{
          required: true,
          minLength: { value: 3, message: "Минимум 3 символа" },
        }}
      />
      <InputWithValidation
        control={control}
        name="password"
        label="Пароль"
        type="password"
        errors={errors.password}
        rules={{
          required: true,
          minLength: { value: 6, message: "Минимум 6 символов" },
        }}
      />
      <Box sx={{ height: 10, marginBottom: 2, marginTop: -1 }}>
        {error && <Typography sx={{ color: "error.main" }}>{error}</Typography>}
      </Box>
      <Button
        variant="contained"
        type="submit"
        disabled={loading || !isValid}
        sx={{ width: "100%", padding: 1, fontSize: 16 }}
      >
        Войти
      </Button>
    </Box>
  );
};
