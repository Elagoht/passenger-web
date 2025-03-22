import { object, string } from "yup";

export const masterPassphraseSchema = (dict: Dict) => {
  return object().shape({
    passphrase: string()
      .min(16, dict.validation.min.replace("{{min}}", "16"))
      .matches(
        /^(?=(.*[a-z]){2,})(?=(.*[A-Z]){2,})(?=(.*\d){2,})(?=(.*[\W_]){2,}).{16,}$/,
        dict.validation.masterPassphrase,
      )
      .required(dict.validation.required),
  });
};
