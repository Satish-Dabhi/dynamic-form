import { Controller, FieldError, Merge } from "react-hook-form";

import { CustomRadioProps } from "../../interfaces/form";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export default function CustomRadio({
  control,
  name,
  label,
  defaultValue = "",
  options,
  error,
  required,
}: Readonly<CustomRadioProps>) {
  const renderErrorMessage = (
    error: FieldError | Merge<FieldError, any> | undefined
  ) => {
    return error && typeof error.message === "string" ? (
      <p style={{ color: "red" }}>{error.message}</p>
    ) : null;
  };

  return (
    <FormControl error={!!error}>
      <FormLabel id={`${name}-label`} sx={{ fontWeight: "600" }}>
        {required ? `${label}*` : label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup row aria-labelledby={`${name}-label`} {...field}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        )}
      />
      {renderErrorMessage(error)}
    </FormControl>
  );
}
