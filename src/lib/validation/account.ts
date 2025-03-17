import { object, string } from "yup";

export const createAccountSchema = (dict: Dict) => {
  return object().shape({
    platform: string().required(dict.validation.required),
    identity: string().required(dict.validation.required),
    url: string().required(dict.validation.required),
    passphrase: string().required(dict.validation.required),
    note: string().optional(),
  });
};
