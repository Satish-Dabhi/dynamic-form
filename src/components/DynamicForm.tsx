import { Alert, Button, Snackbar } from "@mui/material";
import { DynamicFormProps, FormField, Option } from "../interfaces/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import CustomCheckBox from "./form-fields/CustomCheckBox";
import CustomRadio from "./form-fields/CustomRadio";
import CustomSelect from "./form-fields/CustomSelect";
import CustomSlider from "./form-fields/CustomSlider";
import CustomTextField from "./form-fields/CustomTextField";
import { generateValidationSchema } from "../utils/yup";
import { label } from "../constants/label";
import { yupResolver } from "@hookform/resolvers/yup";

const DynamicForm: React.FC<DynamicFormProps> = ({ formFields, formName }) => {
  const validationSchema = generateValidationSchema(formFields);
  const [alertOpen, setAlertOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    localStorage.setItem(formName, JSON.stringify(data));
    setAlertOpen(true);
    console.log(data);
  };

  useEffect(() => {
    const savedData = localStorage.getItem(formName);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [formName, setValue]);

  const handleClose = () => {
    setAlertOpen(false);
  };

  const renderField = (field: FormField) => {
    const validationRules = field.validation || {};

    switch (field.type) {
      case "text":
      case "textarea":
      case "number":
        return (
          <div key={field.name} className="w-full">
            <CustomTextField
              control={control}
              required={field.required}
              label={field.label}
              placeholder={field.placeholder}
              defaultValue=""
              error={errors[field.name]}
              textarea={field.type === "textarea"}
              type={field.type === "number" ? "number" : "text"}
              {...register(field.name, validationRules)}
            />
          </div>
        );
      case "checkbox":
        return (
          <div key={field.name}>
            <CustomCheckBox
              label={field.label}
              control={control}
              required={field.required}
              name={field.name}
              options={field.options as Option[]}
              error={errors[field.name]}
            />
          </div>
        );
      case "dropdown":
        return (
          <div key={field.name}>
            <CustomSelect
              control={control}
              name={field.name}
              label={field.label}
              options={field?.options as string[]}
              error={errors[field.name]}
              defaultValue={field.defaultValue}
              onChange={(value) => {
                register(field.name, validationRules).onChange(value);
              }}
            />
          </div>
        );
      case "radio":
        return (
          <div key={field.name}>
            <CustomRadio
              control={control}
              label={field.label}
              options={field.options as Option[]}
              defaultValue={field.defaultValue}
              error={errors[field.name]}
              {...register(field.name, validationRules)}
            />
          </div>
        );
      case "slider":
        return (
          <div key={field.name}>
            <CustomSlider
              control={control}
              label={field.label}
              error={errors[field.name]}
              defaultValue={field.defaultValue}
              min={field.min}
              max={field.max}
              step={field.step}
              {...register(field.name, validationRules)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="dynamic-form">
      {formFields?.map((field: FormField) => renderField(field))}
      <Button
        variant="contained"
        type="submit"
        sx={{ width: "100%", backgroundColor: "#000000", margin: "1rem 0" }}
      >
        {label.SUBMIT}
      </Button>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {label.FORM_DATA_SAVED_MESSAGE}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default DynamicForm;
