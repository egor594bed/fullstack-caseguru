import { FC } from "react";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

export type Props = {
  control: any;
  name: string;
  label: string;
  type?: string;
  errors?: any;
  rules?: any;
};

export const InputWithValidation: FC<Props> = ({
  control,
  name,
  label,
  rules,
  type = "text",
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules: rules,
  });

  return (
    <>
      <TextField
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        inputRef={field.ref}
        label={label}
        type={type}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
    </>
  );
};
