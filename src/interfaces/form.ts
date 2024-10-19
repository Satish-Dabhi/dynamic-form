import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface DynamicFormProps {
  formFields: any;
  formName: string;
}

export interface FieldValidation {
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
}

export interface Option {
  value: string;
  label: string;
}

export interface FormField {
  defaultValue: number | string | boolean | undefined;
  label: string;
  type:
    | "text"
    | "number"
    | "textarea"
    | "checkbox"
    | "dropdown"
    | "radio"
    | "slider";
  name: string;
  placeholder?: string;
  required: boolean;
  validation?: FieldValidation;
  options?: string[] | Option[];
  min?: number;
  max?: number;
  step?: number;
}

export interface CustomTextFieldProps {
  control: any;
  name: string;
  required?: boolean;
  label: string;
  defaultValue?: string | number;
  placeholder?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  textarea?: boolean;
  type: string;
}

export interface CustomSelectProps {
  control: any;
  name: string;
  label: string;
  defaultValue?: string | number | boolean;
  options: string[];
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  required?: boolean;
}

export interface CustomCheckBoxProps {
  label: string;
  control: any;
  name: string;
  options: Option[];
  error?: FieldError | Merge<FieldError, any>;
  required?: boolean;
}

export interface CustomRadioProps {
  control: any;
  name: string;
  label: string;
  defaultValue?: string | number | boolean;
  options: Option[];
  error?: FieldError | Merge<FieldError, any>;
  required?: boolean;
}

export interface CustomSliderProps {
  control: any;
  name: string;
  label: string;
  error?: FieldError | Merge<FieldError, any>;
  defaultValue?: number | string | boolean;
  min?: number | string;
  max?: number | string;
  step?: number;
  required?: boolean;
}
