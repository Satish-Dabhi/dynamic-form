import { Controller, FieldError, Merge } from "react-hook-form";

import { CustomTextFieldProps } from "../../interfaces/form";
import TextField from "@mui/material/TextField";

export default function CustomTextField({
  control,
  name,
  label,
  defaultValue = "",
  placeholder = "",
  error,
  textarea,
  type,
  required,
}: Readonly<CustomTextFieldProps>) {
  const renderErrorMessage = (
    error: FieldError | Merge<FieldError, any> | undefined
  ) => {
    return error && typeof error.message === "string" ? (
      <p>{error.message}</p>
    ) : null;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <TextField
          variant="standard"
          type={type}
          label={required ? `${label}*` : label}
          placeholder={placeholder}
          InputLabelProps={{
            shrink: true,
            sx: { fontSize: "1.2rem", fontWeight: "600" },
          }}
          inputProps={{
            sx: {
              WebkitBoxShadow: "7px 5px 13px -2px rgb(169 169 169 / 75%)",
              MozBoxShadow: "7px 5px 13px -2px rgb(169 169 169 / 75%)",
              boxShadow: "7px 5px 13px -2px rgb(169 169 169 / 75%)",
              padding: "0.5rem",
            },
          }}
          sx={{
            width: "100%",
            margin: "1rem 0",
            padding: "0.5rem 0",
            border: "none",
          }}
          onChange={(e) => {
            const value =
              type === "number"
                ? e.target.value
                  ? Number(e.target.value)
                  : ""
                : e.target.value;
            field.onChange(value);
          }}
          value={field.value}
          error={!!error}
          helperText={renderErrorMessage(error)}
          multiline={textarea}
          rows={textarea ? 4 : 1}
        />
      )}
    />
  );
}
