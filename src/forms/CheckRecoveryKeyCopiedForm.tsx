import { Form, Formik } from "formik";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Button from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import useAuthStore from "../stores/auth";
import useDictStore from "../stores/dict";

const CheckRecoveryKeyCopiedForm: FC = () => {
  const { dict } = useDictStore();
  const navigate = useNavigate();
  const { recoveryKey } = useAuthStore();

  return (
    <Formik
      initialValues={{ recoveryKey: "" }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values.recoveryKey, recoveryKey);
        if (values.recoveryKey === recoveryKey) {
          navigate("/initialize/lets-start");
        } else {
          toast.dismiss();
          toast.error(dict.errors.invalidRecoveryKey);
        }
        setSubmitting(false);
      }}
    >
      <Form className="flex flex-col gap-6 mt-12 w-full">
        <Input
          name="recoveryKey"
          label={dict.windows.initialize.checkIfNoted.fields.recoveryKey}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="gradient"
            color="secondary"
            className="w-full"
            onClick={() => {
              navigate("/initialize/recovery-key");
            }}
          >
            {dict.windows.initialize.checkIfNoted.goBack}
          </Button>

          <Button variant="gradient" className="w-full" type="submit">
            {dict.windows.initialize.checkIfNoted.confirmed}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default CheckRecoveryKeyCopiedForm;
