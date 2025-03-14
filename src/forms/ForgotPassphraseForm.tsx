import { Form, Formik } from "formik";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { postForgotPassphrase } from "../services/auth";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";

const ForgotPassphraseForm: FC = () => {
  const { dict } = useDictStore();
  const { setAssignedPassphrase } = useAuthStore();

  const navigate = useNavigate();

  return (
    <Formik<RequestForgotPassphrase>
      initialValues={{ recoveryKey: "" }}
      onSubmit={(values, { setSubmitting }) => {
        postForgotPassphrase(values)
          .then((response) => {
            setAssignedPassphrase(response.assignedPassphrase);
            navigate("/forgot-passphrase/assigned-passphrase");
          })
          .finally(() => setSubmitting(false));
      }}
    >
      <Form className="flex flex-col gap-6 mt-12 w-full">
        <Input
          name="recoveryKey"
          label={dict.windows.forgotPassphrase.form.recoveryKey}
        />

        <Button type="submit">
          {dict.windows.forgotPassphrase.form.submit}
        </Button>
      </Form>
    </Formik>
  );
};

export default ForgotPassphraseForm;
