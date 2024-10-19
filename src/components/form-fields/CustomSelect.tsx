import { Controller, FieldError, Merge } from "react-hook-form";

import Box from "@mui/material/Box";
import { CustomSelectProps } from "../../interfaces/form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";

export default function CustomSelect({
  control,
  name,
  label,
  defaultValue = "",
  options,
  error,
  required,
}: Readonly<CustomSelectProps>) {
  const renderErrorMessage = (
    error: FieldError | Merge<FieldError, any> | undefined
  ) => {
    return error && typeof error.message === "string" ? (
      <p style={{ color: "red" }}>{error.message}</p>
    ) : null;
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth error={!!error}>
        <InputLabel
          variant="standard"
          htmlFor="uncontrolled-native"
          shrink={true}
          sx={{ fontSize: "1.2rem", fontWeight: "600" }}
        >
          {required ? `${label}*` : label}
        </InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <NativeSelect
              {...field}
              inputProps={{
                id: "uncontrolled-native",
                sx: {
                  boxShadow: "7px 5px 13px -2px rgb(169 169 169 / 75%)", 
                  padding: "0.5rem",
                  margin: "0.5rem 0",
                },
              }}
              sx={{
                border: "none",
                "&:focus": {
                  borderRadius: "4px",
                  border: "1px solid #1976d2", 
                },
              }}
            >
              <option value="" disabled>
                Select an option
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </NativeSelect>
          )}
        />
        {renderErrorMessage(error)}
      </FormControl>
    </Box>
  );
}
