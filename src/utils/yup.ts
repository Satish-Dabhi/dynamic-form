import * as yup from "yup";

import { FormField } from "../interfaces/form";

export const generateValidationSchema = (formFields: FormField[]) => {
  const shape: Record<string, yup.Schema<any>> = {};

  formFields.forEach((field) => {
    let schema: yup.Schema<any>;

    if (field.type === "number") {
      schema = yup.number(); // Use number schema for number fields

      if (field.required) {
        schema = schema.required(`${field.label} is required`);
      }

      if (field.min !== undefined) {
        schema = (schema as yup.NumberSchema).min(
          field.min,
          `${field.label} must be at least ${field.min}`
        );
      }
      if (field.max !== undefined) {
        schema = (schema as yup.NumberSchema).max(
          field.max,
          `${field.label} must be at most ${field.max}`
        );
      }
    } else if (field.type === "checkbox") {
      schema = yup.array().of(yup.string()); // Checkbox field can be an array of strings

      if (field.required) {
        schema = schema
          .required(`${field.label} is required`)
          .min(1, `${field.label} must have at least one selected`); // Ensure at least one checkbox is selected
      }
    } else {
      schema = yup.string(); // Default to string validation for other types

      if (field.required) {
        schema = schema.required(`${field.label} is required`);
      }
    }

    // Assign the validation schema to the field's name
    shape[field.name] = schema;
  });

  return yup.object().shape(shape);
};
