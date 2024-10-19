import { Controller, FieldError, Merge } from "react-hook-form";

import Box from "@mui/material/Box";
import { CustomSliderProps } from "../../interfaces/form";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

function valuetext(value: number) {
  return `${value}`;
}

export default function CustomSlider({
  control,
  name,
  label,
  error,
  defaultValue,
  min = 10,
  max = 110,
  step = 10,
  required,
}: Readonly<CustomSliderProps>) {
  const renderErrorMessage = (
    error: FieldError | Merge<FieldError, any> | undefined
  ) => {
    return error && typeof error.message === "string" ? (
      <p style={{ color: "red" }}>{error.message}</p>
    ) : null;
  };

  return (
    <Box sx={{ width: "80%", margin: "0.5rem 0" }}>
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "600" }}>
        {required ? `${label}*` : label}
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || min}
        render={({ field }) => (
          <Slider
            {...field}
            aria-label={label}
            getAriaValueText={valuetext}
            step={Number(step)}
            marks
            min={Number(min)}
            max={Number(max)}
            value={field.value !== undefined ? field.value : defaultValue}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            sx={{ width: "100%" }}
            valueLabelDisplay="on"
          />
        )}
      />
      {renderErrorMessage(error)}
    </Box>
  );
}
