import { Box, Button, Typography } from "@mui/material";
import { useHttp } from "../../hooks/http.hook";
import authService from "../../services/auth-service";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputWithValidation } from "../UI/InputWithValidation/InputWithValidation";

type FormValues = {
  username: string;
  password: string;
};

export const NewEmployeeAuthForm = () => {
  const { request, loading, error } = useHttp();
  const param = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = async (data: FormValues) => {
    await request(() =>
      authService.register(
        data.username,
        data.password,
        Number(param.employeeId)
      )
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
      <Box component={"form"} onSubmit={handleSubmit(submitHandler)}>
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
        <Button
          variant="contained"
          type="submit"
          disabled={loading || !isValid}
          sx={{ width: "100%", padding: 1, fontSize: 16 }}
        >
          Зарегистрироваться
        </Button>
        {error && <Typography sx={{ color: "error.main" }}>{error}</Typography>}
      </Box>
    </>
  );
};
