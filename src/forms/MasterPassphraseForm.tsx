import { Form, Formik } from "formik";
import { FC } from "react";
import toast from "react-hot-toast/headless";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { masterPassphraseSchema } from "../lib/validation/auth";
import { postChangePassphrase } from "../services/auth";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";
import toastError from "../utilities/ToastError";

const MasterPassphraseForm: FC = () => {
  const { dict } = useDictStore();
  const { token } = useAuthStore();

  const navigate = useNavigate();

  return (
    <Formik<RequestChangePassphrase>
      initialValues={{ passphrase: "" }}
      validationSchema={masterPassphraseSchema(dict)}
      onSubmit={(values, { setSubmitting }) => {
        postChangePassphrase(token, values)
          .then(() => {
            toast.success(dict.windows.changePassphrase.form.success);
            navigate("/settings");
          })
          .catch((error) => toastError(error, dict))
          .finally(() => setSubmitting(false));
      }}
    >
      <Form className="flex flex-col gap-4 w-full max-w-lg mt-8">
        <Input
          type="password"
          name="passphrase"
          label={dict.windows.changePassphrase.form.passphrase}
        />

        <Button type="submit">
          {dict.windows.changePassphrase.form.submit}
        </Button>
      </Form>
    </Formik>
  );
};

export default MasterPassphraseForm;
