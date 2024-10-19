import { Controller, FieldError, Merge } from "react-hook-form";

import Checkbox from "@mui/material/Checkbox";
import { CustomCheckBoxProps } from "../../interfaces/form";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";

export default function CustomCheckBox({
  label,
  control,
  name,
  options,
  error,
  required,
}: Readonly<CustomCheckBoxProps>) {
  const renderErrorMessage = (
    error: FieldError | Merge<FieldError, any> | undefined
  ) => {
    return error && typeof error.message === "string" ? (
      <p style={{ color: "red" }}>{error.message}</p>
    ) : null;
  };

  return (
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "600" }}>
        {required ? `${label}*` : label}
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    {...field}
                    checked={field.value.includes(option.value)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const newValue = checked
                        ? [...field.value, option.value]
                        : field.value.filter(
                            (value: string) => value !== option.value
                          );
                      field.onChange(newValue);
                    }}
                  />
                }
                label={option.label}
              />
            ))}
          </>
        )}
      />
      {renderErrorMessage(error)}
    </>
  );
}
