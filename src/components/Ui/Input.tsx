import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IFormFields } from "../../interfaces";

interface InputProps extends Omit<TextFieldProps, "variant"> {
  title: string;
  name: "shopName" | "shopCode" | "phoneNumber";

  register: UseFormRegister<IFormFields>;
  errors: FieldErrors<IFormFields>;
}

export default function Input({
  title,
  register,
  errors,
  name,

  ...rest
}: InputProps) {
  return (
    <div>
      <TextField
        label={title}
        variant="outlined"
        size="small"
        {...register(name)}
        {...rest}
      />
      {errors[name] && <p className="error">{errors[name]?.message}</p>}
    </div>
  );
}
