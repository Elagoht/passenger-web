import { Form, Formik } from "formik";
import { FC } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { postLogin } from "../services/auth";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";
import toastError from "../utilities/ToastError";

const LoginForm: FC = () => {
  const { dict } = useDictStore();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Formik<RequestLogin>
      initialValues={{ passphrase: "" }}
      onSubmit={(values, { setSubmitting }) => {
        postLogin(values)
          .then((response) => {
            login(response.token);
            navigate("/accounts");
          })
          .catch((error) => toastError(error, dict))
          .finally(() => setSubmitting(false));
      }}
    >
      <Form className="flex flex-col gap-6 mt-12 max-w-md w-full">
        <Input
          type="password"
          name="passphrase"
          label={dict.forms.fields.passphrase}
        />

        <small className="flex items-center justify-end gap-4 -mt-4 mr-4">
          <Link tabIndex={1} to="/forgot-passphrase">
            {dict.windows.login.forgot}
          </Link>
        </small>

        <Button type="submit">{dict.windows.login.form.submit}</Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
