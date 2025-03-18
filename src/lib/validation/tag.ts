import { number, object, string } from "yup";

export const createTagSchema = (dict: Dict) => {
  return object().shape({
    name: string().required(dict.validation.required),
    color: string().required(dict.validation.required),
    icon: number().required(dict.validation.required),
  });
};
