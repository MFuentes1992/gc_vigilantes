import { RootState } from "@gcVigilantes/store";
import { getLabelApp } from "@gcVigilantes/utils";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Custom hook to validate form data
 * @param rules e.g. { email: { required: true, pattern: /regex/, message: "error message" } }
 */

export const useFormValidator = (rules: any) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setData] = useState<{ [key: string]: string }>({});
  const preferences = useSelector((state: RootState) => state.preferences);

  const setFormData = (form: { [key: string]: string }) => {
    setData(form);
  };

  useEffect(() => {
    validate();
  }, [formData]);

  const validate = () => {
    let valid = true;
    let errors: { [key: string]: string } = {};
    for (const key in rules) {
      if (rules.hasOwnProperty(key)) {
        const value = formData[key];
        const rule = rules[key];
        if (rule.required && !value) {
          valid = false;
          errors[key] = getLabelApp(
            preferences.language,
            "app_default_required_field"
          );
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          valid = false;
          errors[key] = rule.message;
        }
      }
    }
    setErrors(errors);
    return valid;
  };

  return { errors, setFormData };
};
