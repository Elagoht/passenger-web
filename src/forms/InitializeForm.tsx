import { IconLock } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { FC } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { postInitialize } from "../services/auth";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";
import toastError from "../utilities/ToastError";

const InitializeForm: FC = () => {
  const { dict } = useDictStore();
  const { setRecoveryKey } = useAuthStore();
  const navigate = useNavigate();
  return (
    <Formik<RequestInitialize>
      initialValues={{ passphrase: "" }}
      onSubmit={(values, { setSubmitting }) => {
        postInitialize(values)
          .then((response) => {
            setRecoveryKey(response.recoveryKey);
            navigate("/initialize/recovery-key");
          })
          .catch((error) => {
            toastError(error, dict, {
              400: () => {
                toast.error(dict.errors.alreadyInitialized);
                navigate("/login");
              },
            });
          })
          .finally(() => setSubmitting(false));
      }}
    >
      <Form className="flex flex-col gap-6 mt-12 max-w-md w-full">
        <Input
          icon={IconLock}
          type="password"
          name="passphrase"
          label={dict.windows.initialize.register.form.passphrase}
        />

        <Button type="submit" color="success">
          {dict.windows.initialize.register.form.submit}
        </Button>
      </Form>
    </Formik>
  );
};

export default InitializeForm;
