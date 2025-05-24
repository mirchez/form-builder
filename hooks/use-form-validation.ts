import { useState } from "react";
import { FormSchema, formSchema } from "@/utils/validations/form";
import { ZodError } from "zod";

export function useFormValidation() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isValid, setIsValid] = useState(true);

  const validateForm = (data: FormSchema) => {
    try {
      formSchema.parse(data);
      setErrors({});
      setIsValid(true);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string[]> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          formattedErrors[path].push(err.message);
        });
        setErrors(formattedErrors);
        setIsValid(false);
      }
      return false;
    }
  };

  const clearErrors = () => {
    setErrors({});
    setIsValid(true);
  };

  return {
    errors,
    isValid,
    validateForm,
    clearErrors,
  };
}
